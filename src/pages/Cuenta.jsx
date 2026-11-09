import React, { useRef } from 'react';
import { Pencil, Mail, Phone, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function Cuenta() {
  const fileInputRef = useRef(null);

  return (
    <div className="max-w-7xl w-full">
      {/* Encabezado de página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Cuenta
        </h1>
        <p className="text-sm font-normal text-slate-500 mt-1">
          Administra tu Informacion Personal
        </p>
      </div>

      {/* Layout de Dos Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Profile Card */}
        <Card
          className="lg:col-span-4 rounded-xl border-slate-200/80 shadow-xs"
          data-purpose="profile-card"
        >
          <CardContent className="p-8 flex flex-col items-center">
            {/* Contenedor del Avatar y Botón flotante */}
            <div className="relative mb-5">
              <Avatar className="w-28 h-28 border-2 border-slate-100 shadow-xs">
                <AvatarImage
                  src="/elena-avatar.png"
                  alt="Avatar de Dr. Elena Rostova"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
              />

              {/* Botón de Editar Foto (Lápiz Azul) */}
              <Button
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-0 w-8 h-8 bg-[#164ec6] hover:bg-blue-700 text-white rounded-full shadow-sm cursor-pointer"
                title="Cambiar foto"
                type="button"
              >
                <Pencil className="size-4" />
              </Button>
            </div>

            {/* Nombre y Rol */}
            <h2 className="text-xl font-bold text-slate-900 mb-2 text-center">
              Dr. Elena Rostova
            </h2>
            <Badge
              variant="secondary"
              className="bg-slate-100/90 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full mb-6"
            >
              Administrador &amp; Dentista
            </Badge>

            <Separator className="mb-6 bg-slate-100" />

            {/* Información de Contacto */}
            <div className="w-full space-y-4 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-slate-400 shrink-0" />
                <span className="truncate">elena.r@dentalspa.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-slate-400 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Forms Column */}
        <div className="lg:col-span-8 space-y-8" data-purpose="forms-column">
          {/* Tarjeta 1: Información Personal */}
          <Card
            className="rounded-xl border-slate-200/80 shadow-xs"
            data-purpose="personal-info-card"
          >
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Informacion Personal
              </h2>

              <form
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Grid Nombres y Apellidos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label className="mb-1.5">Nombres</Label>
                    <Input
                      className="px-4 py-2.5 h-10 bg-[#f1f3f6] text-slate-800 focus-visible:ring-[#164ec6]"
                      type="text"
                      defaultValue="Elena"
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5">Apellidos</Label>
                    <Input
                      className="px-4 py-2.5 h-10 bg-[#f1f3f6] text-slate-800 focus-visible:ring-[#164ec6]"
                      type="text"
                      defaultValue="Rostova"
                    />
                  </div>
                </div>

                {/* Grid Correo y Teléfono */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label className="mb-1.5">Correo Electronico</Label>
                    <Input
                      className="px-4 py-2.5 h-10 bg-[#f1f3f6] text-slate-800 focus-visible:ring-[#164ec6]"
                      type="email"
                      defaultValue="elena.r@dentalspa.com"
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5">Numero de Celular</Label>
                    <Input
                      className="px-4 py-2.5 h-10 bg-[#f1f3f6] text-slate-800 focus-visible:ring-[#164ec6]"
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Fila Ancho Completo: Especialidad / Rol */}
                <div>
                  <Label className="mb-1.5">Especialidad /Rol</Label>
                  <Input
                    className="px-4 py-2.5 h-10 bg-[#f1f3f6] text-slate-800 focus-visible:ring-[#164ec6]"
                    type="text"
                    defaultValue="Administrador & Dentista"
                  />
                </div>

                {/* Botón Guardar Cambios */}
                <div className="flex justify-end pt-3">
                  <Button
                    className="bg-[#164ec6] hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 h-auto rounded-lg shadow-xs cursor-pointer"
                    type="submit"
                  >
                    Guardar Cambios
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Tarjeta 2: Seguridad */}
          <Card
            className="rounded-xl border-slate-200/80 shadow-xs"
            data-purpose="security-card"
          >
            <CardContent className="p-8">
              {/* Título con candado */}
              <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100">
                <Lock className="size-5 text-slate-800" />
                <h2 className="text-xl font-bold text-slate-900">Seguridad</h2>
              </div>

              <form
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Contraseña Actual */}
                <div>
                  <Label className="mb-1.5">Contraseña Actual</Label>
                  <Input
                    className="px-4 py-2.5 h-10 bg-[#f1f3f6] text-slate-800 tracking-widest focus-visible:ring-[#164ec6]"
                    type="password"
                    defaultValue="password123"
                  />
                </div>

                {/* Nueva Contraseña */}
                <div>
                  <Label className="mb-1.5">Nueva Contraseña</Label>
                  <Input
                    className="px-4 py-2.5 h-10 bg-[#f1f3f6] text-slate-800 focus-visible:ring-[#164ec6]"
                    placeholder="Nueva Contraseña"
                    type="password"
                  />
                </div>

                {/* Confirmar nueva contraseña */}
                <div>
                  <Label className="mb-1.5">Confirmar nueva contraseña</Label>
                  <Input
                    className="px-4 py-2.5 h-10 bg-[#f1f3f6] text-slate-800 focus-visible:ring-[#164ec6]"
                    placeholder="Confirmar nueva contraseña"
                    type="password"
                  />
                </div>

                {/* Botón Actualizar */}
                <div className="pt-2">
                  <Button
                    className="bg-[#164ec6] hover:bg-blue-700 text-white font-medium text-sm px-6 py-2.5 h-auto rounded-lg shadow-xs cursor-pointer"
                    type="submit"
                  >
                    Actualizar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
