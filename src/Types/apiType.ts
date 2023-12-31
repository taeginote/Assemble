import { AxiosResponse } from 'axios'
import { categoryType, filterType } from '../Hooks/Queries/get-list'
import { postLogInData } from './mswType'

export interface MeetingCommentProps {
	contents?: string
	meetingId?: number
}
interface GetUserCommentProps {
	userId: string | null
	page: number | null
}
export interface PutCommentProps {
	commentId: null | number
	contents: null | string
}

export type CommentApiType = {
	meetingComment(data: MeetingCommentProps): Promise<AxiosResponse>
	getUserComment(params: GetUserCommentProps): Promise<AxiosResponse>
	deleteComment(params?: number): Promise<AxiosResponse>
	putComment(data: PutCommentProps): Promise<AxiosResponse>
}

export interface MeetingLikeProps {
	meetingId?: number | null
}

export interface MeetingLikeApiType {
	MeetingLike(params: MeetingLikeProps): Promise<AxiosResponse>
	CancelLike(params?: number): Promise<AxiosResponse>
}

// export interface MonthScheduleListProps {
// 	yearAndMonth: string
// }

export interface PostScheduleType {
	title: string
	content: string
	date: string
	meetingId: number
}
export interface putScheduleType {
	title: string
	content: string
	id: number
}
export interface ScheduleApiType {
	MonthScheduleList(
		yearAndMonth: string,
		meetingId: number,
	): Promise<AxiosResponse>
	PostSchedule(data: PostScheduleType): Promise<AxiosResponse>
	DetailSchedule(scheduleId: number): Promise<AxiosResponse>
	putSchedule(data: putScheduleType): Promise<AxiosResponse>
	deleteSchedule(scheduleId: number): Promise<AxiosResponse>
}

interface GetListProps {
	page?: number
	searchBy?: string
	searchQuery?: string
	categoryId?: categoryType
	sort?: filterType
}
export interface MeetingRegisterProps {
	categoryId: 1 | number
	address?: string
	description?: string
	name?: string
}
export interface PatchRegisterData extends MeetingRegisterProps {
	meetingStatus?: string
	meetingId?: number
}

interface GetUserWroteProps {
	meetingId: string | null
	page: null | number
}

export interface MeetingApiType {
	getList(params: GetListProps): Promise<AxiosResponse>
	MeetingRegister(params: MeetingRegisterProps): Promise<AxiosResponse>
	putRegister(params: PatchRegisterData): Promise<AxiosResponse>
	getDetail(params: MeetingLikeProps): Promise<AxiosResponse>
	DeleteMeeting(params?: number): Promise<AxiosResponse>
	getUserWrote(params: GetUserWroteProps): Promise<AxiosResponse>
	getUserLike(params: number): Promise<AxiosResponse>
}
export interface PutCategoryProps {
	categoryName: string
	id: number
}
export interface CategoryApiType {
	getCategory(): Promise<AxiosResponse>
	PutCategory(data: PutCategoryProps): Promise<AxiosResponse>
	DeleteCategory(id: number): Promise<AxiosResponse>
	MeetingCategory(data: Omit<PutCategoryProps, 'id'>): Promise<AxiosResponse>
	getAdminCategory(): Promise<AxiosResponse>
}

//Join Api
export interface meetingJoinProps {
	joinRequestMessage: string
	meetingId: number
}
export interface getJoinListProps {
	meetingId: number
}
export interface putJoinStatusProps {
	joinRequestId: number
	message: string | null
	status: 'APPROVAL' | 'REJECT' | 'BLOCK'
}

export interface JoinApiType {
	meetingJoin(data: meetingJoinProps): Promise<AxiosResponse>
	getJoinList(data: getJoinListProps): Promise<AxiosResponse>
	putJoinStatus(data: putJoinStatusProps): Promise<AxiosResponse>
	putmeetingJoinCancel(props: number): Promise<AxiosResponse>
	getMyJoinRequestList(props: number): Promise<AxiosResponse>
}

export interface SearchAddressProps {
	accessToken: string
	cd?: string
}
export interface MapApiType {
	getAccessToken(): Promise<AxiosResponse>
	getSearchAddress(data: SearchAddressProps): Promise<AxiosResponse>
}
//User api type

export interface signUpProps {
	email: string
	gender: 'MAN' | 'WOMAN'
	name: string
	nickname: string
	password: string
	birthDate: string
	phoneNumber: string
	profileImage?: FormData
}

export interface LoginData {
	email?: string
	password?: string
	// 보류
}

interface EmailValidation {
	email?: string
}
interface NicknameValidation {
	nickname?: string
}
export interface FindEmailProp {
	name: string
	phoneNumber: string
	birthDate: string
}
export interface FindPasswordProp extends FindEmailProp {
	email: string
}

export type UserApiType = {
	SignUp(data: signUpProps): Promise<AxiosResponse>
	Login(data: LoginData): Promise<AxiosResponse>
	getEmailValidation(data: EmailValidation): Promise<AxiosResponse>
	getNickNameValidation(data: NicknameValidation): Promise<AxiosResponse>
	getToken(): Promise<AxiosResponse>
	postLogout(): Promise<AxiosResponse>
	deletewithdrawal(): Promise<AxiosResponse>
	getUserInfo(data: string | null): Promise<AxiosResponse>
	PutUserInfo(
		data: Omit<signUpProps, 'password' | 'email' | 'gender' | 'profileImage'>,
	): Promise<AxiosResponse>
	PutProfileImg(data: Pick<signUpProps, 'profileImage'>): Promise<AxiosResponse>
	getFindEmail(datas: FindEmailProp): Promise<AxiosResponse>
	postFindPassword(datas: FindPasswordProp): Promise<AxiosResponse>
	putChangePassword(data: LoginData): Promise<AxiosResponse>
	postLoginFindPassword(
		data: Pick<postLogInData, 'password'>,
	): Promise<AxiosResponse>
	postKakaoLogIn(data: string): Promise<AxiosResponse>
}

export type ActivityApiType = {
	getActivity(page: number): Promise<AxiosResponse>
	getActivityUser(meetingId: number): Promise<AxiosResponse>
}
