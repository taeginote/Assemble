import { styled } from 'styled-components'
import { ArrowIcon, PlusIcon } from '../../../../Icons/Icons'
import { FlexCenterCSS } from '../../../../Styles/common'
import { useEffect, useState } from 'react'
import useGetMonthScheduleListData from '../../../../Hooks/Queries/get-monthSchedule'
import { useSearchParams } from 'react-router-dom'

function DateViewComponents({
	setIsModalView,
	setSelectDay,
	isModalView,
	setIsDateDetailModal,
	setSelectDetailId,
}: {
	setIsModalView: (state: boolean) => void
	setSelectDay: (state: string) => void
	isModalView: boolean
	setIsDateDetailModal: (state: boolean) => void
	setSelectDetailId: (state: number) => void
}) {
	let date: Date = new Date() //현 날짜 시간
	const [currentMonth, setCurrentMonth] = useState<number>(date.getMonth() + 1)
	const [currentYear, setCurrentYear] = useState<number>(date.getFullYear())
	const [viewYearArr, setViewYearArr] = useState<boolean>(false)

	const [searchParams] = useSearchParams()
	let meetingId: number | null = Number(searchParams.get('meetingId')) || null

	let lastDayOfMonthDate = new Date(currentYear, currentMonth, 0).getDate() //이번 달 마지막 일자 ex) 30
	let lastDayOfMonthDay = new Date(currentYear, currentMonth, 0).getDay() //이번 달 마지막 일자 요일 ex)일요일

	let monthArr: (number | null)[][] = [[], [], [], [], [], []]
	let totalDate = lastDayOfMonthDate

	const { data, isLoading, refetch } = useGetMonthScheduleListData(
		`${currentYear}-${currentMonth >= 10 ? currentMonth : '0' + currentMonth}`,
		meetingId!,
	)

	//마지막 주
	for (let lastWeek = lastDayOfMonthDay; lastWeek >= 0; lastWeek--) {
		monthArr[5].unshift(totalDate)
		totalDate -= 1
	}

	//중간 주
	for (let middleOfMonth = 4; middleOfMonth >= 2; middleOfMonth--) {
		for (let week = 7; week >= 1; week--) {
			monthArr[middleOfMonth].unshift(totalDate)
			totalDate -= 1
		}
	}

	//첫 주
	for (let fistWeek = 7; fistWeek >= 1; fistWeek--) {
		if (totalDate === 0) {
			monthArr[1].unshift(null)
		} else {
			monthArr[1].unshift(totalDate)
			totalDate -= 1
		}
	}

	if (totalDate !== 0) {
		for (let i = 7; i > 0; i--) {
			if (totalDate === 0) {
				monthArr[0].unshift(null)
			} else {
				monthArr[0].unshift(totalDate)
				totalDate -= 1
			}
		}
	}

	const onPrevious = (type: 'month' | 'year') => {
		//월 previous
		if (type === 'year') {
			setCurrentYear(prev => (prev -= 1))
			setCurrentMonth(1)
		}

		if (type === 'month') {
			let month = currentMonth
			month -= 1
			if (month === 0)
				return setCurrentMonth(12), setCurrentYear(prev => (prev -= 1))
			setCurrentMonth(prev => (prev -= 1))
		}
	}
	const onNext = (type: 'month' | 'year') => {
		//월 next
		if (type === 'year') {
			setCurrentYear(prev => (prev += 1))
			setCurrentMonth(1)
		}

		if (type === 'month') {
			let month = currentMonth
			month += 1
			if (month === 13)
				return setCurrentMonth(1), setCurrentYear(prev => (prev += 1))
			setCurrentMonth(prev => (prev += 1))
		}
	}
	let selectYearArr: number[] = []

	for (let i = currentYear - 5; i < currentYear + 6; i++) {
		selectYearArr.push(i)
	}

	const onClickSelectYear = (year: number) => {
		setCurrentYear(year)
		setViewYearArr(false)
	}
	const onPlus = (day: number) => {
		setIsModalView(true)
		setSelectDay(
			`${currentYear}-${
				currentMonth >= 10 ? currentMonth : '0' + currentMonth
			}-${day >= 10 ? day : '0' + day}`,
		)
	}
	const onClickTag = (date: string, id: number) => {
		setIsDateDetailModal(true)
		setSelectDay(date)
		setSelectDetailId(id)
	}

	let test = [
		{
			date: 9,
			children: [{ title: '한강가서 치킨먹자' }, { title: '신한님과 카공' }],
		},
		{
			date: 19,
			children: [{ title: '롯데월드 가기' }],
		},
	]

	useEffect(() => {
		refetch()
	}, [isModalView, currentMonth, currentYear])

	return (
		<S.Wrapper>
			<S.Year>
				<ArrowIcon rotate={180} onClick={() => onPrevious('year')} />
				<h1 onClick={() => setViewYearArr(prev => !prev)}>{currentYear}</h1>
				<ArrowIcon rotate={0} onClick={() => onNext('year')} />
				{viewYearArr && (
					<S.SelectYear>
						{selectYearArr.map((el, key) => (
							<div onClick={() => onClickSelectYear(el)}>{el}</div>
						))}
					</S.SelectYear>
				)}
			</S.Year>
			<S.Month>
				<ArrowIcon rotate={180} onClick={() => onPrevious('month')} />
				<div>{currentMonth}월</div>
				<ArrowIcon rotate={0} onClick={() => onNext('month')} />
			</S.Month>
			<S.Table>
				<tr>
					<S.FirstTh>일요일</S.FirstTh>
					<S.FirstTh>월요일</S.FirstTh>
					<S.FirstTh>화요일</S.FirstTh>
					<S.FirstTh>수요일</S.FirstTh>
					<S.FirstTh>목요일</S.FirstTh>
					<S.FirstTh>금요일</S.FirstTh>
					<S.FirstTh>토요일</S.FirstTh>
				</tr>
				{monthArr.map((month, idx: number) => (
					<tr key={idx}>
						{month.map((day, idx: number) => (
							<S.Th
								key={idx}
								$isWeekend={idx === 0 || idx === 6}
								$isRealDay={day}
							>
								<S.Plus onClick={() => onPlus(day!)}>
									<PlusIcon />
								</S.Plus>
								<S.Day
									$isStatus={
										date.getFullYear() === currentYear &&
										date.getMonth() + 1 === currentMonth &&
										date.getDate() === day
									}
								>
									{day}
								</S.Day>
								{
									<>
										{data?.response?.schedules
											.find(el => el.day === day)
											?.schedulesOfMonth.map((el, idx) => (
												<S.Tag
													key={idx}
													onClick={() => onClickTag(el.date!, el.id!)}
												>
													{el.title && el.title?.length > 7
														? el.title?.substr(0, 7) + '...'
														: el.title}
												</S.Tag>
											))}
									</>
								}
							</S.Th>
						))}
					</tr>
				))}
			</S.Table>
		</S.Wrapper>
	)
}
export default DateViewComponents

