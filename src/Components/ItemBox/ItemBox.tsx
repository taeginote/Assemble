import styled from 'styled-components'
import {
	FlexAlignCSS,
	FlexBetweenCSS,
	FlexColumnCSS,
} from '../../Styles/common'
import { useNavigate } from 'react-router-dom'
import { ItemDataType } from '../../Types/type'
import { Chat_Icon, Person_Icon } from '../../Icons/Icons'

function ItemBox({ data }: { data: ItemDataType }) {
	const navigate = useNavigate()
	const {
		postId,
		title,
		category,
		profile,
		writer,
		personnelNumber,
		expectedPeriod,
	} = data

	let period =
		expectedPeriod === '제한없음' ? expectedPeriod : expectedPeriod + '달뒤'

	return (
		<S.Wrapper onClick={() => navigate(`/Detail?postId=${postId}`)}>
			<S.Container>
				<S.Status>모집중</S.Status>
				<S.Period>마감일 | {period}</S.Period>
				<S.Title>
					{title.length > 45 ? title.substr(0, 45) + '...' : title}
				</S.Title>
				<S.Category>{category}</S.Category>
			</S.Container>
			<S.UserBox>
				<div>
					<S.UserImg src={profile.fileFullPath} />
					<div>{writer}</div>
				</div>
				<span>
					<Person_Icon />
					<span>{personnelNumber}인</span>
					<Chat_Icon size={'20'} />
					<div>4</div>
				</span>
			</S.UserBox>
		</S.Wrapper>
	)
}
export default ItemBox

const Wrapper = styled.div`
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
	border: 2px solid ${({ theme }) => theme.COLOR.common.gray[100]};
	padding: 3rem;
	border-radius: 2rem;
	cursor: pointer;
	min-width: 100%;
	&:hover {
		transform: scale(1.02);
		transition: transform 0.5s;
	}
`
const Container = styled.div`
	${FlexColumnCSS}
	align-items: start;
	& > div {
		font-size: ${({ theme }) => theme.FONT_SIZE.small};
		font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
		margin-top: 1rem;
	}
	border-bottom: 2px solid ${({ theme }) => theme.COLOR.common.gray[100]};
	padding-bottom: 2rem;
`
const UserBox = styled.div`
	${FlexBetweenCSS}
	padding: 2rem 0 0 0;
	& > div {
		${FlexAlignCSS}
	}
	& > span {
		@media screen and (max-width: ${({ theme }) => theme.MEDIA.tablet}) {
			display: none;
		}
		${FlexAlignCSS}
		span {
			margin-right: 1rem;
		}
		* {
			margin-right: 0.5rem;
			opacity: 0.7;
		}
	}
`
const MainImgContainer = styled.div`
	${FlexAlignCSS}
	height: 30rem;
	& > div {
		font-size: ${({ theme }) => theme.FONT_SIZE.small};
	}
`
const Status = styled.span`
	background-color: ${({ theme }) => theme.COLOR.orange};
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	color: ${({ theme }) => theme.COLOR.hover};
	padding: 0.1rem 0.7rem;
	text-align: center;
	border-radius: 1rem;
`
const Category = styled.span`
	background-color: ${({ theme }) => theme.COLOR.common.gray[100]};
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	color: ${({ theme }) => theme.COLOR.common.gray[300]};
	padding: 0.1rem 0.7rem;
	text-align: center;
	border-radius: 1rem;
	margin-top: 2rem;
`
const Period = styled.div`
	color: ${({ theme }) => theme.COLOR.common.gray[300]};
	margin-top: 2rem;
`
const Title = styled.div`
	min-height: 8rem;
	max-height: 8rem;
`
const UserImg = styled.img`
	border-radius: 50%;
	width: 3.2rem;
	height: 3.2rem;
	margin-right: 0.5rem;
`

const S = {
	Wrapper,
	Status,
	MainImgContainer,
	Period,
	Category,
	Container,
	UserBox,
	UserImg,
	Title,
}