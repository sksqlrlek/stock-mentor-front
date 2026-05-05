import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-space-lg">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout