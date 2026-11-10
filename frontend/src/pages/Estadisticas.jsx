import React, { useState } from 'react';
import {
  Users,
  Banknote,
  Heart,
  TrendingUp,
  ArrowRight,
  Layers,
  Sparkles,
  BriefcaseMedical,
} from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const kpiMetrics = [
  {
    label: 'NUEVOS PACIENTES',
    value: '124',
    badge: '+12%',
    badgeVariant: 'success',
    showTrendIcon: true,
    icon: Users,
    iconBg: 'bg-blue-100 text-blue-700',
  },
  {
    label: 'INGRESOS TOTALES',
    value: '$42.5k',
    badge: '+8%',
    badgeVariant: 'success',
    showTrendIcon: true,
    icon: Banknote,
    iconBg: 'bg-amber-100/70 text-amber-700',
  },
  {
    label: 'TASA DE RETENCIÓN',
    value: '94%',
    badge: '— Estable',
    badgeVariant: 'secondary',
    showTrendIcon: false,
    icon: Heart,
    iconBg: 'bg-slate-100 text-slate-600',
  },
];

const popularTreatments = [
  {
    name: 'Limpieza de Rutina',
    category: 'Preventivo',
    percentage: '45%',
    percentColor: 'text-blue-900',
    icon: Layers,
    iconBg: 'bg-blue-50 text-blue-600',
  },
  {
    name: 'Blanqueamiento',
    category: 'Estética',
    percentage: '32%',
    percentColor: 'text-amber-600',
    icon: Sparkles,
    iconBg: 'bg-amber-100/70 text-amber-600',
  },
  {
    name: 'Implantes',
    category: 'Cirugía',
    percentage: '23%',
    percentColor: 'text-slate-800',
    icon: BriefcaseMedical,
    iconBg: 'bg-slate-100 text-slate-600',
  },
];

const yAxisLabels = ['$15k', '$10k', '$5k', '0'];
const months = [
  { label: 'Ene', amount: '$8.4k', heightPct: 56 },
  { label: 'Feb', amount: '$10.2k', heightPct: 68 },
  { label: 'Mar', amount: '$9.1k', heightPct: 60 },
  { label: 'Abr', amount: '$11.8k', heightPct: 78 },
  { label: 'May', amount: '$13.0k', heightPct: 86 },
  { label: 'Jun', amount: '$14.6k', heightPct: 96 },
];

export default function Estadisticas({ onNavigate }) {
  const [selectedMonth, setSelectedMonth] = useState('Jun');

  return (
    <div className="pt-2 space-y-6">
      {/* KPI Row */}
      <section
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        data-purpose="metrics-kpi-row"
      >
        {kpiMetrics.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className="rounded-xl">
              <CardContent className="p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${kpi.iconBg}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <Badge
                    variant={kpi.badgeVariant}
                    className="gap-1 px-2 py-0.5 rounded-full font-semibold"
                  >
                    {kpi.showTrendIcon && <TrendingUp className="size-3.5" />}
                    {kpi.badge}
                  </Badge>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-1">
                    {kpi.label}
                  </p>
                  <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {kpi.value}
                  </h3>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Content Panels Grid */}
      <section
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        data-purpose="charts-and-breakdowns"
      >
        {/* Monthly Revenue Panel */}
        <Card
          className="lg:col-span-2 rounded-xl flex flex-col justify-between"
          data-purpose="revenue-chart-card"
        >
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-6">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900">
                Ingresos Mensuales
              </CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">
                Mes seleccionado:{' '}
                <span className="font-semibold text-blue-700">
                  {selectedMonth} (
                  {months.find((m) => m.label === selectedMonth)?.amount})
                </span>
              </p>
            </div>
            <Button
              variant="link"
              onClick={() => onNavigate && onNavigate('reporte-ingresos')}
              className="p-0 h-auto text-xs font-semibold text-blue-700 hover:text-blue-800 gap-1 cursor-pointer"
              type="button"
            >
              <span>Ver Reporte Completo</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </CardHeader>

          <CardContent className="pt-4 pb-6" data-purpose="chart-container">
            <div className="relative">
              {/* Grid lines & Y Axis labels */}
              <div className="space-y-12">
                {yAxisLabels.map((label) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 text-xs font-medium text-slate-400"
                  >
                    <span className="w-8 text-right">{label}</span>
                    <div className="flex-1 border-b border-dashed border-slate-200" />
                  </div>
                ))}
              </div>

              {/* Interactive Bars Overlay */}
              <div className="absolute inset-x-0 bottom-0 top-2 pl-12 pr-4 flex items-end justify-between pointer-events-none">
                {months.map((m) => {
                  const isActive = selectedMonth === m.label;
                  return (
                    <div
                      key={m.label}
                      className="flex flex-col items-center justify-end h-full w-10 pointer-events-auto group"
                      onClick={() => setSelectedMonth(m.label)}
                    >
                      <span
                        className={`text-[10px] font-bold mb-1 transition-opacity ${
                          isActive
                            ? 'opacity-100 text-blue-700'
                            : 'opacity-0 group-hover:opacity-100 text-slate-600'
                        }`}
                      >
                        {m.amount}
                      </span>
                      <div
                        style={{ height: `${m.heightPct}%` }}
                        className={`w-7 rounded-t-lg transition-all cursor-pointer ${
                          isActive
                            ? 'bg-blue-600 shadow-xs'
                            : 'bg-blue-100/80 hover:bg-blue-200'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X Axis Month labels */}
            <div className="flex justify-between pl-12 pr-4 pt-4 text-xs font-semibold text-slate-500">
              {months.map((m) => (
                <button
                  type="button"
                  key={m.label}
                  onClick={() => setSelectedMonth(m.label)}
                  className={`w-10 text-center cursor-pointer ${
                    selectedMonth === m.label
                      ? 'text-blue-700 font-bold'
                      : 'hover:text-slate-800'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Treatments Panel */}
        <Card
          className="rounded-xl flex flex-col justify-between"
          data-purpose="popular-treatments-card"
        >
          <div>
            <CardHeader className="pb-6">
              <CardTitle className="text-lg font-bold text-slate-900 leading-tight">
                Tratamientos
                <br />
                Populares
              </CardTitle>
            </CardHeader>

            <CardContent className="pb-0">
              <ul className="space-y-5" data-purpose="treatments-list">
                {popularTreatments.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.name}
                      onClick={() =>
                        onNavigate && onNavigate('tratamientos-populares')
                      }
                      className="flex items-center justify-between hover:bg-slate-50 p-1.5 -mx-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.iconBg}`}
                        >
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-800">
                            {item.name}
                          </h4>
                          <p className="text-xs text-slate-400">
                            {item.category}
                          </p>
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${item.percentColor}`}>
                        {item.percentage}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </div>

          <CardFooter className="pt-6">
            <Button
              variant="outline"
              onClick={() => onNavigate && onNavigate('tratamientos-populares')}
              className="w-full py-2.5 h-auto bg-slate-50 hover:bg-slate-100 text-blue-900 font-semibold text-xs rounded-lg border-slate-100 cursor-pointer"
              type="button"
            >
              Ver Todos los Tratamientos
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
