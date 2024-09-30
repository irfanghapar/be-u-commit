"use client";

import dynamic from 'next/dynamic';
import { Developer } from '@/features/developers/services/listDev';

const UserCard = dynamic(() => import('./UserCard'), { ssr: false });

interface UserCardWrapperProps {
  developer: Developer;
}

export default function UserCardWrapper({ developer }: UserCardWrapperProps) {
  return <UserCard developer={developer} />;
}