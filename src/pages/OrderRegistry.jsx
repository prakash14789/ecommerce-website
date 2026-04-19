import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function OrderRegistry() {
  const { showToast } = useAppContext();
  const [orders, setOrders] = useState([
    { id: '#8829', customer: 'Julian Rossi', date: 'Oct 24, 2024', total: '$12,400', status: 'Shipped', items: 4 },
    { id: '#8828', customer: 'Elena Vance', date: 'Oct 24, 2024', total: '$2,850', status: 'Processing', items: 1 },
    { id: '#8827', customer: 'Marcus Thorne', date: 'Oct 23, 2024', total: '$850', status: 'Delivered', items: 1 },
    { id: '#8826', customer: 'Sophia Chen', date: 'Oct 22, 2024', total: '$4,200', status: 'Shipped', items: 2 },
    { id: '#8825', customer: 'Amara Okafor', date: 'Oct 21, 2024', total: '$1,150', status: 'Cancelled', items: 3 }
  ]);

  const sidebarItems = [
    { icon: 'dashboard', label: 'Analytics' },
    { icon: 'inventory_2', label: 'Inventory' },
    { icon: 'shopping_bag', label: 'Orders', active: true },
    { icon: 'group', label: 'Customers' },
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
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-red-900 block mb-2">Manifest Registry</span>
            <h1 className="font-headline text-5xl tracking-tight">Recent Orders</h1>
          </div>
          <div className="flex gap-4">
             <button 
               onClick={() => showToast('Generating new manifest batch...')}
               className="bg-white border border-zinc-200 px-6 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-zinc-50 transition-colors"
             >
               Generate Manifest
             </button>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-white border border-zinc-100 p-6 flex gap-8 mb-8 shadow-sm">
           <button className="text-[10px] uppercase tracking-widest font-bold border-b-2 border-red-900 pb-1">All Orders</button>
           <button className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 hover:text-zinc-900 transition-colors pb-1 border-b-2 border-transparent">Processing</button>
           <button className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 hover:text-zinc-900 transition-colors pb-1 border-b-2 border-transparent">In Transit</button>
           <button className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 hover:text-zinc-900 transition-colors pb-1 border-b-2 border-transparent">Completed</button>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-zinc-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-100">
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Order ID</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Customer</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Date</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Total Valuation</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Manifest Status</th>
                <th className="px-8 py-6 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-8 py-6 font-headline text-sm tracking-tight text-red-900">{order.id}</td>
                  <td className="px-8 py-6 font-headline text-sm tracking-tight">{order.customer}</td>
                  <td className="px-8 py-6 font-body text-xs text-zinc-500">{order.date}</td>
                  <td className="px-8 py-6 font-serif text-sm italic">{order.total} <span className="text-[10px] opacity-40 not-italic ml-1">({order.items} Items)</span></td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 text-[8px] uppercase tracking-[0.2em] font-bold rounded-full ${
                      order.status === 'Shipped' ? 'bg-blue-50 text-blue-700' : 
                      order.status === 'Processing' ? 'bg-amber-50 text-amber-700' : 
                      order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 
                      'bg-red-50 text-red-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => showToast(`Generating detailed manifest for order ${order.id}...`)}
                      className="text-[10px] uppercase tracking-widest font-bold text-zinc-300 hover:text-zinc-900 transition-colors"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-zinc-200 flex justify-between items-center text-[10px] uppercase tracking-widest text-zinc-400">
           <span>© 2024 MONOGRAPH ATELIER. ORDER REGISTRY SYSTEM.</span>
        </footer>
      </main>
    </div>
  );
}
