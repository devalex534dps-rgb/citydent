import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const initialDays = [
  { id: 0, label: 'Lun 23' },
  { id: 1, label: 'Mar 24' },
  { id: 2, label: 'Mié 25' },
  { id: 3, label: 'Jue 26' },
  { id: 4, label: 'Vie 27' },
  { id: 5, label: 'Sáb 28' },
  { id: 6, label: 'Dom 29' },
];

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
];

export default function Agenda({ onOpenNuevaCita }) {
  const [viewMode, setViewMode] = useState('semana');
  const [selectedDayIdx, setSelectedDayIdx] = useState(1); // Mar 24 default

  const displayedDays =
    viewMode === 'dia' ? [initialDays[selectedDayIdx]] : initialDays;

  return (
    <div data-purpose="agenda-main-view">
      {/* Agenda Control Bar: Title & View Selectors */}
      <section
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 mb-6"
        data-purpose="agenda-header-actions"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Agenda Semanal
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-0.5">
            October 23 - 29, 2023
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* View Pills Toggle (Día / Semana / Mes) */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl">
            {[
              { id: 'dia', label: 'Día' },
              { id: 'semana', label: 'Semana' },
              { id: 'mes', label: 'Mes' },
            ].map((tab) => {
              const isSelected = viewMode === tab.id;
              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode(tab.id)}
                  className={
                    isSelected
                      ? 'px-5 py-1.5 h-auto text-xs font-bold text-[#1b44c8] bg-white hover:bg-white hover:text-[#1b44c8] rounded-lg shadow-xs cursor-pointer'
                      : 'px-4 py-1.5 h-auto text-xs font-semibold text-slate-600 rounded-lg hover:text-slate-900 hover:bg-transparent cursor-pointer'
                  }
                  type="button"
                >
                  {tab.label}
                </Button>
              );
            })}
          </div>

          {/* New Appointment Button (Opens Modal Nueva Cita) */}
          <Button
            onClick={() => onOpenNuevaCita && onOpenNuevaCita('')}
            className="gap-1.5 px-5 py-2.5 h-auto bg-[#1b44c8] hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs cursor-pointer"
            type="button"
          >
            <Plus className="size-4 stroke-[2.5]" />
            <span>Nueva Cita</span>
          </Button>
        </div>
      </section>

      {viewMode === 'mes' ? (
        /* Vista Mensual */
        <Card className="p-6 border-slate-100">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase mb-3">
            <div>Lun</div>
            <div>Mar</div>
            <div>Mié</div>
            <div>Jue</div>
            <div>Vie</div>
            <div>Sáb</div>
            <div>Dom</div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((dayNum) => {
              const isHighlighted = dayNum >= 23 && dayNum <= 29;
              return (
                <div
                  key={dayNum}
                  onClick={() => {
                    if (dayNum >= 23 && dayNum <= 29) {
                      setSelectedDayIdx(dayNum - 23);
                      setViewMode('dia');
                    } else if (onOpenNuevaCita) {
                      onOpenNuevaCita('');
                    }
                  }}
                  className={`min-h-[84px] p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    dayNum === 24
                      ? 'border-[#1b44c8] bg-blue-50/40'
                      : isHighlighted
                        ? 'border-slate-200 bg-white hover:border-blue-300'
                        : 'border-slate-100 bg-slate-50/40 hover:bg-white'
                  }`}
                >
                  <span
                    className={`text-xs font-bold ${
                      dayNum === 24 ? 'text-[#1b44c8]' : 'text-slate-700'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {dayNum === 23 && (
                    <div className="mt-1.5 text-[10px] font-semibold bg-[#dbe8fc] text-slate-800 px-1.5 py-0.5 rounded truncate">
                      Sarah J. - Limpieza
                    </div>
                  )}
                  {dayNum === 24 && (
                    <div className="mt-1.5 text-[10px] font-semibold bg-[#ffdcdb] text-red-900 px-1.5 py-0.5 rounded truncate">
                      Michael T. - Extracción
                    </div>
                  )}
                  {dayNum === 25 && (
                    <div className="mt-1.5 text-[10px] font-semibold bg-[#e2e1fe] text-indigo-950 px-1.5 py-0.5 rounded truncate">
                      David K. - Revisión
                    </div>
                  )}
                  {dayNum === 26 && (
                    <div className="mt-1.5 text-[10px] font-semibold bg-[#d7e5fc] text-slate-800 px-1.5 py-0.5 rounded truncate">
                      Emma W. - Ortodoncia
                    </div>
                  )}
                  {dayNum === 27 && (
                    <div className="mt-1.5 text-[10px] font-semibold bg-[#fedf97] text-amber-950 px-1.5 py-0.5 rounded truncate">
                      Robert L. - Consulta
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      ) : (
        /* Weekly / Daily Calendar Grid */
        <Card
          className="overflow-hidden border-slate-100"
          data-purpose="calendar-table"
        >
          {/* Table Header (Days of week) */}
          <div
            className={`grid ${
              viewMode === 'dia'
                ? 'grid-cols-[80px_1fr]'
                : 'grid-cols-[80px_repeat(7,1fr)]'
            } border-b border-slate-100 text-center text-xs font-semibold text-slate-600`}
          >
            <div className="py-4 font-normal text-slate-400">Time</div>
            {displayedDays.map((day) => {
              const isActive = day.id === selectedDayIdx;
              return (
                <button
                  type="button"
                  key={day.label}
                  onClick={() => setSelectedDayIdx(day.id)}
                  className={`py-4 cursor-pointer transition-colors ${
                    isActive
                      ? 'text-[#1b44c8] font-bold bg-[#fafcff]'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>

          {/* Schedule Grid Content with Columns & Appointment Overlay */}
          <div
            className={`relative grid ${
              viewMode === 'dia'
                ? 'grid-cols-[80px_1fr]'
                : 'grid-cols-[80px_repeat(7,1fr)]'
            } min-h-[580px]`}
          >
            {/* Column 0: Time Labels */}
            <div className="flex flex-col border-r border-slate-50 text-[11px] font-semibold text-slate-400 text-center select-none">
              {timeSlots.map((slot) => (
                <div key={slot} className="h-24 pt-2">
                  {slot}
                </div>
              ))}
            </div>

            {displayedDays.map((day) => (
              <div
                key={day.id}
                className={`relative border-r border-slate-50 flex flex-col ${
                  day.id === selectedDayIdx ? 'bg-[#fafcff]' : ''
                }`}
              >
                {/* Lunes 23 */}
                {day.id === 0 && (
                  <div
                    onClick={() =>
                      onOpenNuevaCita && onOpenNuevaCita('Sarah J.')
                    }
                    className="absolute top-2 left-2 right-2 h-14 bg-[#dbe8fc] rounded-lg p-2.5 flex flex-col justify-center cursor-pointer shadow-xs hover:brightness-95 transition-all z-10"
                  >
                    <span className="text-xs font-bold text-slate-800">
                      Sarah J.
                    </span>
                    <span className="text-[11px] text-slate-600">Limpieza</span>
                  </div>
                )}

                {/* Martes 24 */}
                {day.id === 1 && (
                  <div
                    onClick={() =>
                      onOpenNuevaCita && onOpenNuevaCita('Michael T.')
                    }
                    className="absolute top-[102px] left-2 right-2 h-20 bg-[#ffdcdb] rounded-lg p-2.5 flex flex-col justify-center cursor-pointer shadow-xs hover:brightness-95 transition-all z-10"
                  >
                    <span className="text-xs font-bold text-red-900">
                      Michael T.
                    </span>
                    <span className="text-[11px] text-rose-700">
                      Extracción
                    </span>
                  </div>
                )}

                {/* Miércoles 25 */}
                {day.id === 2 && (
                  <div
                    onClick={() =>
                      onOpenNuevaCita && onOpenNuevaCita('David K.')
                    }
                    className="absolute top-[198px] left-2 right-2 h-14 bg-[#e2e1fe] rounded-lg p-2.5 flex flex-col justify-center cursor-pointer shadow-xs hover:brightness-95 transition-all z-10"
                  >
                    <span className="text-xs font-bold text-indigo-950">
                      David K.
                    </span>
                    <span className="text-[11px] text-indigo-800">Revisión</span>
                  </div>
                )}

                {/* Jueves 26 */}
                {day.id === 3 && (
                  <div
                    onClick={() =>
                      onOpenNuevaCita && onOpenNuevaCita('Emma W.')
                    }
                    className="absolute top-[292px] left-2 right-2 h-32 bg-[#d7e5fc] rounded-lg p-2.5 flex flex-col justify-start pt-3 cursor-pointer shadow-xs hover:brightness-95 transition-all z-10"
                  >
                    <span className="text-xs font-bold text-slate-800">
                      Emma W.
                    </span>
                    <span className="text-[11px] text-slate-600 mt-0.5">
                      Ortodoncia
                    </span>
                  </div>
                )}

                {/* Viernes 27 */}
                {day.id === 4 && (
                  <div
                    onClick={() =>
                      onOpenNuevaCita && onOpenNuevaCita('Robert L.')
                    }
                    className="absolute top-14 left-2 right-2 h-20 bg-[#fedf97] rounded-lg p-2.5 flex flex-col justify-start pt-2.5 cursor-pointer shadow-xs hover:brightness-95 transition-all z-10"
                  >
                    <span className="text-xs font-bold text-amber-950">
                      Robert L.
                    </span>
                    <span className="text-[11px] text-amber-900 mt-0.5">
                      Consulta
                    </span>
                  </div>
                )}

                {timeSlots.map((slot, i) => (
                  <div
                    key={slot}
                    onClick={() => onOpenNuevaCita && onOpenNuevaCita('')}
                    title="Clic para agendar cita en este horario"
                    className={`h-24 hover:bg-blue-50/30 transition-colors cursor-pointer ${
                      i < timeSlots.length - 1 ? 'border-b border-slate-50' : ''
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
