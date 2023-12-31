import styled from 'styled-components'
import Input from '../../../Components/Input/Input'
import {
	FlexCenterCSS,
	FlexColumnCSS,
	TopPadding,
} from '../../../Styles/common'
import { FlexAlignCSS } from '../../../Styles/common'
import Button from '../../../Components/Button/Button'
import Notice from './Components/Notice'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HookFormRule } from '../../../Consts/HookFormRule'
import HookFormError from '../../../Error/HookFormError'
import NotificationModal from '../../../Components/Modal/NotificationModal'
import { useRecoilState } from 'recoil'
import { modalViewNotification } from '../../../Atoms/modalView.atom'
import { useMutation } from '@tanstack/react-query'
import UserApi from '../../../Apis/UserApi'
import SuccessModal from '../../../Components/Modal/successModal'
import {
	CameraIcon,
	DateIcon,
	EmailIcon,
	LockIcon,
	NameIcon,
	NicknameIcon,
	PhoneIcon,
} from '../../../Icons/Icons'
import { signUpProps } from '../../../Types/apiType'
import { SignUpSubmitData } from '../../../Types/type'
import { useEffect, useState } from 'react'
import SignUpInput from './Components/SignUpInput'
import SignUpValidationError from '../../../Error/SignUpValidationError'
export interface ValidationMsg {
	//이거 status가 string, boolean 왔다갔다 거림 리팩토링때 수정 예정
	email: {
		status?: boolean | string
		message: string
	}
	nickname: {
		status?: boolean | string
		message: string
	}
}
type ResponseType = {
	response: boolean
}

