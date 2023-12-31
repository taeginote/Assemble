import { response } from '../../Types/dataType'
import CurrentTime from '../../Utils/CurrentTime'

interface listDataType {
	success: boolean
	status: number
	response: response[]
}

let listData: listDataType = {
	success: true,
	status: 200,
	response: [],
}
for (let i = 0; i < 10; i++) {
	listData.response.push(
		{
			postId: (i + 1) * 100,
			title: '사이드프로젝트 같이 할 인원구합니다.',
			contents: '우아한테크코스 지원할 예정인데 백3 프2로 진행할 예정입니다.',
			categoryName: 'project',
			writerNickname: '아디다스',
			writeDate: CurrentTime(),
			meetingStatus: '모집중',
			hits: '50',
			likes: '10',
			personnelNumber: 5,
			expectedPeriod: '5',
			profile: {
				fileFullPath:
					'https://www.thefirstmedia.net/news/photo/202004/56618_38939_2423.png', // 예시) D://project/file
				originalName: '파일 이름',
			},
			commentCount: 1,
			comments: [
				{
					commentContents: '오~오? 저 할래요',
					commentCreator: '오오 짱구',
					commentCreatedDate: CurrentTime(),
					userProfile: {
						fileFullPath:
							'https://static.wikia.nocookie.net/shinchan/images/d/d8/Shinnoske.jpg/revision/latest/scale-to-width-down/250?cb=20131020030755&path-prefix=ko', // 예시) D://project/file
						originalName: '파일 이름',
					},
				},
			],
		},
		{
			postId: (i + 1) * 1000,
			title: '이번에 독서 스터디 같이하고싶은사람 (주 3회)',
			contents:
				'안녕하세요. 독서스터디 조장 신짱구 입니다. 이번 독서동아리는 1년동안 진행중에 있는 안정적인 동아리입니다. 주 2회 대면하고 1회 비대면으로 진행합니다. 가능하신분은 오픈톡으로 연락주시거나 댓글로 편하게 주세요',
			categoryName: 'project',
			writerNickname: '아디다스',
			writeDate: CurrentTime(),
			meetingStatus: '모집중',
			hits: '4',
			likes: '20',
			personnelNumber: 10,
			expectedPeriod: '0',
			profile: {
				fileFullPath:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbiQdhWxfSe3uKwTyX4EK_JPrS7wppr6p6FA&usqp=CAU', // 예시) D://project/file
				originalName: '파일 이름',
			},
			commentCount: 1,
			comments: [
				{
					commentContents: '오~오? 저 할래요 무슨 장르에 책을 읽는 스터디죠?',
					commentCreator: '오오 짱구',
					commentCreatedDate: CurrentTime(),
					userProfile: {
						fileFullPath:
							'https://static.wikia.nocookie.net/shinchan/images/d/d8/Shinnoske.jpg/revision/latest/scale-to-width-down/250?cb=20131020030755&path-prefix=ko', // 예시) D://project/file
						originalName: '파일 이름',
					},
				},
			],
		},
	)
}

export default listData
