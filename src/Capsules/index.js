import defaultOptions from '../defaultOptions';
import Edit from './Container/Edit';
import { __ } from '@wordpress/i18n';

export const name = 'spacex/capsules-block';
export const options = {
	...defaultOptions,
	apiVersion: 2,
	title: __( 'SpaceX Capsules Block', 'spacex-capsule-block' ),
	icon: 'megaphone',
	edit: Edit,
};
