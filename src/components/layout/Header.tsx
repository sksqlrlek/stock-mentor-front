import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../context/AuthContext'
import SearchBar from '../stock/SearchBar'

const NAV_ITEMS = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'Watchlist', path: ROUTES.WATCHLIST },
]

function Header() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === ROUTES.HOME) return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="bg-[#010409] border-b border-[#30363d] sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-6 h-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to={ROUTES.HOME} className="text-xl font-black text-white tracking-tighter">
            StockMentor
          </Link>
          <nav className="hidden md:flex items-center h-full">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`h-16 flex items-center px-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-white border-primary-container'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block w-64">
            <SearchBar placeholder="종목 검색..." size="sm" />
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to={ROUTES.MY_PAGE}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  isActive(ROUTES.MY_PAGE)
                    ? 'text-white bg-surface-container-high'
                    : 'text-gray-400 hover:text-white hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">account_circle</span>
                {user.nickname}
              </Link>
              <button
                onClick={logout}
                className="text-gray-400 hover:text-[#f85149] transition-colors text-sm px-3 py-1.5 rounded-lg hover:bg-[#f85149]/10"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to={ROUTES.LOGIN}
                className="text-gray-400 hover:text-white transition-colors text-sm px-3 py-1.5 rounded-lg hover:bg-surface-container"
              >
                Login
              </Link>
              <Link
                to={ROUTES.SIGNUP}
                className="bg-primary-container text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header