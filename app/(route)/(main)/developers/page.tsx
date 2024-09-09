"use client"

import { SelectTime } from "@/components/chart/SelectTime";
import { TotalDevPie } from "@/components/chart/TotalDevPie";
import { TotalDevCommitsLine } from "@/components/chart/TotalDevCommitsLine";
import { TopThreeDev } from "@/components/chart/TopThreeDev";
import { DevList } from "@/components/table/dev/List";

export default function developer() {
  const handleTimeChange = (timeRange: string) => {
    // Logic for filtering data by the selected time range
    console.log(`Selected time range: ${timeRange}`);
  };

  return (
    <div className="w-full px-4 md:px-2 lg:px-0">
      <h1 className="my-6 text-2xl font-bold text-black">Developers</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <TotalDevPie />
        </div>
        <div className="col-span-2">
          <TotalDevCommitsLine />
        </div>
      </div>
      <div className="mt-4 bg-white shadow-sm rounded-lg p-6 w-full mb-4 border">
        <SelectTime onChange={handleTimeChange} />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TopThreeDev />
          <TopThreeDev />
          <TopThreeDev />
        </div>
      </div>
      <DevList />
    </div>
  );
}
