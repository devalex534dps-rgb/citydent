import React, { useState, useEffect } from 'react';
import { X, User, Phone, Calendar, Clock, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function NuevaCitaModal({
  open = false,
  initialPatientName = '',
  onClose,
}) {
  const [paciente, setPaciente] = useState(initialPatientName || '');

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onClose) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="nueva-cita-modal-title"
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[500px] overflow-hidden transition-all transform animate-in fade-in zoom-in-95 duration-200"
        data-purpose="modal-container"
      >
        {/* Modal Header */}
        <div className="px-8 pt-7 pb-4 flex justify-between items-start">
          <div>
            <h2
              id="nueva-cita-modal-title"
              className="text-[22px] font-bold text-slate-900 tracking-tight"
            >
              Nueva Cita
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Complete los detalles para agendar al paciente.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Cerrar modal"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 h-8 w-8 rounded-lg cursor-pointer"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Modal Body / Form */}
        <form className="px-8 pb-8 space-y-4" onSubmit={handleSubmit}>
          {/* Field: Paciente */}
          <div>
            <Label
              className="block text-xs font-semibold text-slate-800 mb-1.5"
              htmlFor="paciente-input"
            >
              Paciente
            </Label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <User className="size-4" />
              </span>
              <Input
                id="paciente-input"
                name="paciente"
                type="text"
                required
                value={paciente}
                onChange={(e) => setPaciente(e.target.value)}
                placeholder="Nombre completo del paciente"
                className="w-full pl-10 pr-4 py-2.5 h-10 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-700 placeholder:text-slate-400 text-sm border-slate-100 rounded-lg"
              />
            </div>
          </div>

          {/* Field: Teléfono Celular */}
          <div>
            <Label
              className="block text-xs font-semibold text-slate-800 mb-1.5"
              htmlFor="telefono-input"
            >
              Teléfono Celular
            </Label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <Phone className="size-4" />
              </span>
              <Input
                id="telefono-input"
                name="telefono"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full pl-10 pr-4 py-2.5 h-10 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-700 placeholder:text-slate-400 text-sm border-slate-100 rounded-lg"
              />
            </div>
          </div>

          {/* Two Columns Row: Fecha y Hora */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Field: Fecha */}
            <div>
              <Label
                className="block text-xs font-semibold text-slate-800 mb-1.5"
                htmlFor="fecha-input"
              >
                Fecha
              </Label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <Calendar className="size-4" />
                </span>
                <Input
                  id="fecha-input"
                  name="fecha"
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="w-full pl-10 pr-4 py-2.5 h-10 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-700 placeholder:text-slate-400 text-sm border-slate-100 rounded-lg"
                />
              </div>
            </div>

            {/* Field: Hora */}
            <div>
              <Label
                className="block text-xs font-semibold text-slate-800 mb-1.5"
                htmlFor="hora-input"
              >
                Hora
              </Label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <Clock className="size-4" />
                </span>
                <Input
                  id="hora-input"
                  name="hora"
                  type="text"
                  placeholder="--:-- --"
                  className="w-full pl-10 pr-4 py-2.5 h-10 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-700 placeholder:text-slate-400 text-sm border-slate-100 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Field: Tipo de Tratamiento */}
          <div>
            <Label
              className="block text-xs font-semibold text-slate-800 mb-1.5"
              htmlFor="tratamiento-select"
            >
              Tipo de Tratamiento
            </Label>
            <div className="relative">
              <select
                id="tratamiento-select"
                name="tratamiento"
                defaultValue=""
                className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-700 text-sm border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg appearance-none cursor-pointer pr-10 transition-all"
              >
                <option value="" disabled>
                  Seleccione un tratamiento
                </option>
                <option value="limpieza">Limpieza Dental General</option>
                <option value="ortodoncia">Control de Ortodoncia</option>
                <option value="extraccion">Extracción Quirúrgica</option>
                <option value="blanqueamiento">Blanqueamiento Dental</option>
                <option value="endodoncia">Endodoncia</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="size-4" />
              </div>
            </div>
          </div>

          {/* Field: Notas Adicionales */}
          <div>
            <Label
              className="block text-xs font-semibold text-slate-800 mb-1.5"
              htmlFor="notas-textarea"
            >
              Notas Adicionales
            </Label>
            <textarea
              id="notas-textarea"
              name="notas"
              rows={3}
              placeholder="Observaciones o requerimientos especiales..."
              className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-700 placeholder:text-slate-400 text-sm border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg resize-none transition-all"
            />
          </div>

          {/* Modal Actions Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="px-5 py-2.5 h-auto bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="px-5 py-2.5 h-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-lg shadow-xs cursor-pointer"
            >
              Agendar Cita
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
