<?php
class ErrorCode
{
    public static $OK = 0;
    public static $IllegalAesKey = -41001;
    public static $IllegalIv = -41002;
    public static $IllegalBuffer = -41003;
    public static $DecodeBase64Error = -41004;
}
class WXBizDataCrypt
{
    private $appid;
    private $sessionKey;

    /**
     * 构造函数
     * @param $sessionKey string 用户在小程序登录后获取的会话密钥
     * @param $appid string 小程序的appid
     */
    public function __construct( $appid, $sessionKey)
    {
        $this->sessionKey = $sessionKey;
        $this->appid = $appid;
    }


    /**
     * 检验数据的真实性，并且获取解密后的明文.
     * @param $encryptedData string 加密的用户数据
     * @param $iv string 与用户数据一同返回的初始向量
     * @param $data string 解密后的原文
     *
     * @return int 成功0，失败返回对应的错误码
     */
    public function decryptData( $encryptedData, $iv, &$data )
    {
        if (strlen($this->sessionKey) != 24) {
            return ErrorCode::$IllegalAesKey;
        }
        $aesKey=base64_decode($this->sessionKey);


        if (strlen($iv) != 24) {
            return ErrorCode::$IllegalIv;
        }
        $aesIV=base64_decode($iv);

        $aesCipher=base64_decode($encryptedData);

        $result=openssl_decrypt( $aesCipher, "AES-128-CBC", $aesKey, 1, $aesIV);

        $dataObj=json_decode( $result );
        if( $dataObj  == NULL )
        {
            return ErrorCode::$IllegalBuffer;
        }
        if( $dataObj->watermark->appid != $this->appid )
        {
            return ErrorCode::$IllegalBuffer;
        }
        $data = $result;
        return ErrorCode::$OK;
    }

}

$arr=array();
$user_id = $_POST['user_id'];
if($user_id > 0){
    $mobile = $db->getVar("select mobile from test_exuser where id='{$user_id}'");
    if(empty($mobile)){
        $iv = $_POST['iv'];
        $encryptedData = $_POST['encryptedData'];
        $sessionKey = $_POST['session_key'];
        $pc = new WXBizDataCrypt(APPID, $sessionKey);
        $errCode = $pc->decryptData($encryptedData, $iv, $data );
        if ($errCode == 0) {
            $data = json_decode($data,true);
            $mobile = $data['phoneNumber'];
            $sql="update test_exuser set mobile='{$mobile}' where id={$user_id}";
            $db->runSql($sql);
            if($db->affectedRows() > 0){
                $arr['result'] = ture;
                $arr['code'] = 200;
                $arr['mobile'] =  $mobile;
                echo json_encode($arr);
                return;
            }
        }

    }
}






$arr['result'] = false;
$arr['code'] = 99999;
echo json_encode($arr);
return;
?>