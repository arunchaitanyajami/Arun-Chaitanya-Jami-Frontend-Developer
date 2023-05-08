<?php
/**
 * DataProviderInterface Interface.
 *
 * @package WordPress
 */

namespace Arunchaitanyajami\FrontEndDeveloper\RestApi;

interface DataProviderInterface {

	/**
	 * Fetch all capsules data from the SpaceX API.
	 *
	 * @return array
	 */
	public function get_all_capsules_data() : array;
}
