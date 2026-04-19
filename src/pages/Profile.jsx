import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Profile() {
  const { userInfo, setIsAuthenticated, setUserInfo, showToast } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/auth');
    }
  }, [userInfo, navigate]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
    showToast('Securely Disconnected from Registry');
    navigate('/auth');
  };

  if (!userInfo) return null;

  return (
    <div className="min-h-screen bg-zinc-900 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 animate-fade-in">
          <span className="font-label text-[10px] uppercase tracking-[0.4em] text-red-900 block mb-4">Registry Profile</span>
          <h1 className="font-headline text-5xl text-white tracking-tight leading-none">Welcome, {userInfo.name}</h1>
          <p className="font-serif text-zinc-400 italic text-lg mt-6 opacity-80 max-w-2xl">
             "The true measure of luxury is the legacy we leave behind in our personal archives."
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-fade-in-up">
          {/* Main Details */}
          <div className="md:col-span-2 space-y-12">
            <section className="bg-white/5 backdrop-blur-xl border border-white/10 p-10">
               <h2 className="font-headline text-2xl text-white mb-8 tracking-tight">Account Protocols</h2>
               <div className="space-y-6">
                  <div className="flex justify-between items-center py-4 border-b border-white/5">
                     <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Email Identity</span>
                     <span className="text-sm text-white font-body">{userInfo.email}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-white/5">
                     <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Registry Status</span>
                     <span className="text-sm text-green-500 font-bold uppercase tracking-widest">Active Member</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-white/5">
                     <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Access Tier</span>
                     <span className="text-sm text-zinc-300 font-body">Elite Monograph Collector</span>
                  </div>
               </div>
            </section>

            <section className="bg-white/5 backdrop-blur-xl border border-white/10 p-10">
               <h2 className="font-headline text-2xl text-white mb-8 tracking-tight">Your Order Archive</h2>
               <div className="space-y-6">
                  <div className="p-6 border border-white/5 bg-white/5 flex justify-between items-center group hover:bg-white/10 transition-all">
                     <div>
                        <p className="text-[10px] uppercase tracking-widest text-red-900 font-bold mb-1">Order Ref #MN-992</p>
                        <h3 className="font-headline text-lg text-white">Merlot Stiletto Custom Fit</h3>
                     </div>
                     <span className="text-[8px] uppercase tracking-widest font-bold px-3 py-1 bg-zinc-800 text-zinc-400 border border-white/5">Processing</span>
                  </div>
                  
                  <div className="p-6 border border-white/5 bg-white/5 flex justify-between items-center group hover:bg-white/10 transition-all opacity-60">
                     <div>
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Order Ref #MN-884</p>
                        <h3 className="font-headline text-lg text-white">Obsidian Fragment Vase</h3>
                     </div>
                     <span className="text-[8px] uppercase tracking-widest font-bold px-3 py-1 bg-green-900/20 text-green-500 border border-green-900/30">Delivered</span>
                  </div>
               </div>
            </section>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-8">
             <div className="bg-red-900/10 border border-red-900/30 p-8">
                <h3 className="font-headline text-lg text-red-900 mb-4 tracking-tight">Concierge Services</h3>
                <ul className="space-y-4">
                   <li><button className="text-[10px] uppercase tracking-widest text-zinc-300 hover:text-white transition-colors">Request Catalog</button></li>
                   <li><button className="text-[10px] uppercase tracking-widest text-zinc-300 hover:text-white transition-colors">Private Viewing</button></li>
                   <li><button className="text-[10px] uppercase tracking-widest text-zinc-300 hover:text-white transition-colors">Shipment Tracking</button></li>
                </ul>
             </div>

             <button 
               onClick={handleLogout}
               className="w-full py-4 border border-white/10 text-[10px] uppercase tracking-[0.3em] text-red-700 font-bold hover:bg-red-900 hover:text-white transition-all shadow-xl"
             >
               Sign Out Securely
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
