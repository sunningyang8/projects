--首页
-- 轮播图
DROP TABLE IF EXISTS `swipers`;
CREATE TABLE `swipers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `imgurl` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
insert  into `swipers`(`id`,`name`,`imgurl`) values 
(1,'零食','/assets/home-swiper/1.jpg'),
(2,'生活','/assets/home-swiper/2.jpg'),
(3,'科技','/assets/home-swiper/3.jpg'),
(4,'衣服','/assets/home-swiper/4.jpg');
-- 分类选择
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `imgurl` varchar(255) NOT NULL,
  `sort` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert  into `classify`(`id`,`name`,`imgurl`,`sort`) values
 (1,'新鲜水果','/assets/home-classify/01.png','1'),
 (2,'中外名酒','/assets/home-classify/02.png','2'),
 (3,'营养奶品','/assets/home-classify/03.png','3'),
 (4,'个人护理','/assets/home-classify/04.png','4'),
 (5,'食品饮料','/assets/home-classify/05.png','5');
-- 宫格组件
DROP TABLE IF EXISTS `nav`;
 
CREATE TABLE `nav` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `imgurl` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert  into `nav`(`id`,`name`,`imgurl`) values 
(1,'零食','/assets/home-nav/nav1.png'),
(2,'生活','/assets/home-nav/nav2.png'),
(3,'科技','/assets/home-nav/nav3.png'),
(4,'衣服','/assets/home-nav/nav4.png'),
(5,'食物','/assets/home-nav/nav5.png'),
(6,'加工','/assets/home-nav/nav6.png');
-- 推荐商品
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `imgurl` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `imageer` varchar(4000) NOT NULL,
  `price` varchar(255) NOT NULL,
  `newprice` varchar(255) NOT NULL,
  `num` varchar(255) NOT NULL,
  `nummax` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert  into `goods`(`id`,`name`,`imgurl`,`image`,`imageer`,`price`,`newprice`,`num`,`nummax`) values 
(1,'徐福记1250酥心糖桶600g/桶',
'http://images.baixingliangfan.cn/shopGoodsImg/20180213/20180213110054_6547.jpg',
'http://images.baixingliangfan.cn/compressedPic/20180213110054_6547.jpg',
'<img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110101_3479.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110101_7883.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110102_4338.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110102_9332.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110102_4779.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110102_2636.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110102_6703.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110102_2476.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110103_647.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110103_9999.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110103_2042.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110103_5857.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110103_4012.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180213/20180213110103_7879.jpg " width= "100% " height= "auto " alt= " " />',
'57.9','49.9','1','9999'),
(2,'星冰乐咖啡饮料原味281ml/瓶',
'http://images.baixingliangfan.cn/shopGoodsImg/20180223/20180223091446_6102.jpg',
'http://images.baixingliangfan.cn/compressedPic/20180223091446_6102.jpg',
'<img src="http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091457_6660.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091458_8116.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091500_4610.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091501_8421.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091502_7997.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091503_1558.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091503_8572.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091504_2734.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091506_7737.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091507_3009.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091507_4809.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091508_8675.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091512_7489.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091515_7386.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091519_9119.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091520_6290.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091520_7007.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180223/20180223091520_4332.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180103/20180103170634_4719.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180103/20180103170634_933.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180103/20180103170635_995.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180103/20180103170635_2478.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180103/20180103170635_2470.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180103/20180103170635_4488.jpg " width= "100% " height= "auto " alt= " " />',
'16.8','15.8','1','9999'),
(3,'统一100老坛酸菜五合一连包面121g*5/包',
'http://images.baixingliangfan.cn/shopGoodsImg/20180104/20180104172656_2548.jpg',
'http://images.baixingliangfan.cn/compressedPic/20180104172656_2548.jpg',
'<img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180104/20180104172704_485.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180104/20180104172705_5812.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180104/20180104172705_6561.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180104/20180104172705_2320.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180104/20180104172705_8126.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180104/20180104172705_87.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180104/20180104172705_663.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180104/20180104172706_4218.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180104/20180104172706_2838.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180104/20180104172706_6124.jpg " width= "100% " height= "auto " alt= " " />',
'13.5','11.9','1','99'),
(4,'心水天然水550ml/瓶',
'http://images.baixingliangfan.cn/shopGoodsImg/20180408/20180408170450_4878.jpg',
'http://images.baixingliangfan.cn/compressedPic/20180408170450_4878.jpg',
'<img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170459_7218.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170508_4846.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170508_3012.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170509_7443.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170510_1160.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170510_8740.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170511_5821.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170513_2115.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170513_125.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170514_5450.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170515_2714.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170515_2673.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170515_2056.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170516_1634.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170516_335.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408170517_8340.jpg " width= "100% " height= "auto " alt= " " />',
'2','1.9','1','9999'),
(5,'油菜480g-550g/盒',
'http://images.baixingliangfan.cn/shopGoodsImg/20171225/20171225173234_4985.jpg',
'http://images.baixingliangfan.cn/compressedPic/20171225173234_4985.jpg',
'<img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20171225/20171225173242_1555.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20171225/20171225173243_6385.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20171225/20171225173243_1848.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20171225/20171225173244_5201.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20171225/20171225173247_8004.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20171225/20171225173247_8310.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20171225/20171225173248_2677.jpg " width= "100% " height= "auto " alt= " " />',
'3.5','3','1','9999'),
(6,'蒜黄300g-320g/袋',
'http://images.baixingliangfan.cn/shopGoodsImg/20180102/20180102174141_3992.jpg',
'http://images.baixingliangfan.cn/compressedPic/20180102174141_3992.jpg',
'<img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180102/20180102174150_1200.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180102/20180102174151_7185.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180102/20180102174151_6186.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180102/20180102174154_8685.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180102/20180102174154_726.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180102/20180102174155_4545.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180102/20180102174155_2502.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180102/20180102174155_9490.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180102/20180102174156_2498.jpg " width= "100% " height= "auto " alt= " " />',
'3.8','3','1','9999'),
(7,'2080活力40+护龈牙膏110g/支',
'http://images.baixingliangfan.cn/shopGoodsImg/20180411/20180411082653_1305.jpg',
'http://images.baixingliangfan.cn/compressedPic/20180411082653_1305.jpg',
'<img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082700_5680.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082700_2707.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082700_7584.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082700_2026.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082700_1086.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082701_1739.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082701_8552.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082701_3103.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082701_6957.jpg " width= "100% " height= "auto " alt= " " />',
'26','25','1','9999'),
(8,'屈臣氏听装苏打水330ml/罐',
'http://images.baixingliangfan.cn/shopGoodsImg/20171222/20171222173911_6384.jpg',
'http://images.baixingliangfan.cn/compressedPic/20171222173911_6384.jpg',
'<img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20171222/20171222173920_7741.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20171222/20171222173920_2005.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20171222/20171222173921_6868.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20171222/20171222173921_1964.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20171222/20171222173921_6437.jpg " width= "100% " height= "auto " alt= " " />',
'5','3.6','1','9999'),
(9,'正林3A西瓜子1.2kg/桶',
'http://images.baixingliangfan.cn/shopGoodsImg/20180212/20180212145741_5638.jpg',
'http://images.baixingliangfan.cn/compressedPic/20180212145741_5638.jpg',
'<img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180212/20180212145749_7972.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180212/20180212145749_3105.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180212/20180212145750_864.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180212/20180212145750_1588.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180212/20180212145750_1678.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180212/20180212145750_7676.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180212/20180212145751_6881.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180212/20180212145751_8725.jpg " width= "100% " height= "auto " alt= " " />',
'77.8','68','1','9999'),
(10,'农夫山泉维他命柑桔营养素500ml/瓶',
'http://images.baixingliangfan.cn/shopGoodsImg/20180412/20180412174400_8577.jpg',
'http://images.baixingliangfan.cn/compressedPic/20180412174400_8577.jpg',
'<img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180412/20180412174409_1742.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180412/20180412174409_500.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180412/20180412174410_9320.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180412/20180412174410_1427.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180412/20180412174410_6986.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180412/20180412174412_9564.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180412/20180412174412_2806.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180412/20180412174413_3273.jpg " width= "100% " height= "auto " alt= " " />',
'3.8','3.7','1','9999'),
(11,'2080贡白秘方牙膏100g/支',
'http://images.baixingliangfan.cn/shopGoodsImg/20180411/20180411082738_6249.jpg',
'http://images.baixingliangfan.cn/compressedPic/20180411082738_6249.jpg',
'<img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082747_6182.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082747_5431.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082747_54.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082748_5362.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082748_3550.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082748_6289.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082748_319.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082748_2090.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082748_2233.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082748_9323.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082749_57.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180411/20180411082749_716.jpg " width= "100% " height= "auto " alt= " " />',
'3.8','3.7','1','9999'),
(12,'红牛维生素饮料250ml/罐',
'http://images.baixingliangfan.cn/shopGoodsImg/20180103/20180103171914_4025.jpg',
'http://images.baixingliangfan.cn/compressedPic/20180411082738_6249.jpg',
'<img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180103/20180103171922_6623.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180103/20180103171922_5350.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180103/20180103171922_304.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180103/20180103171922_5108.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180103/20180103171923_6579.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180103/20180103171923_557.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180103/20180103171923_9845.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180103/20180103171923_1081.jpg " width= "100% " height= "auto " alt= " " />',
'3.8','3.7','1','9999'),
(13,'吕滋养韧发密集莹韧洗发水 - 清爽型400g/瓶',
'http://images.baixingliangfan.cn/shopGoodsImg/20180409/20180409160034_4230.jpg',
'http://images.baixingliangfan.cn/compressedPic/20180409160034_4230.jpg',
'<img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180409/20180409160041_5948.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180409/20180409160041_989.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180409/20180409160042_3866.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180409/20180409160042_6617.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180409/20180409160042_8632.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180409/20180409160042_9975.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180409/20180409160042_8358.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180409/20180409160043_8180.jpg " width= "100% " height= "auto " alt= " " />',
'98','97','1','9999'),
(14,'新希望（天香）活润草莓桑葚果粒风味酸牛奶340g/杯',
'http://images.baixingliangfan.cn/shopGoodsImg/20180408/20180408162323_88.jpg',
'http://images.baixingliangfan.cn/compressedPic/20180408162323_88.jpg',
'<img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162332_828.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162332_1633.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162333_2750.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162333_5911.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162333_1579.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162334_7580.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162334_7066.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162334_3381.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162335_3579.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162335_709.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162335_9835.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162335_9539.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162335_5501.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162335_3219.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162335_7016.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162335_879.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162336_8128.jpg " width= "100% " height= "auto " alt= " " /><img src= "http://images.baixingliangfan.cn/shopGoodsDetailImg/20180408/20180408162336_4714.jpg " width= "100% " height= "auto " alt= " " />',
'10.9','10.8','1','9999');
-- 分类
  -- 一级分类
DROP TABLE IF EXISTS `topCategory`;
CREATE TABLE `topCategory` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert  into `topCategory`(`id`,`name`) values
(1,'新鲜水果'),
(2,'中外名酒'),
(3,'营养奶品'),
(4,'个人护理'),
(5,'食品饮料');

  -- 二级分类
  CREATE TABLE `reclassify` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `imag` varchar(4000) NOT NULL,
  `chtic` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert  into `reclassify`(`id`,`name`,`chtic`,`imag`) values
(1,'热带水果','http://images.baixingliangfan.cn/compressedPic/20180410100440_8795.jpg','1'),
(2,'时令水果','http://images.baixingliangfan.cn/compressedPic/20171225105934_2811.jpg','1'),
(3,'苹果梨','http://images.baixingliangfan.cn/compressedPic/20171226162234_480.jpg','1'),
(4,'柑橘橙柚','http://images.baixingliangfan.cn/compressedPic/20180211172640_4810.jpg','1'),
(5,'白酒','http://images.baixingliangfan.cn/compressedPic/20180213153630_5361.jpg','2'),
(6,'洋酒','http://images.baixingliangfan.cn/compressedPic/20171229113630_4250.jpg','2'),
(7,'海外直采','http://images.baixingliangfan.cn/compressedPic/20171226170505_9627.jpg','2'),
(8,'葡萄酒','http://images.baixingliangfan.cn/compressedPic/20180213152349_7716.jpg','2'),
(9,'啤酒','http://images.baixingliangfan.cn/compressedPic/20180213153048_4607.jpg','2'),
(10,'奶酪奶油','http://images.baixingliangfan.cn/compressedPic/20180212145636_9050.jpg','3'),
(11,'鲜奶','http://images.baixingliangfan.cn/compressedPic/20180408162534_5662.jpg','3'),
(12,'酸奶','http://images.baixingliangfan.cn/compressedPic/20180102162335_8552.jpg','3'),
(13,'乳酸菌','http://images.baixingliangfan.cn/compressedPic/20171220092122_2804.jpg','3'),
(14,'进口护理','http://images.baixingliangfan.cn/compressedPic/20180408175830_6709.jpg','4'),
(15,'口腔护理','http://images.baixingliangfan.cn/compressedPic/20180408180242_5036.jpg','4'),
(16,'特殊用纸','http://images.baixingliangfan.cn/compressedPic/20180411084046_8644.jpg','4'),
(17,'咖啡茶饮','http://images.baixingliangfan.cn/compressedPic/20180412175134_4277.jpg','5'),
(18,'功能饮料','http://images.baixingliangfan.cn/compressedPic/20171222181028_9188.jpg','5'),
(19,'饼干糕点','http://images.baixingliangfan.cn/compressedPic/20180410113702_7772.jpg','5'),
(20,'冲调饮品','http://images.baixingliangfan.cn/compressedPic/20171229140329_9076.jpg','5'),
(21,'进口食品','http://images.baixingliangfan.cn/compressedPic/20180208150829_5964.jpg','5'),
(22,'坚果炒货','http://images.baixingliangfan.cn/compressedPic/20180213105558_6112.jpg','5'),
(23,'休闲小食','http://images.baixingliangfan.cn/compressedPic/20180104172320_7603.jpg','5'),
(24,'糖果巧克力','http://images.baixingliangfan.cn/compressedPic/20180212145352_8179.jpg','5'),
(25,'饮用水','http://images.baixingliangfan.cn/compressedPic/20180408165216_2938.jpg','5'),
(26,'碳酸饮料','http://images.baixingliangfan.cn/compressedPic/20180103170145_9054.jpg','5'),
(27,'乳制饮料','http://images.baixingliangfan.cn/compressedPic/20180415120109_275.jpg','5'),
(28,'果蔬汁','http://images.baixingliangfan.cn/compressedPic/20171224081238_2835.jpg','5');
 
-- 用户列表
   DROP TABLE IF EXISTS `users`;
   CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL, 
  `password` varchar(100) DEFAULT NULL,
  `mobile` char(11) DEFAULT NULL,
  `smscode` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

-- 新增配送地址-- 用户商品列表
DROP TABLE IF EXISTS `uersgoods`;
CREATE TABLE `uersgoods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usersId` varchar(255) DEFAULT NULL,
  `goodsId` varchar(255) DEFAULT NULL,
  `num` varchar(255) DEFAULT NULL,
  `goodsName` varchar(255) DEFAULT NULL,
  `goodsPrice` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `addressDetail` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `county` varchar(255) DEFAULT NULL,
  `areaCode` varchar(255) DEFAULT NULL,
  `isDefault` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
-- 用户配送地址
DROP TABLE IF EXISTS `servesaddres`;
CREATE TABLE `servesaddres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usersId` varchar(255) DEFAULT NULL,
  `goodsId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `addressDetail` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `county` varchar(255) DEFAULT NULL,
  `areaCode` varchar(255) DEFAULT NULL,
  `isDefault` BOOLEAN,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
-- Purchased已购买的商品
DROP TABLE IF EXISTS `purchased`;
CREATE TABLE `servesaddres` (
  `id` int(11) NOT NULL,
  `usersId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `addressDetail` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `county` varchar(255) DEFAULT NULL,
  `areaCode` varchar(255) DEFAULT NULL,
  `isDefault` BOOLEAN,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
