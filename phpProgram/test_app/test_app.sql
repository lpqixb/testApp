-- phpMyAdmin SQL Dump
-- version 4.1.8
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2018-10-06 13:37:46
-- 服务器版本： 5.6.21-log
-- PHP Version: 5.5.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `test_app`
--

-- --------------------------------------------------------

--
-- 表的结构 `test_exuser`
--

CREATE TABLE IF NOT EXISTS `test_exuser` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) DEFAULT NULL,
  `mobile` varchar(32) DEFAULT '0',
  `test_count` int(11) DEFAULT '0',
  `ip` varchar(32) DEFAULT NULL,
  `create_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `update_time` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `test_exuser`
--

INSERT INTO `test_exuser` (`id`, `username`, `mobile`, `test_count`, `ip`, `create_time`, `update_time`) VALUES
(4, 'webapp6493', '0', 0, '58.247.206.141', '2018-10-05 05:18:09', '0000-00-00 00:00:00'),
(5, 'webapp6321', '0', 0, '223.166.222.108', '2018-10-05 05:24:58', '0000-00-00 00:00:00'),
(6, 'webapp6430', '13726299212', 0, '223.104.63.134', '2018-10-05 10:15:39', '0000-00-00 00:00:00'),
(7, 'webapp4152', '18933219546', 0, '119.132.19.117', '2018-10-05 11:56:30', '0000-00-00 00:00:00'),
(8, 'webapp9811', '13726253273', 0, '117.136.79.89', '2018-10-05 12:19:31', '0000-00-00 00:00:00'),
(9, 'webapp8123', '13726231150', 0, '117.136.79.242', '2018-10-05 12:19:49', '0000-00-00 00:00:00'),
(10, 'webapp9462', '13798967970', 0, '117.136.79.245', '2018-10-06 00:46:27', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `test_pay`
--

CREATE TABLE IF NOT EXISTS `test_pay` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT '0',
  `money` decimal(10,2) DEFAULT '0.00',
  `create_time` datetime DEFAULT '0000-00-00 00:00:00',
  `out_trade_no` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `test_pay`
--

INSERT INTO `test_pay` (`id`, `uid`, `money`, `create_time`, `out_trade_no`) VALUES
(1, 3, '0.01', '2018-10-05 04:37:40', 'wx_1379896797015386833977971'),
(2, 3, '0.01', '2018-10-05 04:38:31', 'wx_1379896797015386855015285'),
(3, 9, '0.01', '2018-10-05 12:21:27', 'wx_1372623115015387132799062');

-- --------------------------------------------------------

--
-- 表的结构 `test_webapp_user`
--

CREATE TABLE IF NOT EXISTS `test_webapp_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT '0',
  `nickName` varchar(32) DEFAULT NULL,
  `gender` tinyint(2) DEFAULT '0',
  `openid` varchar(128) NOT NULL,
  `session_key` varchar(128) NOT NULL,
  `city` varchar(128) DEFAULT NULL,
  `province` varchar(128) DEFAULT NULL,
  `country` varchar(128) DEFAULT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `test_webapp_user_openid_uindex` (`openid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- 转存表中的数据 `test_webapp_user`
--

INSERT INTO `test_webapp_user` (`id`, `uid`, `nickName`, `gender`, `openid`, `session_key`, `city`, `province`, `country`, `avatarUrl`, `create_time`) VALUES
(5, 4, '林冲', 0, 'obi7i5DTom1QfvAVJG-w-wL__jC4', '/sxUZUuW40NmsURk3sAKBw==', '', '', '', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIZrgz3RZ89YcvvqAqFCX6ToWicPYWth4vlnROAyl1PTvOIaujkhSouQT9joQ4A1vFibdG13wJ5BhyQ/132', '2018-10-05 05:18:09'),
(6, 5, '卢俊义', 0, 'obi7i5PjGsTI8tqUiMvU4G2mooIw', '4/yZnzYQ1p/i6elfePvHhw==', '', '', '', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJpuVY3JXdl1pol934drBKWHUaRf4xHK2y1EiaicbZib1jJ69p3aSmCLar1xYt7LRzxRe6icqdsOEm5hA/132', '2018-10-05 05:24:58'),
(7, 6, '', 2, 'obi7i5Gw_46zEjG64pVNNFs3EcgQ', 'bD3/MM8w6Afaw0bz4m9dNA==', 'Zhuhai', 'Guangdong', 'China', 'https://wx.qlogo.cn/mmopen/vi_32/eibgQT4H2ibgCRkZZRNEa6uCGxGGjFrxduxMyaHaTwWlUs62PRkDlicLGpN8YpmY9VFCQL1xLcpOeXuItmNbQBfiaw/132', '2018-10-05 10:15:39'),
(8, 7, '刘进', 1, 'obi7i5BlDTvj9SmTvZ0gmYevYgTE', 'MlrANMGaUx26LOX2lsmI9g==', 'Zhuhai', 'Guangdong', 'China', 'https://wx.qlogo.cn/mmopen/vi_32/XWRmCUumjsHC1CIvZbRoqGkxvdTM8rAIkFV8xBGT8CdrJCE2F0nzCRGib7x5HZaZEuODEyP64iaibl7ib8GPg4LicEA/132', '2018-10-05 11:56:30'),
(9, 8, 'A_RockLee ', 1, 'obi7i5L-HDWV5KvPMXN6WNMw8DRs', 'H2/KP/jIdGG06Y/Dp29GoQ==', 'Zhuhai', 'Guangdong', 'China', 'https://wx.qlogo.cn/mmopen/vi_32/XUGnFkmCKQcDaKsCBqqVT0osRyyTRdo7tPABSxXantTewLxFDb4vYmKDbJ1LLuckU52sicoRianDPUVZTkMu73rQ/132', '2018-10-05 12:19:31'),
(10, 9, 'VIEN', 2, 'obi7i5GL9BG64Akbk3mTrHqh4Vsk', 'LNYdspE6K3z6VTdqQIBx+Q==', 'Qiqihar', 'Heilongjiang', 'China', 'https://wx.qlogo.cn/mmopen/vi_32/WaicKLsgQH8YToiaWVI0KcFqCvOtmsPM7BtlXVJGsZTbVMGvrGuicWJXeToVn5xVEnBRYCtU83RzibbfHuYcHiaqJhA/132', '2018-10-05 12:19:49'),
(11, 10, '[太阳]Alfred', 1, 'obi7i5ENkqY2YdSqN5EQ5N1sWE0c', 'fckyiCTLQIrm0wQr1YrhLA==', 'Zhuhai', 'Guangdong', 'China', 'https://wx.qlogo.cn/mmopen/vi_32/SBFV2rTS2nhqzCibje7hAeL3jYGceAXMoxUtjMGC9ic5mDpxJxby5pJKorOQ8aOibGOnBDNeEan4OvbN5CGfKU0gg/132', '2018-10-06 00:46:27');

-- --------------------------------------------------------

--
-- 表的结构 `test_xingzhuo`
--

CREATE TABLE IF NOT EXISTS `test_xingzhuo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `xname` varchar(32) DEFAULT NULL,
  `xdesc` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- 转存表中的数据 `test_xingzhuo`
--

INSERT INTO `test_xingzhuo` (`id`, `xname`, `xdesc`) VALUES
(1, '水瓶座', '水瓶座在4到9号的事业压力都非常大，你在事业方面需要处理的事情有很多，其实你应该调整心态，努力做好应该做的事情，当然在短期内并非有很多人都能够理解你的想法，支持你的工作，可你仍然需要以良好的心态应对，在感情方面水瓶座和心爱的人分分合合的事情时有发生，其实水瓶座也知道在这个过程当中如何能够讨得对方的欢心，但你却没有选择合适的方式，水瓶座在1到4号会跟要好的朋友有绯闻的产生呢，其实你和朋友之间并没有太多就合的事，但却没有选择合适的方式处理你们的关系，因此人际关系会导致你的情绪失控。水瓶座的国庆节过得并不是很开心，主要原因在于你没有好的人缘，在这几天里麻烦事百出，其实也是你不愿看到的吧。'),
(2, '双鱼座', '双鱼座在国庆节的这几天里，整体运势都偏向于上升的状态，尤其是1到3号双鱼座的桃花运可是相当不错的，这段时间双鱼座是很适合见老友，或者是在这几天里尝试一下各种各样不同的约会吧，相信你的桃花运会收获几多。只是在感情的状态，虽然你抱有期待，但也需要分清你和对方的关系就是如何，可不要贸然行动，在这几天里双鱼座的你越是主动，你在感情当中收获的东西反而越少。双鱼座的心态一定要放平稳，否则即便是你有机会能够收获更多的财富，但这几天里你也会因个人情绪的关系而造成你财运上的流失，双鱼座在4到8号，整体的事业压力都比较大，能给你带来财运自然是好的，但有些事情是你必须自己注意的。'),
(3, '白羊座', '白羊座在国庆节的2到4号运气还是很不错的，在这几天你若是你想出行，不管是旅游还是短途旅行都是很好的选择，只是白羊座在身体状况上也有待提高的，你的身体状况一直都处于不平稳的状态。那你出去玩也不会很开心的，因此如何能够将状态调整得更好并签了。全身心的投入一件事情，这才是关键，白羊座在事业方面会有好运，尤其是你的贵人运不错，在关键点总会有别人帮助你。1到7号白羊座的异性缘还是很不错的，只是在面对感情时，白羊座的被动更能够换得爱情的优势。你越是主动反倒是在感情方面，你和对方的关系不够融洽。每个人都会有对感情不同的感觉，但你需要做好的是能够让对方接受你。要选择他喜欢的方式。'),
(4, '金牛座', '金牛座在国庆节的这几天里身体状况还是很不错的，尤其是1到6号金牛座想要减肥的话是很棒的选择哦，即便是时间比较短，但金牛座仍然是可以达到好的减肥效果，除了你个人努力之外，很关键的一点是你在减肥方面制定合理的计划，也一直都坚持着，当然金牛座也需找一个朋友或者异性一起陪伴减肥，金牛座的人是很喜欢吃美食的，好吃的东西有很多，但身体只有一个，你每次都是忍不住想吃东西，可其实少吃一口，你的身体会好的很多的。金牛座在2到9号的，整体运气都还不错，只是想要减肥的话就不做，这段时间还需要再做些其他的事情。金牛座在2到7号的桃花运有些多呢，但你想要和别人更近一步，其实并不那么容易。'),
(5, '双子座', '双子座在3到6号的事业运还是很不错的，尤其是在事业方面帮助你的人非常多。但是上厕所的人个人能力有待于提高，很多时候你依赖于别人的努力并不能获得你想要的，再加上双子座事业方面一直都处于随遇而安的心态，这是一件好事，说明你能够以良好的态度对待明天，但这同样也是一件坏事。你总是依赖于别人的力量，却没有想要自己成为一个强者，其实双子座的人也是在历练中成长的，在职场中邂逅了几次竞争之后，你就会知道什么样的人值得你信任，什么样的人仅仅是泛泛而交，但年轻的双子座总以为自己掌握了生存规律，就可以轻而易举的赢得别人的欢心。没有别人的帮助，你仍然可以到达事业的巅峰，这是你一种本事所在。'),
(6, '巨蟹座', '虽然是巨蟹座在遇到压力时能够以良好的心态应对，但有些时候独自去面对的也是让你感觉有些困难的，其实每个人在面对压力时难免都会有不开心的事情，但你一定要放平衡。感情方面遇到的麻烦是这几天里你不得不处理的，巨蟹座在爱情上的打击都藏在心底，你需要主动跟别人沟通，有很多事情并不像你想的那样。巨蟹座所要承受的压力，多半来自于你在感情当中所没有沟通的，4到10号你越是主动一点，你和恋人的关系才会更完善，可如果你一直都选择以被动的方式，你们的关系又如何会好呢？当然你的小心思也是很容易被人发现的，只是在于这个人是否真的能够了解你对感情的追求和看法，若是你一门心思只在于自己的感受，却没有考虑到别人的想法，那最终受伤害的只能是自己。'),
(7, '狮子座', '狮子座在2到7号的身体状况都不是太好，即便是你想要出去行走，但你的整体身体状况不允许你做太大范围的动作，那你的运气也并不属于好的呢，狮子座的人想要彻底放松自我的方式有很多，但并不仅仅是通过玩，尤其是国庆节这几天出去玩，怕是对你的工作或者是个人生活，都有些负面的影响。不妨考虑去健身房或者去图书馆找几本喜欢的书，做点喜欢的事，相信你的运气也会好很多。狮子座在国庆节的这几天，整体的好运都来自于你情绪上的放纵，没错，你若是一门心思想要在物质方面寻求开心的话这很难，但如果你希望能通过精神层次的放松已获得开心的话，是很棒的选择呢。或是在短短时间内考虑一下骑行骑单车在旅游城市走走，也算是好的！这一周内狮子座都需要注意身体状况的哦'),
(8, '处女座', '处女座在国庆节的这几天里，所面对的压力主要来自于你和别人的沟通，处女座在1到7号的人际关系都不是太好，尤其是和别人沟通的细节方面，你所得到的麻烦事是你很难处理的，纵然是你希望能够跟别人建立起良好的互动关系，但最终你也是难以得到群体对你的认可，不管是在团队当中，你的工作能力不是很强，还是在和别人工作交接的过程中，你没有表现出自己全部的实力。处女座这段时间是典型的处理不讨好，你在朋友或者恋人的身上都花费了不少。但是金钱并不能换来你们感情上的幸福，反倒是彼此的生活出了些许问题，10月初处女座的沟通能力有待提高了。'),
(9, '天秤座', '天秤座在10月3到5号的事业运都不错，财运主要来自于朋友对你的帮衬，而你也相信朋友对你的影响，最终会给你带来好运，只是并非所有时候听从朋友的意见，你的运气就会好起来的。有些时候坚持自己的态度和观点是正确的，太过在意别人的说法，看法只能导致你在这段时间里事业越来越糟糕，相应的你个人的运气会下降的非常快，天秤座在这段时间里的整体状态都需要调整一下，尤其是你在跟别人交涉的过程中拿出的诚意越多，你们的关系才会越好。天秤座的心态摆正的同时，也应该考虑好你在事业方面如何能换得更多的酬劳。努力是一定要有回报的，否则你的努力又如何算得上是值得珍惜的呢'),
(10, '天蝎座', '天蝎座在国庆节的1到7号，整体压力都会比较大，其实你也知道如何能够提升个人素质。天蝎座在国庆节的这几天里想要放松玩一把怕是一件很难的事情，毕竟在这段时间里你需要担心的事情有很多，加之你本人的状态也不是很好，还不如想想如何能够做些其他的事情缓解压力，想出去旅行其实也蛮棒的选择，只是到最后天蝎座的人发现不怎么适合自己吧，在这段时间天蝎座是的确没有出去玩的特质。天蝎座在2到5号工作方面的麻烦事会多一些，尤其是从事财务类型工作的天蝎座，你需要面对的工作压力会让你有些目不暇接，其实你也希望能以什么方式走出你当下的心态误区，但天蝎座的人的确是在10月初麻烦事多一些，你面临的事情会让你有些心态崩溃了。'),
(11, '射手座', '射手座在国庆节的这几天里压力是非常大的，不管是工作方面的压力还是流言蜚语，似乎你所面对的人际关系比较复杂。射手座在桃花运上还是有需要亟待提高的地方。其实你的桃花运也是因个人努力而获得的，因此在你喜欢一个人时一定要足够主动，否则你们的故事就难有明天了，射手座在面对感情时需要以调侃的方式试探一下对方的心思，再做下一步的打算，若是对方并没有想要和你谈恋爱的倾向，而你却主动暴露了自己，你们的感情有时候会有明天呢。射手座在3到7号，整体运势都还不错，看得出这段时间里你需要调整心态，自信一点，你所能完成的事情也会更多。当然射手座的身体状况在这几天里也有待提高，整体的身体状况都不是太好了。'),
(12, '摩羯座', '摩羯座在国庆节的这几天里桃花运不错，只是你在跟对方相处的过程中并没有找到你想要的感觉，若是你真的不喜欢早一点退出你们的关系是好的，只是在摩羯座拒绝对方的过程中，一定要选择一个合适的理由合适的方式，否则即便是你想脱开身，但对方觉得你并不是那么可靠的，连朋友都做不成了，在2到5号摩羯座的出行运不是太好，若是摩羯座已经安排好了想要旅游，那你一定要再好好想想了。即便是你已经做好了充分的准备，但并不一定到你出行的时候还是那么顺利的。摩羯座在3到7号整体的运势都还不错，可是你的出行运会导致你的情绪压力非常大，或许应该选择一种合适的方式释放一下自己的压力了。');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
