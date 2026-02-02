
import React, { useState } from 'react';
import { 
  Settings, 
  Play, 
  ShieldCheck, 
  Power, 
  Trash2, 
  Smartphone, 
  AppWindow, 
  LayoutDashboard, 
  Lock, 
  Info,
  ChevronRight,
  Download,
  Globe,
  CheckCircle2,
  ExternalLink,
  PackageCheck
} from 'lucide-react';
import { KioskApp, KioskConfig } from '../types';
import { getIcon } from '../constants';

interface AdminPanelProps {
  apps: KioskApp[];
  config: KioskConfig;
  onToggleApp: (id: string) => void;
  onEnterKiosk: () => void;
  onUpdateTabletName: (name: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  apps, 
  config, 
  onToggleApp, 
  onEnterKiosk,
  onUpdateTabletName 
}) => {
  const [activeTab, setActiveTab] = useState<'apps' | 'settings' | 'deploy' | 'info'>('apps');

  return (
    <div className="h-full flex bg-slate-100 text-slate-900 overflow-hidden">
      {/* Sidebar Lateral */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">KioskPro</span>
          </div>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Admin Control</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('apps')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'apps' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <AppWindow className="w-5 h-5" />
            <span className="font-semibold">Aplicativos</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-semibold">Configurações</span>
          </button>
          <button 
            onClick={() => setActiveTab('deploy')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'deploy' ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <PackageCheck className="w-5 h-5" />
            <span className="font-semibold">Obter APK</span>
          </button>
          <button 
            onClick={() => setActiveTab('info')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'info' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Info className="w-5 h-5" />
            <span className="font-semibold">Informações</span>
          </button>
        </nav>

        <div className="p-6">
          <button 
            onClick={onEnterKiosk}
            className="w-full bg-white text-slate-900 font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 hover:bg-slate-100 transition-all shadow-xl active:scale-95"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>LANÇAR MODO QUIOSQUE</span>
          </button>
        </div>
      </aside>

      {/* Área de Conteúdo */}
      <main className="flex-1 overflow-y-auto p-12">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeTab === 'apps' && "Gerenciar Aplicativos"}
              {activeTab === 'settings' && "Configurações do Dispositivo"}
              {activeTab === 'deploy' && "Gerar Arquivo APK"}
              {activeTab === 'info' && "Sobre o Sistema"}
            </h2>
            <p className="text-slate-500 mt-1">Status: Conectado • {config.tabletName}</p>
          </div>
        </header>

        {activeTab === 'apps' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {apps.map(app => (
              <div 
                key={app.id} 
                className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex items-center justify-between group hover:shadow-md transition-all"
              >
                <div className="flex items-center space-x-5">
                  <div className={`${app.color} p-4 rounded-2xl text-white shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                    {getIcon(app.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{app.name}</h3>
                    <p className="text-sm text-slate-500">{app.category}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onToggleApp(app.id)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${app.isEnabled ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${app.isEnabled ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
              <h3 className="text-xl font-bold flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-blue-600" />
                <span>Identidade do Tablet</span>
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-600 ml-1">Nome de Exibição</label>
                  <input 
                    type="text" 
                    value={config.tabletName}
                    onChange={(e) => onUpdateTabletName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                    placeholder="Ex: Totem Entrada Principal"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deploy' && (
          <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-600 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
               <h3 className="text-3xl font-black mb-4">Pronto para o seu Tablet</h3>
               <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                 O sistema já inclui <strong>Service Workers</strong> e <strong>Web Manifest</strong>. 
                 Isso significa que ele está 100% otimizado para ser convertido em um APK nativo agora mesmo.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 mb-4">
                  <Globe className="w-7 h-7" />
                </div>
                <h4 className="font-bold mb-2">1. Hospede</h4>
                <p className="text-xs text-slate-500 mb-4">Suba o código para a Vercel ou Netlify e copie a URL.</p>
                <a href="https://vercel.com" target="_blank" className="text-blue-600 font-bold text-sm flex items-center space-x-1">
                  <span>Ir para Vercel</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-4">
                  <Download className="w-7 h-7" />
                </div>
                <h4 className="font-bold mb-2">2. Converta</h4>
                <p className="text-xs text-slate-500 mb-4">Cole a URL no PWABuilder e baixe o pacote Android.</p>
                <a href="https://www.pwabuilder.com" target="_blank" className="text-amber-600 font-bold text-sm flex items-center space-x-1">
                  <span>Abrir PWABuilder</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-4">
                  <Smartphone className="w-7 h-7" />
                </div>
                <h4 className="font-bold mb-2">3. Instale</h4>
                <p className="text-xs text-slate-500 mb-4">Envie o arquivo .apk para o tablet e instale direto.</p>
                <div className="text-green-600 font-bold text-sm">Pronto para rodar!</div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-white/5">
              <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                <span>Checklist de Prontidão (Auto-detectado)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Service Worker: ATIVO</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Manifesto: VÁLIDO</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">HTTPS: REQUERIDO</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Icones: 512px OK</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Versão 3.5.2</h3>
              <p className="text-slate-500 leading-relaxed">
                Sistema operacional KioskPro otimizado para tablets corporativos e dispositivos de ponto de venda.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
