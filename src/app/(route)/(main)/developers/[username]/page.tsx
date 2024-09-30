import React from 'react';
import { listDevelopers } from '@/features/developers/services/listDev';
import dynamic from 'next/dynamic';
import { RepoCard } from "@/features/developers/components/RepoCard";
import ActCal from "@/features/developers/components/ActCal";
import activityData from "@/data/act.json";
import { CommitsAct } from '@/features/developers/components/chart/CommitsAct';

const ClientSideUserCard = dynamic(() => import('@/features/developers/components/UserCard'), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-gray-100 rounded-lg animate-pulse"></div>,
});

const explicitTheme = {
  light: ['#e0f2e9', '#b2e3c2', '#80d49c', '#4cc374', '#1fa05e'],
  dark: ['#e0f2e9', '#b2e3c2', '#80d49c', '#4cc374', '#1fa05e'],
};

export async function generateStaticParams() {
  const developers = await listDevelopers();
  return developers.map((dev) => ({
    username: dev.email.split('@')[0],
  }));
}

export default async function DeveloperProfilePage({ params }: { params: { username: string } }) {
  const developers = await listDevelopers();
  const developer = developers.find(dev => dev.email.split('@')[0] === params.username);

  if (!developer) {
    return <div>Developer not found</div>;
  }

  return (
    <div className="w-full">
      <h1 className="my-6 text-2xl font-bold text-black px-4">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 lg:col-span-3 w-full">
          <ClientSideUserCard developer={developer} />
        </div>
        <div className="md:col-span-8 lg:col-span-9 w-full">
          <RepoCard/>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow px-4 mt-6">
        <h2 className="pt-8 mt-4 mb-4 text-xl font-bold text-black px-4">Activity Calendar</h2>
        <div className="ml-4 flex justify-center mt-4 mb-4 p-6">
          <div className="w-full">
            <ActCal
              data={activityData}
              theme={explicitTheme}
              style={{ width: '100%', height: '200px' }}
            />
          </div>
        </div>
      </div>
      <div className='pb-4 mb-4 mt-6'>
        <CommitsAct developerId={developer.id} />
      </div>
    </div>
  );
}