<?php
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");
$redirect_uri = $_POST['redirect_uri'];
$code = $_POST['code'];
// $code = 'AQD3nf_djZuh4-7O7M_7hVnmHx5uFFSF_B_oQrs6CVXgpbjnWH5xXp273nMkoLEZ5gb0EaBQM0Ec08sGf8MTyauSUV67knGO2KeoKzHkneo17EpjbdDFQVsjwHCiI337t99p63y4zPlKlAzBvlUOCdgKqPNBVJd5KTQQ31m2ilJxslhD_Wy-kBFOaDDTjBicBciP9UhzzDLOSBKQhYP84p382PzReq3_DmfErh_qFt53';
$grant_type = 'authorization_code';
$url = 'https://accounts.spotify.com/api/token';
// $client_id = 'd3708d18048e4a108714ecfb905b2179';
// $client_secret = 'b23ae3c7c16d490288b02f37adac0b4d';
$connection_url = 'https://accounts.spotify.com/api/token';

$data = array(
  'grant_type' => $grant_type,
  'code' => $code,
  'redirect_uri' => $redirect_uri
);
$postData = "";
foreach( $data as $key => $val ) {
   $postData .=$key."=".$val."&";
}

$header = array(
  'Authorization: Basic ZDM3MDhkMTgwNDhlNGExMDg3MTRlY2ZiOTA1YjIxNzk6YjIzYWUzYzdjMTZkNDkwMjg4YjAyZjM3YWRhYzBiNGQ='
);

// $Postheader = "";
// foreach( $header as $key => $val ) {
//    $postHeader .=$key."=".$val."&";
// }

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,$connection_url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);

$resp = curl_exec($ch);
curl_close($ch);

print $resp;
