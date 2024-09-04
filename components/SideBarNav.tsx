'use client';

import {
  Home,
  MoreHorizontal,
  Users,
  Settings,
} from 'lucide-react'; 
import { SidebarDesktop } from './SideBarDesktop';
import { SidebarItems } from './types';
import { SidebarButton } from './SideBarButton';
import { useMediaQuery } from 'usehooks-ts';
import { SidebarMobile } from './SideBarMobile';

const sidebarItems: SidebarItems = {
  links: [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    {
      href: '/developers',
      icon: Users,
      label: 'Developers',
    },
    {
      href: '/settings',
      icon: Settings,
      label: 'Settings',
    },
  ],
  extras: (
    <div className='flex flex-col gap-2'>
      <SidebarButton icon={MoreHorizontal} className='w-full'>
        Upcoming Features....
      </SidebarButton>
    </div>
  ),
};

export function Sidebar() {
  const isDesktop = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}
