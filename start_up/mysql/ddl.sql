/*!40101 SET NAMES utf8 */;
/*!40101 SET SQL_MODE=''*/;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- ------------------创建数据库 ------------------
CREATE DATABASE /*!32312 IF NOT EXISTS*/`supermarket` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `supermarket`;

-- -----------------创建购物车表格----------------
DROP TABLE IF EXISTS `t_cart`;
CREATE TABLE `t_cart` (
                          `id` int(11) NOT NULL AUTO_INCREMENT,
                          `user_id` varchar(100) DEFAULT NULL,
                          `product_id` varchar(100) DEFAULT NULL,
                          `product_image` varchar(500) DEFAULT NULL,
                          `product_name` varchar(100) DEFAULT NULL,
                          `product_price` double DEFAULT NULL,
                          `num` int(11) DEFAULT NULL,
                          PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ------------------------创建订单表格-------------------
DROP TABLE IF EXISTS `t_order`;
CREATE TABLE `t_order` (
                           `order_id` char(36) NOT NULL DEFAULT '',
                           `order_money` double DEFAULT '0',
                           `order_receiverinfo` varchar(255) DEFAULT '',
                           `order_paystate` int(11) DEFAULT '0',
                           `order_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           `user_id` char(36) DEFAULT NULL,
                           PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------创建订单商品表格----------------------
DROP TABLE IF EXISTS `t_order_item`;
CREATE TABLE `t_order_item` (
                                `id` bigint(20) NOT NULL AUTO_INCREMENT,
                                `order_id` char(100) DEFAULT NULL,
                                `product_id` char(36) DEFAULT NULL,
                                `num` int(11) DEFAULT '0',
                                `product_image` varchar(500) DEFAULT NULL,
                                `product_name` varchar(100) DEFAULT NULL,
                                `product_price` double DEFAULT NULL,
                                PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8;

-- ---------------------创建商品表格----------------------
DROP TABLE IF EXISTS `t_product`;
CREATE TABLE `t_product` (
                             `product_id` char(36) NOT NULL DEFAULT '',
                             `product_name` varchar(100) DEFAULT NULL,
                             `product_price` double DEFAULT '0',
                             `product_category` varchar(100) DEFAULT '',
                             `product_imgurl` varchar(500) DEFAULT '',
                             `product_num` int(11) DEFAULT '0',
                             `product_description` varchar(255) DEFAULT '',
                             PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------------创建用户表格----------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
                          `user_id` char(36) NOT NULL COMMENT '用户id uuid 主键',
                          `user_name` varchar(100) NOT NULL COMMENT '用户登陆名称',
                          `user_password` varchar(32) NOT NULL DEFAULT '""' COMMENT '用户密码 md5',
                          `user_nickname` varchar(50) DEFAULT '上帝' COMMENT '用户昵称',
                          `user_email` varchar(30) DEFAULT '""' COMMENT '用户邮箱',
                          `user_type` int(11) DEFAULT '0' COMMENT '用户权限 0(游客),1(买家),2(卖家),3(未定义),4(管理员),5(根用户)',
                          PRIMARY KEY (`user_id`),
                          UNIQUE KEY `UN_user_name` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------创建秒杀商品表格---------------------
DROP TABLE IF EXISTS `instant_buy_item`;
CREATE TABLE `instant_buy_item` (
                                    `item_id` char(36) NOT NULL DEFAULT '' COMMENT '商品库存id',
                                    `name` varchar(120) NOT NULL COMMENT '商品名称',
                                    `number` int(11) NOT NULL COMMENT '库存数量',
                                    `initial_price` bigint(20) NOT NULL COMMENT '原价',
                                    `buy_price` bigint(20) NOT NULL COMMENT '秒杀价',
                                    `sell_point` varchar(500) NOT NULL COMMENT '卖点',
                                    `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '秒杀创建时间',
                                    `start_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '秒杀开始时间',
                                    `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '秒杀结束时间',
                                    PRIMARY KEY (`item_id`),
                                    KEY `idx_create_time` (`create_time`),
                                    KEY `idx_start_time` (`start_time`),
                                    KEY `idx_end_time` (`end_time`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='秒杀库存表';

-- -------------------创建秒杀成功表格-----------------------------
DROP TABLE IF EXISTS `instant_buy_success`;
CREATE TABLE `instant_buy_success` (
                                       `success_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '秒杀成功id',
                                       `item_id` char(36) NOT NULL DEFAULT '' COMMENT '秒杀商品id',
                                       `user_name` varchar(100) NOT NULL COMMENT '用户登陆名称',
                                       `state` tinyint(4) NOT NULL DEFAULT '-1' COMMENT '状态标志：-1：无效；0：成功；1：已付款；2：已发货',
                                       `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '秒杀成功创建时间',
                                       PRIMARY KEY (`success_id`),
                                       KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB AUTO_INCREMENT=6382 DEFAULT CHARSET=utf8 COMMENT='秒杀成功明细表';


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
