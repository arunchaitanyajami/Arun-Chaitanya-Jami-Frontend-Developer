<?php
// First we need to load the composer autoloader, so we can use WP Mock
require_once dirname(__DIR__).'/vendor/autoload.php';

const HOUR_IN_SECONDS = 3600;

// Bootstrap WP_Mock to initialize built-in features
WP_Mock::setUsePatchwork( true );
WP_Mock::bootstrap();


// If your project does not use autoloading via Composer, include your files now
require_once dirname( dirname( __FILE__ ) ) . '/arunchaitanyajami-frontend-developer.php';
