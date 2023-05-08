import { useEffect, useState } from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch';
import {
	Modal,
	__experimentalItemGroup as ItemGroup,
	__experimentalItem as Item,
	SelectControl,
	__experimentalInputControl as InputControl
} from '@wordpress/components';
import NotFound from "./Notfound";

function Edit({meta, savePostMeta, saveDocument}) {

	const {spacex_capsules_data} = meta;
	const {page, per_page} = JSON.parse(spacex_capsules_data);
	const [currentPage, setCurrentPage] = useState(page ? page : 1);
	const [itemsPerPage, setItemsPerPage] = useState(per_page ? per_page : 10);
	const [totalItems, setTotalItems] = useState(0);
	const [isOpen, setOpen] = useState(false);
	const [modelData, setModelData] = useState([]);
	const [spaceXCapsulesData, setSpaceXCapsulesData] = useState([]);
	const [ currentCount, setCurrentCount ] = useState(0);
	const [filterBy, setFilterBy] = useState('status');
	const [filterValue, setFilterValue] = useState('');

	console.log(currentCount);
	console.log( typeof currentCount);

	const savePostData = () => {
		savePostMeta({
			'spacex_capsules_data': JSON.stringify({
				'page': currentPage,
				'filter_by': filterBy,
				'filter_value': filterValue
			})
		});
		saveDocument();
	}


	const onClickShowMode = ( data ) => {
		setOpen(true);
		setModelData(data);
	}

	const fetchData = () => {
		const queryParams = {
			page: currentPage,
			filter_by: filterBy,
			filter_value: filterValue
		};

		const queryString = new URLSearchParams(queryParams).toString();

		apiFetch({
			path: 'spacex/v1/capsules?' + queryString,
			method: 'GET'
		}).then((response) => {
			setSpaceXCapsulesData(response.data)
			setTotalItems(response.total_count)
			setItemsPerPage(response.per_page)
			setCurrentCount(response.current_count)
			savePostData();
		})
	}

	useEffect(() => {
		fetchData();
	},[])

	useEffect(() => {
		fetchData();
	}, [currentPage, filterValue])

	const handleClick = (event) => {
		setCurrentPage(Number(event.target.id));
	};

	const renderGridItems = () => {
		return spaceXCapsulesData.map((item, index) => (
			<div
				className="grid-item"
				key={index}
				onClick={() => onClickShowMode(item) }
			>
				<div>{item.type}</div>
				<div>{item.details}</div>
			</div>
		));
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];

		for (let i = 1; i <= Math.ceil(currentCount / itemsPerPage); i++) {
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

	const renderModelContent = () => {
		let dataJsx = [];
		let i = 1;
		for (let key of Object.keys(modelData)) {
			if('missions' === key ){
				continue;
			}

			dataJsx.push(<Item key={i}><b>{key.replace('_', ' ').toUpperCase()}</b> : {modelData[key]}</Item>);
			i++;
		}

		return dataJsx
	}

	return (
		<article className={'grid-capsule-block'}>
			<section className={'grid-filter'}>
				<section className={'grid-filter-by'}>
					<SelectControl
						label="Filter By"
						value={ filterBy }
						options={ [
							{ label: 'Status', value: 'status' },
							{ label: 'Original Launch', value: 'original_launch' },
							{ label: 'Type', value: 'type' },
						] }
						onChange={ ( newFilter ) => setFilterBy( newFilter ) }
						__nextHasNoMarginBottom
					/>
				</section>
				<section className={'grid-filter-value'}>
					<InputControl
						label="Enter Text"
						value={ filterValue }
						onChange={ ( nextValue ) => setFilterValue( nextValue ?? '' ) }
					/>
				</section>
			</section>
			{ currentCount !== 0 ? <section className="grid-container">{renderGridItems()}</section> : <NotFound /> }
			<ul id="page-numbers">{renderPageNumbers()}</ul>
			{ isOpen && (
				<Modal title="Capsule Data" onRequestClose={ () => setOpen(false)}>
					<ItemGroup size="small">
						{renderModelContent()}
					</ItemGroup>
				</Modal>)
			}
		</article>
	);
}

export default Edit;
