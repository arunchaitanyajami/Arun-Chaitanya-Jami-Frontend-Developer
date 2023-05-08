import { compose } from '@wordpress/compose'
import { withDispatch, withSelect } from '@wordpress/data'

import CapsulesComponent from '../Components/Edit'

export const mapSelectToProps = (select) => {
	const { getCurrentPostId } = select('core/editor')

	return {
		postId: getCurrentPostId(),
	}
}

export const mapDispatchToProps = (dispatch) => {
	return {
		savePostMeta (newMeta) {
			dispatch('core/editor').editPost({ meta: newMeta })
		},
		saveDocument () {
			dispatch('core/editor').savePost()
		},
	}
}

export default compose([
	withSelect(mapSelectToProps),
	withDispatch(mapDispatchToProps),
])(CapsulesComponent)
