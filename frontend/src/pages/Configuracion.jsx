import React, { useState } from 'react';
import {
  Building2,
  Clock,
  Bell,
  ShieldCheck,
  RefreshCw,
  ChevronRight,
  LogOut,
  Save,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

const initialSchedule = [
  { day: 'Lunes', open: true, start: '09:00 AM', end: '06:00 PM' },
  { day: 'Martes', open: true, start: '09:00 AM', end: '06:00 PM' },
  { day: 'Miércoles', open: true, start: '09:00 AM', end: '06:00 PM' },
  { day: 'Jueves', open: true, start: '09:00 AM', end: '06:00 PM' },
  { day: 'Viernes', open: true, start: '09:00 AM', end: '06:00 PM' },
  { day: 'Sábado', open: true, start: '09:00 AM', end: '06:00 PM' },
  { day: 'Domingo', open: false, start: '--:-- --', end: '--:-- --' },
];

export default function Configuracion({ onNavigate, onLogout }) {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const toggleDay = (index) => {
    setSchedule((prev) =>
      prev.map((item, idx) =>
        idx === index
          ? {
              ...item,
              open: !item.open,
              start: !item.open ? '09:00 AM' : '--:-- --',
              end: !item.open ? '06:00 PM' : '--:-- --',
            }
          : item
      )
    );
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      onReset={() => {
        setSchedule(initialSchedule);
        setEmailNotif(true);
        setSmsNotif(true);
        setPushNotif(false);
        setTwoFactor(false);
      }}
      className="max-w-6xl w-full mx-auto space-y-8 pt-2"
    >
      {/* Section Title Header */}
      <div data-purpose="page-heading">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Configuración
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-normal">
          Administra las preferencias y detalles operativos de tu clínica.
        </p>
      </div>

      {/* Section 1: Clinic Profile */}
      <Card
        className="rounded-2xl border-slate-100"
        data-purpose="clinic-profile"
      >
        <CardContent className="p-7 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="size-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Perfil de la Clínica
            </h2>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label>Nombre de la Clínica</Label>
                <Input
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 h-10 text-xs font-medium shadow-2xs"
                  type="text"
                  defaultValue="DentalSpa Premium"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Correo Electrónico</Label>
                <Input
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 h-10 text-xs font-medium shadow-2xs"
                  type="email"
                  defaultValue="contacto@dentalspa.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Dirección Física</Label>
              <Input
                className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 h-10 text-xs font-medium shadow-2xs"
                type="text"
                defaultValue="Av. de las Ciencias 452, Col. Moderna, Ciudad de México"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <Label>Teléfono de Contacto</Label>
                <Input
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 h-10 text-xs font-medium shadow-2xs"
                  type="text"
                  defaultValue="+52 55 1234 5678"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Sitio Web</Label>
                <Input
                  className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 h-10 text-xs font-medium shadow-2xs"
                  type="text"
                  defaultValue="https://www.dentalspa.com"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Working Hours */}
      <Card
        className="rounded-2xl border-slate-100"
        data-purpose="working-hours"
      >
        <CardContent className="p-7 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="size-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Horario de Atención
            </h2>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-200">
                  <TableHead>Día</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Apertura</TableHead>
                  <TableHead>Cierre</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-slate-700">
                {schedule.map((row, idx) => (
                  <TableRow key={row.day}>
                    <TableCell className="font-semibold text-slate-800">
                      {row.day}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={row.open}
                          onCheckedChange={() => toggleDay(idx)}
                        />
                        <span
                          className={
                            row.open
                              ? 'text-slate-600 font-medium'
                              : 'text-slate-500 font-medium'
                          }
                        >
                          {row.open ? 'Abierto' : 'Cerrado'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell
                      className={row.open ? 'text-slate-600' : 'text-slate-400'}
                    >
                      {row.start}
                    </TableCell>
                    <TableCell
                      className={row.open ? 'text-slate-600' : 'text-slate-400'}
                    >
                      {row.end}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Notifications & Security */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications Card */}
        <Card
          className="rounded-2xl border-slate-100"
          data-purpose="notifications-settings"
        >
          <CardContent className="p-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Bell className="size-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900">
                Notificaciones
              </h2>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/40">
                <div className="space-y-0.5 pr-2">
                  <h3 className="text-xs font-semibold text-slate-800">
                    Notificaciones por Email
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Confirmación de citas y resúmenes diarios.
                  </p>
                </div>
                <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/40">
                <div className="space-y-0.5 pr-2">
                  <h3 className="text-xs font-semibold text-slate-800">
                    Alertas SMS
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Recordatorios críticos de última hora.
                  </p>
                </div>
                <Switch checked={smsNotif} onCheckedChange={setSmsNotif} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/40">
                <div className="space-y-0.5 pr-2">
                  <h3 className="text-xs font-semibold text-slate-800">
                    Push en Navegador
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Alertas directas mientras usas el panel.
                  </p>
                </div>
                <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card
          className="rounded-2xl border-slate-100"
          data-purpose="security-settings"
        >
          <CardContent className="p-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <ShieldCheck className="size-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Seguridad</h2>
            </div>

            <div className="space-y-3.5">
              <Button
                variant="outline"
                onClick={() => onNavigate && onNavigate('cuenta')}
                className="w-full justify-between p-4 h-auto rounded-xl border-slate-200 hover:border-slate-300 bg-white text-slate-800 cursor-pointer"
                type="button"
              >
                <div className="flex items-center gap-3">
                  <RefreshCw className="size-4 text-slate-600" />
                  <span className="text-xs font-semibold text-slate-800">
                    Cambiar Contraseña
                  </span>
                </div>
                <ChevronRight className="size-4 text-slate-400" />
              </Button>

              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="size-4 text-slate-600" />
                    <span className="text-xs font-semibold text-slate-800">
                      Doble Factor (2FA)
                    </span>
                  </div>
                  <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                </div>
                <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                  Aumenta la seguridad de tu cuenta solicitando un código
                  adicional en el inicio de sesión.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLogout && onLogout()}
                  className="gap-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 cursor-pointer"
                  type="button"
                >
                  <LogOut className="size-4" />
                  Cerrar todas las sesiones
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons Footer */}
      <div
        className="flex items-center justify-end gap-4 pt-4"
        data-purpose="form-actions"
      >
        <Button
          variant="ghost"
          type="reset"
          className="px-5 py-2.5 h-auto text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="gap-2 px-6 py-2.5 h-auto text-xs font-semibold text-white bg-blue-900 hover:bg-blue-950 rounded-xl shadow-md shadow-blue-950/20 cursor-pointer"
        >
          <Save className="size-4" />
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
}
