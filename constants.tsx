
import React from 'react';
import { 
  LayoutGrid, 
  Settings, 
  Globe, 
  MessageSquare, 
  Camera, 
  Mail, 
  Play, 
  Calculator, 
  FileText,
  Music,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { KioskApp } from './types';

export const MOCK_APPS: KioskApp[] = [
  { id: '1', name: 'Navegador', icon: 'Globe', category: 'Ferramentas', isEnabled: true, color: 'bg-blue-500' },
  { id: '2', name: 'Mensagens', icon: 'MessageSquare', category: 'Comunicação', isEnabled: true, color: 'bg-green-500' },
  { id: '3', name: 'Câmera', icon: 'Camera', category: 'Multimídia', isEnabled: false, color: 'bg-gray-500' },
  { id: '4', name: 'E-mail', icon: 'Mail', category: 'Produtividade', isEnabled: true, color: 'bg-red-500' },
  { id: '5', name: 'Vídeos', icon: 'Play', category: 'Multimídia', isEnabled: false, color: 'bg-purple-500' },
  { id: '6', name: 'Calculadora', icon: 'Calculator', category: 'Utilitários', isEnabled: true, color: 'bg-orange-500' },
  { id: '7', name: 'Documentos', icon: 'FileText', category: 'Produtividade', isEnabled: false, color: 'bg-indigo-500' },
  { id: '8', name: 'Música', icon: 'Music', category: 'Multimídia', isEnabled: true, color: 'bg-pink-500' },
  { id: '9', name: 'Calendário', icon: 'Calendar', category: 'Organização', isEnabled: true, color: 'bg-yellow-500' },
];

export const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Globe': return <Globe className="w-8 h-8" />;
    case 'MessageSquare': return <MessageSquare className="w-8 h-8" />;
    case 'Camera': return <Camera className="w-8 h-8" />;
    case 'Mail': return <Mail className="w-8 h-8" />;
    case 'Play': return <Play className="w-8 h-8" />;
    case 'Calculator': return <Calculator className="w-8 h-8" />;
    case 'FileText': return <FileText className="w-8 h-8" />;
    case 'Music': return <Music className="w-8 h-8" />;
    case 'Calendar': return <Calendar className="w-8 h-8" />;
    case 'ShieldCheck': return <ShieldCheck className="w-8 h-8" />;
    default: return <LayoutGrid className="w-8 h-8" />;
  }
};
