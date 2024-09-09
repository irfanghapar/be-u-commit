'use client';

import { SidebarButton } from './SideBarButton';
import { SidebarItems } from '../types';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LogOut, MoreHorizontal, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();

  return (
    <aside className='w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r bg-white'>
      <div className='h-full px-3 py-4'>
        <div className="flex mt-8 items-center px-4">
        <Image 
          className="h-12 w-auto rounded-full max-w-full align-middle" 
          src="/icon.svg" 
          alt="Icon" 
          height={48} 
          width={48} // Replace with appropriate height and width for the image
          />          
          <div className="flex ml-6 flex-col">
            <span className="font-bold text-xl text-bold text-left text-primary">Be U Commit</span>
            <p className="mt-1 text-xs text-gray-500">A simple platform to track your developers</p>
          </div>
        </div>        
      <div className='mt-12'>
          <div className='flex flex-col gap-1 w-full'>
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidebarButton
                  icon={link.icon}
                  isSelected={pathname === link.href}
                  className='w-full'
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
            {props.sidebarItems.extras}
          </div>
          <div className='absolute left-0 bottom-3 w-full px-3'>
            <Separator className='absolute -top-3 left-0 w-full' />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='ghost' className='w-full justify-start'>
                  <div className='flex justify-between items-center w-full'>
                    <div className='flex gap-2'>
                      <Avatar className='h-5 w-5'>
                        <AvatarImage src='./profile.jpeg' />
                        <AvatarFallback>Encik Hatta (Keris)</AvatarFallback>
                      </Avatar>
                      <span>Encik Hatta (Keris)</span>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='mb-2 w-56 p-3 rounded-[1rem]'>
              <div className='space-y-1'>
                <Link href='/settings'> {/* Update the link for Account Settings */}
                  <SidebarButton size='sm' icon={Settings} className='w-full'>
                    Account Settings
                  </SidebarButton>
                </Link>
                <Link href='/sign-in'> {/* Update the link for Log Out to redirect to sign-in page */}
                  <SidebarButton size='sm' icon={LogOut} className='w-full'>
                    Log Out
                  </SidebarButton>
                </Link>
              </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </aside>
  );
}