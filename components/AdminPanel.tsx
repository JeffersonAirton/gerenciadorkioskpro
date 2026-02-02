
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
  ExternalLink
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
            <Download className="w-5 h-5" />
            <span className="font-semibold">Gerar APK</span>
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
              {activeTab === 'deploy' && "Transformar em APK"}
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

            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm space-y-6">
              <h3 className="text-xl font-bold flex items-center space-x-2">
                <Lock className="w-5 h-5 text-red-600" />
                <span>Segurança e PIN</span>
              </h3>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <p className="font-bold">Alterar PIN de Acesso</p>
                  <p className="text-sm text-slate-500">Necessário para sair do modo quiosque</p>
                </div>
                <button className="bg-white border border-slate-200 px-6 py-2 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-all">
                  Alterar
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deploy' && (
          <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-amber-50 border border-amber-200 p-8 rounded-3xl">
              <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center space-x-2">
                <Globe className="w-6 h-6" />
                <span>Passo 1: Hospede seu App Online</span>
              </h3>
              <p className="text-amber-700 leading-relaxed mb-6">
                Para gerar um APK, seu aplicativo precisa estar acessível por uma URL pública HTTPS. 
                Sugerimos usar o <strong>Vercel</strong>, <strong>Netlify</strong> ou <strong>GitHub Pages</strong>.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://vercel.com" target="_blank" className="bg-white px-4 py-2 rounded-xl border border-amber-200 text-amber-800 text-sm font-bold flex items-center space-x-2 hover:bg-amber-100 transition-all">
                  <span>Hospedar na Vercel</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Passo 2: PWABuilder</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Acesse o <strong>PWABuilder.com</strong>, cole a URL do seu app hospedado e clique em "Start". 
                  Depois, selecione "Android" e baixe o pacote.
                </p>
                <a href="https://www.pwabuilder.com" target="_blank" className="inline-block w-full text-center bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all">
                  Abrir PWABuilder
                </a>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Passo 3: Instalar APK</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Transfira o arquivo .apk para seu tablet, abra o gerenciador de arquivos e execute-o. 
                  Lembre-se de autorizar "Fontes Desconhecidas".
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-mono text-slate-400">
                  Dica: Use o Google Drive para transferir o arquivo rapidamente.
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                <span>Pronto para PWA</span>
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Manifesto JSON configurado</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Meta tags de tela cheia incluídas</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Ícones de alta resolução definidos</span>
                </li>
              </ul>
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
