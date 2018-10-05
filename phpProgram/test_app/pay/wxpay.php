<?php
class WxPay{
    private $curl_timeout;
    public $notify_url;
    protected $values = array();

    public function __construct() {
        $this->curl_timeout = 0;
        $this->notify_url = "";
    }

    public function set_notify_url($str){
        $this->notify_url=$str;
    }

    public static function getNonceStr($length = 32){
        $chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        $str ="";
        for ( $i = 0; $i < $length; $i++ )  {
            $str .= substr($chars, mt_rand(0, strlen($chars)-1), 1);
        }
        return $str;
    }

    public function SetSign($arr,$key){
        $sign = $this->MakeSign($arr,$key);
        return $sign;
    }

    public function CheckSign($key){
        $sign = $this->MakeSign($this->GetValues(),$key);
        if($this->values['sign'] == $sign){
            return true;
        }
        exit("签名错误！");
    }

    public function MakeSign($arr,$key)
    {
        //签名步骤一：按字典序排序参数
        ksort($arr);
        $string = $this->ToUrlParam($arr);
        //签名步骤二：在string后加入KEY
        $string = $string . "&key=".$key;
        //签名步骤三：MD5加密
        $string = md5($string);
        //签名步骤四：所有字符转为大写
        $result = strtoupper($string);
        return $result;
    }

    private function ToUrlParams($urlObj){
        $buff = "";
        foreach ($urlObj as $k => $v)
        {
            if($k != "sign"){
                $buff .= $k . "=" . $v . "&";
            }
        }

        $buff = trim($buff, "&");
        return $buff;
    }

    public function ToUrlParam($arr)
    {
        $buff = "";
        foreach ($arr as $k => $v)
        {
            if($k != "sign" && $v != "" && !is_array($v)){
                $buff .= $k . "=" . $v . "&";
            }
        }

        $buff = trim($buff, "&");
        return $buff;
    }

    public function ToXml($arr)
    {
        if(!is_array($arr) || count($arr) <= 0)
        {
            exit("数组数据异常！");
        }

        $xml = "<xml>";
        foreach ($arr as $key=>$val)
        {
            if (is_numeric($val)){
                $xml.="<".$key.">".$val."</".$key.">";
            }else{
                $xml.="<".$key."><![CDATA[".$val."]]></".$key.">";
            }
        }
        $xml.="</xml>";
        return $xml;
    }

    public function unifiedOrder($inputObj, $timeOut = 6){
        $url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
        if(!$inputObj['SetOut_trade_no']) {
            exit("缺少统一支付接口必填参数out_trade_no！");
        }else if(!$inputObj['SetBody']){
            exit("缺少统一支付接口必填参数body！");
        }else if(!$inputObj['SetTotal_fee']) {
            exit("缺少统一支付接口必填参数total_fee！");
        }
        $arr['notify_url']=$this->notify_url;
        $arr['body']=$inputObj['SetBody'];
        $arr['out_trade_no'] = $inputObj['SetOut_trade_no'];
        $arr['total_fee'] = $inputObj['SetTotal_fee'];
        $arr['time_start'] = date("YmdHis");
        $arr['time_expire'] = date("YmdHis", time() + 600);
        $arr['trade_type'] = "JSAPI";
        $arr['openid'] = $inputObj['SetOpenid'];
        $arr['appid'] = $inputObj['appid'];
        $arr['mch_id'] = $inputObj['mchid'];

        $arr['attach'] = $inputObj['attach'];
        $arr['spbill_create_ip'] = $_SERVER['REMOTE_ADDR'];
        $arr['nonce_str'] = self::getNonceStr();
        $arr['sign'] = $this->SetSign($arr,$inputObj['key']);
        $xml = $this->ToXml($arr);
        $response = self::postXmlCurl($xml, $url, $timeOut);
        $result = self::Init($response,$inputObj['key']);
        return $result;
    }

    private static function postXmlCurl($xml, $url, $second = 30){
        $ch = curl_init();
        //设置超时
        curl_setopt($ch, CURLOPT_TIMEOUT, $second);
        curl_setopt($ch,CURLOPT_URL, $url);
        curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,TRUE);
        curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,2);//严格校验
        //设置header
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        //要求结果为字符串且输出到屏幕上
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        //post提交方式
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
        //运行curl



        $data = curl_exec($ch);
        //返回结果
        if($data){
            curl_close($ch);
            return $data;
        } else {
            $error = curl_errno($ch);
            curl_close($ch);
            exit("curl出错，错误码:$error");
        }
    }

    public static function Init($xml,$key){
        $obj = new self();
        $obj->FromXml($xml);
        if($obj->values['return_code'] != 'SUCCESS'){
            return $obj->GetValues();
        }
        $obj->CheckSign($key);
        return $obj->GetValues();
    }

    public function GetValues(){
        return $this->values;
    }

    public function FromXml($xml){
        if(!$xml){
            exit("xml数据异常！");
        }
        //将XML转为array
        //禁止引用外部xml实体
        libxml_disable_entity_loader(true);
        $this->values = json_decode(json_encode(simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA)), true);
        return $this->values;
    }


    public function GetJsApiParameters($UnifiedOrderResult,$key){
        if(!array_key_exists("appid", $UnifiedOrderResult) || !array_key_exists("prepay_id", $UnifiedOrderResult) || $UnifiedOrderResult['prepay_id'] == ""){
            exit("参数错误");
        }
        $arr['appId'] = $UnifiedOrderResult["appid"];
        $timeStamp = time();
        $arr['timeStamp'] = "$timeStamp";
        $arr['nonceStr'] = self::getNonceStr();
        $arr['package'] = "prepay_id=" . $UnifiedOrderResult['prepay_id'];
        $arr['signType'] = "MD5";
        $arr['paySign'] = $this->MakeSign($arr,$key);
        $parameters = json_encode($arr);
        return $parameters;
    }


}
?>