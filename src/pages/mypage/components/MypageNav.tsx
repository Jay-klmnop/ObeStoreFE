import { NavLink } from 'react-router-dom';

export function MypageNav() {
  const handleClickLogout = () => {};

  return (
    <div className='mt-10 flex w-full flex-col lg:mt-15 lg:w-[230px] lg:p-4.5'>
      <h2 className='flex text-2xl font-semibold'>Mypage</h2>
      <ul className='flex w-full flex-1 flex-row gap-5 lg:flex-col lg:gap-0'>
        <li className='lg:my-7.5'>
          <NavLink
            to='/mypage/orderinfo'
            className={({ isActive }) =>
              `link-button text-primary-500-80 flex font-bold lg:text-lg ${isActive ? 'text-secondary-300 font-semibold' : 'text-gray-500'}`
            }
          >
            주문 내역
          </NavLink>
        </li>

        <li className='lg:mb-7.5'>
          <NavLink
            to='/mypage/info'
            className={({ isActive }) =>
              `link-button text-primary-500-80 flex font-bold lg:text-lg ${isActive ? 'text-secondary-300 font-semibold' : 'text-gray-500'}`
            }
          >
            나의 정보 조회/수정
          </NavLink>
        </li>

        <li className='lg:mb-7.5'>
          <NavLink
            to='/mypage/addressinfo'
            className={({ isActive }) =>
              `link-button text-primary-500-80 flex font-bold lg:text-lg ${isActive ? 'text-secondary-300 font-semibold' : 'text-gray-500'}`
            }
          >
            배송지 정보 조회/수정
          </NavLink>
        </li>

        <li>
          <button onClick={handleClickLogout} className='text-primary-500-80 font-bold lg:text-lg'>
            로그아웃
          </button>
        </li>
      </ul>
    </div>
  );
}
