import styled from 'styled-components'
import {
	ColumnNumberCSS,
	FlexCenterCSS,
	GridCenterCSS,
} from '../../../Styles/common'
import ItemBoxMyPage from '../Components/ItemBoxMyPage'
import useGetWroteData from '../../../Hooks/Queries/get-wrote'
import UserIdService from '../../../Utils/UserIdService'
import Pagination from '../../../Components/Pagination/Pagination'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import ConfirmModal from '../../../Components/Modal/confirmModal'
import { modalViewConfirm } from '../../../Atoms/modalViewConfirm.atom'
import { useRecoilState } from 'recoil'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import PostApi from '../../../Apis/PostApi'
import { ItemDataType } from '../../../Types/type'

function Wrote() {
	//일단 여기는 itembox를 map 돌릴 예정
	const testList = [1, 2, 3, 4, 5, 6, 6, 7]
	const [searchParams, setSearchParams] = useSearchParams()
	let pageNumber: number | null = Number(searchParams.get('page'))
	const [page, setPage] = useState(pageNumber || 0)
	const [postId, setPostId] = useState()
	const userId = UserIdService.getUserId()
	const [recoilCounter, setRecoilCounter] = useRecoilState(modalViewConfirm)
	const { data, isLoading } = useGetWroteData(userId, page)
	//페이지네이션 추가 예정

	const queryClient = useQueryClient()
	const { mutate } = useMutation(
		(postId: number | undefined) => PostApi.DeletePost(postId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['useGetWroteData'])
			},
			onError: () => {},
		},
	)
	return (
		<S.Wrapper>
			{testList.length === 0 ? (
				<div>
					작성한 글이 없습니다.
					<br /> 새 글 쓰기를 통해 게시글을 작성해보세요
				</div>
			) : (
				<>
					{isLoading ? (
						<div>로딩중</div>
					) : (
						<S.ListWrap>
							<S.Container>
								{data?.response?.content.map((el: ItemDataType) => (
									<ItemBoxMyPage data={el} setPostId={setPostId} />
								))}
							</S.Container>
							{data?.response?.content?.length !== 0 && (
								<Pagination
									totalPage={data?.response?.totalPages}
									limit={10}
									scroll={765}
									setPage={setPage}
								/>
							)}
							{recoilCounter && (
								<ConfirmModal
									text={'정말로 삭제하시겠습니까?'}
									url={'/myPage'}
									mutate={mutate}
									postId={postId}
								/>
							)}
						</S.ListWrap>
					)}
				</>
			)}
		</S.Wrapper>
	)
}
export default Wrote

const Wrapper = styled.div`
	font-size: ${({ theme }) => theme.FONT_SIZE.xslarge};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	width: 80%;
	border-radius: 0.7rem;
	${FlexCenterCSS}
	&>div {
		text-align: center;
		line-height: 2.1;
	}
`
const ButtonWrap = styled.div`
	display: flex;
	margin-bottom: 3rem;
`
const Container = styled.div`
	width: 140%;
	/* background-color: red; */
	${GridCenterCSS}
	${ColumnNumberCSS(3)};
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)};
	}
	& > div {
		width: 100%;
	}
`
const ListWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 20rem;
`
const S = { Wrapper, Container, ButtonWrap, ListWrap }
