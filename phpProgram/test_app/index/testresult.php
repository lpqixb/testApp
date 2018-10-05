<?php

$date = $_POST['date'];
$dateArr = explode("-",$date);
$yige = yige_constellation($dateArr[1], $dateArr[2]);

$yigeArr = array("水瓶座"=>"icon-ziyuan9","双鱼座"=>"icon-ziyuan8","白羊座"=>"icon-ziyuan10","金牛座"=>"icon-ziyuan6","双子座"=>"icon-ziyuan7","巨蟹座"=>"icon-ziyuan","狮子座"=>"icon-xingzuoshizizuo","处女座"=>"icon-ziyuan2","天秤座"=>"icon-ziyuan1","天蝎座"=>"icon-ziyuan4","射手座"=>"icon-ziyuan3","摩羯座"=>"icon-ziyuan5");

$sql = "select xname,xdesc from test_xingzhuo where xname='{$yige}'";
$result = $db->getLine($sql);

$arr = array();
$arr['result'] = true;
$arr['code'] = 200;
$arr['xname'] = $result['xname'];
$arr['xdesc'] = $result['xdesc'];
$arr['xlogo'] = $yigeArr[$yige];
echo json_encode($arr);
return;

?>