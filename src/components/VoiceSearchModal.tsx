import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mic, X, Search, Sparkles, Volume2 } from 'lucide-react';

export const VoiceSearchModal: React.FC = () => {
  const { isVoiceSearchOpen, setIsVoiceSearchOpen, setSearchQuery, setActivePage } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [detectedVoiceText, setDetectedVoiceText] = useState('');

  if (!isVoiceSearchOpen) return null;

  const quickVoicePrompts = [
    { text: 'Channapatna wooden toys Karnataka', lang: 'English' },
    { text: 'కొండపల్లి చెక్క బొమ్మలు (Kondapalli wooden toys)', lang: 'తెలుగు' },
    { text: 'Kathputli string puppets Rajasthan', lang: 'English' },
    { text: 'Thanjavur dancing doll Tamil Nadu', lang: 'English' },
    { text: 'Uttarayan kites and wooden firki Gujarat', lang: 'English' },
    { text: 'Desi Lattu wooden spinning tops', lang: 'English' },
    { text: 'Natungram wooden owl Bengal', lang: 'English' },
    { text: 'Pochampally Ikat silk saree', lang: 'English' },
    { text: 'Cleaned craft coconut shells', lang: 'English' },
  ];

  const handleStartListening = () => {
    setIsListening(true);
    setDetectedVoiceText('Listening in Telugu / English...');

    setTimeout(() => {
      setIsListening(false);
      setDetectedVoiceText('Pochampally Ikat Silk');
      setSearchQuery('Pochampally');
      setTimeout(() => {
        setIsVoiceSearchOpen(false);
        setActivePage('handmade');
      }, 900);
    }, 2200);
  };

  const handleSelectPrompt = (prompt: string) => {
    const clean = prompt.split('(')[0].trim();
    setSearchQuery(clean);
    setIsVoiceSearchOpen(false);
    setActivePage('handmade');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#DDD5C7] shadow-2xl relative space-y-6">
        <button
          onClick={() => setIsVoiceSearchOpen(false)}
          className="absolute top-5 right-5 p-1.5 text-[#5C6E60] hover:text-[#1E3023] hover:bg-[#F2ECE2] rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#7A5B35]">
            ACCESSIBLE VOICE SEARCH
          </p>
          <h3 className="font-serif text-2xl font-semibold text-[#1E3023]">
            Speak in Telugu or English
          </h3>
          <p className="text-xs text-[#5D6F61] max-w-sm mx-auto">
            Designed for rural artisans, elderly handloom patrons, and hands-free searching.
          </p>
        </div>

        {/* Big Mic Button */}
        <div className="flex flex-col items-center justify-center py-4">
          <button
            onClick={handleStartListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
              isListening
                ? 'bg-[#C04838] text-white animate-pulse scale-110'
                : 'bg-[#2C4A34] text-white hover:bg-[#1E3324]'
            }`}
          >
            <Mic className="w-8 h-8 text-[#E4C59E]" />
          </button>
          <p className="text-xs font-medium text-[#1E3023] mt-3 min-h-[20px]">
            {detectedVoiceText || 'Tap microphone to speak'}
          </p>
        </div>

        {/* Suggested Voice Queries */}
        <div className="space-y-2 pt-2 border-t border-[#EDE7DD]">
          <p className="text-[11px] font-semibold uppercase text-[#8A9C8E]">
            Suggested Voice Phrases (Click to Try):
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            {quickVoicePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPrompt(p.text)}
                className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E5DFD4] text-[#1E3023] hover:bg-[#F2ECE2] text-left transition-colors flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#DDA76A]" />
                <span>{p.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
