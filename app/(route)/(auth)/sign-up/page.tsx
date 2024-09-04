import Image from "next/image";

export default function signUpPage() {
  return (
  <div className="mx-auto flex h-screen max-w-lg flex-col md:max-w-none md:flex-row md:pr-10">
    <div className="max-w-md rounded-3xl bg-primary text-third sm:px-10 md:m-6 md md:mr-8 ">
      <p className="mb-20 mt-10 font-bold text-third tracking-wider flex items-center">
        <Image src="icon_2.svg" alt="Icon description" width={50} height={50} className="mr-1.5"/>Be-U Commit
      </p>
      <p className="mb-4 ml-2 text-3xl font-bold text-third md:text-4xl md:leading-snug">
        Manage your developers<br/>
        and see their progress.
      </p>
      <p className="mb-28 ml-2 leading-relaxed text-gray-200">Track their commits from just a simple dashboard</p>
      <div className="bg-fourth rounded-2xl px-4 py-8">
      <span className="rounded-full bg-white px-3 py-1 font-small text-green">Addition +10,000</span>
      <span className="ml-2 rounded-full bg-white px-3 py-1 font-small text-red">Deletion -239</span>
        <div className="">
          <div className="mt-6 flex items-center">
          <Image className="rounded-full object-cover" src="/profile.jpeg" alt="Encik Hatta" width={40} height={40}/>
          <p className="ml-4 w-56">
            <strong className="block font-medium">Hatta Zainal (Keris)</strong>
            <span className="text-xs block text-gray-200">Elixir Open Source Contributor</span>
          </p>
          </div>
        </div>
      </div>
    </div>
    <div className="px-4 py-20">
      <h2 className="mb-4 text-3xl font-bold">Sign Up</h2>
      <a href="#" className="mb-10 block font-bold text-primary">Have an Account</a>
      <p className="mb-4 font-medium text-gray-500">Who are you?</p>
      <div className="mb-6 flex flex-col gap-y-2 gap-x-4 lg:flex-row">
        <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-4 font-medium text-gray-700">
        <input className="peer hidden" type="radio" name="radio" id="radio1" defaultChecked />
          <label className="peer-checked:border-primary peer-checked:bg-secondary absolute top-0 h-full w-full cursor-pointer rounded-xl border" htmlFor="radio1"> </label>
          <div className="peer-checked:border-transparent peer-checked:bg-primary peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-primary ring-offset-2"></div>
          <span className="pointer-events-none z-10">Admin</span>
        </div>
        <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
          <input className="peer hidden" type="radio" name="radio" id="radio2" />
          <label className="peer-checked:border-primary peer-checked:bg-secondary absolute top-0 h-full w-full cursor-pointer rounded-xl border" htmlFor="radio2"> </label>
          <div className="peer-checked:border-transparent peer-checked:bg-primary peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-primary ring-offset-2"></div>
          <span className="pointer-events-none z-10">Developer</span>
        </div>
      </div>
      <p className="mb-1 mt-8 font-medium text-gray-500">Email</p>
      <div className="mb-4 flex flex-col">
        <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
          <input type="email" id="signup-email" className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Enter your email" />
        </div>
      </div>
      <p className="mb-1 font-medium text-gray-500">Password</p>
      <div className="mb-4 flex flex-col">
        <div className="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
          <input type="password" id="signup-password" className="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Choose a password (minimum 8 characters)" />
        </div>
      </div>
      <div className="flex items-center space-x-8">
        <button className="mt-8 hover:shadow-white-600/40 rounded-xl bg-primary px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg">
          Sign Up
        </button>
        <a href="/sign-in" className="mt-8 font-medium text-gray-500 hover:text-gray-700 underline">
          Sign In
        </a>
      </div>
    </div>
  </div>
)}