'use client';

import { Building, BarChart3, Store, Heart, FileText, Monitor, PieChart, Home, Bell, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { mockNotifications } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function Sidebar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const pathname = usePathname();
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Calendar, label: 'Planejamento', href: '/planejamento' },
    { icon: Building, label: 'Programas', href: '/' },
    { icon: Store, label: 'Lojas', href: '/lojas' },
    { icon: Heart, label: 'OSCs', href: '/oscs' },
    { icon: FileText, label: 'NFs', href: '/nfs' },
    { icon: PieChart, label: 'Relatórios', href: '/relatorios' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed left-0 top-0 h-full w-72 bg-white border-r border-gray-100 flex flex-col z-10 shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between gap-3">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 131 151" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.9896 145.751C43.9579 164.935 131.54 128.559 130.581 72.6528C129.871 31.2343 80.8059 -6.65358 48.9345 0.988283C2.03461 12.2331 -15.716 124.005 15.9896 145.751Z" fill="#FF7F09"/>
                    <path d="M51.8641 98.7495C48.7411 98.7495 45.9929 98.0833 43.6194 96.7508C41.246 95.4183 39.3722 93.5445 37.9981 91.1294C36.6656 88.6727 35.9994 85.7995 35.9994 82.51C35.9994 79.3453 36.6448 76.5555 37.9356 74.1404C39.2264 71.6836 41.0586 69.7682 43.4321 68.3941C45.8055 66.9783 48.6162 66.2704 51.8641 66.2704C55.5284 66.2704 58.7347 67.2282 61.4829 69.1436C64.2312 71.0174 66.0841 74.0154 67.0419 78.1378H56.736C56.3196 76.9302 55.6742 76.035 54.7997 75.452C53.967 74.8274 52.926 74.5151 51.6768 74.5151C50.3026 74.5151 49.1784 74.8899 48.3039 75.6394C47.4711 76.3889 46.8465 77.3675 46.4301 78.575C46.0554 79.7826 45.868 81.0942 45.868 82.51C45.868 83.8841 46.0554 85.1957 46.4301 86.4449C46.8465 87.6525 47.4711 88.631 48.3039 89.3806C49.1784 90.1301 50.3026 90.5048 51.6768 90.5048C52.926 90.5048 53.967 90.1925 54.7997 89.5679C55.6742 88.9433 56.3196 88.0481 56.736 86.8822H67.0419C66.4589 89.4222 65.4595 91.5666 64.0438 93.3155C62.628 95.0644 60.8792 96.4177 58.7972 97.3754C56.7568 98.2915 54.4458 98.7495 51.8641 98.7495ZM74.5541 98V74.9523H71.0564V67.02H74.5541V65.8332C74.5541 61.586 75.6159 58.6087 77.7396 56.9015C79.9048 55.1526 82.7363 54.2782 86.2341 54.2782H89.4195V62.6478H87.6707C86.4631 62.6478 85.5887 62.8976 85.0474 63.3973C84.506 63.8553 84.2354 64.6257 84.2354 65.7083V67.02H89.4195V74.9523H84.2354V98H74.5541Z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 rethink-sans">Programas</p>
                  <p className="text-sm text-gray-500 hedvig-letters-sans">ADMIN</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>
          </div>
          
          {/* Notifications */}
          <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative hover:bg-gray-50 rounded-full h-12 w-12">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 rethink-sans">Notificações</h3>
                <p className="text-sm text-gray-500 hedvig-letters-sans">{unreadCount} não lidas</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {mockNotifications.map((notification) => (
                  <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm rethink-sans">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-1 hedvig-letters-sans">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2 hedvig-letters-sans">
                          {new Date(notification.data).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          notification.priority === 'alta' ? 'border-red-300 text-red-700' :
                          notification.priority === 'media' ? 'border-yellow-300 text-yellow-700' :
                          'border-gray-300 text-gray-700'
                        }`}
                      >
                        {notification.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="/notificacoes">
                    Ver todas as notificações
                  </a>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-orange-100 text-orange-700 border border-orange-200'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}