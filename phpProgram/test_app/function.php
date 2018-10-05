<?php

function logging($message = '',$title = 'info') {
    $filename = IA_ROOT."/logs/".date('Ymd') . '.log';
    mkdir(dirname($filename),0777,true);
    $content = date('Y-m-d H:i:s') . " {$title} :\n------------\n";
    if(is_string($message)) {
        $content .= "String:\n{$message}\n";
    }
    if(is_array($message)) {
        $content .= "Array:\n";
        foreach($message as $key => $value) {
            $content .= sprintf("%s : %s ;\n", $key, $value);
        }
    }
    if($message == 'get') {
        $content .= "GET:\n";
        foreach($_GET as $key => $value) {
            $content .= sprintf("%s : %s ;\n", $key, $value);
        }
    }
    if($message == 'post') {
        $content .= "POST:\n";
        foreach($_POST as $key => $value) {
            $content .= sprintf("%s : %s ;\n", $key, $value);
        }
    }
    $content .= "\n";
    $fp = fopen($filename, 'a+');
    fwrite($fp, $content);
    fclose($fp);

}
function yige_constellation($month, $day) {
    // 检查参数有效性
    if ($month < 1 || $month > 12 || $day < 1 || $day > 31) return false;

    // 星座名称以及开始日期
    $constellations = array(
        array( "20" => "水瓶座"),
        array( "19" => "双鱼座"),
        array( "21" => "白羊座"),
        array( "20" => "金牛座"),
        array( "21" => "双子座"),
        array( "22" => "巨蟹座"),
        array( "23" => "狮子座"),
        array( "23" => "处女座"),
        array( "23" => "天秤座"),
        array( "24" => "天蝎座"),
        array( "22" => "射手座"),
        array( "22" => "摩羯座")
    );

    list($constellation_start, $constellation_name) = each($constellations[(int)$month-1]);

    if ($day < $constellation_start) list($constellation_start, $constellation_name) = each($constellations[($month -2 < 0) ? $month = 11: $month -= 2]);

    return $constellation_name;

}

function getIPaddress(){
    $IPaddress='';
    if (isset($_SERVER)){
        if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])){
            $IPaddress = $_SERVER["HTTP_X_FORWARDED_FOR"];
        } else if (isset($_SERVER["HTTP_CLIENT_IP"])) {
            $IPaddress = $_SERVER["HTTP_CLIENT_IP"];
        } else {
            $IPaddress = $_SERVER["REMOTE_ADDR"];
        }
    } else {
        if (getenv("HTTP_X_FORWARDED_FOR")){
            $IPaddress = getenv("HTTP_X_FORWARDED_FOR");
        } else if (getenv("HTTP_CLIENT_IP")) {
            $IPaddress = getenv("HTTP_CLIENT_IP");
        } else {
            $IPaddress = getenv("REMOTE_ADDR");
        }
    }
    return $IPaddress;
}

function checkMobile($num){ 
    if(!preg_match("/^1[3|4|5|8][0-9]\d{4,8}$/", $num)){ 
        return false; 
    }else{
        return true; 
    } 
}

function curl_post($url,$post_data){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
    $output = curl_exec($ch);
    curl_close($ch);
    return $output;
}

function curl_get($url){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	$data = curl_exec($ch);
	curl_close($ch);
	return $data;
}

?>