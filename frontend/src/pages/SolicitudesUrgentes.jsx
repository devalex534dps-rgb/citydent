import React, { useState } from 'react';
import {
  ArrowLeft,
  RefreshCw,
  Search,
  Clock,
  Calendar,
  Phone,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const initialUrgentList = [
  {
    id: 'urg-1',
    name: 'Carlos Mendoza',
    severity: 3,
    minutesAgo: 15,
    badge: 'DOLOR AGUDO',
    badgeClass: 'bg-red-100 text-red-700 border-transparent',
    time: 'hace 15 min',
    timeColor: 'text-red-600',
    borderColor: 'border-l-red-600',
    description:
      'Paciente reporta dolor severo y pulsátil en la pieza 46. Comenta que no pudo dormir la noche anterior. Requiere atención inmediata.',
  },
  {
    id: 'urg-2',
    name: 'María Pérez',
    severity: 2,
    minutesAgo: 45,
    badge: 'POST-OPERATORIO',
    badgeClass: 'bg-[#fef3c7] text-[#92400e] border-transparent',
    time: 'hace 45 min',
    timeColor: 'text-slate-600',
    borderColor: 'border-l-amber-500',
    description:
      'Inflamación considerable tras la extracción de cordales ayer. Reporta leve sangrado intermitente y preocupación por los puntos.',
  },
  {
    id: 'urg-3',
    name: 'Laura Gómez',
    severity: 1,
    minutesAgo: 120,
    badge: 'URGENCIA ESTÉTICA',
    badgeClass: 'bg-[#e0f2fe] text-[#0369a1] border-transparent',
    time: 'hace 2 horas',
    timeColor: 'text-slate-600',
    borderColor: 'border-l-sky-400',
    description:
      'Fractura de carilla frontal superior (pieza 11) durante el almuerzo. Tiene un evento importante esta noche y solicita reparación urgente.',
  },
];

export default function SolicitudesUrgentes({ onBack, onOpenNuevaCita }) {
  const [requests, setRequests] = useState(initialUrgentList);
  const [patientSearch, setPatientSearch] = useState('');
  const [sortBy, setSortBy] = useState('Mayor Severidad');

  const handleAttendRequest = (id) => {
    setRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRefresh = () => {
    setRequests(initialUrgentList);
    setPatientSearch('');
  };

  const filteredRequests = requests
    .filter((req) =>
      req.name.toLowerCase().includes(patientSearch.trim().toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'Más Reciente') return a.minutesAgo - b.minutesAgo;
      if (sortBy === 'Menor Severidad') return a.severity - b.severity;
      return b.severity - a.severity;
    });

  const isEmpty = filteredRequests.length === 0;

  return (
    <div className="max-w-7xl w-full mx-auto flex flex-col space-y-5">
      {/* Subheader: Back to Dashboard & Title */}
      <div className="flex items-center justify-between bg-white border border-slate-100 rounded-xl px-6 py-4 shadow-2xs">
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBack && onBack('dashboard')}
            className="text-slate-500 hover:text-slate-700 text-sm font-medium px-2 cursor-pointer"
            type="button"
          >
            <ArrowLeft className="size-4 mr-1.5" />
            Dashboard
          </Button>
          <Separator orientation="vertical" className="h-5" />
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Solicitudes Urgentes
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {!isEmpty && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRequests([])}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg border-slate-200 cursor-pointer"
              type="button"
            >
              <Check className="size-3.5 mr-1.5 text-blue-600" />
              Marcar todas como atendidas
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Actualizar solicitudes"
            title="Restaurar / Actualizar solicitudes"
            onClick={handleRefresh}
            className="text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
            type="button"
          >
            <RefreshCw className="size-5" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="rounded-xl border-slate-200/80 shadow-2xs">
        <CardContent className="p-3 sm:px-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs sm:max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="size-4" />
            </div>
            <Input
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              className="pl-10 pr-4 py-2 h-9 text-sm bg-slate-50/80 rounded-lg border-slate-200"
              placeholder="Buscar paciente..."
              type="search"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <label
              className="whitespace-nowrap text-[11px] font-bold text-slate-500 tracking-wide"
              htmlFor="sort-select"
            >
              ORDENAR POR:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs sm:text-sm font-medium normal-case bg-slate-50/90 hover:bg-slate-100 text-slate-800 py-1.5 pl-3.5 pr-8 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              <option>Mayor Severidad</option>
              <option>Más Reciente</option>
              <option>Menor Severidad</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Conditional Content: Empty State (Screen ID: 2509c664d96942f3ae10f589aa231a71) vs Populated List */}
      {isEmpty ? (
        <Card
          className="flex-1 w-full bg-white rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-center min-h-[540px] p-8"
          data-purpose="empty-state-canvas"
        >
          <div className="max-w-md w-full text-center flex flex-col items-center justify-center py-12">
            {/* Status Verification Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6 shadow-2xs ring-8 ring-blue-50/50">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 stroke-[2.3]" />
            </div>

            {/* Main Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2.5">
              No hay solicitudes urgentes pendientes
            </h2>

            {/* Explanatory Subtitle */}
            <p className="text-sm sm:text-base text-slate-500 max-w-sm leading-relaxed">
              Todo está bajo control. Los pacientes atendidos aparecerán en el
              historial de citas.
            </p>
          </div>
        </Card>
      ) : (
        <>
          {/* Requests List */}
          <section
            aria-label="Lista de solicitudes urgentes"
            className="space-y-4"
            data-purpose="urgent-requests-container"
          >
            {filteredRequests.map((req) => (
              <Card
                key={req.id}
                className={`rounded-lg border-slate-100 border-l-4 ${req.borderColor} transition-shadow hover:shadow-xs`}
              >
                <CardContent className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-base font-bold text-slate-900">
                        {req.name}
                      </h2>
                      <Badge
                        className={`rounded text-xs font-bold uppercase tracking-wide ${req.badgeClass}`}
                      >
                        {req.badge}
                      </Badge>
                      <span
                        className={`inline-flex items-center text-xs font-medium ${req.timeColor}`}
                      >
                        <Clock className="size-3.5 mr-1" />
                        {req.time}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {req.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <Button
                      variant="outline"
                      onClick={() =>
                        onOpenNuevaCita && onOpenNuevaCita(req.name)
                      }
                      className="px-4 py-2 h-auto border-slate-200 rounded-md text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 cursor-pointer"
                      type="button"
                    >
                      <Calendar className="size-4 mr-2 text-slate-600" />
                      Programar Hueco
                    </Button>
                    <Button
                      onClick={() => handleAttendRequest(req.id)}
                      className="px-4 py-2 h-auto rounded-md text-xs font-semibold text-white bg-[#16a34a] hover:bg-[#15803d] cursor-pointer"
                      type="button"
                    >
                      <Phone className="size-3.5 mr-2" />
                      Contactar Ahora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Empty State Status Footer */}
          <footer className="pt-12 pb-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full border-4 border-slate-500/80 flex items-center justify-center text-slate-500">
              <Check className="size-6 stroke-[3]" />
            </div>
            <p className="text-sm font-medium text-slate-500">
              No hay más solicitudes urgentes pendientes.
            </p>
          </footer>
        </>
      )}
    </div>
  );
}
