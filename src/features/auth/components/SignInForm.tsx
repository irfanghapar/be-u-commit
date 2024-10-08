"use client"

import Image from 'next/image';
import Link from 'next/link';

export default function SignInForm() {
  return (
    <div className="flex w-screen flex-wrap text-slate-800">
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12">
          <Image src="icon.svg" alt="Icon description" width={30} height={25} />
        <a href="#" className="text-l pl-10 pt-2 font-bold text-primary"> Be-U Commit</a>
        </div>
        <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
          <p className="text-center text-3xl font-bold md:leading-tight md:text-left md:text-5xl">
            Welcome back <br />
            to <span className="text-primary">Be-U Commit</span>
          </p>
          <p className="mt-6 text-center font-medium md:text-left">Sign in to your account below.</p>
          <form className="flex flex-col items-stretch pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-primary">
                <input type="email" id="login-email" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Email" />
              </div>
            </div>
            <div className="mb-4 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-primary">
                <input type="password" id="login-password" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password" />
              </div>
            </div>
            <a href="#" className="mb-6 text-center text-sm font-medium text-gray-600 md:text-left">Forgot password?</a>
              <Link href="/dashboard">
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-primary ring-offset-2 transition hover:bg-primary focus:ring-2 md:w-32"
                >
                  Sign in
                </button>
            </Link>      
          </form>
          <div className="py-12 text-center">
            <p className="text-gray-600">Don't have an account?
              <a href="/sign-up" className="whitespace-nowrap font-semibold text-gray-900 underline underline-offset-4">  Sign up for free.</a>
            </p>
          </div>
        </div>
      </div>
      <div className="h-screen select-none bg-third md:w-1/2">
        <div className="py-16 px-8 text-white xl:w-[40rem] " >
          <span className="rounded-full bg-white px-3 py-1 font-medium text-primary">New Feature</span>
          <p className="my-6 text-3xl text-black font-semibold leading-10">See your top developers <span className="abg-white whitespace-nowrap py-2 text-300 text-primary">performing</span>.</p>
          <p className="mb-4 text-black">Filter them by how many they  <span className="abg-white whitespace-nowrap py-2 text-300 text-primary">commits, push, and progress</span></p>
          <a href="#" className="font-semibold tracking-wide text-primary underline underline-offset-4">Learn More</a>
        </div>
      </div>
    </div>
  );
}
