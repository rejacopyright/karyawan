<?php

return [
  'driver' => env('MAIL_DRIVER', 'smtp'),
  'host' => env('MAIL_HOST', 'mail.kharismaindo.com'),
  'port' => env('MAIL_PORT', 587),
  'from' => [ 'address' => env('MAIL_USERNAME', 'recruitment@kharismaindo.com'), 'name' => 'KHARISMAINDO' ],
  'encryption' => env('MAIL_ENCRYPTION', 'tls'),
  'username' => env('MAIL_USERNAME', 'recruitment@kharismaindo.com'),
  'password' => env('MAIL_PASSWORD', 'r3cRu1t'),
  'sendmail' => '/usr/sbin/sendmail -bs',
  'stream' => [ 'ssl' => [
    'allow_self_signed' => true,
    'verify_peer' => false,
    'verify_peer_name' => false
    ] ],
  'markdown' => [ 'theme' => 'default', 'paths' => [ resource_path('views/vendor/mail') ] ]
  // 'log_channel' => env('MAIL_LOG_CHANNEL'),
];
