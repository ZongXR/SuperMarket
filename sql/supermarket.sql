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

-- ------------------------插入商品数据-------------------------
INSERT INTO `t_product`
    (`product_id`,`product_name`,`product_price`,`product_category`,`product_imgurl`,`product_num`,`product_description`)
VALUES
       ('027ce80f-8586-4875-80ed-b1c9c08ba0ba','我和顾宇婷',9999,'测试商品','http://image.supermarket.com//upload/1/a/1/f/4/4/5/8/842038d1-637c-484d-bb30-6297924e1dda.jpg',1,'I love 顾宇婷'),
       ('05e20c1a-0401-4c0a-82ab-6fb0f37db397','海滩吗,还行',900,'电子数码','http://image.supermarket.com/upload/5/e/d/5/4/5/e/b/5f0d34dc-157f-49ba-ad39-1b28927ba6ae_1005714.jpg',211,'我们都有一个家'),
       ('07c1b2d5-4e73-4499-8046-71cb2d193e11','后悔药1',200,'日用百货','http://image.supermarket.com/upload/2/6/4/a/a/5/2/3/ee6c796a-6333-4cd5-a06e-271d876aac8c_589577.jpg',4765,'都说世上没有后悔药,原本我也深信不疑'),
       ('09f47493-214d-44bc-927d-6ce0bf89a057','iPhone7Plus 3200G 黑色手机',1000,'电子数码','http://image.supermarket.com/upload/5/2/3/4/7/8/d/c/1838eaa6-6459-420f-b8e2-6ea9f43c4b5e_dfd259ab-bcc7-43f6-a9d5-62872ff5671e.jpg',2549,'爱上爱疯, 你疯...我疯...大家一起疯....'),
       ('103e5414-0da2-4fba-b92f-0ba876e08939','滑雪套装',2000,'日用百货','http://image.supermarket.com/upload/4/d/2/a/2/3/1/8/b3c3fc7a-222c-49be-9491-f466553d2284_386718.jpg',224,'滑雪必备套转, 你, 值得你拥有~~~'),
       ('1114f043-e36a-4333-ae5e-5e610eabca12','防分手神器：大砖头1',0,'日用百货','http://image.supermarket.com/upload/6/b/8/3/a/4/9/8/3fb77001-cd6c-4e4f-94a1-21a9c0563778_Hydrangeas.jpg',2345,'你再说一个分手试试。。。。'),
       ('17c3f20e-ef86-4857-9293-f29e52954a95','打印机',180,'电子数码','http://image.supermarket.com/upload/7/c/b/f/7/d/2/9/5e229aef-063f-4d0d-91df-2d4aa7167670_6f84843a-1d1e-49c7-b4ce-c035d7790171.jpg',1508,'一个神奇的打印机...,可以打印人民币, 你敢用吗??'),
       ('21bba7e8-21b8-46aa-932f-958b1a36e118','烈性炸药1',5899,'电子数码','http://image.supermarket.com/upload/c/7/4/1/4/2/3/2/a99e691b-88d4-43a2-ac12-82ec54db123d_738f47e2-9605-46aa-b647-fc8dca814074.jpg',435,'充电会自动引爆, 再也不用担心自杀shi不了了'),
       ('26128d47-423b-4220-8047-544ff899db50','MacBook Air 13.3英寸笔记本',12,'电子数码','http://image.supermarket.com/upload/2/1/0/3/f/0/3/5/2fb0b43b-4dbe-440b-899b-13c02a9f5475_22d124c9-df52-4cd4-88b3-691005f1cafe.jpg',1233,'三坑笔记本, 从此亮瞎你的眼....'),
       ('2ad0d041-8c5f-4b70-a0ef-1ca2fd476dba','战神主机',5888,'电子数码','http://image.supermarket.com/upload/b/4/1/b/d/9/8/8/e41cd642-2fc2-4cb2-b20a-f8a78405eee2_e9dd0d91-40c1-4db5-a888-244e825e9ce4.jpg',78,'主机中的战斗机. 欧耶~~~~'),
       ('2fb06be4-d3aa-451f-807e-cb8940ca3ba2','防楼上噪音1000W震动反击神器1',88,'日用百货','http://image.supermarket.com/upload/6/5/a/4/2/9/e/8/cb68faa0-0033-4517-bff0-5fb2f1f1019a_671434fae6cd7b89a26ce25e072442a7d8330efa.jpg',532,'晚上开启一分钟, 楼上安静10小时, 再也不怕楼上制造噪音了....'),
       ('343bb952-1505-49ba-9920-47f69108152a','爱眼滤蓝光LED背光液晶显示器1',20000,'家用电器','http://image.supermarket.com/upload/1/8/e/9/b/2/7/2/95e01470-8e6f-40dc-a76b-087d804bb0cf_bae0a60a-521d-48ef-bea6-0854b89d7be0.jpg',424,'极致影院体验, 从这里开始~~~'),
       ('3643034b-47c6-4298-913a-3cdc1fd176ca','滑雪套装1',2000,'日用百货','http://image.supermarket.com/upload/4/d/2/a/2/3/1/8/b3c3fc7a-222c-49be-9491-f466553d2284_386718.jpg',224,'滑雪必备套转, 你, 值得你拥有~~~'),
       ('36b9407f-746a-4956-988e-557122bc74d0','banana',11,'日用百货','http://image.supermarket.com/upload/e/5/0/9/c/7/6/0/60746822-144c-4e98-8aaa-fca07e142a63_banana.jpg',453,'国产大banana,好吃又好用'),
       ('38a4a0f0-7c33-4e78-aa9e-1a3f7f193683','绿色健康大黄瓜',1000,'电子数码','http://image.supermarket.com/upload/8/6/b/0/5/9/e/f/1d25320d-e1b2-42bc-b890-981d58391cf0_6f84843a-1d1e-49c7-b4ce-c035d7790171.jpg',22,'买了我的瓜, 忘了那个他/它/她...'),
       ('3da04a08-a570-4945-91b5-cd0d63ace7b4','机器人',10000,'电子数码','http://image.supermarket.com/upload/9/f/f/a/1/6/d/0/49617712-4018-4c0e-9e7a-5ebc4ff79ad1_6f84843a-1d1e-49c7-b4ce-c035d7790171.jpg',654,'一款可以打印女朋友的打印机...程序员必备!!!'),
       ('3f36ac54-5da0-4cd8-9991-2ee86cc348c2','金士顿8G内存条',800,'电子数码','http://image.supermarket.com/upload/2/2/b/7/f/2/f/4/06402c91-aa25-45d5-b0c3-3ac276a7cd05_244c59c6-bf0a-451b-81e6-18f8bb257e5f.jpg',8447,'8G内存条，速度拿货, 数量有限(赠4G种子, 你懂的....)！'),
       ('3f3f2621-8fec-4615-9076-631d06623e98','iris花',330,'测试商品','http://image.supermarket.com//upload/7/0/3/6/0/0/8/d/68384bdd-5949-439a-bd08-93800e03b7cd.jpg',12,'仅仅是一个测试'),
       ('49b0e026-df44-4e5e-984b-65a106526393','QQ群',500,'测试商品','http://image.supermarket.com//upload/1/3/1/5/0/8/2/b/e2576938-2ab3-4731-921e-d78a0ae96058.png',1,'呵呵，加入QQ群吧'),
       ('49d57c16-758b-425a-ba96-9da03b86408d','打印机1',180,'电子数码','http://image.supermarket.com/upload/7/c/b/f/7/d/2/9/5e229aef-063f-4d0d-91df-2d4aa7167670_6f84843a-1d1e-49c7-b4ce-c035d7790171.jpg',1508,'一个神奇的打印机...,可以打印人民币, 你敢用吗??'),
       ('517b4ef7-ecfa-406b-9355-7ce04f86781a','死亡海体验套餐1',4444,'日用百货','http://image.supermarket.com/upload/c/8/1/0/4/6/3/b/28139e28-7390-45a7-82c8-03e673486e60_Desert.jpg',624,'体验死亡的感觉，你值得拥有!'),
       ('59622587-958e-43cb-b657-49619f60713e','防楼上噪音1000W震动反击神器',88,'日用百货','http://image.supermarket.com/upload/6/5/a/4/2/9/e/8/cb68faa0-0033-4517-bff0-5fb2f1f1019a_671434fae6cd7b89a26ce25e072442a7d8330efa.jpg',532,'晚上开启一分钟, 楼上安静10小时, 再也不怕楼上制造噪音了....'),
       ('5a47d790-bc44-472b-8b9f-55b15a0cfb2c','neutrogena防晒乳1',100,'电子数码','http://image.supermarket.com/upload/5/0/6/f/4/4/b/f/40ca42aa-8298-430a-9fa9-88d6156d7b18_c987f2c1-4123-4d87-83bd-fe2fb221e272.jpg',1349,'带你变成白富美, 走上人生癫疯~~~'),
       ('5b7a84fb-b888-4c5d-8ace-6877d909fe89','苍#null1',998,'床上用品','http://image.supermarket.com/upload/e/d/b/1/f/0/6/7/bcff4ee1-cc7f-4b30-a29c-017f76a21bf8_1.jpg',874,'苍老师同款'),
       ('65cf809a-1eaf-4ba0-95b7-b13476e82c07','宠物猫1',30000,'日用百货','http://image.supermarket.com/upload/3/5/5/4/c/3/a/b/943de853-0e1b-4d51-9524-991607024d3b_IMG_0928.JPG',245,'只有一只哦，快来抢购吧'),
       ('6746c459-b284-4256-bbc6-1df60ba4a0a2','后悔药',200,'日用百货','http://image.supermarket.com/upload/2/6/4/a/a/5/2/3/ee6c796a-6333-4cd5-a06e-271d876aac8c_589577.jpg',4765,'都说世上没有后悔药,原本我也深信不疑'),
       ('6c28bc1a-9c9b-4be3-b1cf-0068565e64e4','兔子',59,'家用电器','http://image.supermarket.com/upload/1/f/b/5/3/4/e/4/61a8cdff-52f7-4fce-bdb5-570426022082_preview.jpg',52,'我们的征途是星辰大海!'),
       ('70ee3179-3e76-4a3d-bd30-55d740f022dc','极品水母',998,'日用百货','http://image.supermarket.com/upload/e/6/f/d/3/f/6/1/d2370fcb-dc8f-4405-9bf2-76e798a91567_Jellyfish.jpg',243,'居家旅行，必备之选!!!!'),
       ('71e869ae-2d0c-4f3e-bb7f-6f6630f02cf7','MacBook Air 13.3英寸笔记本1',12,'电子数码','http://image.supermarket.com/upload/2/1/0/3/f/0/3/5/2fb0b43b-4dbe-440b-899b-13c02a9f5475_22d124c9-df52-4cd4-88b3-691005f1cafe.jpg',1233,'三坑笔记本, 从此亮瞎你的眼....'),
       ('77a32d18-5596-4579-a700-ac1e76aa321e','极品水母1',998,'日用百货','http://image.supermarket.com/upload/e/6/f/d/3/f/6/1/d2370fcb-dc8f-4405-9bf2-76e798a91567_Jellyfish.jpg',243,'居家旅行，必备之选!!!!'),
       ('77feb539-a575-487b-8500-df38520f3239','战地1 豪华版 Origin平台正版激活码',780,'图书杂志','http://image.supermarket.com/upload/5/e/e/6/c/4/9/b/67c1a752-9020-4372-bcda-3375ef01c878_preview.jpg',103,'想办法干他一炮....'),
       ('7ab311f2-30b9-41ab-82a8-3524dbd012d0','海滩别墅1',900,'电子数码','http://image.supermarket.com/upload/5/e/d/5/4/5/e/b/5f0d34dc-157f-49ba-ad39-1b28927ba6ae_1005714.jpg',212,'面朝大海, 侧面有山, 安享晚年之首选!!!'),
       ('83ffa948-998e-4058-bdad-16dadae90fc0','绿色健康大黄瓜1',1000,'电子数码','http://image.supermarket.com/upload/8/6/b/0/5/9/e/f/1d25320d-e1b2-42bc-b890-981d58391cf0_6f84843a-1d1e-49c7-b4ce-c035d7790171.jpg',4865,'www.supermarket.com/买了我的瓜, 忘了那个他/它/她...'),
       ('885a2417-ca4d-4fc7-ac6c-1f9bda76c5da','反恐精英套装1',10000,'服装服饰','http://image.supermarket.com/upload/1/4/2/e/7/3/6/4/09af74da-3829-45c5-9517-380d2cc74f6a_preview.jpg',644,'专业反恐服装，带你装x带你飞...biu~biu~biu~~'),
       ('8b80bc62-f22a-4d69-a0c0-41b2ea2846ce','金士顿8G内存条1',800,'电子数码','http://image.supermarket.com/upload/2/2/b/7/f/2/f/4/06402c91-aa25-45d5-b0c3-3ac276a7cd05_244c59c6-bf0a-451b-81e6-18f8bb257e5f.jpg',8447,'8G内存条，速度拿货, 数量有限(赠4G种子, 你懂的....)！'),
       ('8c0023f1-2a49-48a7-9810-a52ba4cd00d1','三坑手机1',5000,'电子数码','http://image.supermarket.com/upload/3/6/c/0/7/2/1/3/741c8c70-cdd1-43a9-8cde-aa6a787129ca_738f47e2-9605-46aa-b647-fc8dca814074.jpg',524,'三坑手机, 专业坑人三十年, 从未被超越...!!!'),
       ('8ed715e9-f506-4792-9f9f-f4b81aa87f36','华为荣耀81',5000,'电子数码','http://image.supermarket.com/upload/4/a/d/8/8/c/4/0/236ac480-db3a-4e6b-bc7f-c379a30c2c2c_301fb535-938a-4103-a2f5-f3f9af9ba9c6.jpg',2545,'支持国产, 从你我做起!!!'),
       ('97122945-9308-42a9-a602-071b755d2ec3','战地1 豪华版 Origin平台正版激活码1',780,'图书杂志','http://image.supermarket.com/upload/5/e/e/6/c/4/9/b/67c1a752-9020-4372-bcda-3375ef01c878_preview.jpg',103,'想办法干他一炮....'),
       ('a0390f80-bed7-4a92-9954-5e22e64cbe17','neutrogena防晒乳',100,'电子数码','http://image.supermarket.com/upload/5/0/6/f/4/4/b/f/40ca42aa-8298-430a-9fa9-88d6156d7b18_c987f2c1-4123-4d87-83bd-fe2fb221e272.jpg',1349,'带你变成白富美, 走上人生癫疯~~~'),
       ('a08b13e9-c16a-4657-94ee-3b9bee2bd9c6','我去你大爷',5000,'电子数码','http://image.supermarket.com/upload/4/a/d/8/8/c/4/0/236ac480-db3a-4e6b-bc7f-c379a30c2c2c_301fb535-938a-4103-a2f5-f3f9af9ba9c6.jpg',2545,'支持国产, 从你我做起!!!'),
       ('a515807d-507e-4567-95b9-907b892efe09','iPhone7Plus 3200G 黑色手机1',1000,'电子数码','http://image.supermarket.com/upload/5/2/3/4/7/8/d/c/1838eaa6-6459-420f-b8e2-6ea9f43c4b5e_dfd259ab-bcc7-43f6-a9d5-62872ff5671e.jpg',2550,'爱上爱疯, 你疯...我疯...大家一起疯....'),
       ('a7184417-5aa2-4de0-8237-a4c0f53972a1','三坑手机',5000,'电子数码','http://image.supermarket.com/upload/3/6/c/0/7/2/1/3/741c8c70-cdd1-43a9-8cde-aa6a787129ca_738f47e2-9605-46aa-b647-fc8dca814074.jpg',524,'三坑手机, 专业坑人三十年, 从未被超越...!!!'),
       ('a9abe239-2cb2-41ff-93b4-cb7794d9934d','阿斯蒂芬',12,'手机','http://image.supermarket.com//upload/9/e/f/2/7/2/0/e/f373c10c-1424-4fc9-827f-e3944f5c8479.jpg',123,'123'),
       ('b1f9c947-4f72-4245-b09d-8c5a8c311ae1','地中海7日游',5000,'日用百货','http://image.supermarket.com/upload/6/5/5/c/5/4/1/9/d437c381-59af-49ee-80c6-2b01e0b06105_1017530.jpg',2345,'放松身心，寻找艳遇'),
       ('bef7494b-06a8-42f8-8659-17f2c2c5c2df','兔子1',59,'家用电器','http://image.supermarket.com/upload/1/f/b/5/3/4/e/4/61a8cdff-52f7-4fce-bdb5-570426022082_preview.jpg',52,'我们的征途是星辰大海!'),
       ('bf45940e-ac72-454f-b67f-83dd288d11f9','反恐精英套装',10000,'服装服饰','http://image.supermarket.com/upload/1/4/2/e/7/3/6/4/09af74da-3829-45c5-9517-380d2cc74f6a_preview.jpg',644,'专业反恐服装，带你装x带你飞...biu~biu~biu~~'),
       ('c0e7b4f3-e1ad-47d6-8c0d-f1c58b820ca8','灵魂出体出窍术',1000,'电子数码','http://image.supermarket.com/upload/c/4/b/7/b/5/8/f/5adda796-66af-4c6e-a9e5-49a52a3c44a5_371cee6d-d81b-42b7-a11f-3ad36dc0e537.jpg',42,'30天学会灵魂出窍术, 如果学不会, 请登录我们的网站, 三打溜点不坑你坑谁点卡姆'),
       ('c2952779-e9e0-4eda-8e0a-41a61f1afc66','苍#null',998,'床上用品','http://image.supermarket.com/upload/e/d/b/1/f/0/6/7/bcff4ee1-cc7f-4b30-a29c-017f76a21bf8_1.jpg',874,'苍老师同款'),
       ('c2978733-5af8-473b-adbc-05073126164b','宠物猫',30000,'日用百货','http://image.supermarket.com/upload/3/5/5/4/c/3/a/b/943de853-0e1b-4d51-9524-991607024d3b_IMG_0928.JPG',245,'只有一只哦，快来抢购吧'),
       ('c71dda3c-421f-4198-8ff4-cd5f57230ec3','我的个天哪',123,'手机测试打手机','http://image.supermarket.com//upload/3/a/5/4/4/2/4/7/7bf1685d-4e32-429c-846b-66d8c28536f2.jpg',123,'12312312'),
       ('c766ec19-4645-4e6b-9ddf-73a0f4aa5f6c','脑残片',999,'日用百货','http://image.supermarket.com/upload/f/e/f/8/2/e/3/c/82c1698f-38a2-4340-9df7-83fadaefff4b_howardmouth.jpg',562,'脑残认识的福音, 脑残片雷人上市, 你...需要吗?'),
       ('cd116f32-74ff-47c5-8195-8d077cdcca25','机器人1',10000,'电子数码','http://image.supermarket.com/upload/9/f/f/a/1/6/d/0/49617712-4018-4c0e-9e7a-5ebc4ff79ad1_6f84843a-1d1e-49c7-b4ce-c035d7790171.jpg',654,'一款可以打印女朋友的打印机...程序员必备!!!'),
       ('d283359c-3e43-4655-bde4-4f834ec288df','banana111',11,'日用百货','http://image.supermarket.com/upload/e/5/0/9/c/7/6/0/60746822-144c-4e98-8aaa-fca07e142a63_banana.jpg',453,'国产大banana,好吃又好用'),
       ('d73ab7ed-9f78-4775-a93b-4d355b2d5fc0','死亡海体验套餐',4444,'日用百货','http://image.supermarket.com/upload/c/8/1/0/4/6/3/b/28139e28-7390-45a7-82c8-03e673486e60_Desert.jpg',624,'体验死亡的感觉，你值得拥有!'),
       ('d7f7cce4-b268-41a7-9429-21fa69b64159','爱眼滤蓝光LED背光液晶显示器',20000,'家用电器','http://image.supermarket.com/upload/1/8/e/9/b/2/7/2/95e01470-8e6f-40dc-a76b-087d804bb0cf_bae0a60a-521d-48ef-bea6-0854b89d7be0.jpg',424,'极致影院体验, 从这里开始~~~'),
       ('d8cb845e-37f6-4515-9fc1-dea07719ee06','防分手神器：大砖头',0,'日用百货','http://image.supermarket.com/upload/6/b/8/3/a/4/9/8/3fb77001-cd6c-4e4f-94a1-21a9c0563778_Hydrangeas.jpg',2345,'www.supermarket.com/你再说一个分手试试。。。。'),
       ('dad80f9d-4878-4f79-b2fb-f55d7c60bb9d','灵魂出体出窍术1',1000,'电子数码','http://image.supermarket.com/upload/c/4/b/7/b/5/8/f/5adda796-66af-4c6e-a9e5-49a52a3c44a5_371cee6d-d81b-42b7-a11f-3ad36dc0e537.jpg',42,'www.supermarket.com/30天学会灵魂出窍术, 如果学不会, 请登录我们的网站, 三打溜点不坑你坑谁点卡姆'),
       ('dbbe7d98-a5a2-4971-9493-cddecd3a2b55','脑残片1',999,'日用百货','http://image.supermarket.com/upload/f/e/f/8/2/e/3/c/82c1698f-38a2-4340-9df7-83fadaefff4b_howardmouth.jpg',562,'www.supermarket.com/脑残认识的福音, 脑残片雷人上市, 你...需要吗?'),
       ('dd135a52-3361-4a4f-ad68-79e5826152ab','地中海7日游1',5000,'日用百货','http://image.supermarket.com/upload/6/5/5/c/5/4/1/9/d437c381-59af-49ee-80c6-2b01e0b06105_1017530.jpg',2345,'www.supermarket.com/放松身心，寻找艳遇'),
       ('f8433d6d-4964-4ddc-a1d8-e50f6ccdf1d7','战神主机1',5888,'电子数码','http://image.supermarket.com/upload/b/4/1/b/d/9/8/8/e41cd642-2fc2-4cb2-b20a-f8a78405eee2_e9dd0d91-40c1-4db5-a888-244e825e9ce4.jpg',78,'www.supermarket.com/主机中的战斗机. 欧耶~~~~'),
       ('ff838641-feb5-42a1-b061-042b9113a95c','烈性炸药',5899,'电子数码','http://image.supermarket.com/upload/c/7/4/1/4/2/3/2/a99e691b-88d4-43a2-ac12-82ec54db123d_738f47e2-9605-46aa-b647-fc8dca814074.jpg',435,'www.supermarket.com/充电会自动引爆, 再也不用担心自杀shi不了了');


