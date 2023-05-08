import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';

import CapsulesComponent from '../Components/Edit';

/**
 * Prefetch required data, which powers block to display initial data.
 *
 * @param select
 * @returns {{meta, postId}}
 */
export const mapSelectToProps = ( select ) => {
	const { getCurrentPostId, getCurrentPostAttribute } =
		select( 'core/editor' );
	const meta = getCurrentPostAttribute( 'meta' );

	return {
		postId: getCurrentPostId(),
		spaceXData: meta.spacex_capsules_data
			? meta.spacex_capsules_data
			: JSON.stringify( {
					page: 1,
					per_page: 10,
			  } ),
	};
};

/**
 * Custom dispatch events as props to saved meta on every user interaction.
 *
 * @param dispatch
 * @returns {{savePostMeta(*): void}}
 */
export const mapDispatchToProps = ( dispatch ) => {
	return {
		savePostMeta( newMeta ) {
			dispatch( 'core/editor' ).editPost( { meta: newMeta } );
		},
	};
};

export default compose( [
	withSelect( mapSelectToProps ),
	withDispatch( mapDispatchToProps ),
] )( CapsulesComponent );
