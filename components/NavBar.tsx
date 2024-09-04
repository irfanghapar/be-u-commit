export default function NavBar() {
  return(
    <div className="fixed top-0 left-0 z-50 w-screen bg-gray-100">
    <div className="h-screen w-64 pb-10">
    <div className="flex h-full flex-grow flex-col overflow-y-auto rounded-br-lg rounded-tr-lg bg-white pt-5 shadow-md">
      <div className="flex mt-10 items-center px-4">
        <img className="h-12 w-auto rounded-full max-w-full align-middle" src="/profile.jpeg" alt="" />
        <div className="flex ml-3 flex-col">
          <h3 className="font-medium">Encik Hatta (Keris)</h3>
          <p className="text-xs text-gray-500">Vice President CDX Digital Experience</p>
        </div>
      </div>
  
      <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">Analytics</span>
  
      <div className="flex mt-3 flex-1 flex-col">
        <div className="">
          <nav className="flex-1">
            <a href="/dashboard" title="" className="flex cursor-pointer items-center border-l-4 border-l-rose-600 py-2 px-4 text-sm font-medium text-rose-600 outline-none transition-all duration-100 ease-in-out focus:border-l-4">
              <svg className="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" className=""></path>
              </svg>
              Dashboard
            </a>
          </nav>
          <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">Management</span>
  
          <nav className="flex-1">
            <a href="/developers" className="flex cursor-pointer items-center border-l-rose-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4">
              <svg className="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Developers
            </a>
          </nav>
          </div>
          <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">Profile</span>

          <nav className="flex-1">
            <a href="/settings" className="flex cursor-pointer items-center border-l-rose-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4">
              <svg className="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Settings
            </a>
          </nav>
      </div>
    </div>
  </div>
  </div>
  )
}