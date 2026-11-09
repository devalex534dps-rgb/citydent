import React, { useState } from 'react';
import {
  AtSign,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Headset,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Login({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('elena.martinez@citydent.com');
  const [password, setPassword] = useState('••••••••••••');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== 'idle') return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        if (onLoginSuccess) onLoginSuccess();
      }, 600);
    }, 600);
  };

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center bg-[#faf8ff] text-[#131b2e]">
      <div className="flex flex-col w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Ambient Blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#dce1ff] opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#eaedff] opacity-60 blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md flex flex-col items-center">
          {/* Brand Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-[#0037b2] shadow-md text-white mb-4 transition-transform hover:scale-105 duration-300">
              <svg className="w-9 h-9 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C9.5 2 7.7 3.3 6.9 4.8C5.8 6.9 5.3 10.3 5.4 13.5C5.5 16.5 6.9 21.6 9.3 21.9C10.7 22.1 11.4 20.3 12 18.2C12.6 20.3 13.3 22.1 14.7 21.9C17.1 21.6 18.5 16.5 18.6 13.5C18.7 10.3 18.2 6.9 17.1 4.8C16.3 3.3 14.5 2 12 2Z" />
              </svg>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold tracking-tight text-[#131b2e]">
                City<span className="text-[#0b4ce5]">Dent</span>
              </span>
            </div>
            <p className="text-sm text-[#0037b2] mt-1 font-semibold">
              Portal de Gestión Clínica
            </p>
            <p className="text-sm text-[#434655] mt-1.5 max-w-xs">
              Ingresa tus credenciales para acceder a tu panel clínico
            </p>
          </div>

          {/* Login Card */}
          <Card className="w-full bg-white rounded-xl shadow-xl border-0 p-8 sm:p-10 relative overflow-hidden">
            {/* Top Gradient Accent Bar */}
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-[#dce1ff] via-[#0b4ce5] to-[#0037b2] rounded-t-xl" />

            <form
              className="flex flex-col gap-5 mt-2"
              onSubmit={handleSubmit}
            >
              {/* Email Field */}
              <div className="flex flex-col gap-1.5 text-left">
                <Label
                  className="text-xs font-semibold text-[#434655] flex items-center justify-between"
                  htmlFor="login-email"
                >
                  <span>Correo electrónico</span>
                  <span className="text-[11px] font-medium text-[#0037b2]">
                    Profesional
                  </span>
                </Label>
                <div className="relative flex items-center">
                  <AtSign className="size-4.5 absolute left-3.5 text-[#747687] pointer-events-none" />
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@citydent.com"
                    className="w-full h-11 pl-11 pr-4 bg-[#f2f3ff] border-transparent rounded-lg text-sm text-[#131b2e] placeholder:text-[#747687] focus:bg-white focus:border-[#0b4ce5]"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5 text-left">
                <Label
                  className="text-xs font-semibold text-[#434655]"
                  htmlFor="login-password"
                >
                  Contraseña
                </Label>
                <div className="relative flex items-center">
                  <Lock className="size-4.5 absolute left-3.5 text-[#747687] pointer-events-none" />
                  <Input
                    id="login-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 pl-11 pr-11 bg-[#f2f3ff] border-transparent rounded-lg text-sm text-[#131b2e] placeholder:text-[#747687] focus:bg-white focus:border-[#0b4ce5]"
                  />
                  <button
                    type="button"
                    aria-label="Mostrar u ocultar contraseña"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 text-[#747687] hover:text-[#131b2e] flex items-center justify-center p-1 rounded-md transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4.5" />
                    ) : (
                      <Eye className="size-4.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded text-[#0b4ce5] bg-[#f2f3ff] border-slate-300 focus:ring-0 cursor-pointer"
                  />
                  <span className="text-[13px] text-[#434655] group-hover:text-[#131b2e] transition-colors">
                    Recordar sesión
                  </span>
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs font-semibold text-[#0037b2] hover:text-[#0b4ce5] transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={status !== 'idle'}
                className={`mt-2 w-full h-11 rounded-lg text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  status === 'success'
                    ? 'bg-[#006e2d] hover:bg-[#006e2d] text-white'
                    : 'bg-[#0037b2] hover:bg-[#0b4ce5] text-white'
                }`}
              >
                {status === 'loading' && (
                  <>
                    <Loader2 className="size-4.5 animate-spin" />
                    <span>Accediendo al sistema...</span>
                  </>
                )}
                {status === 'success' && (
                  <>
                    <CheckCircle2 className="size-4.5" />
                    <span>Sesión confirmada</span>
                  </>
                )}
                {status === 'idle' && (
                  <>
                    <span>Iniciar Sesión</span>
                    <ArrowRight className="size-4.5" />
                  </>
                )}
              </Button>
            </form>

            {/* Card Footer Security Banner */}
            <div className="mt-8 pt-6 bg-[#f2f3ff] -mx-8 sm:-mx-10 -mb-8 sm:-mb-10 p-4 rounded-b-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2 text-[#434655]">
                <ShieldCheck className="size-4 text-[#006e2d]" />
                <span className="text-[11px] font-medium">
                  Cifrado de grado médico SSL 256-bit
                </span>
              </div>
              <a
                href="#soporte"
                onClick={(e) => e.preventDefault()}
                className="text-[11px] font-medium text-[#0037b2] hover:underline flex items-center gap-1"
              >
                <Headset className="size-3.5" />
                <span>Soporte Técnico</span>
              </a>
            </div>
          </Card>

          {/* Bottom Legal Links */}
          <div className="mt-8 flex items-center gap-4 text-[#434655] text-[11px] font-medium">
            <a
              href="#privacidad"
              onClick={(e) => e.preventDefault()}
              className="hover:text-[#0037b2] transition-colors"
            >
              Aviso de Privacidad
            </a>
            <a
              href="#condiciones"
              onClick={(e) => e.preventDefault()}
              className="hover:text-[#0037b2] transition-colors"
            >
              Condiciones
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

