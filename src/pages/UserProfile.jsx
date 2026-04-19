import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function UserProfile() {
  const { showToast } = useAppContext();
  const profile = {
    name: 'Elena Vance',
    address: '221B Baker St, London, NW1 6XE, UK',
    tier: 'Grand Cru Member',
    memberSince: '2021',
    description: 'A curated archive of your interactions with Obsidian & Merlot. Review past acquisitions and manage your identity.'
  };

  const orders = [
    { id: '#OB-99212', item: 'Reserve Merlot 2018 Case', date: 'May 14, 2024', amount: '$1,240.00', status: 'Delivered' },
    { id: '#OB-88402', item: 'Obsidian Decanter Set', date: 'April 02, 2024', amount: '$890.00', status: 'Delivered' },
    { id: '#OB-72101', item: 'Editorial Monograph Vol. IV', date: 'February 28, 2024', amount: '$125.00', status: 'Delivered' }
  ];

  return (
    <div className="bg-surface min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-24">
        {/* Header Section */}
        <div className="mb-20 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-zinc-100 pb-12">
            <div>
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-red-900 block mb-4">The Monograph Identity</span>
              <h1 className="font-headline text-6xl tracking-tighter mb-4">{profile.name}</h1>
              <p className="font-body text-zinc-500 max-w-xl text-sm leading-relaxed italic">
                "{profile.description}"
              </p>
            </div>
            <div className="text-right">
               <span className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-400 block mb-2 font-bold">Tier Achievement</span>
               <div className="bg-zinc-900 text-white px-6 py-3 text-[10px] uppercase tracking-[0.3em] font-bold">
                  {profile.tier}
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Identity Details */}
          <div className="space-y-12 animate-fade-in-up">
            <section>
              <h3 className="font-label text-[10px] uppercase tracking-widest text-zinc-400 mb-6 font-bold">Identity Details</h3>
              <div className="space-y-4">
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Archived Address</p>
                   <p className="font-headline text-lg tracking-tight leading-relaxed">{profile.address}</p>
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Registry Email</p>
                   <p className="font-headline text-lg tracking-tight">elena.vance@monograph.com</p>
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Member Since</p>
                   <p className="font-headline text-lg tracking-tight">{profile.memberSince}</p>
                </div>
              </div>
            </section>
            
            <section className="bg-zinc-50 p-8 border border-zinc-100">
               <h3 className="font-label text-[10px] uppercase tracking-widest text-zinc-400 mb-4 font-bold">The Concierge</h3>
               <p className="font-body text-xs text-zinc-600 leading-relaxed mb-6">
                 Your dedicated concierge is available 24/7 for bespoke acquisition requests or archival inquiries.
               </p>
               <button 
                 onClick={() => showToast('Connecting to your dedicated concierge...')}
                 className="w-full bg-red-900 text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-colors"
               >
                 Contact Artisan
               </button>
            </section>
          </div>

          {/* Order Archive */}
          <div className="lg:col-span-2 space-y-12 animate-fade-in-up [animation-delay:200ms]">
            <section>
              <h3 className="font-label text-[10px] uppercase tracking-widest text-zinc-400 mb-8 font-bold">Order Archive</h3>
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="group border border-zinc-100 p-8 hover:bg-white hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-label text-[10px] uppercase tracking-widest text-red-900 font-bold">{order.id}</span>
                        <span className="text-[8px] uppercase font-bold px-2 py-0.5 bg-green-50 text-green-700 tracking-widest">{order.status}</span>
                      </div>
                      <h4 className="font-headline text-2xl tracking-tight mb-1 group-hover:text-red-900 transition-colors">{order.item}</h4>
                      <p className="font-body text-xs text-zinc-400 uppercase tracking-widest">{order.date}</p>
                    </div>
                    <div className="text-right">
                       <p className="font-serif text-xl italic text-zinc-900 mb-2">{order.amount}</p>
                       <button 
                         onClick={() => showToast(`Retrieving digital manifest for order ${order.id}...`)}
                         className="text-[10px] uppercase tracking-widest font-bold border-b border-zinc-200 pb-1 hover:border-red-900 hover:border-current transition-all"
                       >
                         View Manifest
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
