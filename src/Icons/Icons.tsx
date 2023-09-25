import { CiWarning } from 'react-icons/ci'
import {
	AiOutlineMail,
	AiOutlineLock,
	AiFillBank,
	AiFillCaretRight,
	AiOutlineCamera,
	AiOutlineCheckCircle,
	AiFillHeart,
	AiOutlineHeart,
	AiOutlineUndo,
	AiOutlineHome,
	AiOutlineQuestionCircle,
	AiOutlineSend,
} from 'react-icons/ai'
import {
	BsFillPersonFill,
	BsChat,
	BsPhone,
	BsCaretDownFill,
	BsFileEarmarkPerson,
	BsTrash,
	BsDot,
} from 'react-icons/bs'
import { BiUser, BiHappy, BiChevronsUp, BiLogOut } from 'react-icons/bi'
import { MdOutlineCancel, MdOutlineToday } from 'react-icons/md'
import { RiUser5Line, RiComputerLine, RiArrowGoBackLine } from 'react-icons/ri'
import { FiBook } from 'react-icons/fi'
import { FaQuestion, FaPen } from 'react-icons/fa'
import { IoIosAirplane, IoIosArrowForward } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RxCross2 } from 'react-icons/rx'
import { HiOutlinePlus } from 'react-icons/hi'
import { GrView } from 'react-icons/gr'

type IconSize = {
	size?: string
}

type IconRotate = {
	rotate?: number
	onClick?: React.MouseEventHandler<SVGSVGElement>
}
interface OnClickIconType {
	onClick?: React.MouseEventHandler<SVGSVGElement>
}

export const Person_Icon = ({ size }: IconSize) => (
	<BsFillPersonFill size={size} />
) // 사람

export const Chat_Icon = ({ size }: IconSize) => <BsChat size={size} /> // 채팅

export const Email_Icon = () => <AiOutlineMail size={'22'} /> //이메일

export const Lock_Icon = () => <AiOutlineLock size={'22'} /> //자물쇠

export const Name_Icon = () => <BiUser size={'22'} /> //인간

export const Phone_Icon = () => <BsPhone size={'22'} /> //핸드폰

export const Date_Icon = () => <MdOutlineToday size={'22'} /> //달력

export const Nickname_Icon = () => <RiUser5Line size={'22'} /> //달력

export const Warning_Icon = ({ size }: IconSize) => (
	<CiWarning size={size} color="#FB9B00" />
) //경고

export const DownIcon = () => <BsCaretDownFill size={'30'} color="#FB9B00" />
export const SmallDownIcon = () => (
	<BsCaretDownFill size={'20'} color="#a6a6a6" />
)

export const Computer_Icon = () => <RiComputerLine size={'30'} /> //컴퓨터

export const Book_Icon = () => <FiBook size={'30'} /> //독서

export const People_Icon = () => <BsFileEarmarkPerson size={'30'} /> //면접

export const Club_Icon = () => <AiFillBank size={'30'} /> //동아리

export const Travel_Icon = () => <IoIosAirplane size={'30'} /> //여행

export const Question_Icon = ({ size }: IconSize) => (
	<FaQuestion size={size} color="#FB9B00" />
) //경고

export const Clap_Icon = () => <BiHappy size={'65'} color="#FB9B00" />

export const PaginationArrowSingle_Icon = ({ rotate }: IconRotate) => (
	<AiFillCaretRight style={{ transform: `rotate(${rotate}deg)` }} />
) // 페이지네이션화살표 (>)

export const Camera_Icon = () => <AiOutlineCamera size={'25'} /> // 이미지 추가

export const Check_Icon = () => (
	<AiOutlineCheckCircle size={'100'} color="#FB9B00" />
) //체크 버튼
export const Pen_Icon = () => <FaPen size={'17'} color="#777" /> //펜모양

export const Trash_Icon = () => <BsTrash size={'17'} color="#777" /> //쓰레기통 버튼

export const NotFillHeart_Icon = ({ onClick }: OnClickIconType) => (
	<AiOutlineHeart size={'23'} onClick={onClick} color={'#f60004'} />
) // 빈 하트
export const FillHeart_Icon = ({ onClick }: OnClickIconType) => (
	<AiFillHeart size={'23'} onClick={onClick} color={'#f60004'} />
) // 찬 하트
export const Hamburger_Icon = ({ onClick }: OnClickIconType) => (
	<GiHamburgerMenu size={'23'} onClick={onClick} color="#FB9B00" />
) // 햄버거
export const Cancel_Icon = () => <MdOutlineCancel size={'17'} color="#777" /> //취소 버튼
export const Cancel_big_Icon = ({ onClick }: OnClickIconType) => (
	<RxCross2
		size={'35'}
		color="#FB9B00"
		onClick={onClick}
		style={{ cursor: 'Pointer' }}
	/>
) //취소 버튼
export const Cancel_Black_Icon = ({ onClick }: OnClickIconType) => (
	<RxCross2 size={'30'} onClick={onClick} />
) //취소 버튼

export const Dot_Icon = () => <BsDot size={'35'} color="#FB9B00" />
//점

export const Plus_Icon = () => <HiOutlinePlus size={'22'} color="#FB9B00" />
//플러스

export const Up_Icon = () => <BiChevronsUp size={'40'} color="#FDD19B" />
//Up

export const View_Icon = () => <GrView size={'15'} />

export const Refetch_Icon = () => <AiOutlineUndo size={'23'} />

export const Home_Icon = ({ onClick }: OnClickIconType) => (
	<AiOutlineHome size={'23'} onClick={onClick} />
)
export const Arrow_Icon = ({ rotate, onClick }: IconRotate) => (
	<IoIosArrowForward
		size={'23'}
		onClick={onClick}
		style={{ transform: `rotate(${rotate}deg)`, cursor: 'Pointer' }}
	/>
)
export const LogOut_Icon = ({ onClick }: OnClickIconType) => (
	<BiLogOut size={'23'} onClick={onClick} />
)
export const UserQuestion_Icon = () => (
	<AiOutlineQuestionCircle
		size={'21'}
		style={{ marginLeft: '1rem' }}
		color="#FB9B00"
	/>
)
export const Back_Icon = () => <RiArrowGoBackLine size={'20'} />
export const Send_Icon = () => (
	<AiOutlineSend size={'25'} style={{ cursor: 'Pointer' }} />
)
