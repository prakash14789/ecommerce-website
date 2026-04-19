import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function AdminDashboard() {
  const { setIsAdminAuthenticated, showToast } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    showToast('Securely Signed Out');
    navigate('/admin/login');
  };

  const sidebarItems = [
    { icon: 'dashboard', label: 'Analytics', active: true },
    { icon: 'inventory_2', label: 'Inventory' },
    { icon: 'shopping_bag', label: 'Orders' },
    { icon: 'group', label: 'Customers' },
    { icon: 'settings', label: 'Settings' }
  ];

  const recentManifests = [
    { name: 'Elena Vance', action: 'Ordered Merlot Stiletto (Size 38)', amount: '$2,850', time: '2 mins ago', initial: 'EV' },
    { name: 'Marcus Thorne', action: 'New VIP Registration', amount: null, time: '15 mins ago', initial: 'MT' },
    { name: 'Julian Rossi', action: 'Order #8829 Shipped', amount: '$12,400', time: '1 hour ago', initial: 'JR' }
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
              to={item.label === 'Inventory' ? '/admin/inventory' : item.label === 'Analytics' ? '/admin' : '#'}
              className={`w-full flex items-center gap-4 px-8 py-4 text-xs font-label uppercase tracking-[0.2em] transition-all hover:bg-white/5 ${item.active ? 'bg-white text-zinc-900 font-bold' : 'text-zinc-400'}`}
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <button 
            onClick={handleLogout}
            className="w-full mt-4 flex items-center gap-4 px-8 py-4 text-xs font-label uppercase tracking-[0.2em] text-red-500 hover:bg-red-500/10 transition-all border-t border-white/5"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Sign Out
          </button>
        </nav>
        <div className="p-8 mt-auto border-t border-white/10">
           <Link to="/" className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Return to Storefront</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-end mb-16">
          <div>
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-red-900 block mb-2">Fiscal Year 2024</span>
            <h1 className="font-headline text-5xl tracking-tight">The Editorial Monograph</h1>
          </div>
          <div className="flex gap-4">
             <button className="bg-white border border-zinc-200 px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-zinc-50 transition-colors">Export Report</button>
             <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-white font-label text-xs">A</div>
          </div>
        </header>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-10 border border-zinc-100 shadow-sm">
            <span className="text-[10px] font-label uppercase tracking-widest text-zinc-400 block mb-4">Total Sales</span>
            <div className="flex items-end justify-between">
               <span className="font-headline text-5xl tracking-tighter">$1.2M</span>
               <span className="text-green-600 font-label text-xs font-bold">+12.4%</span>
            </div>
          </div>
          <div className="bg-white p-10 border border-zinc-100 shadow-sm">
            <span className="text-[10px] font-label uppercase tracking-widest text-zinc-400 block mb-4">Avg. Ticket</span>
            <div className="flex items-end justify-between">
               <span className="font-headline text-5xl tracking-tighter">$850.00</span>
               <span className="text-zinc-400 font-label text-xs">— Steady</span>
            </div>
          </div>
          <div className="bg-white p-10 border border-zinc-100 shadow-sm bg-red-900 text-white">
            <span className="text-[10px] font-label uppercase tracking-widest text-zinc-300 block mb-4">Luxury Tier Growth</span>
            <div className="flex items-end justify-between">
               <span className="font-headline text-5xl tracking-tighter">+28%</span>
               <span className="material-symbols-outlined text-3xl">trending_up</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Top Selling Pieces */}
          <section className="bg-white p-10 border border-zinc-100 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h2 className="font-headline text-2xl tracking-tight">Top-Selling Pieces</h2>
              <button className="text-[10px] uppercase tracking-widest font-bold border-b border-zinc-900">Inventory</button>
            </div>
            <div className="space-y-6">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex items-center justify-between py-4 border-b border-zinc-50 last:border-0 hover:bg-zinc-50/50 transition-colors px-2 -mx-2">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-16 bg-zinc-100 overflow-hidden shrink-0">
                          <img src={`https://picsum.photos/seed/${i + 10}/100/150`} className="w-full h-full object-cover grayscale" alt="" />
                       </div>
                       <div>
                          <p className="font-headline text-sm tracking-tight">{i === 1 ? 'Meridien Sneaker' : i === 2 ? 'Marche Shoulder Bag' : 'Nightfall Silk Tie'}</p>
                          <p className="font-body text-[10px] text-zinc-400 uppercase tracking-widest mt-1">{i === 1 ? 'Accessories' : 'Leather Goods'}</p>
                       </div>
                    </div>
                    <span className="font-body text-sm font-bold text-zinc-900">+{24 - i * 4}%</span>
                 </div>
               ))}
            </div>
          </section>

          {/* Recent Manifests */}
          <section className="bg-white p-10 border border-zinc-100 shadow-sm">
            <h2 className="font-headline text-2xl tracking-tight mb-10">Recent Manifests</h2>
            <div className="space-y-8">
               {recentManifests.map((manifest, idx) => (
                 <div key={idx} className="flex gap-6 items-start group">
                    <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center font-label text-[10px] font-bold text-zinc-500 group-hover:bg-red-900 group-hover:text-white transition-all">
                       {manifest.initial}
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between items-start mb-1">
                          <p className="font-headline text-base tracking-tight">{manifest.name}</p>
                          <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">{manifest.time}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <p className="font-body text-xs text-zinc-500 leading-relaxed">{manifest.action}</p>
                          {manifest.amount && <span className="font-serif text-sm text-red-900 italic">{manifest.amount}</span>}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
            <button className="w-full mt-10 py-4 border border-zinc-200 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-zinc-50 transition-all">View All Activity</button>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-zinc-200 flex justify-between items-center text-[10px] uppercase tracking-widest text-zinc-400">
           <div className="flex gap-8">
              <a href="#" className="hover:text-zinc-900">Privacy</a>
              <a href="#" className="hover:text-zinc-900">Terms</a>
              <a href="#" className="hover:text-zinc-900">Support</a>
           </div>
           <span>© 2024 MONOGRAPH ATELIER. ADMIN V1.0.2</span>
        </footer>
      </main>
    </div>
  );
}
