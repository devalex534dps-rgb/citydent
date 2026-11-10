import React from 'react';
import {
  LayoutGrid,
  CalendarDays,
  BarChart3,
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'agenda', label: 'Agenda', icon: CalendarDays },
  { id: 'estadisticas', label: 'Estadísticas', icon: BarChart3 },
  { id: 'cuenta', label: 'Cuenta', icon: User },
];

export default function Sidebar({
  activeScreen = 'dashboard',
  onNavigate,
  onLogout,
}) {
  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-100 flex flex-col justify-between shrink-0 select-none"
      data-purpose="sidebar"
    >
      <div>
        {/* Clinic Brand Header */}
        <div className="h-20 flex items-center px-8">
          <a
            className="flex items-center gap-3 group"
            href="#dashboard"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('dashboard');
              }
            }}
          >
            {/* Dental Tooth Logo Icon */}
            <div className="w-8 h-8 flex items-center justify-center text-blue-700">
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C9.5 2 7.7 3.3 6.9 4.8C5.8 6.9 5.3 10.3 5.4 13.5C5.5 16.5 6.9 21.6 9.3 21.9C10.7 22.1 11.4 20.3 12 18.2C12.6 20.3 13.3 22.1 14.7 21.9C17.1 21.6 18.5 16.5 18.6 13.5C18.7 10.3 18.2 6.9 17.1 4.8C16.3 3.3 14.5 2 12 2Z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-[#0a2540]">
              CityDent
            </span>
          </a>
        </div>

        {/* Main Navigation Menu */}
        <nav className="mt-4 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <Button
                key={item.id}
                asChild
                variant="ghost"
                className={
                  isActive
                    ? 'relative w-full justify-start gap-3.5 px-4 py-3 h-auto rounded-r-xl rounded-l-none bg-blue-50/70 text-blue-700 hover:bg-blue-50 hover:text-blue-700 font-semibold text-sm'
                    : 'w-full justify-start gap-3.5 px-4 py-3 h-auto rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-sm font-medium'
                }
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate(item.id);
                    }
                  }}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute right-0 top-0 bottom-0 w-1 bg-blue-700 rounded-l"></span>
                  )}
                </a>
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Bottom Actions */}
      <div className="p-6 border-t border-slate-50 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLogout && onLogout()}
          className="gap-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 font-medium text-sm px-2 py-1 cursor-pointer"
          type="button"
        >
          <LogOut className="size-4" />
          <span>Logout</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Configuración"
          className={
            activeScreen === 'configuracion'
              ? 'text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer'
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer'
          }
          type="button"
          onClick={() => onNavigate && onNavigate('configuracion')}
        >
          <Settings className="size-5" />
        </Button>
      </div>
    </aside>
  );
}
