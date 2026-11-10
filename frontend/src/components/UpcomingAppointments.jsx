import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const appointments = [
  {
    id: 'dash-1',
    time: '09:00 AM',
    duration: '45 min',
    patient: 'Roberto Carlos',
    treatment: 'Limpieza Profunda',
    dotColor: 'bg-emerald-500',
  },
  {
    id: 'dash-2',
    time: '10:30 AM',
    duration: '60 min',
    patient: 'María Antonieta',
    treatment: 'Ajuste Ortodoncia',
    dotColor: 'bg-amber-600',
  },
  {
    id: 'dash-3',
    time: '11:45 AM',
    duration: '30 min',
    patient: 'Carlos Slim',
    treatment: 'Revisión Rutina',
    dotColor: 'bg-slate-300',
  },
];

export default function UpcomingAppointments({ onViewAll }) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-5">
        <CardTitle
          onClick={() => onViewAll && onViewAll('proximas-citas')}
          className="text-xl font-bold text-slate-900 hover:text-blue-700 transition-colors cursor-pointer"
        >
          Próximas Citas
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Ver todas las próximas citas"
          title="Ver todas las próximas citas"
          onClick={() => onViewAll && onViewAll('proximas-citas')}
          className="text-slate-400 hover:text-slate-600 h-8 w-8 cursor-pointer"
          type="button"
        >
          <MoreHorizontal className="size-5" />
        </Button>
      </CardHeader>
      <CardContent className="text-sm">
        {appointments.map((apt, idx) => (
          <React.Fragment key={apt.id}>
            {idx > 0 && <Separator className="bg-slate-100" />}
            <div
              onClick={() => onViewAll && onViewAll('proximas-citas')}
              className={`py-4 flex items-center justify-between hover:bg-slate-50/70 rounded-lg px-2 -mx-2 transition-colors cursor-pointer ${
                idx === 0 ? 'pt-2' : ''
              } ${idx === appointments.length - 1 ? 'pb-2' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-20">
                  <span className="font-bold text-slate-900">{apt.time}</span>
                </div>
                <span className="text-xs text-slate-400 w-16">
                  {apt.duration}
                </span>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">
                    {apt.patient}
                  </h4>
                  <p className="text-xs text-slate-400">{apt.treatment}</p>
                </div>
              </div>
              <span className={`w-2 h-2 rounded-full ${apt.dotColor}`}></span>
            </div>
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
