import { useAppContext } from '../context/AppContext';

export default function Toast() {
  const { toast } = useAppContext();

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
      <div 
        className={`bg-zinc-900 border border-zinc-700/50 text-white px-6 py-3 rounded-full text-xs font-label tracking-widest uppercase shadow-2xl transition-all duration-300 ${
          toast.visible ? 'transform translate-y-0 opacity-100 scale-100' : 'transform translate-y-10 opacity-0 scale-95'
        }`}
      >
        {toast.message}
      </div>
    </div>
  );
}
