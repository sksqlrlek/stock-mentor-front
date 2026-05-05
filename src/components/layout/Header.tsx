import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../context/AuthContext'
import SearchBar from '../stock/SearchBar'

function Header() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-[#010409] border-b border-[#30363d] sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-6 h-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to={ROUTES.HOME} className="text-xl font-black text-white tracking-tighter">
            StockMentor
          </Link>
          <nav className="hidden md:flex gap-6 items-center h-full">
            <Link to={ROUTES.HOME} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
              Home
            </Link>
            <Link to={ROUTES.WATCHLIST} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium">
              Watchlist
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block w-64">
            <SearchBar placeholder="종목 검색..." size="sm"/>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to={ROUTES.MY_PAGE} className="text-gray-400 hover:text-white transition-colors text-sm">
                {user.nickname}
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to={ROUTES.LOGIN} className="text-gray-400 hover:text-white transition-colors text-sm px-3 py-1.5">
                Login
              </Link>
              <Link to={ROUTES.SIGNUP} className="bg-primary-container text-white px-4 py-1.5 rounded text-sm font-medium hover:opacity-90 transition-opacity">
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