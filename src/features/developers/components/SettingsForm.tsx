import { Button } from "@/components/ui/button";

export default function SettingsForm() {
  return (
    <div className="text-xl font-bold mt-10">
      Setting s
      <div className="shadow-md mb-5 mt-10 rounded-lg m-4 p-2 h-50">
        <div className="font-bold text-xl mb-4 ml-4 ">
          <label>Account</label>
        </div>
        <table className="w-full border-separate border-spacing-4">
          <tbody>
            <tr>
              <td>
                <div className="font-bold text-sm text-black mb-2">First Name</div>
                <div className="bg-slate-100 text-left text-gray-500 font-bold text-sm pl-3 h-4 rounded-xl w-full box-border">
                  Wade
                </div>
              </td>
              <td>
                <div className="font-bold text-sm text-black mb-2">Last Name</div>
                <div className="bg-slate-100 text-left text-gray-500 font-bold text-sm pl-3 rounded-lg w-full box-border">
                  Warren
                </div>
              </td>
              <td className="row-span-3">
                <div className="flex flex-col items-center">
                  <Button className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">
                    Update
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="font-bold text-sm text-black mb-2">Role</div>
                <div className="bg-slate-100 text-left text-gray-500 font-bold text-sm pl-3 rounded-lg w-full box-border">
                  Developer
                </div>
              </td>
              <td>
                <div className="font-bold text-sm text-black mb-2">Branch</div>
                <div className="bg-slate-100 text-left text-gray-500 font-bold text-sm pl-3 rounded-lg w-full box-border">
                  Abcd-123
                </div>
              </td>
            </tr>
            <tr>
              <td className="col-span-2">
                <div className="font-bold text-sm text-black mb-2">Email Address</div>
                <div className="bg-slate-100 text-left text-gray-500 font-bold text-sm pl-3 rounded-lg w-full box-border">
                  abcd@gmail.com
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Second container with password and button */}
      <div className="p-3 mb-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <div className="flex-grow">
            <div className="font-bold text-sm text-black mb-2">Password</div>
            <div className="flex items-center bg-slate-100 rounded-lg py-2 px-3">
              <div className="flex-grow font-bold text-gray-500 text-sm">*****</div>
            </div>
          </div>
          <Button type="button" className="bg-blue-500 text-white py-1 px-3 rounded">
            Change Password
          </Button>
        </div>
      </div>

      {/* Third container with remove account section */}
      <div className="p-4 mb-4 bg-white rounded-lg shadow-md border border-red-500">
        <div className="mb-4">
          <label className="font-bold text-lg">Remove Account</label>
          <p className="text-sm text-gray-600 mt-2">
            You can "Disable Account" to take a break from BE U
          </p>
        </div>
        <div className="flex space-x-2">
          <Button type="button" className="bg-pink-700 text-white py-2 px-4 rounded">
            Disable Account
          </Button>
          <Button type="button" className="bg-pink-200 text-pink-700 py-2 px-4 rounded hover:bg-pink-200 hover:text-pink-700">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};