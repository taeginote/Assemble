import { styled } from 'styled-components'
import {
	FlexAlignCSS,
	FlexCenterCSS,
	FlexColumnCSS,
} from '../../../Styles/common'
import Button from '../../../Components/Button/Button'
import {
	Camera_Icon,
	Date_Icon,
	Name_Icon,
	Nickname_Icon,
	Phone_Icon,
} from '../../../Icons/Icons'

import SignUpInput from '../../Form/SignUp/Components/SignUpInput'
import Input from '../../../Components/Input/Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { HookFormRule } from '../../../Consts/HookFormRule'
import { UserInfoSubmitData } from '../../../Types/type'
import useGetUserInfoData from '../../../Hooks/Queries/get-userInfo'
import UserIdService from '../../../Utils/UserIdService'
import UserApi from '../../../Apis/UserApi'

import { signUpProps } from '../../../Types/apiType'

import { useMutation } from '@tanstack/react-query'
import SuccessModal from '../../../Components/Modal/successModal'
import ProfileImgReturn from '../../../Utils/ProfileImgReturn'

function UserSetting() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm()

	const userId = UserIdService.getUserId()
	const [preFile, setPreFile] = useState<string | null>('')
	const [imgFile, setImgFile] = useState<File | null>()
	const [successModal, setSuccessModal] = useState<boolean>(false)

	const { data, isLoading, refetch } = useGetUserInfoData(userId)
	const profileImg = ProfileImgReturn(data?.response?.profile?.filePath)

	const { mutate } = useMutation(
		(
			data: Omit<signUpProps, 'password' | 'email' | 'gender' | 'profileImage'>,
		) => UserApi.PutUserInfo(data),
		{
			onSuccess: () => {
				setSuccessModal(true)
				refetch()
			},
			onError: () => {},
		},
	)
	const { mutate: ImgMutate } = useMutation(
		(profileImage: Pick<signUpProps, 'profileImage'>) =>
			UserApi.PutProfileImg(profileImage),
		{
			onSuccess: () => {},
			onError: () => {},
		},
	)

	const ChangePreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files !== null) {
			const file = e.target.files[0]
			setImgFile(file)
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onloadend = () => {
				setPreFile(reader.result as string)
			}
		}
	}

	const onSubmit: SubmitHandler<UserInfoSubmitData> = e => {
		const data = {
			name: e.SignUpName?.trim() || '',
			nickname: e.EditNickName?.trim() || '',
			birthDate: e.SignUpBirthday?.trim() || '',
			phoneNumber: e.SignUpPhone?.trim() || '',
		}
		mutate(data)

		if (imgFile === undefined) return
		let formData: any = new FormData()
		formData.append('profileImage', imgFile)
		ImgMutate(formData)
	}

	return (
		<>
			{!isLoading && (
				<S.Wrapper onSubmit={handleSubmit(onSubmit)}>
					<S.container>
						<S.InputBox>
							<S.ProfileImg src={(preFile || profileImg) as string} />
							<S.ImgLabel htmlFor="profileImg">
								<Camera_Icon />
							</S.ImgLabel>
							<Input
								type="file"
								id="profileImg"
								accept="image/*"
								style={{ display: 'none' }}
								{...register('profile_img', {
									onChange: e => {
										ChangePreFile(e)
									},
								})}
							/>
						</S.InputBox>
						<SignUpInput
							name="SignUpName"
							control={control}
							errorRules={HookFormRule.SignUpName}
							Icon={<Name_Icon />}
							placeholder="이름을 입력해주세요"
							data={data?.response?.name}
						/>
						<SignUpInput
							name="EditNickName"
							control={control}
							errorRules={HookFormRule.SignUpNickName}
							Icon={<Nickname_Icon />}
							placeholder="닉네임을 입력해주세요"
							data={data?.response?.nickname}
						/>
						<SignUpInput
							name="SignUpBirthday"
							control={control}
							errorRules={HookFormRule.SignUpBirthday}
							Icon={<Date_Icon />}
							placeholder="생년월일(8자리) ex) 19980505"
							data={data?.response?.birthDate}
						/>
						<SignUpInput
							name="SignUpPhone"
							control={control}
							errorRules={HookFormRule.SignUpPhone}
							Icon={<Phone_Icon />}
							placeholder="휴대폰 번호를 -없이 입력해주세요"
							data={data?.response?.phoneNumber}
						/>
						<S.SignUpButton>수정 완료</S.SignUpButton>
					</S.container>
					{successModal && (
						<SuccessModal
							text={'수정 완료'}
							url={'/myPage/setting/userSetting'}
							setState={setSuccessModal}
						/>
					)}
				</S.Wrapper>
			)}
		</>
	)
}

export default UserSetting

const Wrapper = styled.form`
	width: 100%;
	display: flex;
	justify-content: center;
	font-size: ${({ theme }) => theme.FONT_SIZE.xs};
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		margin: 0;
	}
`
const container = styled.div`
	min-width: 25%;
	h3 {
		font-size: ${({ theme }) => theme.FONT_SIZE.big};
		margin: 3rem 0 2rem 0;
		font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
	}
	span {
		${FlexAlignCSS}
		width: 100%;
		margin-bottom: 1rem;
		border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};
	}
	${FlexColumnCSS}
	align-items: center;
	@media screen and (max-width: ${({ theme }) => theme.MEDIA.mobile}) {
		width: 90%;
	}
`
const SignUpButton = styled(Button)`
	margin-top: 2rem;
`
const InputBox = styled.div`
	${FlexAlignCSS}
	padding-left: 5rem;
	margin-bottom: 1.5rem;
`
const ImgLabel = styled.label`
	cursor: pointer;
	position: relative;
	right: 5.5rem;
	top: 6.4rem;
	width: 3.8rem;
	height: 3.8rem;
	border-radius: 50%;
	border: 1px solid ${({ theme }) => theme.COLOR.common.gray[100]};
	font-size: ${({ theme }) => theme.FONT_SIZE.small};

	background: ${({ theme }) => theme.COLOR.common.white};
	${FlexCenterCSS}
`
const ProfileImg = styled.img`
	text-align: center;
	border-radius: 50%;
	width: 20.2rem;
	height: 20.2rem;
	margin-right: 2rem;
	border: 1px solid ${({ theme }) => theme.COLOR.hover};
	background: ${({ theme }) => theme.COLOR.common.white};
`

const S = {
	Wrapper,
	container,
	SignUpButton,
	InputBox,
	ImgLabel,
	ProfileImg,
}
