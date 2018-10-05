<?php

$code = $_POST['code'];

$url="https://api.weixin.qq.com/sns/jscode2session?appid=".APPID."&secret=".SECRET."&js_code=".$code."&grant_type=authorization_code";

$rs = curl_get($url);
$rs = json_decode($rs,true);
$openid = $rs['openid'];
$session_key = $rs['session_key'];
$userInfo = json_decode($_POST['userInfo'],true);
$ip = getIPaddress();



$wxuser = $db->getLine("select * from test_webapp_user where openid='{$openid}'");



if(empty($wxuser)){
    $sql = "insert into test_webapp_user(openid,session_key,nickName,gender,city,province,country,avatarUrl,create_time) values('{$openid}','{$session_key}','{$userInfo['nickName']}','{$userInfo['gender']}','{$userInfo['city']}','{$userInfo['province']}','{$userInfo['country']}','{$userInfo['avatarUrl']}',NOW())";
    $db->runSql($sql);
    $lastWxId = $db->lastId();
    $name="webapp".rand(1000,9999);
    $sql = "insert into test_exuser(username,ip,create_time) values('{$name}','{$ip}',NOW())";
    $db->runSql($sql);
    $user_id = $db->lastId();
    $sql="update test_webapp_user set uid={$user_id} where id={$lastWxId}";
    $db->runSql($sql);

}else{
    $user_id = $wxuser['uid'];
    if($wxuser['session_key'] != $session_key){
        $sql="update test_webapp_user set session_key='{$session_key}' where id={$wxuser['id']}";
        $db->runSql($sql);
    }

}

$mobile = $db->getVar("select mobile from test_exuser where id='{$user_id}'");
if(empty($mobile)){
    $hasMobile = false;
}else{
    $hasMobile = true;
}


$arr=array();
$arr['result'] = true;
$arr['mobile'] = $mobile;
$arr['hasMobile'] = $hasMobile;
$arr['user_id'] = $user_id;
$arr['openid'] = $openid;
$arr['session_key'] = $session_key;

echo json_encode($arr);
return;
?>