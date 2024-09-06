import { TotalDevPie } from "@/components/chart/TotalDevPie";
import { TotalDevCommitsLine } from "@/components/chart/TotalDevCommitsLine";
import { TopThreeDev } from "@/components/chart/TopThreeDev";
import { DevList } from "@/components/table/dev/List";

export default function developer() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="my-6 text-2xl font-bold text-black">Developers</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <TotalDevPie />
        </div>
        <div className="col-span-2">
          <TotalDevCommitsLine />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TopThreeDev />
        <TopThreeDev />
        <TopThreeDev />
      </div>
      <DevList />
    </div>
  );
}
