import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';

import CapsulesComponent from '../Components/Edit';

const NewEdit = () => {
	return <div>Jami</div>;
};

export const mapSelectToProps = ( select ) => {
	const { getCurrentPostId, getCurrentPostAttribute } =
		select( 'core/editor' );
	const meta = getCurrentPostAttribute( 'meta' );

	return {
		postId: getCurrentPostId(),
		meta: meta,
	};
};

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
