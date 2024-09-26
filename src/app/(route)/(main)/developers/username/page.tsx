import React from 'react';
import { RepoCard } from "@/features/developers/components/RepoCard";
import UserCard from "@/features/settings/components/UserCard";
import ActCal from "@/features/developers/components/ActCal"; // Import the ActCal component
import activityData from "@/data/act.json";
import { CommitsAct } from '@/features/developers/components/chart/CommitsAct';

// Define your theme
const explicitTheme = {
  light: ['#e0f2e9', '#b2e3c2', '#80d49c', '#4cc374', '#1fa05e'],
  dark: ['#e0f2e9', '#b2e3c2', '#80d49c', '#4cc374', '#1fa05e'],
};

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
      <div className="bg-white rounded-lg shadow px-4">
        <h1 className="pt-8 mt-4 mb-4 text-xl font-bold text-black px-4">Activity Calendar</h1>
        <div className="ml-4 flex justify-center mt-4 mb-4 p-6"> {/* Center the table */}
          <div className="w-full"> {/* Make sure the table takes full width */}
            <ActCal
              data={activityData}
              theme={explicitTheme}
              style={{ width: '100%', height: '200px' }} // Full width and appropriate height
            />
          </div>
        </div>
      </div>
      <div className='pb-4 mb-4'>
        <CommitsAct/>
      </div>
    </div>
  )
}
