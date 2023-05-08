import defaultOptions from '../defaultOptions'
import Edit from './Container/Edit'

export const name = 'spacex/capsules-block'
export const options = {
	...defaultOptions,
	apiVersion: 2,
	title: 'SpaceX Capsules Block',
	icon: 'megaphone',
	edit: Edit,
}