function SignUp() {
	const {
		register,
		handleSubmit,
		watch,
		getValues,
		control,
		formState: { errors },
	} = useForm()
	const [preFile, setPreFile] = useState<string | null>('')
	const [imgFile, setImgFile] = useState<File | null>()
	const [validationMsg, setValidationMsg] = useState<ValidationMsg>({
		email: { status: false, message: '' },
		nickname: { status: false, message: '' },
	})
	const watchEmail = watch('SignUpEmail')
	const watchNickName = watch('SignUpNickName')

	useEffect(() => {
		setValidationMsg((prev: ValidationMsg) => ({
			...prev,
			email: { status: false, message: '' },
		}))
	}, [watchEmail])
	useEffect(() => {
		setValidationMsg((prev: ValidationMsg) => ({
			...prev,
			nickname: { status: false, message: '' },
		}))
	}, [watchNickName])

	const [recoilCounter] = useRecoilState<boolean>(modalViewNotification)
	const [successModal, setSuccessModal] = useState(false)

	// profileImage 추가해야함
	const { mutate } = useMutation((data: signUpProps) => UserApi.SignUp(data), {
		onSuccess: () => {
			setSuccessModal(() => true)
		},
		onError: () => {},
	})

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

	const onValidation = async (target: string) => {
		const value = getValues(target)
		if (value?.trim().length === 0 || value === undefined) return

		if (target === 'SignUpEmail') {
			try {
				const res = await UserApi.getEmailValidation(value)
				const { response }: ResponseType = res?.data
				SignUpValidationError('SignUpEmail', setValidationMsg, response)
			} catch (err: any) {
				const response = err?.response.data.status
				SignUpValidationError('SignUpEmail', setValidationMsg, response)
			}
		}
		if (target === 'SignUpNickName') {
			try {
				const res = await UserApi.getNickNameValidation(value)

				const { response }: ResponseType = res?.data
				SignUpValidationError('SignUpNickName', setValidationMsg, response)
			} catch (err: any) {
				const response = err?.response.data.status
				SignUpValidationError('SignUpNickName', setValidationMsg, response)
			}
		}
	}

	const onSubmit: SubmitHandler<SignUpSubmitData> = e => {
		if (validationMsg.email.status !== 'success') {
			return setValidationMsg((prev: ValidationMsg) => ({
				...prev,
				email: { status: 'error', message: '이메일 중복확인 해주세요' },
			}))
		}
		if (validationMsg.nickname.status !== 'success') {
			return setValidationMsg((prev: ValidationMsg) => ({
				...prev,
				nickname: { status: 'error', message: '닉네임 중복확인 해주세요' },
			}))
		}

		let formData: FormData = new FormData()
		if (imgFile instanceof File) {
			formData.append('profileImage', imgFile)
		}
		const data = {
			email: e.SignUpEmail?.trim() || '',
			gender: e.Gender!,
			name: e.SignUpName?.trim() || '',
			nickname: e.SignUpNickName?.trim() || '',
			password: e.SignUpPw?.trim() || '',
			birthDate: e.SignUpBirthday?.trim() || '',
			phoneNumber: e.SignUpPhone?.trim() || '',
			profileImage: formData,
		}

		mutate(data)
	}

	return (
		<S.Wrapper onSubmit={handleSubmit(onSubmit)}>
			<S.container>
				<h3>회원가입</h3>

				<S.InputBox>
					<S.ProfileImg src={preFile as string} />
					<S.ImgLabel htmlFor="profileImg">
						<CameraIcon />
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

				<S.SelectBox
					{...register('Gender', {
						required: '성별을 선택해주세요',
					})}
				>
					<option value="">(남/여) 선택해주세요</option>
					<option value="MAN">남</option>
					<option value="WOMAN">여</option>
				</S.SelectBox>
				{errors.Gender && (
					<HookFormError>{errors.Gender?.message?.toString()}</HookFormError>
				)}
				<SignUpInput
					name="SignUpEmail"
					control={control}
					errorRules={HookFormRule.SignUpEmail}
					Icon={<EmailIcon />}
					placeholder="example@assembled.com"
					onValidation={onValidation}
				/>
				{validationMsg.email.status && (
					<HookFormError status={validationMsg.email.status!}>
						{validationMsg.email.message}
					</HookFormError>
				)}
				<SignUpInput
					name="SignUpName"
					control={control}
					errorRules={HookFormRule.SignUpName}
					Icon={<NameIcon />}
					placeholder="이름을 입력해주세요"
				/>
				<SignUpInput
					name="SignUpNickName"
					control={control}
					errorRules={HookFormRule.SignUpNickName}
					Icon={<NicknameIcon />}
					placeholder="닉네임을 입력해주세요"
					onValidation={onValidation}
				/>
				{validationMsg.nickname.status && (
					<HookFormError status={validationMsg.nickname.status}>
						{validationMsg.nickname.message}
					</HookFormError>
				)}
				<SignUpInput
					name="SignUpPw"
					control={control}
					errorRules={HookFormRule.SignUpPw}
					Icon={<LockIcon />}
					placeholder="비밀번호를 입력해주세요"
				/>
				<span>
					<LockIcon />
					<Input
						type="password"
						placeholder="위에 설정한 비밀번호를 입력해주세요"
						{...register('SignUpPwConfirm', {
							required: '비밀번호 확인을 입력해주세요',
							validate: val =>
								val === watch('SignUpPw') ||
								'입력한 비밀번호와 일치하지 않습니다',
						})}
					/>
				</span>
				{errors.SignUpPwConfirm && (
					<HookFormError>
						{errors.SignUpPwConfirm?.message?.toString()}
					</HookFormError>
				)}
				<SignUpInput
					name="SignUpBirthday"
					control={control}
					errorRules={HookFormRule.SignUpBirthday}
					Icon={<DateIcon />}
					placeholder="생년월일(8자리) ex) 19980505"
				/>
				<SignUpInput
					name="SignUpPhone"
					control={control}
					errorRules={HookFormRule.SignUpPhone}
					Icon={<PhoneIcon />}
					placeholder="휴대폰 번호를 -없이 입력해주세요"
				/>

				<Notice />
				<S.SignUpButton>회원가입</S.SignUpButton>

				{successModal && (
					<SuccessModal
						text={'회원가입 성공'}
						url={'/login'}
						setState={setSuccessModal}
					/>
				)}
				{recoilCounter && <NotificationModal text={'실패'} />}
				{recoilCounter && <NotificationModal text={'중복검사 해주세요'} />}
			</S.container>
		</S.Wrapper>
	)
}
export default SignUp

const Wrapper = styled.form`
	${TopPadding}
	display: flex;
	justify-content: center;
	font-size: ${({ theme }) => theme.FONT_SIZE.xs};
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
	margin: 2rem 0 5rem 0;
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
const SelectBox = styled.select`
	width: 100%;
	height: 3rem;
	border: none;
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.common.gray[400]};

	margin-bottom: 1rem;
	font-size: ${({ theme }) => theme.FONT_SIZE.xs};
`
const S = {
	Wrapper,
	container,
	SignUpButton,
	InputBox,
	ImgLabel,
	ProfileImg,
	SelectBox,
}
