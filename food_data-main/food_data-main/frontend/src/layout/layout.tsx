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
      {/* Top nav bar */}
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

        {/* Side nav bar */}
        <div className="flex h-full w-full">  
          <div className="side flex-none">
            <ul className="menu rounded-box">
              <li onClick={() => navigate('/home')}>
                <a className={window.location.pathname === '/home' ? 'active' : ''}>
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

              <li onClick={() => navigate('/home')}>
                <a className={window.location.pathname === '/home' ? 'active' : ''}>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1.4em"
                  width="1.4em"
                >
                  <path d="M20 10a5.268 5.268 0 00-7-2V3h-2v5a5.268 5.268 0 00-7 2c-2 3 3 12 5 12s2-1 3-1 1 1 3 1 7-9 5-12m-1.75 3.38c-.62 2.47-1.84 4.74-3.55 6.62-.2 0-.43-.1-.6-.25a3.34 3.34 0 00-4.2 0c-.17.15-.4.25-.6.25a15.267 15.267 0 01-3.55-6.61c-.25-.73-.3-1.52-.09-2.27A3.37 3.37 0 018.5 9.4c.56.01 1.11.14 1.61.39l.89.45h2l.89-.45c.5-.25 1.05-.38 1.61-.39 1.18.03 2.26.68 2.84 1.71.21.75.16 1.54-.09 2.27M11 5C5.38 8.07 4.11 3.78 4.11 3.78S6.77.19 11 5z" />
                </svg>
                  Food Database
                </a>
              </li>

              <li onClick={() => navigate('/home')}>
                <a className={window.location.pathname === '/home' ? 'active' : ''}>
                <svg
                  viewBox="0 0 256 512"
                  fill="currentColor"
                  height="1.3em"
                  width="1.3em"
                >
                  <path d="M64 0C50.7 0 40 10.7 40 24s10.7 24 24 24c4.4 0 8 3.6 8 8v64.9c0 12.2-7.2 23.1-17.2 30.1C21.7 174.1 0 212.5 0 256v192c0 35.3 28.7 64 64 64h128c35.3 0 64-28.7 64-64V256c0-43.5-21.7-81.9-54.8-105-10-7-17.2-17.9-17.2-30.1V56c0-4.4 3.6-8 8-8 13.3 0 24-10.7 24-24S205.3 0 192 0H64zm64 382c-26.5 0-48-20.1-48-45 0-16.8 22.1-48.1 36.3-66.4 6-7.8 17.5-7.8 23.5 0 14.1 18.3 36.2 49.6 36.2 66.4 0 24.9-21.5 45-48 45z" />
                </svg>
                  Nutrient Database
                </a>
              </li>

              <li onClick={() => navigate('/recipe')}>
                <a className={window.location.pathname === '/recipe' ? 'active' : ''}>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  height="1.4em"
                  width="1.4em"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M7 3 H17 A2 2 0 0 1 19 5 V19 A2 2 0 0 1 17 21 H7 A2 2 0 0 1 5 19 V5 A2 2 0 0 1 7 3 z" />
                  <path d="M9 7h6M9 11h6M9 15h4" />
                </svg>
                  Recipes
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
