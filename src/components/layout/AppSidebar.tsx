'use client';

import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Eye,
  HandHeart,
  MessageCircle,
  Trophy,
  Hospital,
  User,
  LogOut
} from 'lucide-react';
import { Logo } from '../icons/logo';
import { useUser } from '@/context/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/eye-screening', label: 'Eye Screening', icon: Eye },
  { href: '/dashboard/donate-blood', label: 'Donate Blood', icon: HandHeart },
  { href: '/dashboard/health-ai', label: 'Ask Health AI', icon: MessageCircle },
  { href: '/dashboard/community', label: 'Community', icon: Trophy },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { user, setUser } = useUser();
  const avatar = PlaceHolderImages.find(img => img.id === 'user-avatar-1');

  const handleLogout = () => {
    setUser(null);
    // The layout's useEffect will handle the redirect
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <span className="text-xl font-headline font-semibold text-primary">LumiSight</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                href={item.href}
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <a href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
              <SidebarMenuButton tooltip="Logout" onClick={handleLogout}>
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
