<?php
header("Content-type: text/html;charset=utf8");
date_default_timezone_set('PRC');
error_reporting(0);
define('IA_ROOT', str_replace("\\",'/', dirname(dirname(__FILE__))));
require_once IA_ROOT."/config.inc.php";
require_once IA_ROOT."/function.php";
require_once IA_ROOT."/saeMysql.php";
require_once IA_ROOT."/pay/wxpay.php";



$xml = $GLOBALS['HTTP_RAW_POST_DATA'];

//$xml = '
//<xml>
//   <appid>wx2421b1c4370ec43b</appid>
//   <attach>支付测试</attach>
//   <body>JSAPI支付测试</body>
//   <mch_id>10000100</mch_id>
//   <detail><![CDATA[{ "goods_detail":[ { "goods_id":"iphone6s_16G", "wxpay_goods_id":"1001", "goods_name":"iPhone6s 16G", "quantity":1, "price":528800, "goods_category":"123456", "body":"苹果手机" }, { "goods_id":"iphone6s_32G", "wxpay_goods_id":"1002", "goods_name":"iPhone6s 32G", "quantity":1, "price":608800, "goods_category":"123789", "body":"苹果手机" } ] }]]></detail>
//   <nonce_str>1add1a30ac87aa2db72f57a2375d8fec</nonce_str>
//   <notify_url>http://wxpay.wxutil.com/pub_v2/pay/notify.v2.php</notify_url>
//   <openid>oUpF8uMuAJO_M2pxb1Q9zNjWeS6o</openid>
//   <out_trade_no>1415659990</out_trade_no>
//   <spbill_create_ip>14.23.150.211</spbill_create_ip>
//   <total_fee>1</total_fee>
//   <trade_type>JSAPI</trade_type>
//   <sign>0CB01533B8C1EF103065174F50BCA001</sign>
//</xml>
//';

if(empty($xml)){
    exit();
}



$tools = new WxPay();

$xml2 = str_replace("<![CDATA[","",$xml);
$xml2 = str_replace("]]>","",$xml2);
$arr = $tools->FromXml($xml2);

logging($arr,"微信支付成功");

$db = new saeMysql();

$out_trade_no = $arr['out_trade_no'];
$total_fee = $arr['total_fee']/100;
$attach = $arr['attach'];

$sql="insert into test_pay(uid,money,out_trade_no,create_time) values('".$attach."','".$total_fee."','".$out_trade_no."',NOW())";
$db->runSql($sql);


$val['return_code']="SUCCESS";
$val['return_msg']="OK";
$tomxl = $tools->ToXml($val);
$db->closeDb();
echo $tomxl;

?>
