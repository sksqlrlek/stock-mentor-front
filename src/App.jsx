import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ROUTES } from './constants/routes'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import StockDetailPage from './pages/StockDetailPage'
import WatchlistPage from './pages/WatchlistPage'
import MyPage from './pages/MyPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.STOCK_DETAIL} element={<StockDetailPage />} />
          <Route path={ROUTES.WATCHLIST} element={<WatchlistPage />} />
          <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App