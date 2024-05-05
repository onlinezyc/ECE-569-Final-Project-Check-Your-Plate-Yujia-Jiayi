import { Outlet, useMatches, useNavigate } from 'react-router-dom'
import { useMount, useSetState, useTitle } from 'ahooks'
import logo from '@/assets/cyp_logo.png'
import './layout.scss'
export default () => {
  const matches: any = useMatches()
  const navigate = useNavigate()

  useTitle(matches[1].handle?.title || 'web')
  const [userInfo, setUserInfo] = useSetState({
    username: 'admin',
    password: '123456',
    avatar:
      'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  })
  useMount(() => {
    console.log(window.location.pathname)
  })
  return (
    <>
      <div className="flex w-screen h-screen flex-col">
        <div className="header navbar w-full flex ">
          <div className="navbar-start">
            <img className="logo" src={logo}></img>
            <h1 className='logo-text'>Check Your Plate</h1>
          </div>
          <div className="navbar-end">
            <button className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 svg-style"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 svg-style"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item">
                  new
                </span>
              </div>
            </button>
            <div className="dropdown  dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={userInfo.avatar}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li onClick={() => navigate('/profile')}>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>

                <li onClick={() => navigate('/login')}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full">
          <div className="side flex-none">
            <ul className="menu rounded-box">
              <li onClick={() => navigate('/home')}>
                <a
                  className={
                    window.location.pathname === '/home' ? 'active' : ''
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Home
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full main grow overflow-y-auto whitespace-nowrap  preview border-base-300 bg-base-100  p-4 [border-width:var(--tab-border)] ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