const Wrapper = styled.div`
	margin-top: 5rem;
`
const Year = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	& > h1 {
		&:hover {
			color: orange;
			cursor: pointer;
		}
		margin: 0 2rem;
	}
	position: relative;
`
const Month = styled.div`
	width: 100%;
	text-align: center;
	margin: 2rem 0;
	font-size: ${({ theme }) => theme.FONT_SIZE.medium};
	${FlexCenterCSS}
	&>div {
		margin: 1rem 4rem;
	}
`
const Table = styled.table`
	margin: auto;
`
const FirstTh = styled.th`
	vertical-align: top;
	width: 10rem;
	height: 3rem;
	text-align: center;

	font-size: ${({ theme }) => theme.FONT_SIZE.xs};
`
const Th = styled.th<{ $isWeekend: boolean; $isRealDay?: number }>`
	&:hover {
		& > p {
			display: ${({ theme, $isRealDay }) => $isRealDay !== null && 'block'};
		}
	}
	background-color: ${({ theme, $isWeekend }) => $isWeekend && '#f8f9fa'};
	vertical-align: top;
	width: 10rem;
	height: 8rem;
	text-align: center;

	font-size: ${({ theme }) => theme.FONT_SIZE.xs};

	& > p {
		display: none;
	}
`
const SelectYear = styled.div`
	& > div {
		padding: 1rem 2rem;
		font-size: ${({ theme }) => theme.FONT_SIZE.xs};
		cursor: pointer;
		&:hover {
			scale: 1.1;
		}
	}
	border: 1px solid gray;
	background-color: white;
	border-radius: 2rem;
	position: absolute;
	right: 47.3%;
	top: 100%;
`
const Tag = styled.div`
	background-color: ${({ theme }) => theme.COLOR.orange};
	font-size: ${({ theme }) => theme.FONT_SIZE.tiny};
	margin: 0.3rem 0.2rem;
	overflow: hidden;
	max-height: 2rem;
	border-radius: 0.3rem;
	&:hover {
		cursor: pointer;
		opacity: 0.8;
	}
`
const Plus = styled.p`
	position: absolute;

	border-radius: 3px;
	color: ${({ theme }) => theme.COLOR.sub};
`
const Day = styled.span<{ $isStatus: boolean }>`
	background-color: ${({ theme, $isStatus }) => $isStatus && theme.COLOR.sub};
	padding: 0.5rem;
	border-radius: 50%;
`
const S = {
	Wrapper,
	Month,
	Table,
	Th,
	FirstTh,
	Year,
	SelectYear,
	Tag,
	Plus,
	Day,
}
