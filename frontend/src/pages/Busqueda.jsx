import React from 'react';
import {
  ArrowLeft,
  Phone,
  Mail,
  Clock,
  User,
  ChevronRight,
  Folder,
  ExternalLink,
  Image as ImageIcon,
  FileText,
  Search,
  X,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const PATIENTS_DATA = [
  {
    id: 'PT-84729',
    initials: 'JP',
    name: 'Juan Pérez',
    multilineName: false,
    status: 'ACTIVO',
    active: true,
    phone: '+34 600 123 456',
    email: 'juan.perez@email.com',
  },
  {
    id: 'PT-29381',
    initials: 'JP',
    name: 'Juan Carlos Pérez',
    multilineName: true,
    status: 'INACTIVO',
    active: false,
    phone: '+34 611 987 654',
    email: null,
  },
];

const APPOINTMENTS_DATA = [
  {
    id: 'apt-1',
    month: 'OCT',
    day: '24',
    highlightedDate: true,
    title: 'Limpieza Dental',
    subtitle: '10:30 AM - Dr. Silva',
    subtitleIcon: 'clock',
    status: 'PENDIENTE',
    pending: true,
  },
  {
    id: 'apt-2',
    month: 'SEP',
    day: '12',
    highlightedDate: false,
    title: 'Revisión General',
    subtitle: 'Juan Pérez (PT-84729)',
    subtitleIcon: 'user',
    status: 'COMPLETADA',
    pending: false,
  },
  {
    id: 'apt-3',
    month: 'FEB',
    day: '05',
    highlightedDate: false,
    title: 'Extracción',
    subtitle: 'Juan Carlos Pérez (PT-29381)',
    subtitleIcon: 'user',
    status: 'COMPLETADA',
    pending: false,
  },
];

const CLINICAL_RECORDS_DATA = [
  {
    id: 'rec-1',
    title: 'Expediente Principal - Juan Pérez',
    updatedAt: 'Última act: 12 Sep 2023',
    description:
      'Contiene radiografías panorámicas, plan de tratamiento ortodóntico y notas clínicas de la Dra. Silva.',
    radiographs: '4 Radiografías',
    notes: '12 Notas',
  },
];

function normalizeText(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export default function Busqueda({
  query = 'Juan Pérez',
  onBack,
  onClearSearch,
  onNavigate,
  onOpenNuevaCita,
}) {
  const displayQuery = query.trim() || 'Juan Pérez';
  const normalizedQuery = normalizeText(displayQuery);

  const matchedPatients = PATIENTS_DATA.filter(
    (p) =>
      normalizeText(p.name).includes(normalizedQuery) ||
      normalizeText('Juan Pérez').includes(normalizedQuery) ||
      normalizeText(p.id).includes(normalizedQuery)
  );

  const matchedAppointments = APPOINTMENTS_DATA.filter(
    (a) =>
      normalizeText(a.title).includes(normalizedQuery) ||
      normalizeText(a.subtitle).includes(normalizedQuery) ||
      normalizeText('Juan Pérez').includes(normalizedQuery)
  );

  const matchedRecords = CLINICAL_RECORDS_DATA.filter(
    (r) =>
      normalizeText(r.title).includes(normalizedQuery) ||
      normalizeText(r.description).includes(normalizedQuery) ||
      normalizeText('Juan Pérez').includes(normalizedQuery)
  );

  const hasResults =
    matchedPatients.length > 0 ||
    matchedAppointments.length > 0 ||
    matchedRecords.length > 0;

  return (
    <div className="max-w-7xl w-full flex flex-col min-h-[calc(100vh-8rem)]">
      {/* Breadcrumb & Title Section */}
      <div
        className="flex items-start gap-4 mb-7"
        data-purpose="search-header-title"
      >
        <Button
          variant="outline"
          size="icon"
          aria-label="Volver"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-2xs mt-0.5 shrink-0 cursor-pointer"
          type="button"
        >
          <ArrowLeft className="size-5" />
        </Button>

        <div>
          <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
            Búsqueda
          </span>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5 tracking-tight">
            Resultados para &quot;{displayQuery}&quot;
          </h1>
        </div>
      </div>

      {hasResults ? (
        /* BÚSQUEDA CON RESULTADOS (ID: fc263cc0a3774963a77d5e6c134d2eab) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Pacientes */}
          <div className="lg:col-span-5 space-y-4" data-purpose="patients-column">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-slate-900">Pacientes</h2>
              <Badge
                variant="secondary"
                className="px-2.5 py-0.5 bg-slate-200 text-slate-700 text-xs font-semibold rounded-full"
              >
                {matchedPatients.length} Pacientes encontrados
              </Badge>
            </div>

            {matchedPatients.map((patient) => (
              <Card
                key={patient.id}
                onClick={() =>
                  onOpenNuevaCita && onOpenNuevaCita(patient.name)
                }
                className="rounded-xl border-slate-100 hover:shadow-sm transition-shadow cursor-pointer"
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback
                          className={
                            patient.active
                              ? 'bg-[#E0EAFF] text-[#1D4ED8] font-bold text-base'
                              : 'bg-[#EAEFF5] text-slate-600 font-bold text-base'
                          }
                        >
                          {patient.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        {patient.multilineName ? (
                          <h3 className="font-bold text-slate-900 text-base leading-tight">
                            Juan Carlos
                            <br />
                            Pérez
                          </h3>
                        ) : (
                          <h3 className="font-bold text-slate-900 text-base leading-tight">
                            {patient.name}
                          </h3>
                        )}
                        <p className="text-xs text-slate-400 font-normal mt-0.5">
                          ID: {patient.id}
                        </p>
                      </div>
                    </div>

                    <Badge
                      className={
                        patient.active
                          ? 'px-2.5 py-1 bg-[#E8F8F0] text-[#16A34A] hover:bg-[#E8F8F0] border-transparent text-[11px] font-bold rounded uppercase tracking-wide'
                          : 'px-2.5 py-1 bg-slate-100 text-slate-500 hover:bg-slate-100 border-transparent text-[11px] font-bold rounded uppercase tracking-wide self-start mt-1'
                      }
                    >
                      {patient.status}
                    </Badge>
                  </div>

                  <Separator className="bg-slate-50 mb-3" />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-xs text-slate-600">
                      <Phone className="size-3.5 text-slate-400" />
                      <span>{patient.phone}</span>
                    </div>
                    {patient.email && (
                      <div className="flex items-center gap-2.5 text-xs text-slate-600">
                        <Mail className="size-3.5 text-slate-400" />
                        <span>{patient.email}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Column: Citas e Historial Clínico */}
          <div
            className="lg:col-span-7 space-y-7"
            data-purpose="appointments-and-history-column"
          >
            {/* Section: Citas */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-bold text-slate-900">Citas</h2>
                <Badge
                  variant="secondary"
                  className="px-2.5 py-0.5 bg-slate-200 text-slate-700 text-xs font-semibold rounded-full"
                >
                  {matchedAppointments.length} Citas encontradas
                </Badge>
              </div>

              <div className="space-y-3">
                {matchedAppointments.map((apt) => (
                  <Card
                    key={apt.id}
                    onClick={() =>
                      onNavigate && onNavigate('proximas-citas')
                    }
                    className="rounded-xl border-slate-100 hover:shadow-sm transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={
                            apt.highlightedDate
                              ? 'w-12 h-14 bg-[#EBF2FE] rounded-lg flex flex-col items-center justify-center shrink-0'
                              : 'w-12 h-14 bg-slate-100 rounded-lg flex flex-col items-center justify-center shrink-0'
                          }
                        >
                          <span
                            className={
                              apt.highlightedDate
                                ? 'text-[10px] font-bold text-[#2563EB] tracking-wider uppercase'
                                : 'text-[10px] font-bold text-slate-500 tracking-wider uppercase'
                            }
                          >
                            {apt.month}
                          </span>
                          <span
                            className={
                              apt.highlightedDate
                                ? 'text-base font-extrabold text-[#2563EB] leading-tight'
                                : 'text-base font-extrabold text-slate-700 leading-tight'
                            }
                          >
                            {apt.day}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {apt.title}
                          </h4>
                          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                            {apt.subtitleIcon === 'clock' ? (
                              <Clock className="size-3.5 text-slate-400" />
                            ) : (
                              <User className="size-3.5 text-slate-400" />
                            )}
                            {apt.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge
                          className={
                            apt.pending
                              ? 'px-3 py-1 bg-[#FEF9C3] text-[#CA8A04] hover:bg-[#FEF9C3] border-transparent text-[11px] font-bold rounded uppercase tracking-wide'
                              : 'px-3 py-1 bg-[#DCFCE7] text-[#15803D] hover:bg-[#DCFCE7] border-transparent text-[11px] font-bold rounded uppercase tracking-wide'
                          }
                        >
                          {apt.status}
                        </Badge>
                        {apt.pending && (
                          <ChevronRight className="size-4 text-slate-400 cursor-pointer" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Section: Historial Clínico */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Historial Clínico
                </h2>
                <Badge
                  variant="secondary"
                  className="px-2.5 py-0.5 bg-slate-200 text-slate-700 text-xs font-semibold rounded-full"
                >
                  {matchedRecords.length} Historial clínico
                </Badge>
              </div>

              {matchedRecords.map((rec) => (
                <Card
                  key={rec.id}
                  className="rounded-xl border-slate-100 hover:shadow-sm transition-shadow"
                >
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-[#EBF2FE] flex items-center justify-center shrink-0 text-[#2563EB] mt-0.5">
                      <Folder className="size-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-slate-900 text-base leading-snug">
                          {rec.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 font-normal">
                            {rec.updatedAt}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Abrir expediente"
                            className="h-6 w-6 text-slate-400 hover:text-slate-600"
                            type="button"
                          >
                            <ExternalLink className="size-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {rec.description}
                      </p>

                      <div className="flex items-center gap-2.5 mt-3.5">
                        <Badge
                          variant="outline"
                          className="gap-1.5 px-2.5 py-1 bg-slate-50 border-slate-100 rounded-md text-[11px] font-medium text-slate-600"
                        >
                          <ImageIcon className="size-3.5 text-slate-400" />
                          <span>{rec.radiographs}</span>
                        </Badge>
                        <Badge
                          variant="outline"
                          className="gap-1.5 px-2.5 py-1 bg-slate-50 border-slate-100 rounded-md text-[11px] font-medium text-slate-600"
                        >
                          <FileText className="size-3.5 text-slate-400" />
                          <span>{rec.notes}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* BÚSQUEDA SIN RESULTADOS (ID: 44f86075b2f848729be2743ad45e70be) */
        <div className="w-full flex-1 flex flex-col items-center justify-center pb-12">
          <Card
            className="rounded-xl border-slate-100 w-full max-w-2xl"
            data-purpose="empty-state-card"
          >
            <CardContent className="py-16 px-8 flex flex-col items-center text-center">
              {/* Empty State Graphic Icon */}
              <div
                className="w-20 h-20 rounded-full bg-slate-100/90 flex items-center justify-center mb-6"
                data-purpose="empty-state-icon"
              >
                <div className="relative flex items-center justify-center">
                  <Search className="w-10 h-10 text-slate-600 stroke-[1.8]" />
                  <div className="absolute -bottom-0.5 -left-0.5 bg-slate-500 text-white rounded-full p-0.5 border border-white">
                    <X className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* Empty State Headline */}
              <h2 className="text-xl font-bold text-slate-900 mb-2.5">
                No se encontraron resultados
              </h2>

              {/* Informational Subtext */}
              <p className="text-slate-500 text-sm max-w-md leading-relaxed mb-7">
                No pudimos encontrar coincidencias para &quot;{displayQuery}
                &quot;.
                <br className="hidden sm:inline" /> Por favor, verifica la
                ortografía o intenta con otro término.
              </p>

              {/* Primary CTA Button */}
              <Button
                onClick={onClearSearch}
                className="px-6 py-2.5 h-auto bg-[#0a2f7d] hover:bg-[#082663] text-white text-xs font-semibold uppercase tracking-wider rounded-md shadow-xs cursor-pointer"
                data-purpose="clear-search-action"
                type="button"
              >
                Limpiar búsqueda
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
