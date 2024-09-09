import React from 'react';
import { RepoCard } from "@/components/RepoCard"
import UserCard from "@/components/UserCard"

export default function Username() {
  return (
    <div className="w-full">
      <h1 className="my-6 text-2xl font-bold text-black px-4">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 lg:col-span-3 w-full">
          <UserCard/>
        </div>
        <div className="md:col-span-8 lg:col-span-9 w-full">
          <RepoCard/>
        </div>
      </div>
      <h1 className="my-6 text-xl font-bold text-black px-4">Activity Calendar</h1>
    </div>
  )
}