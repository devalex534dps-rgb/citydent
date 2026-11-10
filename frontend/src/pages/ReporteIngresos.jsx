import React, { useState } from 'react';
import {
  Download,
  CreditCard,
  TrendingUp,
  Star,
  Filter,
  ArrowUpDown,
  ChevronDown,
  ArrowLeft,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { printPage } from '@/lib/desktop';

const monthlyData = [
  {
    month: 'Diciembre',
    monthIndex: 12,
    patients: 342,
    isMax: false,
    avgTicket: '$145.00',
    avgTicketNum: 145.0,
    totalRevenue: '$49,590.00',
    totalRevenueNum: 49590.0,
  },
  {
    month: 'Noviembre',
    monthIndex: 11,
    patients: 380,
    isMax: true,
    avgTicket: '$137.89',
    avgTicketNum: 137.89,
    totalRevenue: '$52,400.00',
    totalRevenueNum: 52400.0,
  },
  {
    month: 'Octubre',
    monthIndex: 10,
    patients: 315,
    isMax: false,
    avgTicket: '$150.20',
    avgTicketNum: 150.2,
    totalRevenue: '$47,313.00',
    totalRevenueNum: 47313.0,
  },
  {
    month: 'Septiembre',
    monthIndex: 9,
    patients: 290,
    isMax: false,
    avgTicket: '$142.50',
    avgTicketNum: 142.5,
    totalRevenue: '$41,325.00',
    totalRevenueNum: 41325.0,
  },
  {
    month: 'Agosto',
    monthIndex: 8,
    patients: 305,
    isMax: false,
    avgTicket: '$139.10',
    avgTicketNum: 139.1,
    totalRevenue: '$42,425.50',
    totalRevenueNum: 42425.5,
  },
];

export default function ReporteIngresos({ onBack }) {
  const [onlyHighRevenue, setOnlyHighRevenue] = useState(false);
  const [sortField, setSortField] = useState('monthIndex');
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const displayedRows = [...monthlyData]
    .filter((row) => (onlyHighRevenue ? row.totalRevenueNum >= 47000 : true))
    .sort((a, b) => {
      const diff = a[sortField] - b[sortField];
      return sortAsc ? diff : -diff;
    });

  return (
    <div
      className="max-w-7xl w-full mx-auto space-y-8 pt-2"
      data-purpose="dashboard-content"
    >
      {/* Header Banner & Action Button */}
      <section
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        data-purpose="page-header"
      >
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-slate-900 leading-tight">
            Reporte de Ingresos Mensuales
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Resumen financiero detallado del año en curso.
          </p>
        </div>
        <div>
          <Button
            type="button"
            onClick={printPage}
            className="inline-flex items-center gap-2 bg-[#1b4ed8] hover:bg-[#1e40af] text-white text-xs font-semibold px-4 py-2.5 h-auto rounded-lg shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Descargar PDF</span>
          </Button>
        </div>
      </section>

      {/* Metric Cards Grid */}
      <section
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        data-purpose="metrics-summary"
      >
        {/* Metric Card 1: Ingresos Totales */}
        <Card className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              Ingresos Totales (Anual)
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              $450,200
            </div>
            <div className="text-[11px] font-medium text-slate-400 mt-1">
              MXN Acumulado
            </div>
          </div>
        </Card>

        {/* Metric Card 2: Crecimiento */}
        <Card className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              Crecimiento (vs Año Anterior)
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              +12.5%
            </div>
            <div className="inline-flex items-center text-[10px] font-bold text-amber-600 tracking-wider mt-1">
              ↑ TENDENCIA POSITIVA
            </div>
          </div>
        </Card>

        {/* Metric Card 3: Mejor Mes */}
        <Card className="bg-white p-6 rounded-2xl border border-slate-100 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              Mejor Mes de Facturación
            </span>
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Noviembre
            </div>
            <div className="text-[11px] font-medium text-slate-400 mt-1">
              $52,400 MXN Ingresados
            </div>
          </div>
        </Card>
      </section>

      {/* Monthly Breakdown Table Section */}
      <Card
        className="bg-white rounded-2xl border border-slate-100 shadow-2xs overflow-hidden"
        data-purpose="monthly-breakdown-table"
      >
        <div className="p-6 pb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Desglose Mensual
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setOnlyHighRevenue((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f4cd9] hover:text-blue-800 h-auto px-2 py-1 cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>
              {onlyHighRevenue ? 'Mostrar todos los meses' : 'Filtrar (> $47k)'}
            </span>
          </Button>
        </div>

        <Table>
          <TableHeader className="bg-slate-50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <TableRow className="border-slate-100 hover:bg-slate-50">
              <TableHead
                onClick={() => handleSort('monthIndex')}
                className="py-3 px-6 cursor-pointer select-none hover:text-slate-700"
              >
                <div className="inline-flex items-center gap-1">
                  <span>Mes</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort('patients')}
                className="py-3 px-6 cursor-pointer select-none hover:text-slate-700"
              >
                <div className="inline-flex items-center gap-1">
                  <span>Total Pacientes</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort('avgTicketNum')}
                className="py-3 px-6 cursor-pointer select-none hover:text-slate-700"
              >
                <div className="inline-flex items-center gap-1">
                  <span>Ticket Promedio</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort('totalRevenueNum')}
                className="py-3 px-6 cursor-pointer select-none hover:text-slate-700"
              >
                <div className="inline-flex items-center gap-1">
                  <span>Ingresos Totales</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-50 text-slate-600 font-medium">
            {displayedRows.map((row) => (
              <TableRow
                key={row.month}
                className="border-slate-50 hover:bg-slate-50/50"
              >
                <TableCell className="py-4 px-6 text-slate-900 font-semibold">
                  {row.month}
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <span>{row.patients}</span>
                    {row.isMax && (
                      <Badge className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-[#fef3c7] text-[#b45309] border-0">
                        MAX
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">{row.avgTicket}</TableCell>
                <TableCell className="py-4 px-6 font-bold text-[#0f4cd9]">
                  {row.totalRevenue}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Back Link */}
      <div className="pt-2 pb-6" data-purpose="navigation-back">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Regresar a Estadísticas</span>
        </button>
      </div>
    </div>
  );
}
