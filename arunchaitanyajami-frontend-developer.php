<?php
/**
 * Plugin Name:     arunchaitanyajami-frontend-developer
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     WordPress Gutenberg Block to share SpaceX data with logged-in users.
 * Author:          arunchaitanyajami
 * Author URI:      https://github.com/arunchaitanyajami
 * Text Domain:     arunchaitanyajami-frontend-developer
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         WordPress
 */

namespace Arunchaitanyajami\FrontEndDeveloper;

require 'vendor/autoload.php';

use Arunchaitanyajami\FrontEndDeveloper\RestApi\SpaceXDataProvider;
use Arunchaitanyajami\FrontEndDeveloper\RestApi\DataFetcher;


/**
 * Register Custom REST API endpoint to fetch data from SpaceX Endpoint.
 */
add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'custom/v1',
			'/data/',
			array(
				'methods'             => 'GET',
				'callback'            => function ( \WP_REST_Request $request ) {
					$filter_by = $request->get_param( 'filter_by' );
					$filter_by = ! empty( $filter_by ) ? $filter_by : '';

					$filter_value = $request->get_param( 'filter_value' );
					$filter_value = ! empty( $filter_value ) ? $filter_value : '';

					$page = $request->get_param( 'page' );
					$page = ! empty( $page ) ? $page : 1;

					$data_fetcher = new DataFetcher( new SpaceXDataProvider() );
					// Fetch data using data fetcher service.
					return $data_fetcher->get_capsules_data( $page, $filter_by, $filter_value );
				},
				'permission_callback' => function () {
					return ! is_admin() || is_user_logged_in();
				},
			)
		);
	}
);
