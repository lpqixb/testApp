<?php

require_once IA_ROOT."/pay/wxpay.php";

$value = floatval($_POST['value']);
$username = trim($_POST['username']);
$mobile = trim($_POST['mobile']);
$openid = trim($_POST['openid']);
$uid = intval($_POST['uid']);

$time = time();
$trade_no = "wx_".$mobile.$time.rand(1000,9999);

$input['SetBody'] = $username."-打赏".$value."元";
$input['SetOut_trade_no'] = $trade_no;
$input['SetTotal_fee'] = $value*100;
$input['SetOpenid'] = $openid;
$input['appid'] = APPID;
$input['mchid'] = MCHID;
$input['key'] = PAYSIGNKEY;

$input['attach'] = $uid;

$tools = new WxPay();
$tools->set_notify_url("https://".$_SERVER["SERVER_NAME"]."/test_app/pay/notify.php");
$order = $tools->unifiedOrder($input);


$jsApiParameters = $tools->GetJsApiParameters($order,PAYSIGNKEY);

echo $jsApiParameters;
return;

?>