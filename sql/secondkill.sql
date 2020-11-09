/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`secondkill` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `secondkill`;

/*Table structure for table `secondkill` */

DROP TABLE IF EXISTS `secondkill`;

CREATE TABLE `secondkill` (
  `secondkill_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '商品库存id',
  `name` varchar(120) NOT NULL COMMENT '商品名称',
  `number` int(11) NOT NULL COMMENT '库存数量',
  `initial_price` bigint(20) NOT NULL COMMENT '原价',
  `secondkill_price` bigint(20) NOT NULL COMMENT '秒杀价',
  `sell_point` varchar(500) NOT NULL COMMENT '卖点',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '秒杀创建时间',
  `start_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '秒杀开始时间',
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '秒杀结束时间',
  PRIMARY KEY (`secondkill_id`),
  KEY `idx_create_time` (`create_time`),
  KEY `idx_start_time` (`start_time`),
  KEY `idx_end_time` (`end_time`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='秒杀库存表';

/*Data for the table `secondkill` */

insert  into `secondkill`(`secondkill_id`,`name`,`number`,`initial_price`,`secondkill_price`,`sell_point`,`create_time`,`start_time`,`end_time`) values (1,'oppo10',719,2000,1000,'1000元成功秒杀oppo10','2018-05-17 11:12:49','2019-05-09 13:13:49','2020-05-18 00:00:00'),(2,'荣耀8',80,1800,800,'800元成功秒杀荣耀8','2018-01-21 22:08:49','2018-01-23 00:00:00','2018-01-24 00:00:00'),(3,'iPhone6',60,1600,600,'600元成功秒杀iPhone6','2018-01-21 22:08:49','2018-01-24 00:00:00','2018-01-25 00:00:00'),(4,'小米4',40,1400,400,'400元成功秒杀小米4','2018-01-21 22:08:49','2018-01-25 00:00:00','2018-01-26 00:00:00'),(5,'vivo2',20,1200,200,'200元成功秒杀vivo2','2018-01-21 22:08:49','2018-01-26 00:00:00','2018-01-27 00:00:00'),(6,'魅族1',10,1000,100,'100元成功秒杀魅族1','2018-01-21 22:08:49','2018-01-27 00:00:00','2018-01-28 00:00:00');

/*Table structure for table `success` */

DROP TABLE IF EXISTS `success`;

CREATE TABLE `success` (
  `success_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '秒杀成功id',
  `secondkill_id` bigint(20) NOT NULL COMMENT '秒杀商品id',
  `user_phone` bigint(20) NOT NULL COMMENT '用户手机号',
  `state` tinyint(4) NOT NULL DEFAULT '-1' COMMENT '状态标志：-1：无效；0：成功；1：已付款；2：已发货',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '秒杀成功创建时间',
  PRIMARY KEY (`success_id`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB AUTO_INCREMENT=6382 DEFAULT CHARSET=utf8 COMMENT='秒杀成功明细表';

/*Data for the table `success` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
