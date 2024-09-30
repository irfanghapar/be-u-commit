"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { AvatarConfig } from '../types/avatar';
import { genConfig } from 'react-nice-avatar';

const Avatar = dynamic(() => import('react-nice-avatar').then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="w-36 h-36 bg-gray-200 rounded-full">Loading...</div>,
});

interface ClientAvatarProps {
  seed?: string;
}

export default function ClientAvatar({ seed = "default" }: ClientAvatarProps) {
  const [config, setConfig] = React.useState<AvatarConfig | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      if (typeof genConfig !== 'function') {
        throw new Error('genConfig is not a function');
      }
      const avatarConfig = genConfig(seed);
      console.log('Avatar config:', avatarConfig); // Debug log
      setConfig(avatarConfig as AvatarConfig);
    } catch (err) {
      console.error('Error generating avatar config:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, [seed]);

  if (error) {
    return <div className="w-36 h-36 bg-red-200 rounded-full flex items-center justify-center text-red-600">Error: {error}</div>;
  }

  if (!config) {
    return <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="relative mx-auto w-36 h-36 rounded-lg">
      <Avatar style={{ width: '100%', height: '100%' }} {...config} />
    </div>
  );
}