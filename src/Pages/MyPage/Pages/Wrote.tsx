import styled from 'styled-components'
import {
	ColumnNumberCSS,
	FlexCenterCSS,
	GridCenterCSS,
} from '../../../Styles/common'
import ItemBoxMyPage from '../Components/ItemBoxMyPage'
import useGetWroteData from '../../../Hooks/Queries/get-wrote'
import UserIdService from '../../../Utils/UserIdService'

function Wrote() {
	//일단 여기는 itembox를 map 돌릴 예정
	const testList = [1, 2, 3, 4, 5, 6, 6, 7]

	const userId = UserIdService.getUserId()

	const { data, isLoading } = useGetWroteData(userId)
	//페이지네이션 추가 예정
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
						<S.Container>
							{data?.response?.content.map((el: any) => (
								<ItemBoxMyPage data={el} />
							))}
						</S.Container>
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
	width: 100%;
	${GridCenterCSS}
	${ColumnNumberCSS(3)};
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		${ColumnNumberCSS(2)};
	}
	& > div {
		width: 100%;
	}
`
const S = { Wrapper, Container, ButtonWrap }