-- -------------------------------插入用户数据----------------------
insert  into `t_user`
    (`user_id`,`user_name`,`user_password`,`user_nickname`,`user_email`,`user_type`)
values
    ('f577f9f9-159e-4aaf-9332-fd7b294bc208','admin','123456','123','123@sdo.com',4);
update `t_user` set `user_password` = MD5(`user_password`);

-- ------------------------------插入购物车数据----------------------
insert into `t_cart`
(`product_id`, `product_image`, `product_name`, `product_price`)
select
    `product_id`, `product_imgurl`, `product_name`, `product_price`
from `t_product`
where `product_price` between 100 and 150;
update `t_cart`, `t_user`
set
`t_cart`.`user_id` = (select `user_id` from `t_user` where `user_name` = 'admin')
, `num` = 5;

-- -----------------------插入秒杀商品数据-------------------------
insert  into `instant_buy_item`
    (`item_id`,`name`,`number`,`initial_price`,`buy_price`,`sell_point`,`create_time`,`start_time`,`end_time`)
values
       ('b257a6f8-36d3-11eb-a3dc-dc7196467f25','oppo10',719,2000,1000,'1000元成功秒杀oppo10','2018-05-17 11:12:49','2019-05-09 13:13:49','2020-05-18 00:00:00'),
       ('d1d63d52-36d3-11eb-8b05-dc7196467f25','荣耀8',80,1800,800,'800元成功秒杀荣耀8','2018-01-21 22:08:49','2018-01-23 00:00:00','2018-01-24 00:00:00'),
       ('d937985c-36d3-11eb-9176-dc7196467f25','iPhone6',60,1600,600,'600元成功秒杀iPhone6','2018-01-21 22:08:49','2018-01-24 00:00:00','2018-01-25 00:00:00'),
       ('ea8bc04a-36d3-11eb-b916-dc7196467f25','小米4',40,1400,400,'400元成功秒杀小米4','2018-01-21 22:08:49','2018-01-25 00:00:00','2018-01-26 00:00:00'),
       ('f1fd27a8-36d3-11eb-99b3-dc7196467f25','vivo2',20,1200,200,'200元成功秒杀vivo2','2018-01-21 22:08:49','2018-01-26 00:00:00','2018-01-27 00:00:00'),
       ('f7b4da46-36d3-11eb-a824-dc7196467f25','魅族1',10,1000,100,'100元成功秒杀魅族1','2018-01-21 22:08:49','2018-01-27 00:00:00','2018-01-28 00:00:00');

