import React from 'react';
import { TotalCommits } from '@/components/chart/TotalCommitsLine';
import { TotalPullReq } from '@/components/chart/TotalPullReqBar';
import { TopTenTable } from '@/components/table/dev/TopTen';

export default function Dashboard() {
  return (
    <div className="w-full px-4 md:px-2 lg:px-0">
      <h1 className="my-6 text-2xl font-bold text-black">Dashboard</h1>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <TotalCommits />
        </div>
        <div className="col-span-1">
          <TotalPullReq />
        </div>
      </div>
      <TopTenTable />
    </div>
  );
}
