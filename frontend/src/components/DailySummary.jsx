import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export default function DailySummary() {
  return (
    <Card className="flex flex-col justify-between">
      <div>
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-bold text-slate-900">
            Resumen Diario
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-0">
          {/* Donut SVG Chart Container */}
          <div className="flex items-center justify-center relative my-2">
            <svg className="w-44 h-44" viewBox="0 0 160 160">
              {/* Background Circle */}
              <circle
                cx="80"
                cy="80"
                fill="transparent"
                r="62"
                stroke="#f1f5f9"
                strokeWidth="15"
              />
              {/* Progress Arc (80%) */}
              <circle
                className="progress-ring-circle"
                cx="80"
                cy="80"
                fill="transparent"
                r="62"
                stroke="#003eb3"
                strokeDasharray="389.55"
                strokeDashoffset="77.91"
                strokeLinecap="round"
                strokeWidth="15"
              />
            </svg>
            {/* Central Metric Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-slate-900 leading-none tracking-tight">
                80%
              </span>
              <span className="text-[11px] font-medium text-slate-400 mt-1">
                Completado
              </span>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Bottom Legend */}
      <CardFooter className="justify-around pt-6 border-t border-slate-50 mt-4 text-center">
        <div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-blue-700"></span>
            <span>Atendidos</span>
          </div>
          <p className="text-sm font-bold text-slate-900 mt-0.5">24</p>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
            <span>Pendientes</span>
          </div>
          <p className="text-sm font-bold text-slate-900 mt-0.5">6</p>
        </div>
      </CardFooter>
    </Card>
  );
}

