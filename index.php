<?php
// yarn add react-native-pdf rn-fetch-blob @react-native-community/progress-bar-android @react-native-community/progress-view
// yarn add react-native-pdf rn-fetch-blob @react-native-community/progress-bar-android @react-native-community/progress-view
define('API_ACCESS_KEY', 'AAAAulzURPE:APA91bFal4pLpdZqanIaKsT06kdV-DQLE-DNpn6PT-A3FmG_y92AKIViqnUtCZkUphFSzo7L-lZx1jRrLvpB8vv-yuS4So4k0ZQUKN3Zk9SAUa7D4CBwffJYH8naJSPJgoAKaeMiUgYX');

$msg_user = array('title' => "BPHTB", 'body' => "status", 'id' => "5481", 'channel' => 'CH_ID_NOTIF_ABSEN', 'priority' => 'high');
$fields_user = array('to' => '/topics/bphtb', 'data' => $msg_user, 'sound' => 1);
fcm($msg_user, $fields_user);

function fcm($msg, $fields)
{
    $headers = array('Authorization: key=' . API_ACCESS_KEY, 'Content-Type: application/json');
    //Using curl to perform http request 
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
    //Getting the result 
    $result = curl_exec($ch);
    curl_close($ch);
    //Decoding json from result 
    $res = json_decode($result);
    return $res;
}
