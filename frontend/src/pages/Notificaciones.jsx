import React from 'react';
import {
  Check,
  CheckCheck,
  CalendarCheck,
  Package,
  MessageCircleMore,
  BellOff,
  ArrowLeft,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Notificaciones({
  notifications = [],
  onMarkAllRead,
  onToggleRead,
  onBack,
}) {
  const unreadCount = notifications.filter((n) => n.unread).length;
  const isEmpty = notifications.length === 0;

  const grouped = {
    HOY: notifications.filter((n) => n.section === 'HOY'),
    AYER: notifications.filter((n) => n.section === 'AYER'),
    'ESTA SEMANA': notifications.filter((n) => n.section === 'ESTA SEMANA'),
  };

  const renderIconBadge = (type) => {
    switch (type) {
      case 'urgent':
        return (
          <div className="w-11 h-11 rounded-full bg-red-100/80 flex items-center justify-center shrink-0 text-red-600 font-bold text-lg">
            <span className="leading-none text-red-500 font-bold">!</span>
          </div>
        );
      case 'appointment':
        return (
          <div className="w-11 h-11 rounded-full bg-blue-100/70 flex items-center justify-center shrink-0 text-blue-600">
            <CalendarCheck className="w-5 h-5 stroke-[1.8]" />
          </div>
        );
      case 'inventory':
        return (
          <div className="w-11 h-11 rounded-full bg-amber-100/80 flex items-center justify-center shrink-0 text-amber-700">
            <Package className="w-5 h-5 stroke-[1.8]" />
          </div>
        );
      case 'inquiry':
      default:
        return (
          <div className="w-11 h-11 rounded-full bg-sky-100/80 flex items-center justify-center shrink-0 text-sky-600">
            <MessageCircleMore className="w-5 h-5 stroke-[1.8]" />
          </div>
        );
    }
  };

  return (
    <div
      className="py-4 max-w-6xl w-full mx-auto flex flex-col justify-between"
      data-purpose="notification-center-content"
    >
      <div>
        {/* Page Header: Title and Action */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-[32px] font-bold tracking-tight text-slate-900 leading-tight">
              Notificaciones
            </h1>
            <p className="text-sm text-slate-500 font-normal mt-1">
              Tienes {unreadCount}{' '}
              {unreadCount === 1
                ? 'notificación nueva'
                : 'notificaciones nuevas'}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onMarkAllRead}
            className={
              isEmpty
                ? 'inline-flex items-center gap-2 px-4 py-2 h-auto border border-slate-200 bg-white rounded-full text-xs font-semibold text-[#0a48b3] shadow-xs cursor-pointer'
                : 'inline-flex items-center gap-1.5 px-3.5 py-1.5 h-auto text-xs font-semibold text-[#0b4dbd] bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200/50 rounded-lg transition-colors shadow-xs cursor-pointer'
            }
          >
            {isEmpty ? (
              <CheckCheck className="w-4 h-4 text-[#0a48b3]" />
            ) : (
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            )}
            <span>Marcar todas como leídas</span>
          </Button>
        </div>

        {/* Conditional View: Empty State vs Populated Notifications List */}
        {isEmpty ? (
          <>
            {/* Empty State Container Card (Screen ID: 1c633144105441028401f14470f4b430) */}
            <Card
              className="bg-white rounded-2xl shadow-xs border border-slate-100/60 min-h-[500px] flex flex-col items-center justify-center p-12 text-center"
              data-purpose="empty-state-card"
            >
              <div className="w-20 h-20 bg-slate-100/80 rounded-full flex items-center justify-center mb-6 text-slate-500">
                <BellOff className="w-9 h-9 stroke-[1.75]" />
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-2.5 tracking-tight">
                No tienes notificaciones pendientes
              </h2>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                Te avisaremos cuando haya actividad nueva en tu clínica.
              </p>
            </Card>

            {/* Bottom Return Button */}
            <div className="mt-8">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Regresar</span>
              </button>
            </div>
          </>
        ) : (
          /* Populated Notifications Container Card (Screen ID: f30871789fd14a3db5c5e54146aba92c) */
          <Card
            className="bg-white/70 border border-slate-200/60 rounded-2xl p-8 backdrop-blur-xs shadow-xs space-y-9"
            data-purpose="notifications-group-card"
          >
            {Object.entries(grouped).map(([sectionTitle, items]) => {
              if (items.length === 0) return null;
              return (
                <section key={sectionTitle}>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 px-1">
                    {sectionTitle}
                  </h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <article
                        key={item.id}
                        onClick={() => onToggleRead && onToggleRead(item.id)}
                        className={`flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100/80 hover:border-slate-200 transition-all group relative cursor-pointer ${
                          item.unread ? '' : 'pl-9'
                        }`}
                      >
                        {item.unread && (
                          <div className="pt-3.5 flex items-center justify-center">
                            <span
                              className={`w-2.5 h-2.5 rounded-full inline-block ${
                                item.dotColor === 'red'
                                  ? 'bg-rose-500'
                                  : 'bg-blue-600'
                              }`}
                            />
                          </div>
                        )}

                        {renderIconBadge(item.type)}

                        <div className="flex-1 min-w-0 pr-2">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-900 transition-colors">
                              {item.title}
                            </h3>
                            <span className="text-xs font-semibold text-slate-700 shrink-0">
                              {item.time}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed font-normal">
                            {item.description}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}

            {/* Back Link Navigation inside Card */}
            <div className="pt-4 border-t border-slate-100/60">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 stroke-2" />
                <span>Regresar</span>
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
