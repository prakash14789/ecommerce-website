import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function EliteDashboard() {
  const { showToast } = useAppContext();
  const member = {
    name: 'Alexander',
    tier: 'Grand Cru Member',
    points: '14,280',
    privileges: '08 Active',
    stylist: 'Marcus'
  };

  const privatePieces = [
    { title: 'Noire Leather Sati', source: 'Handcrafted Paris', price: '€4,200', image: 'https://picsum.photos/seed/leather/400/500' },
    { title: 'Grand Complication 01', source: 'Limited 1/50', price: '€18,500', image: 'https://picsum.photos/seed/watch/400/500' },
    { title: 'Oudh Marone Essence', source: 'Private Blend', price: '€380', image: 'https://picsum.photos/seed/perfume/400/500' }
  ];

  const handleInteraction = (message) => {
    showToast(message);
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 px-8 py-6 flex justify-between items-center">
        <h1 className="font-headline text-xl tracking-[0.3em] font-bold text-red-900">ATELIER ELITE</h1>
        <div className="flex gap-12">
           <Link to="/" className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Home</Link>
           <Link to="/collections" className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Collections</Link>
           <Link to="/profile" className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Identity</Link>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-8 md:px-20 max-w-[1600px] mx-auto">
        {/* Welcome Header */}
        <header className="mb-24 animate-fade-in">
           <span className="font-label text-[10px] uppercase tracking-[0.5em] text-red-800 block mb-4">Member Exclusive Access</span>
           <h2 className="font-headline text-6xl md:text-8xl tracking-tighter mb-6 leading-tight">
             Welcome back to the <br/>
             <span className="italic text-zinc-400">Inner Circle, {member.name}.</span>
           </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Member Status Sidebar */}
          <div className="space-y-12 animate-fade-in-up md:sticky md:top-32 h-fit">
            <section className="bg-white/5 border border-white/10 p-10 backdrop-blur-md shadow-2xl">
              <h3 className="font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-8 font-bold">Member Snapshot</h3>
              <div className="space-y-8">
                 <div>
                    <p className="text-[9px] uppercase tracking-widest text-red-900 mb-1 font-bold">Status</p>
                    <p className="font-headline text-2xl tracking-tight">{member.tier}</p>
                 </div>
                 <div>
                    <p className="text-[9px] uppercase tracking-widest text-red-900 mb-1 font-bold">Editorial Points</p>
                    <p className="font-headline text-2xl tracking-tight">{member.points}</p>
                 </div>
                 <div>
                    <p className="text-[9px] uppercase tracking-widest text-red-900 mb-1 font-bold">Privileges</p>
                    <p className="font-headline text-2xl tracking-tight">{member.privileges}</p>
                 </div>
              </div>
            </section>

            <section className="p-2 border-t border-white/5">
               <h3 className="font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-4 font-bold">Personal Stylist</h3>
               <p className="font-body text-xs text-zinc-400 leading-relaxed mb-6">
                 Your dedicated stylist, <span className="text-white font-bold">{member.stylist}</span>, is available for personalized curation and private viewing appointments.
               </p>
               <button 
                 onClick={() => handleInteraction(`Requesting immediate consultation with ${member.stylist}...`)}
                 className="w-full bg-white text-black py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-red-900 hover:text-white transition-all shadow-xl"
               >
                 Initiate Viewing
               </button>
            </section>

            <section className="pt-8 border-t border-white/5">
                <div className="bg-gradient-to-br from-red-950/40 to-transparent p-8 border border-red-900/20">
                   <h4 className="font-headline text-xl mb-2">Autumn '24 Monograph</h4>
                   <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">A limited-edition hardcover visual journey. Ships September.</p>
                   <button 
                     onClick={() => handleInteraction('Autumn \'24 Monograph reserved in your private manifest.')}
                     className="text-[10px] uppercase tracking-widest font-bold text-red-700 hover:text-red-500 transition-colors"
                   >
                     Manifest Reservation
                   </button>
                </div>
            </section>
          </div>

          {/* Private Collection Grid */}
          <div className="lg:col-span-3 space-y-12 animate-fade-in-up [animation-delay:200ms]">
            <div className="flex justify-between items-end mb-12">
               <div>
                  <h3 className="font-headline text-4xl tracking-tight mb-2">Private Collections</h3>
                  <p className="font-body text-sm text-zinc-500 italic">Rare, unreleased pieces curated for select circle members.</p>
               </div>
               <button 
                 onClick={() => handleInteraction('Accessing the Extended Archive Suite...')}
                 className="text-[10px] uppercase tracking-widest font-bold border-b border-white/20 pb-1 hover:border-white transition-all"
               >
                 View Whole Archive
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {privatePieces.map((piece, i) => (
                  <div key={i} className="group cursor-pointer">
                     <div className="aspect-[4/5] overflow-hidden mb-6 bg-zinc-900 relative">
                        <img src={piece.image} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" alt="" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                        <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                           <button 
                             onClick={(e) => { e.stopPropagation(); handleInteraction(`Bespoke inquiry for ${piece.title} dispatched.`); }}
                             className="bg-white text-black px-6 py-3 text-[9px] uppercase tracking-widest font-bold shadow-2xl hover:bg-black hover:text-white transition-all"
                           >
                             Bespoke Inquiry
                           </button>
                        </div>
                     </div>
                     <h4 className="font-headline text-xl tracking-tight mb-1">{piece.title}</h4>
                     <div className="flex justify-between items-center text-zinc-500">
                        <span className="text-[10px] uppercase tracking-widest font-bold">{piece.source}</span>
                        <span className="font-serif italic text-white">{piece.price}</span>
                     </div>
                  </div>
               ))}
            </div>

            {/* Event reservations placeholder */}
            <div className="pt-24 grid md:grid-cols-2 gap-12">
               <div className="border border-white/5 p-12 bg-zinc-900/50 backdrop-blur-sm group hover:border-red-900/50 transition-colors">
                  <span className="material-symbols-outlined text-4xl text-red-900 mb-6 group-hover:rotate-12 transition-transform">event_seat</span>
                  <h3 className="font-headline text-3xl mb-4 tracking-tight">Private Reservation</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-8">Secure your seat at our upcoming Paris atelier showing. Limited to 12 members per session.</p>
                  <button 
                    onClick={() => handleInteraction('Reserving your seat at the Paris Atelier...')}
                    className="bg-white text-black px-10 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-red-900 hover:text-white transition-all"
                  >
                    Book Session
                  </button>
               </div>
               <div className="border border-white/5 p-12 bg-zinc-900/50 backdrop-blur-sm group hover:border-red-900/50 transition-colors flex flex-col justify-end min-h-[400px] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-40">
                     <img src="https://picsum.photos/seed/archive/600/800" className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-headline text-3xl mb-4 tracking-tight">Atelier Archive</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-8">Explore the digital monograph of our 100-year history. Every material, every stitch archived.</p>
                    <button 
                      onClick={() => handleInteraction('Opening the Master Digital Archive...')}
                      className="w-fit border border-white/20 px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all"
                    >
                      Open Archive
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 py-16 border-t border-white/5 px-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-zinc-600 gap-8">
         <div className="flex gap-12">
            <button onClick={() => handleInteraction('Accessing Privileged Terms...')} className="hover:text-white transition-colors">Privileged Terms</button>
            <button onClick={() => handleInteraction('Archive Security Manifest loading...')} className="hover:text-white transition-colors">Archive Security</button>
            <button onClick={() => handleInteraction('Connecting to Elite Network...')} className="hover:text-white transition-colors">Elite Network</button>
         </div>
         <span>© 2024 MONOGRAPH ATELIER. THE ELITE CIRLCE ARCHIVE.</span>
      </footer>
    </div>
  );
}
