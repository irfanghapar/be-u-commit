import React from 'react';
import { TotalCommits } from '@/components/chart/TotalCommitsLine'
import { Dev } from '@/components/chart/TopThreeDev'
import { DevList } from '@/components/table/dev/List'

export default function Dashboard() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="my-6 text-2xl font-bold text-black">Dashboard</h1>
      <div className="mb-8">
        <TotalCommits />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Dev />
        <Dev />
        <Dev />
      </div>
      <DevList/>
    </div>
  )
}