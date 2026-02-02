
import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Settings, Lock, Unlock, X } from 'lucide-react';
import { AppMode, KioskApp, KioskConfig } from './types';
import { MOCK_APPS } from './constants';
import AdminPanel from './components/AdminPanel';
import KioskLauncher from './components/KioskLauncher';
import PinDialog from './components/PinDialog';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('SETUP');
  const [apps, setApps] = useState<KioskApp[]>(MOCK_APPS);
  const [config, setConfig] = useState<KioskConfig>({
    pin: '',
    allowedApps: [],
    tabletName: 'Tablet Portaria Central',
    lastLogin: new Date().toISOString()
  });
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinTargetMode, setPinTargetMode] = useState<AppMode | null>(null);
  const [activeApp, setActiveApp] = useState<KioskApp | null>(null);

  // Load from local storage
  useEffect(() => {
    const savedConfig = localStorage.getItem('kiosk_config');
    const savedApps = localStorage.getItem('kiosk_apps');
    
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setConfig(parsedConfig);
      if (parsedConfig.pin) {
        setMode('ADMIN');
      }
    }
    
    if (savedApps) {
      setApps(JSON.parse(savedApps));
    }
  }, []);

  // Save to local storage
  const saveAll = useCallback((newConfig: KioskConfig, newApps: KioskApp[]) => {
    localStorage.setItem('kiosk_config', JSON.stringify(newConfig));
    localStorage.setItem('kiosk_apps', JSON.stringify(newApps));
    setConfig(newConfig);
    setApps(newApps);
  }, []);

  const handleSetPin = (newPin: string) => {
    const updatedConfig = { ...config, pin: newPin };
    saveAll(updatedConfig, apps);
    setMode('ADMIN');
  };

  const handleToggleApp = (appId: string) => {
    const newApps = apps.map(app => 
      app.id === appId ? { ...app, isEnabled: !app.isEnabled } : app
    );
    saveAll(config, newApps);
  };

  const requestModeChange = (target: AppMode) => {
    if (target === 'ADMIN' || target === 'SETUP') {
      setPinTargetMode(target);
      setShowPinModal(true);
    } else {
      setMode(target);
    }
  };

  const onPinSuccess = () => {
    if (pinTargetMode) {
      setMode(pinTargetMode);
      setPinTargetMode(null);
    }
    setShowPinModal(false);
  };

  const launchApp = (app: KioskApp) => {
    setActiveApp(app);
    setMode('APP_VIEW');
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-900 text-white font-sans">
      {/* Setup Mode: First time PIN setting */}
      {mode === 'SETUP' && (
        <div className="flex flex-col items-center justify-center h-full space-y-8 p-6 animate-in fade-in duration-500">
          <div className="bg-blue-600 p-6 rounded-full shadow-2xl shadow-blue-500/20">
            <ShieldCheck className="w-16 h-16 text-white" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Bem-vindo ao KioskPro</h1>
            <p className="text-slate-400">Para começar, defina uma senha de acesso para as configurações.</p>
          </div>
          <div className="w-full max-w-xs">
            <PinDialog 
              onComplete={handleSetPin} 
              title="Definir PIN"
              description="Este PIN será necessário para sair do modo quiosque."
            />
          </div>
        </div>
      )}

      {/* Admin Panel */}
      {mode === 'ADMIN' && (
        <AdminPanel 
          apps={apps} 
          config={config} 
          onToggleApp={handleToggleApp} 
          onEnterKiosk={() => setMode('KIOSK')}
          onUpdateTabletName={(name) => saveAll({ ...config, tabletName: name }, apps)}
        />
      )}

      {/* Kiosk Mode Launcher */}
      {mode === 'KIOSK' && (
        <KioskLauncher 
          apps={apps.filter(a => a.isEnabled)} 
          tabletName={config.tabletName}
          onOpenSettings={() => requestModeChange('ADMIN')}
          onLaunchApp={launchApp}
        />
      )}

      {/* App Simulation View */}
      {mode === 'APP_VIEW' && activeApp && (
        <div className="h-full w-full flex flex-col bg-black animate-in slide-in-from-bottom duration-300">
          <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className={`${activeApp.color} p-1.5 rounded-md`}>
                <div className="scale-75 origin-center">
                  {/* Reuse icon logic */}
                </div>
              </div>
              <span className="font-medium text-slate-200">{activeApp.name}</span>
            </div>
            <button 
              onClick={() => setMode('KIOSK')}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
            <div className={`${activeApp.color} p-10 rounded-3xl shadow-xl shadow-current opacity-20`}>
              {/* Giant background icon simulation */}
            </div>
            <h2 className="text-4xl font-bold">Executando {activeApp.name}</h2>
            <p className="text-slate-500 max-w-md">Esta é uma simulação de aplicativo em execução no modo quiosque. No modo real, este espaço seria ocupado pelo aplicativo nativo selecionado.</p>
            <button 
              onClick={() => setMode('KIOSK')}
              className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all font-semibold"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      )}

      {/* Pin Input Overlay for Mode Switching */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          <div className="w-full max-w-sm bg-slate-800 rounded-3xl p-8 border border-white/10 shadow-2xl relative">
            <button 
              onClick={() => setShowPinModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <PinDialog 
              onComplete={(enteredPin) => {
                if (enteredPin === config.pin) {
                  onPinSuccess();
                } else {
                  alert("PIN Incorreto!");
                }
              }}
              title="Acesso Restrito"
              description="Digite o PIN de administrador para acessar as configurações."
              isVerification={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
