//msw type

//post_Login
export interface postLogInData {
	email: string
	password: string
}

export interface postLogInType {
	data: postLogInData
}

//post_Register
interface postRegisterData {
	categoryName: string
	contents: string

	activityUserCount: 0 | 2 | 3 | 4 | 5 | 10
	title: string
	writerNickname: string
}

export interface postRegisterType {
	data: postRegisterData
}

export interface postCommentsType {
	data: { commentContents: string; postId: string }
}

export interface Comments {
	commentContents: string
	commentCreator: any
	userProfile: {
		fileFullPath: string
		originalName: string
	}
	commentCreatedDate: string
}

//get_Detail
export type ListDataItem = {
	postId: string
}
