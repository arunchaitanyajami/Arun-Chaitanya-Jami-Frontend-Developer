<?php
/**
 * DataFetcher Class.
 *
 * This class is responsible for fetching data from cached data or else if the data is empty then fetch data from
 * DataProviderInterface.
 *
 * @package WordPress
 */

namespace Arunchaitanyajami\FrontEndDeveloper\RestApi;

/**
 * DataFetcher Class.
 */
class DataFetcher {


	/**
	 * Pagination limit.
	 *
	 * @var int
	 */
	private int $max_length = 10;

	/**
	 * Data provider interface.
	 *
	 * @var DataProviderInterface
	 */
	private DataProviderInterface $data_provider;

	/**
	 * Class Constructor.
	 *
	 * @param DataProviderInterface $data_provider Data provider.
	 */
	public function __construct( DataProviderInterface $data_provider ) {
		$this->data_provider = $data_provider;
	}

	/**
	 * Retrieves the cached data or data from spacex.
	 *
	 * @param int    $page Page Number.
	 * @param string $filter_by Key to filter the array.
	 * @param string $filter_value Value to Filter data based on the key selected.
	 *
	 * @return array
	 */
	public function get_capsules_data( int $page = 1, string $filter_by = '', string $filter_value = '' ): array {
		// Get cache key.
		$cache_key = 'spacex_all_capsules_api_data';

		// Try to get data from cache.
		$data = get_transient( $cache_key );

		// If cache is empty, fetch data and set cache.
		if ( false === $data ) {
			// Get data from data provider.
			$data = $this->data_provider->get_all_capsules_data();
			$data = $data['data'];

			// Set cache for 1 hour.
			set_transient( $cache_key, $data, 1 * \HOUR_IN_SECONDS );
		}

		if ( empty( $data ) ) {
			return array();
		}

		$total = count( $data );
		if ( $filter_by && $filter_value ) {
			$data = array_filter(
				$data,
				function ( $item ) use ( $filter_by, $filter_value ) {
					return str_contains( strtolower( $item[ $filter_by ] ), strtolower( $filter_value ) ) !== false;
				}
			);
		}

		if ( empty( $data ) ) {
			return [
				'data'          => [],
				'total_count'   => 0,
				'current_count' => 0,
				'per_page'      => $this->max_length,
			];
		}

		$offset = ( $page - 1 ) * $this->max_length;
		$data   = array_values( $data );

		// Return data.
		return [
			'data'          => count( $data ) > $this->max_length ? array_slice( $data, $offset, $this->max_length ) : $data,
			'total_count'   => $total,
			'current_count' => count( $data ),
			'per_page'      => $this->max_length,
		];
	}
}
