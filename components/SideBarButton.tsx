import { LucideIcon } from 'lucide-react';
import { Button, ButtonProps } from './ui/button';
import { cn } from '@/lib/utils';
import { SheetClose } from './ui/sheet';

interface SidebarButtonProps extends ButtonProps {
  icon?: LucideIcon;
  isSelected?: boolean;
}

export function SidebarButton({
  icon: Icon,
  className,
  children,
  isSelected,
  ...props
}: SidebarButtonProps) {
  return (
    <Button
      variant='ghost'
      className={cn(
        'gap-2 justify-start relative',
        isSelected && 'bg-primary/10 text-primary',
        className
      )}
      {...props}
    >
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
      )}
      {Icon && <Icon size={20} />}
      <span>{children}</span>
    </Button>
  );
}

export function SidebarButtonSheet(props: SidebarButtonProps) {
  return (
    <SheetClose asChild>
      <SidebarButton {...props} />
    </SheetClose>
  );
}