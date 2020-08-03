create database if not exists supermarket;
use supermarket;
create table user(
	id int primary key auto_increment,
	username varchar(100),
	password varchar(100),
	nickname varchar(100),
	email varchar(100)
);

insert into user values(null, 'admin', '123', '炒鸡管理员', 'admin@tedu.cn');
insert into user values(null, '张飞', '123', '管理员', 'admin@tedu.cn');