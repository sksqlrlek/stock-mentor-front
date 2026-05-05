import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
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
          <Route path={ROUTES.HOME} element={<Layout><HomePage /></Layout>} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.STOCK_DETAIL} element={<Layout><StockDetailPage /></Layout>} />
          <Route path={ROUTES.WATCHLIST} element={<Layout><WatchlistPage /></Layout>} />
          <Route path={ROUTES.MY_PAGE} element={<Layout><MyPage /></Layout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App