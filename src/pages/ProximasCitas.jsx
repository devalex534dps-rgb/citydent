import React, { useState, useRef, useEffect } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Phone,
  Stethoscope,
  ArrowLeft,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const upcomingAppointmentsData = [
  {
    id: 1,
    time: '09:00 AM',
    duration: '45 min',
    patient: 'Roberto Carlos',
    initials: 'RC',
    phone: '+52 55 9876 5432',
    treatment: 'Limpieza Profunda',
    doctor: 'Dra. Elena Rostova',
    confirmed: true,
    avatar: '/patient-roberto.png',
  },
  {
    id: 2,
    time: '10:30 AM',
    duration: '60 min',
    patient: 'María Antonieta',
    initials: 'MA',
    phone: '+52 55 1122 3344',
    treatment: 'Ajuste de Ortodoncia',
    doctor: 'Dr. Julián Méndez',
    confirmed: true,
    avatar: '/patient-maria.png',
  },
  {
    id: 3,
    time: '11:45 AM',
    duration: '30 min',
    patient: 'Carlos Slim',
    initials: 'CS',
    phone: '+52 55 4455 6677',
    treatment: 'Revisión de Rutina',
    doctor: 'Dra. Elena Rostova',
    confirmed: false,
    avatar: '/patient-carlos.png',
  },
];

const octoberDays = [
  { day: 30, currentMonth: false },
  ...Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    currentMonth: true,
  })),
];

export default function ProximasCitas({ onBack }) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(24);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!calendarOpen) return;
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [calendarOpen]);

  return (
    <div className="max-w-7xl w-full mx-auto pt-2">
      {/* Back to Dashboard Link */}
      <div className="mb-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Regresar al Dashboard</span>
        </button>
      </div>

      {/* Content Header: Title & Calendar Selector Button */}
      <section
        className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8"
        data-purpose="content-header"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Próximas Citas
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Agenda clínica para el día de hoy. 12 pacientes programados.
          </p>
        </div>

        {/* Relative Container for Calendar Dropdown (connects Lista Estándar & Detalle con Calendario) */}
        <div ref={dropdownRef} className="relative inline-block text-left">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCalendarOpen((prev) => !prev)}
            className="inline-flex items-center gap-2.5 px-4 py-2 h-auto bg-white border border-slate-200 hover:border-slate-300 rounded-xl shadow-2xs text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>
              {selectedDay === 24
                ? 'Hoy, 24 Oct'
                : `${selectedDay} Oct, 2024`}
            </span>
          </Button>

          {/* Floating Calendar Dropdown Popup (Screen ID: 45fa63f5b8e14617ba77178836324ee4) */}
          {calendarOpen && (
            <div className="absolute right-0 top-11 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
              {/* Calendar Header with Navigation */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-800">
                  Octubre 2024
                </span>
                <div className="flex items-center gap-1 text-slate-500">
                  <button
                    type="button"
                    aria-label="Mes anterior"
                    onClick={() =>
                      setSelectedDay((d) => (d > 1 ? d - 1 : 31))
                    }
                    className="p-1 hover:bg-slate-100 rounded text-slate-600 transition cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Mes siguiente"
                    onClick={() =>
                      setSelectedDay((d) => (d < 31 ? d + 1 : 1))
                    }
                    className="p-1 hover:bg-slate-100 rounded text-slate-600 transition cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Days of Week Headers */}
              <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-slate-400 mb-2">
                <span>LU</span>
                <span>MA</span>
                <span>MI</span>
                <span>JU</span>
                <span>VI</span>
                <span>SA</span>
                <span>DO</span>
              </div>

              {/* Calendar Days Grid */}
              <div className="grid grid-cols-7 text-center text-xs gap-y-2 items-center text-slate-700 font-medium">
                {octoberDays.map((item, idx) => {
                  if (!item.currentMonth) {
                    return (
                      <span key={`prev-${idx}`} className="text-slate-300">
                        {item.day}
                      </span>
                    );
                  }
                  const isSelected = selectedDay === item.day;
                  return (
                    <div
                      key={item.day}
                      className="flex items-center justify-center"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedDay(item.day)}
                        className={
                          isSelected
                            ? 'w-7 h-7 bg-[#0052cc] text-white rounded-full flex items-center justify-center font-semibold text-xs shadow-xs cursor-pointer'
                            : 'w-7 h-7 hover:bg-slate-100 rounded-full flex items-center justify-center text-xs cursor-pointer transition-colors'
                        }
                      >
                        {item.day}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Action: 'Ir a hoy' */}
              <div className="mt-4 pt-3 border-t border-slate-50 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDay(24);
                    setCalendarOpen(false);
                  }}
                  className="text-xs font-semibold text-[#0052cc] hover:text-[#0043a8] transition cursor-pointer"
                >
                  Ir a hoy
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Appointments Table Card (Screen ID: d40ed64c594b4f348d30a9cbc36b954d) */}
      <Card
        className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden"
        data-purpose="appointments-table"
      >
        {/* Table Header */}
        <div className="grid grid-cols-12 px-8 py-3.5 bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          <div className="col-span-2">HORARIO</div>
          <div className="col-span-4">PACIENTE &amp; CONTACTO</div>
          <div className="col-span-4">TRATAMIENTO &amp; ESPECIALISTA</div>
          <div className="col-span-2 text-right">ESTADO</div>
        </div>

        {/* Appointments Rows */}
        <div className="divide-y divide-slate-100">
          {upcomingAppointmentsData.map((apt) => (
            <article
              key={apt.id}
              className="grid grid-cols-12 items-center px-8 py-5 hover:bg-slate-50/40 transition-colors"
              data-purpose="appointment-item"
            >
              {/* Horario */}
              <div className="col-span-2">
                <div className="text-lg font-bold text-slate-900 leading-none">
                  {apt.time}
                </div>
                <div className="flex items-center gap-1 mt-1.5 text-xs text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{apt.duration}</span>
                </div>
              </div>

              {/* Paciente & Contacto */}
              <div className="col-span-4 flex items-center gap-3.5">
                <Avatar className="w-11 h-11 border border-slate-200 shrink-0">
                  {apt.avatar && (
                    <AvatarImage src={apt.avatar} alt={apt.patient} />
                  )}
                  <AvatarFallback className="bg-slate-100 text-slate-600 font-bold text-xs">
                    {apt.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {apt.patient}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500 font-medium">
                    <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{apt.phone}</span>
                  </div>
                </div>
              </div>

              {/* Tratamiento & Especialista */}
              <div className="col-span-4">
                <div className="text-sm font-semibold text-slate-900">
                  {apt.treatment}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500">
                  <Stethoscope className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{apt.doctor}</span>
                </div>
              </div>

              {/* Estado */}
              <div className="col-span-2 flex justify-end">
                {apt.confirmed ? (
                  <Badge className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-[#eef4ff] text-[#0052cc] border border-[#d6e4ff] hover:bg-[#eef4ff]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0052cc]" />
                    Confirmada
                  </Badge>
                ) : (
                  <Badge className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    Pendiente
                  </Badge>
                )}
              </div>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}
