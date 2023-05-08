import { registerBlockType } from '@wordpress/blocks';
import "./styles.js"
import * as Capsules  from './Capsules';

/**
 * Register BlockBlocks.
 */
[Capsules].forEach(({name, options}) =>
	registerBlockType(name, options),
);
