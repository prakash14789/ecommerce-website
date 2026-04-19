import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-20 px-12 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 tonal-shift mt-32 relative z-40">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1600px] mx-auto">
        <div>
          <Link to="/"><span className="font-serif text-4xl mb-8 block text-red-900 cursor-pointer">MONOGRAPH</span></Link>
          <p className="font-sans text-xs uppercase tracking-widest leading-loose text-zinc-500">
            Crafting modern heritage since 1994. Every piece is numbered and archived.
          </p>
        </div>
        <div>
          <h4 className="font-sans text-xs uppercase tracking-widest mb-8 text-red-900 font-bold">Atelier Services</h4>
          <ul className="space-y-4">
            <li><Link to="/heritage" className="font-sans text-xs uppercase tracking-widest leading-loose text-zinc-500 opacity-60 hover:opacity-100 transition-opacity">The Monograph Story</Link></li>
            <li><Link to="/" className="font-sans text-xs uppercase tracking-widest leading-loose text-zinc-500 opacity-60 hover:opacity-100 transition-opacity">Shipping &amp; Returns</Link></li>
            <li><Link to="/collections" className="font-sans text-xs uppercase tracking-widest leading-loose text-zinc-500 opacity-60 hover:opacity-100 transition-opacity">Global Flagships</Link></li>
            <li><a href="#" className="font-sans text-xs uppercase tracking-widest leading-loose text-zinc-500 opacity-60 hover:opacity-100 transition-opacity">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-sans text-xs uppercase tracking-widest mb-8 text-red-900 font-bold">The Registry</h4>
          <p className="font-sans text-xs uppercase tracking-widest leading-loose text-zinc-500 mb-6">
            Join our elite list for early access to seasonal monographs.
          </p>
          <div className="flex border-b border-zinc-300 dark:border-zinc-700 pb-2">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-transparent border-none focus:ring-0 text-xs uppercase tracking-widest w-full px-0" 
            />
            <button className="text-red-900">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto mt-20 text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-zinc-400">
          © 2024 MONOGRAPH ATELIER. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
