import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function AdminLogin() {
  const [adminId, setAdminId] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');
  const { setIsAdminAuthenticated, showToast } = useAppContext();
  const navigate = useNavigate();

  const handleAuthenticate = (e) => {
    e.preventDefault();
    // Specific ID/Access Key check from Monograph Atelier protocols
    if (adminId === 'ID-994-ADMIN' && accessKey === 'monograph2024') {
      setIsAdminAuthenticated(true);
      showToast('Atelier Authority Granted');
      navigate('/admin');
    } else {
      setError('AUTHENTICATION FAILURE: INVALID PROTOCOL');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>
      
      <div className="relative w-full max-w-sm bg-zinc-100/10 backdrop-blur-3xl border border-white/5 shadow-2xl p-8 md:p-12 animate-fade-in group">
        {/* Branding */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl text-red-900 tracking-tight leading-none mb-1">Atelier</h1>
          <h1 className="font-serif text-3xl text-red-900 tracking-tight leading-none">Authority</h1>
          <div className="w-12 h-[1px] bg-red-900 mx-auto mt-6"></div>
        </div>

        {/* Header */}
        <div className="mb-8">
           <h2 className="font-sans text-xs uppercase tracking-[0.3em] text-white font-bold mb-2">Admin Login</h2>
           <p className="font-sans text-[10px] text-zinc-300 uppercase tracking-widest leading-relaxed">
             Enter your credentials to manage the collection.
           </p>
        </div>

        <form onSubmit={handleAuthenticate} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest text-zinc-300 font-bold">Admin Identifier</label>
            <input 
              type="text" 
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="ID-000-XXXX"
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white text-[11px] font-mono tracking-widest focus:border-red-900 outline-none transition-all placeholder:text-zinc-700" 
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[9px] uppercase tracking-widest text-zinc-300 font-bold">Access Key</label>
              <button type="button" className="text-[8px] uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">Forgotten?</button>
            </div>
            <input 
              type="password" 
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-black/40 border border-white/10 px-4 py-3 text-white text-[11px] font-mono tracking-widest focus:border-red-900 outline-none transition-all placeholder:text-zinc-700" 
            />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" className="accent-red-900 w-3 h-3 bg-transparent border-white/10 rounded" />
            <span className="text-[9px] uppercase tracking-widest text-zinc-300">Remember this station for 30 days</span>
          </div>

          {error && (
            <p className="text-[9px] uppercase tracking-widest text-red-900 font-bold animate-pulse text-center">{error}</p>
          )}

          <button 
            type="submit"
            className="w-full bg-red-900 text-white py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group/btn shadow-lg"
          >
            Authenticate
            <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </form>

        {/* Security Footer */}
        <div className="mt-16 flex justify-between items-center pt-8 border-t border-white/10">
           <span className="text-[7px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Encrypted AES-256</span>
           <div className="flex gap-4">
             <button className="text-[7px] uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors font-bold">Documentation</button>
             <button className="text-[7px] uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors font-bold">Emergency</button>
           </div>
        </div>
      </div>
    </div>
  );
}
