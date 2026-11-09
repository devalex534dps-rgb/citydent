import React from 'react';
import {
  ArrowLeft,
  Sun,
  Sparkles,
  FileText,
  BriefcaseMedical,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const treatmentsBreakdown = [
  {
    name: 'Limpieza de Rutina',
    citas: 145,
    revenue: '$12,500',
    percentage: 42,
    barColor: 'bg-[#1E40AF]',
    iconColor: 'text-[#1E40AF]',
    icon: Sun,
  },
  {
    name: 'Blanqueamiento',
    citas: 85,
    revenue: '$17,000',
    percentage: 25,
    barColor: 'bg-[#3B82F6]',
    iconColor: 'text-[#3B82F6]',
    icon: Sparkles,
  },
  {
    name: 'Implantes',
    citas: 32,
    revenue: '$28,800',
    percentage: 9,
    barColor: 'bg-[#334155]',
    iconColor: 'text-[#475569]',
    icon: FileText,
  },
  {
    name: 'Ortodoncia',
    citas: 80,
    revenue: '$12,000',
    percentage: 24,
    barColor: 'bg-[#64748B]',
    iconColor: 'text-[#64748B]',
    icon: BriefcaseMedical,
  },
];

export default function TratamientosPopulares({ onBack }) {
  return (
    <div
      className="max-w-[1400px] w-full mx-auto pt-2"
      data-purpose="dashboard-content"
    >
      {/* Back Link and Page Heading */}
      <div className="mb-7">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-3 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Regresar a Estadísticas</span>
        </button>
        <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-1.5">
          Tratamientos Populares
        </h2>
        <p className="text-[14px] text-slate-500 font-normal">
          Análisis de rendimiento y demanda por servicio.
        </p>
      </div>

      {/* Stat Cards Row */}
      <section
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        data-purpose="stat-cards"
      >
        {/* Card 1: Tratamiento más solicitado */}
        <Card className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#1E40AF]" />
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2">
            TRATAMIENTO MÁS SOLICITADO
          </span>
          <p className="text-2xl font-bold text-[#0F172A]">
            Limpieza de Rutina
          </p>
        </Card>

        {/* Card 2: Ingresos por Tratamientos */}
        <Card className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100 flex flex-col justify-center">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2">
            INGRESOS POR TRATAMIENTOS
          </span>
          <p className="text-2xl font-bold text-[#0F172A]">$45,200</p>
        </Card>

        {/* Card 3: Total Tratamientos */}
        <Card className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100 flex flex-col justify-center">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2">
            TOTAL TRATAMIENTOS
          </span>
          <p className="text-2xl font-bold text-[#0F172A]">342</p>
        </Card>
      </section>

      {/* Details and Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Desglose de Tratamientos */}
        <Card
          className="lg:col-span-8 bg-white rounded-2xl p-8 border border-slate-100 shadow-xs"
          data-purpose="breakdown-list"
        >
          <h3 className="text-xl font-bold text-[#0F172A] mb-8">
            Desglose de Tratamientos
          </h3>
          <div className="divide-y divide-slate-100">
            {treatmentsBreakdown.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="py-6 first:pt-0 last:pb-0 flex items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <div
                      className={`w-12 h-12 rounded-full bg-[#EEF2FF] flex items-center justify-center ${item.iconColor} shrink-0`}
                    >
                      <Icon className="w-6 h-6 stroke-2" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#0F172A]">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {item.citas} Citas{' '}
                        <span className="mx-1 text-slate-300">|</span>{' '}
                        {item.revenue}
                      </p>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="w-48 sm:w-56 flex flex-col gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-700">
                      {item.percentage}%
                    </span>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                      <div
                        className={`${item.barColor} h-full rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right Column: Distribución de Citas */}
        <Card
          className="lg:col-span-4 bg-white rounded-2xl p-8 border border-slate-100 shadow-xs flex flex-col"
          data-purpose="chart-container"
        >
          <h3 className="text-xl font-bold text-[#0F172A] mb-8">
            Distribución de Citas
          </h3>

          {/* Circular Donut Chart */}
          <div className="relative w-56 h-56 mx-auto my-4 flex items-center justify-center">
            <svg
              className="w-full h-full -rotate-90 transform"
              viewBox="0 0 100 100"
            >
              {/* Limpieza (42%) */}
              <circle
                cx="50"
                cy="50"
                fill="transparent"
                r="38"
                stroke="#1E40AF"
                strokeDasharray="100.28 238.76"
                strokeDashoffset="0"
                strokeWidth="14"
              />
              {/* Blanqueamiento (25%) */}
              <circle
                cx="50"
                cy="50"
                fill="transparent"
                r="38"
                stroke="#3B82F6"
                strokeDasharray="59.69 238.76"
                strokeDashoffset="-100.28"
                strokeWidth="14"
              />
              {/* Ortodoncia (24%) */}
              <circle
                cx="50"
                cy="50"
                fill="transparent"
                r="38"
                stroke="#64748B"
                strokeDasharray="57.30 238.76"
                strokeDashoffset="-159.97"
                strokeWidth="14"
              />
              {/* Implantes (9%) */}
              <circle
                cx="50"
                cy="50"
                fill="transparent"
                r="38"
                stroke="#334155"
                strokeDasharray="21.49 238.76"
                strokeDashoffset="-217.27"
                strokeWidth="14"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
                342
              </span>
              <span className="text-xs font-semibold text-slate-400 mt-0.5">
                Total Citas
              </span>
            </div>
          </div>

          {/* Donut Legend List */}
          <ul className="mt-8 space-y-3 pt-4 text-xs font-medium text-slate-700">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF]" />
                <span>Limpieza (42%)</span>
              </div>
              <span className="font-bold text-slate-800">145</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                <span>Blanqueamiento (25%)</span>
              </div>
              <span className="font-bold text-slate-800">85</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#64748B]" />
                <span>Ortodoncia (24%)</span>
              </div>
              <span className="font-bold text-slate-800">80</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#334155]" />
                <span>Implantes (9%)</span>
              </div>
              <span className="font-bold text-slate-800">32</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

