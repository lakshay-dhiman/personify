<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");

$url_parms = $_POST['url_parms'];
// $url_parms = 'Twenty-one-pilots-ode-to-sleep-lyrics';

$url = 'https://genius.com/'.$url_parms;

$ch = curl_init();
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3B48b Safari/419.3');
curl_setopt($ch, CURLOPT_URL,$url);

$resp = curl_exec($ch);
curl_close($ch);


echo $resp;