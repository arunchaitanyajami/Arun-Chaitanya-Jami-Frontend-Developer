import { useEffect, useState } from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch';
import { Spinner } from '@wordpress/components';

function Edit({postId, meta}) {
	const [popupInfo, setPopupInfo] = useState("");
	const [popupVisible, setPopupVisible] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(8);

	const showPopup = (info) => {
		setPopupInfo(info);
		setPopupVisible(true);
	};

	const hidePopup = () => {
		setPopupVisible(false);
	};

	const handleClick = (event) => {
		setCurrentPage(Number(event.target.id));
	};

	const renderGridItems = () => {
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		const currentItems = gridItems.slice(indexOfFirstItem, indexOfLastItem);

		return currentItems.map((item, index) => (
			<div
				className="grid-item"
				key={index}
				onClick={() => showPopup(item)}
			>
				{item}
			</div>
		));
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];

		for (let i = 1; i <= Math.ceil(gridItems.length / itemsPerPage); i++) {
			pageNumbers.push(i);
		}

		return pageNumbers.map((number) => (
			<li
				key={number}
				id={number}
				onClick={handleClick}
				className={ currentPage === number ? 'active' : null}
			>
				{number}
			</li>
		));
	};

	const gridItems = ["Grid Item 1", "Grid Item 2", "Grid Item 3", "Grid Item 4", "Grid Item 5", "Grid Item 6", "Grid Item 7", "Grid Item 8", "Grid Item 9", "Grid Item 10", "Grid Item 11", "Grid Item 12", "Grid Item 13", "Grid Item 14", "Grid Item 15", "Grid Item 16",];

	return (
		<div>
			<div className="grid-container">{renderGridItems()}</div>

			<ul id="page-numbers">{renderPageNumbers()}</ul>

			{popupVisible && (
				<div className="popup" id="popup">
					<div className="popup-content">
            <span className="close-btn" onClick={() => hidePopup()}>
              &times;
            </span>
						<h2 id="grid-info">{popupInfo}</h2>
					</div>
				</div>
			)}
		</div>
	);
}

export default Edit;
