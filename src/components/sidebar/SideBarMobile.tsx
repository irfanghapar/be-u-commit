'use client';

import { SidebarItems } from '../types';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { LogOut, Menu, MoreHorizontal, Settings, X } from 'lucide-react';
import Link from 'next/link';
import { SidebarButtonSheet as SidebarButton } from './SideBarButton';
import { usePathname } from 'next/navigation';
import { Separator } from '../ui/separator';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}

export function SidebarMobile(props: SidebarMobileProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' variant='ghost' className='fixed top-3 left-3'>
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='px-3 py-4 bg-white'>
        <SheetHeader className='flex flex-row justify-between items-center space-y-0'>
          <div className="flex mt-8 items-center px-4">
            <img className="h-12 w-auto rounded-full max-w-full align-middle" src="/icon.svg" alt="" />
            <div className="flex ml-6 flex-col">
              <span className="font-bold text-xl text-bold text-left text-primary">Be U Commit</span>
              <p className="pt-1  text-left text-xs text-gray-500">A simple platform to track your developers</p>
            </div>
          </div>  
        </SheetHeader>
        <div className='mt-8 h-full'>
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
          <div className='absolute w-full bottom-4 px-1 left-0'>
            <Separator className='absolute -top-3 left-0 w-full' />
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant='ghost' className='w-full justify-start'>
                  <div className='flex justify-between items-center w-full'>
                    <div className='flex gap-2'>
                      <Avatar className='h-5 w-5'>
                        <AvatarImage src='./profile.jpeg' />
                        <AvatarFallback>Encik Hatta (keris)</AvatarFallback>
                      </Avatar>
                      <span>Encik Hatta (keris)</span>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </Button>
              </DrawerTrigger>
              <DrawerContent className='mb-2 p-2'>
                <div className='flex flex-col space-y-2 mt-2'>
                  <Link href='/'>
                    <SidebarButton size='sm' icon={Settings} className='w-full'>
                      Account Settings
                    </SidebarButton>
                  </Link>
                  <SidebarButton size='sm' icon={LogOut} className='w-full'>
                    Log Out
                  </SidebarButton>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}