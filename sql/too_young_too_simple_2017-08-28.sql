# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.19)
# Database: too_young_too_simple
# Generation Time: 2017-08-28 12:51:22 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table user_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_info`;

CREATE TABLE `user_info` (
  `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '上次登录时间',
  `last_xuming` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '上次续命时间',
  `user_name` varchar(30) NOT NULL DEFAULT '' COMMENT '用户名称',
  `user_email` varchar(200) NOT NULL DEFAULT '' COMMENT '用户邮箱',
  `user_password` char(40) NOT NULL DEFAULT '' COMMENT '用户密码',
  `user_mobile` int(11) DEFAULT NULL COMMENT '用户电话号码',
  `user_ avatar` varchar(200) DEFAULT NULL COMMENT '用户头像',
  `user_introduce` varchar(200) DEFAULT NULL COMMENT '用户简介',
  `user_xuming` int(11) NOT NULL COMMENT '用户已为长者续命时间',
  `user_address` varchar(30) DEFAULT NULL COMMENT '用户住址（以便查水表）',
  `user_created_ip` char(30) DEFAULT NULL COMMENT '用户创建地IP',
  `user_login_ip` char(30) DEFAULT NULL COMMENT '用户上次登录IP',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
