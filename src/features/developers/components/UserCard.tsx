"use client";

import React from 'react';
import { Developer } from '@/features/developers/services/listDev';
import ClientAvatar from './ClientAvatar';

interface UserCardProps {
  developer: Developer;
}

export default function UserCard({ developer }: UserCardProps) {

  return (
    <div className="w-full h-full">
      <div className="rounded-lg border bg-white px-4 pt-8 shadow-sm h-full flex flex-col justify-between">
        <div>
          <div className="relative mx-auto w-36 rounded-lg">
          <ClientAvatar />
          </div>
          <h1 className="mt-2 my-1 text-center text-xl font-bold leading-8 text-black">
            {developer.email.split('@')[0].split(/[-_.]/).map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </h1>
          <h4 className="text-sm text-center leading-6 text-primary hover:text-secondary">Developer</h4>
        </div>
        <ul className="divide-y rounded bg-white-800 my-2 px-3 text-gray-600 hover:text-black">
          <li className="flex items-center py-3 text-sm">
            <img className="mt-1 mr-3 h-10 w-10 rounded-full" src="/push.svg" alt="" />
            <div className="flex flex-col mt-1">
              <span className="mb-1 text-base text-gray-700 font-semibold">10.30 a.m. today</span>
              <span className="text-gray-400 text-xs">Last Push</span>
            </div>
          </li>
          <li className="flex items-center py-3 text-sm">
            <img className="mt-1 mr-3 h-10 w-10 rounded-full" src="/commit_icon.svg" alt="" />
            <div className="flex flex-col mt-1">
              <span className="mb-1 text-base text-gray-700 font-semibold">150</span>
              <span className="text-gray-400 text-xs">Total Commits</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}