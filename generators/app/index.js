const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    // private methods
    // this.argument('appname', { type: String, required: true });
    // this.log(this.options.appname);
    console.log(this.sourceRoot());
  }

  prompting() {
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname,
    }/*, {
      type: 'confirm',
      name: 'cool',
      message: 'Would you like to enable the Cool feature?',
      store: true,
    }*/]).then((answers) => {
      this.log('app name： ', answers.name);
      // this.log('cool feature', answers.cool);
    });
  }

  writing() {
    const templateFiles = [this.templatePath() + '/**'];

    this.fs.copy(templateFiles, this.destinationRoot(), {});
  }
};