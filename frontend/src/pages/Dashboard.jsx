import React from 'react';
import { Users, Gauge, UserPlus } from 'lucide-react';
import StatCard from '@/components/StatCard';
import UrgentRequests from '@/components/UrgentRequests';
import UpcomingAppointments from '@/components/UpcomingAppointments';
import DailySummary from '@/components/DailySummary';

export default function Dashboard({ onNavigate, onOpenNuevaCita }) {
  return (
    <>
      {/* Title & Subtitle Section */}
      <section className="mb-8" data-purpose="page-intro">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Panel de Control
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Resumen diario del estado de la clínica. Hoy es Jueves, 24 de Octubre.
        </p>
      </section>

      {/* KPI Summary Cards Grid */}
      <section
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        data-purpose="kpi-metrics"
      >
        <StatCard
          title="Pacientes Hoy"
          value="24"
          subValue="/ 30"
          icon={Users}
          iconBg="bg-blue-100/70"
          iconText="text-blue-700"
        />
        <StatCard
          title="Eficiencia Operativa"
          value="92%"
          badge="+3%"
          icon={Gauge}
          iconBg="bg-slate-100"
          iconText="text-slate-700"
        />
        <StatCard
          title="Nuevas Consultas"
          value="5"
          icon={UserPlus}
          iconBg="bg-amber-100/70"
          iconText="text-amber-700"
        />
      </section>

      {/* Section: Solicitudes Urgentes */}
      <UrgentRequests
        onViewAll={onNavigate}
        onOpenNuevaCita={onOpenNuevaCita}
      />

      {/* Bottom Row: Próximas Citas & Resumen Diario */}
      <section
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        data-purpose="appointments-and-summary"
      >
        <UpcomingAppointments onViewAll={onNavigate} />
        <DailySummary />
      </section>
    </>
  );
}
