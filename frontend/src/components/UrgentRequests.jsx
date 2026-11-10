import React, { useState } from 'react';
import { Frown, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function UrgentRequests({ onViewAll, onOpenNuevaCita }) {
  const [contactedAna, setContactedAna] = useState(false);

  return (
    <section className="mb-8" data-purpose="urgent-requests">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900">
          Solicitudes Urgentes
        </h2>
        <Button
          variant="link"
          className="p-0 h-auto font-semibold cursor-pointer"
          type="button"
          onClick={() => onViewAll && onViewAll('solicitudes-urgentes')}
        >
          Ver todas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Urgent Card 1: Ana Pérez */}
        <Card className="border-l-4 border-l-red-500 flex flex-col justify-between">
          <div>
            <CardHeader className="pb-0 flex-row items-start justify-between space-y-0 gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-11 h-11">
                  <AvatarFallback>
                    <Frown className="size-5 text-slate-500" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Ana Pérez</CardTitle>
                  <CardDescription>Paciente recurrente</CardDescription>
                </div>
              </div>
              <Badge
                variant="destructive"
                className="px-3 py-1 rounded-md whitespace-nowrap leading-tight text-center"
              >
                Dolor
                <br className="sm:hidden" /> Agudo
              </Badge>
            </CardHeader>
            <CardContent className="pt-4 pb-0">
              <p className="text-xs text-slate-600 leading-relaxed">
                Molar inferior derecho, inflamación severa reportada hace 1 hora
                vía app.
              </p>
            </CardContent>
          </div>
          <CardFooter className="pt-6">
            <Button
              variant="outline"
              onClick={() => setContactedAna((prev) => !prev)}
              className={`w-full py-2.5 h-auto rounded-xl font-semibold text-xs cursor-pointer ${
                contactedAna
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : ''
              }`}
              type="button"
            >
              {contactedAna ? (
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5" />
                  Paciente Contactada
                </span>
              ) : (
                'Contactar Ahora'
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Urgent Card 2: Luis Gómez */}
        <Card className="border-l-4 border-l-amber-400 flex flex-col justify-between">
          <div>
            <CardHeader className="pb-0 flex-row items-start justify-between space-y-0 gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-11 h-11">
                  <AvatarFallback>
                    <ImageIcon className="size-5 text-slate-500" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Luis Gómez</CardTitle>
                  <CardDescription>Nuevo paciente</CardDescription>
                </div>
              </div>
              <Badge
                variant="warning"
                className="px-3 py-1 rounded-md whitespace-nowrap"
              >
                Estética
              </Badge>
            </CardHeader>
            <CardContent className="pt-4 pb-0">
              <p className="text-xs text-slate-600 leading-relaxed">
                Caída de corona provisional frontal. Requiere cementación rápida.
              </p>
            </CardContent>
          </div>
          <CardFooter className="pt-6">
            <Button
              variant="outline"
              onClick={() => onOpenNuevaCita && onOpenNuevaCita('Luis Gómez')}
              className="w-full py-2.5 h-auto rounded-xl font-semibold text-xs cursor-pointer"
              type="button"
            >
              Programar Hueco
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
