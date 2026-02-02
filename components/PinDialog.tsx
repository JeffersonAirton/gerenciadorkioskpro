
import React, { useState, useEffect } from 'react';
import { Delete, Lock, ShieldCheck, ChevronLeft } from 'lucide-react';

interface PinDialogProps {
  onComplete: (pin: string) => void;
  title: string;
  description: string;
  isVerification?: boolean;
}

const PinDialog: React.FC<PinDialogProps> = ({ 
  onComplete, 
  title, 
  description,
  isVerification = false 
}) => {
  const [pin, setPin] = useState('');
  const [isError, setIsError] = useState(false);
  const maxLength = 4;

  const handlePress = (num: string) => {
    if (pin.length < maxLength) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === maxLength) {
        setTimeout(() => onComplete(newPin), 200);
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="flex flex-col items-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col items-center space-y-4">
        <div className={`p-5 rounded-3xl ${isVerification ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-600 text-white'} shadow-xl`}>
          {isVerification ? <Lock className="w-10 h-10" /> : <ShieldCheck className="w-10 h-10" />}
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight text-white mb-2">{title}</h2>
          <p className="text-slate-400 text-sm max-w-[280px] leading-relaxed mx-auto">{description}</p>
        </div>
      </div>

      {/* Indicadores do PIN */}
      <div className="flex space-x-6 py-4">
        {[...Array(maxLength)].map((_, i) => (
          <div 
            key={i} 
            className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
              i < pin.length 
                ? 'bg-blue-500 border-blue-500 scale-125 shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                : 'border-slate-700 bg-transparent'
            }`} 
          />
        ))}
      </div>

      {/* Teclado Numérico */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-xs">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            onClick={() => handlePress(n.toString())}
            className="w-full aspect-square flex items-center justify-center text-3xl font-bold bg-white/5 hover:bg-white/10 active:bg-blue-600 active:scale-90 rounded-[2rem] transition-all duration-150 border border-white/5 text-white shadow-lg"
          >
            {n}
          </button>
        ))}
        <div className="flex items-center justify-center">
            {/* Espaçador */}
        </div>
        <button
          onClick={() => handlePress('0')}
          className="w-full aspect-square flex items-center justify-center text-3xl font-bold bg-white/5 hover:bg-white/10 active:bg-blue-600 active:scale-90 rounded-[2rem] transition-all duration-150 border border-white/5 text-white shadow-lg"
        >
          0
        </button>
        <button
          onClick={handleDelete}
          className="w-full aspect-square flex items-center justify-center bg-white/5 hover:bg-red-500/40 text-slate-300 active:scale-90 rounded-[2rem] transition-all duration-150 border border-white/5 shadow-lg"
        >
          <Delete className="w-8 h-8" />
        </button>
      </div>
      
      <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">Acesso Protegido pelo KioskPro</p>
    </div>
  );
};

export default PinDialog;
