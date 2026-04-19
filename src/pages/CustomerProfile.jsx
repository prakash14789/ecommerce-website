import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function CustomerProfile() {
  const { showToast } = useAppContext();
  const [selectedCollector, setSelectedCollector] = useState(null);
  const [customers, setCustomers] = useState([
    { 
      id: '1', 
      name: 'Elena Vance', 
      location: 'London', 
      status: 'VIP', 
      purchases: 12, 
      valuation: '$42,850', 
      initial: 'EV',
      history: [
        { date: 'Oct 24, 2024', item: 'Merlot Stiletto (Size 38)', amount: '$2,850' },
        { date: 'Aug 12, 2024', item: 'Noir Silk Scarf', amount: '$450' },
        { date: 'Jun 30, 2024', item: 'The Heritage Cuff', amount: '$1,200' }
      ],
      preferences: ['Leather Goods', 'Silks', 'Jewelry']
    },
    { 
      id: '2', 
      name: 'Marcus Thorne', 
      location: 'New York', 
      status: 'Elite Member', 
      purchases: 8, 
      valuation: '$34,200', 
      initial: 'MT',
      history: [
        { date: 'Sep 15, 2024', item: 'Obsidian Vessel', amount: '$650' },
        { date: 'Jul 22, 2024', item: 'Charcoal Structure Coat', amount: '$2,400' }
      ],
      preferences: ['Outerwear', 'Lifestyle']
    },
    { 
      id: '3', 
      name: 'Julian Rossi', 
      location: 'Paris', 
      status: 'VIP', 
      purchases: 24, 
      valuation: '$102,400', 
      initial: 'JR',
      history: [
        { date: 'Oct 10, 2024', item: 'The Sculpted Sole (Size 42)', amount: '$950' },
        { date: 'Sep 05, 2024', item: 'Architectural Tote', amount: '$1,850' }
      ],
      preferences: ['Footwear', 'Leather Goods']
    }
  ]);

  const sidebarItems = [
    { icon: 'dashboard', label: 'Analytics' },
    { icon: 'inventory_2', label: 'Inventory' },
    { icon: 'shopping_bag', label: 'Orders' },
    { icon: 'group', label: 'Customers', active: true },
    { icon: 'settings', label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-white flex flex-col pt-12 shrink-0">
        <div className="px-8 mb-16">
          <h2 className="font-headline text-xl tracking-[0.2em] font-bold">ATELIER ADMIN</h2>
        </div>
        <nav className="flex-1">
          {sidebarItems.map((item, idx) => (
            <Link 
              key={idx} 
              to={item.label === 'Orders' ? '/admin/orders' : item.label === 'Inventory' ? '/admin/inventory' : item.label === 'Analytics' ? '/admin' : item.label === 'Customers' ? '/admin/customers' : '#'}
              className={`w-full flex items-center gap-4 px-8 py-4 text-xs font-label uppercase tracking-[0.2em] transition-all hover:bg-white/5 ${item.active ? 'bg-white text-zinc-900 font-bold' : 'text-zinc-400'}`}
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-8 mt-auto border-t border-white/10">
           <Link to="/" className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Return to Storefront</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-end mb-16">
          <div>
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-red-900 block mb-2">Global Archive</span>
            <h1 className="font-headline text-5xl tracking-tight">VIP Registry</h1>
          </div>
          <div className="flex gap-4">
             <button onClick={() => showToast('Initializing new profile template...')} className="bg-zinc-900 text-white px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-all">New Profile</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Customer List */}
           <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {customers.map((customer) => (
                    <div key={customer.id} onClick={() => setSelectedCollector(customer)} className={`bg-white p-8 border hover:shadow-md transition-shadow group flex flex-col items-center cursor-pointer ${selectedCollector?.id === customer.id ? 'border-red-900 shadow-lg' : 'border-zinc-100 shadow-sm'}`}>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center font-headline text-lg group-hover:bg-red-900 group-hover:text-white transition-all mb-6 ${selectedCollector?.id === customer.id ? 'bg-red-900 text-white' : 'bg-zinc-100'}`}>
                          {customer.initial}
                      </div>
                      <h3 className="font-headline text-xl mb-1 tracking-tight text-center">{customer.name}</h3>
                      <span className="font-body text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-6">{customer.location}</span>
                      
                      <div className="w-full flex justify-between py-3 border-t border-zinc-50">
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Status</span>
                          <span className="font-label text-[10px] uppercase tracking-widest font-bold text-red-900">{customer.status}</span>
                      </div>
                      <div className="w-full flex justify-between py-3 border-t border-zinc-50 mb-8">
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Archived Value</span>
                          <span className="font-serif text-sm italic font-bold">{customer.valuation}</span>
                      </div>
                    </div>
                ))}
              </div>
           </div>

           {/* Collector Detail Sidebar */}
           <div className="bg-white p-10 border border-zinc-100 shadow-sm min-h-[600px] animate-fade-in sticky top-0">
             {selectedCollector ? (
                <div>
                   <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 block mb-4">Member Private Data</span>
                   <h2 className="font-headline text-3xl tracking-tight mb-2">{selectedCollector.name}</h2>
                   <p className="font-label text-[9px] uppercase tracking-[0.2em] text-red-900 mb-10 font-bold">{selectedCollector.status} · Since 2022</p>

                   <div className="space-y-12">
                      <section>
                         <h4 className="font-label text-[10px] uppercase tracking-widest text-zinc-400 mb-6 font-bold">Preferences Archive</h4>
                         <div className="flex flex-wrap gap-2">
                            {selectedCollector.preferences.map(p => (
                               <span key={p} className="px-3 py-1 bg-zinc-50 text-[9px] uppercase tracking-widest font-bold border border-zinc-100">{p}</span>
                            ))}
                         </div>
                      </section>

                      <section>
                         <h4 className="font-label text-[10px] uppercase tracking-widest text-zinc-400 mb-6 font-bold">Manifest History</h4>
                         <div className="space-y-6">
                            {selectedCollector.history.map((h, i) => (
                               <div key={i} className="flex flex-col border-b border-zinc-50 pb-4 last:border-0 last:pb-0">
                                  <div className="flex justify-between items-start mb-1">
                                     <p className="font-headline text-sm tracking-tight text-zinc-900">{h.item}</p>
                                     <span className="font-serif text-[11px] italic text-red-900">{h.amount}</span>
                                  </div>
                                  <span className="text-[10px] uppercase tracking-widest text-zinc-400">{h.date}</span>
                               </div>
                            ))}
                         </div>
                      </section>
                   </div>

                   <button 
                     onClick={() => showToast(`Initiating secure concierge line to ${selectedCollector.name}...`)}
                     className="w-full mt-16 py-5 bg-red-900 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-900 transition-all shadow-xl"
                   >
                     Initiate Concierge Dial
                   </button>
                </div>
             ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                   <span className="material-symbols-outlined text-4xl text-zinc-200 mb-6">person_search</span>
                   <p className="font-body text-xs text-zinc-400 uppercase tracking-widest">Select a collector to view <br/> their private monograph archive.</p>
                </div>
             )}
           </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-zinc-200 flex justify-between items-center text-[10px] uppercase tracking-widest text-zinc-400">
           <span>© 2024 MONOGRAPH ATELIER. GLOBAL VIP ARCHIVE.</span>
        </footer>
      </main>
    </div>
  );
}
