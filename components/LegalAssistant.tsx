
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

const LegalAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: 'Você é um assistente virtual sênior da Elite Legal Chambers, uma advocacia de prestígio baseada na Slaughter and May. Seja profissional, conciso, erudito e útil. Seu objetivo é ajudar potenciais clientes a entender áreas do direito corporativo e como a Elite Legal pode ajudar. Não dê aconselhamento jurídico formal, sempre sugira uma consulta com nossos sócios.',
        }
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || 'Desculpe, ocorreu um erro no processamento.' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Houve um erro técnico. Por favor, tente novamente mais tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
      </button>

      {/* Assistant Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-96 z-[60] bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
            <div>
              <h3 className="text-lg font-serif">Assistente Elite</h3>
              <p className="text-xs text-slate-400">Consultoria Preliminar IA</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-70">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto bg-slate-50 space-y-6">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-serif text-2xl text-slate-500">E</span>
                </div>
                <h4 className="font-serif text-slate-900 mb-2">Como podemos ajudar hoje?</h4>
                <p className="text-xs text-slate-500 max-w-[200px] mx-auto">Tire dúvidas sobre áreas de atuação, tendências jurídicas ou agende uma reunião.</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-l-lg rounded-tr-lg' : 'bg-white border border-slate-200 text-slate-700 rounded-r-lg rounded-tl-lg shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-4 rounded-r-lg rounded-tl-lg shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-100 bg-white">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Sua pergunta jurídica..."
                className="w-full bg-slate-100 border-none px-4 py-3 pr-12 text-sm focus:ring-1 focus:ring-slate-900 rounded-none"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-4 text-center">
              Esta é uma interface de inteligência artificial. Não substitui aconselhamento jurídico profissional.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalAssistant;
