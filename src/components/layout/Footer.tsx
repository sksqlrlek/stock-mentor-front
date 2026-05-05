function Footer() {
  return (
    <footer className="bg-[#0d1117] border-t border-[#30363d] mt-auto">
      <div className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-lg font-bold text-gray-300">StockMentor</span>
          <p className="text-xs text-gray-500">© 2025 StockMentor. Guided Precision for Korean Investors.</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">About Us</a>
          <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Contact</a>
        </nav>
        <p className="text-xs text-gray-500 text-center">
          이 서비스는 투자 정보 제공을 목적으로 하며,<br/>
          실제 투자 결정은 본인의 판단과 책임 하에 이루어져야 합니다.
        </p>
      </div>
    </footer>
  )
}

export default Footer