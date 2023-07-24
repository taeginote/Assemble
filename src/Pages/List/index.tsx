import styled from 'styled-components'
import {
	ColumnNumberCSS,
	GridCenterCSS,
	WidthAutoCSS,
} from '../../Styles/common'

import Banner from '../../Components/Banner'
import CategoryNav from './Components/CategoryNav/CategoryNav'
import useGetListData from '../../Hooks/Queries/get-list'
import LoadingPage from '../../Components/LoadingPage/Loading'
import { useNavigate, useSearchParams } from 'react-router-dom'
import FilterSelectBox from './Components/SelectBox/FilterSelectBox'

import { useEffect, useState } from 'react'
import Pagination from '../../Components/Pagination/Pagination'
import ItemBox from '../../Components/ItemBox/ItemBox'
import SearchBar from './Components/SearchBar/SearchBar'
import ListNoData from '../../Error/ListNoData'

function List() {
	//보류
	const [searchParams, setSearchParams] = useSearchParams()

	let categoryId: any = searchParams.get('category')
	let sort: any = searchParams.get('sort')
	let pageNumber: any = searchParams.get('page')
	const [page, setPage] = useState(pageNumber || 0)
	const [searchValue, setSearchValue] = useState<string>('')
	const [selectVal, setSelectVal] = useState({
		title: '제목',
		value: 'title',
	})
	let searchBy: string = selectVal.value
	let searchQuery: string = searchValue

	if (categoryId === null) {
		categoryId = 1
	}
	const { data, isLoading, refetch } = useGetListData(
		page,
		searchBy,
		searchQuery,
		sort,
		categoryId,
	)
	console.log(data)
	const totalPage: number = data?.response?.totalPages

	return (
		<>
			<S.Wrapper>
				<Banner />
				<S.FilterWrapper>
					<CategoryNav />
					<SearchBar
						setSelectVal={setSelectVal}
						selectVal={selectVal}
						searchValue={searchValue}
						setSearchValue={setSearchValue}
					/>
					<FilterSelectBox />
				</S.FilterWrapper>
				{isLoading ? (
					<LoadingPage />
				) : (
					<>
						{data?.response?.totalElements === 0 ? (
							<ListNoData refetch={refetch} setSearchValue={setSearchValue} />
						) : (
							<S.Container>
								{data?.response?.content?.map((data: any, idx: any) => (
									<ItemBox data={data} key={idx} />
								))}
							</S.Container>
						)}
					</>
				)}
			</S.Wrapper>
			{data?.response?.totalElements !== 0 && (
				<Pagination
					totalPage={totalPage}
					limit={10}
					scroll={765}
					setPage={setPage}
				/>
			)}
		</>
	)
}
export default List

const Wrapper = styled.div``
const Container = styled.div`
	${WidthAutoCSS}
	${GridCenterCSS}
	${ColumnNumberCSS(4)};
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		${ColumnNumberCSS(2)};
	}
`
const FilterWrapper = styled.div`
	${WidthAutoCSS}
	display:flex;
	align-items: center;

	padding: 2rem 0 3rem 0;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
		flex-direction: column;
		align-items: start;

		* {
			margin-bottom: 1rem;
		}
	}
`
const S = { Wrapper, Container, FilterWrapper }
