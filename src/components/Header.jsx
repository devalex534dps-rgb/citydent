import React from 'react';
import { Search, Bell, HelpCircle, User, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export default function Header({
  searchQuery = '',
  onSearchChange,
  unreadCount = 0,
  isNotificationsActive = false,
  onOpenNotifications,
  onNavigate,
  onLogout,
}) {
  return (
    <header className="fixed top-0 left-64 right-0 z-20 h-20 bg-[#f8fafc]/95 backdrop-blur-sm flex items-center justify-between px-10 gap-4">
      {/* Search Input Container */}
      <div className="w-full max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="size-4" />
          </div>
          <Input
            className="pl-10 pr-4 py-2 h-9"
            placeholder="Buscar pacientes, citas..."
            type="search"
            value={searchQuery}
            onChange={(e) =>
              onSearchChange && onSearchChange(e.target.value)
            }
          />
        </div>
      </div>

      {/* Right Header Actions & Profile */}
      <div className="flex items-center gap-5">
        {/* Notification Bell Button */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notificaciones"
          onClick={onOpenNotifications}
          className={`relative rounded-full cursor-pointer transition-colors ${
            isNotificationsActive
              ? 'bg-blue-50 text-[#0b4dbd]'
              : 'text-slate-600 hover:text-slate-800 hover:bg-white/80'
          }`}
          type="button"
        >
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full ring-2 ring-white flex items-center justify-center leading-none">
              {unreadCount}
            </span>
          )}
        </Button>

        {/* Help Icon */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Ayuda y Soporte"
          className="text-slate-600 hover:text-slate-800 rounded-full hover:bg-white/80"
          type="button"
        >
          <HelpCircle className="size-5" />
        </Button>

        {/* Doctor Profile Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger aria-label="Menú de perfil del usuario">
            <Avatar className="h-10 w-10 border border-slate-200 hover:ring-2 hover:ring-blue-100 transition-all">
              <AvatarImage src="/doctor-avatar.png" alt="Doctora titular" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-0.5">
                <p className="text-sm font-semibold text-slate-900">
                  Dr. Elena Rostova
                </p>
                <p className="text-xs text-slate-500 truncate">
                  elena.r@dentalspa.com
                </p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={() => onNavigate && onNavigate('cuenta')}
            >
              <User className="size-4 text-slate-500" />
              <span>Ver Cuenta</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              onSelect={() => onLogout && onLogout()}
            >
              <LogOut className="size-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
