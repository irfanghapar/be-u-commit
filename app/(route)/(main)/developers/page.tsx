import { TotalCommitsPie } from "@/components/chart/TotalCommitsPie";
import { TopTenTable } from "@/components/table/dev/TopTen";

export default function developer () {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="my-6 text-2xl font-bold text-black">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TotalCommitsPie/>
        <TotalCommitsPie/>
        <TotalCommitsPie/>
      </div>
      <TopTenTable/>
    </div>
  )
}