
import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Battery, 
  Wifi, 
  Clock, 
  LayoutGrid, 
  ShieldAlert,
  Search,
  Bell
} from 'lucide-react';
import { KioskApp } from '../types';
import { getIcon } from '../constants';

interface KioskLauncherProps {
  apps: KioskApp[];
  tabletName: string;
  onOpenSettings: () => void;
  onLaunchApp: (app: KioskApp) => void;
}

const KioskLauncher: React.FC<KioskLauncherProps> = ({ 
  apps, 
  tabletName, 
  onOpenSettings,
  onLaunchApp
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full relative flex flex-col bg-slate-950 overflow-hidden font-sans">
      
      {/* Background Decorativo Estilo Glassmorphism */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Barra de Status Topo */}
      <div className="h-14 px-8 flex items-center justify-between z-10 bg-black/10 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-bold tracking-widest text-slate-300">{tabletName}</span>
        </div>
        <div className="flex items-center space-x-6 text-slate-300">
          <Wifi className="w-4 h-4 text-blue-400" />
          <div className="flex items-center space-x-1.5">
            <span className="text-xs font-bold uppercase">85%</span>
            <Battery className="w-5 h-5 text-slate-400" />
          </div>
          <div className="w-px h-4 bg-white/10 mx-2"></div>
          <span className="text-sm font-bold tracking-tighter">
            {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Widget de Relógio Principal */}
      <div className="flex flex-col items-center mt-16 mb-12 z-10 select-none pointer-events-none">
        <h1 className="text-8xl font-thin tracking-tighter text-white/90">
          {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </h1>
        <p className="text-lg font-medium text-blue-400/80 uppercase tracking-[0.4em] mt-2">
          {currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      {/* Grid de Apps Central */}
      <main className="flex-1 px-12 pb-32 z-10 overflow-y-auto scroll-smooth custom-scrollbar">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-12 gap-y-16 py-8">
            {apps.map(app => (
              <button
                key={app.id}
                onClick={() => onLaunchApp(app)}
                className="group flex flex-col items-center space-y-4 focus:outline-none"
              >
                <div className={`${app.color} w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-black/60 group-hover:scale-105 group-active:scale-90 group-hover:ring-4 ring-white/20 transition-all duration-300 relative overflow-hidden`}>
                  {/* Gloss effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none opacity-50"></div>
                  <div className="transform transition-transform group-hover:rotate-12">
                    {getIcon(app.icon)}
                  </div>
                </div>
                <span className="text-base font-semibold text-slate-400 group-hover:text-white transition-colors tracking-tight text-center px-2">
                  {app.name}
                </span>
              </button>
            ))}
          </div>

          {apps.length === 0 && (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 opacity-30">
              <div className="p-6 bg-slate-800 rounded-full">
                 <ShieldAlert className="w-16 h-16" />
              </div>
              <p className="text-xl font-bold">Nenhum app autorizado no momento</p>
            </div>
          )}
        </div>
      </main>

      {/* Dock Inferior (Fixo) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-white/5 backdrop-blur-2xl px-12 py-5 rounded-[2.5rem] flex items-center space-x-10 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* Apenas botão de configurações camuflado e indicadores estéticos */}
          <button 
            onClick={onOpenSettings}
            className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <Settings className="w-7 h-7" />
          </button>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          <div className="flex space-x-3">
             <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-blue-500/50"></div>
             </div>
          </div>
          <button 
            className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-all cursor-not-allowed opacity-30"
          >
            <Bell className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KioskLauncher;
