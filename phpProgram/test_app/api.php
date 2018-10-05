<?php
header("Content-type: text/html; charset=utf-8");
define('IA_ROOT', str_replace("\\",'/', dirname(__FILE__)));
require_once IA_ROOT."/config.inc.php";
require_once IA_ROOT."/function.php";
require_once IA_ROOT."/saeMysql.php";

$db = new SaeMysql();


$mod = $_REQUEST['mod'];
$act = $_REQUEST['act'];

require_once IA_ROOT."/".$mod."/".$act.".php";


$db->closeDb();


?>