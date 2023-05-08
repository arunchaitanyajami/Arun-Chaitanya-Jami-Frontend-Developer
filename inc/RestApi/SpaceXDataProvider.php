<?php
/**
 * SpaceXDataProvider Class.
 *
 * This class is responsible for fetching data from SpaceX API.
 *
 * @package WordPress
 */

namespace Arunchaitanyajami\FrontEndDeveloper\RestApi;

/**
 * SpaceXDataProvider Class.
 */
class SpaceXDataProvider implements DataProviderInterface {

	/**
	 * SpaceX API URL.
	 *
	 * @var string
	 */
	private string $url = 'https://api.spacexdata.com/v3';

	/**
	 * Fetch all capsules data.
	 *
	 * @return array
	 */
	public function get_all_capsules_data(): array {
		// Get data from spaceX API.
		$capsules_url = sprintf( '%s/capsules', esc_attr( $this->url ) );
		$response     = wp_remote_get( $capsules_url );
		if ( is_wp_error( $response ) ) {
			return array(
				'error'  => array(
					'code'    => $response->get_error_code(),
					'message' => $response->get_error_messages(),
				),
				'data'   => array(),
				'status' => $response->get_error_code(),
			);
		}

		return array(
			'error'  => array(),
			'data'   => json_decode( wp_remote_retrieve_body( $response ), true ),
			'status' => 200,
		);
	}
}
