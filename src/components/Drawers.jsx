import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Drawers() {
  const { isMenuOpen, isCartOpen, setIsMenuOpen, setIsCartOpen, cartItems, cartTotal, removeFromCart } = useAppContext();

  return (
    <>
      <div 
        className={`fixed inset-y-0 left-0 w-full sm:w-80 bg-surface/95 dark:bg-zinc-950/95 backdrop-blur-3xl z-[60] transform transition-transform duration-500 flex flex-col pt-8 px-8 border-r border-zinc-200 dark:border-zinc-800 shadow-2xl ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-zinc-500 hover:text-red-900 p-2"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="font-serif text-2xl font-bold tracking-tighter text-red-900 dark:text-white uppercase mb-12">MONOGRAPH</h2>
        <nav className="flex flex-col gap-6 font-serif text-2xl tracking-widest uppercase items-start">
           <Link to="/heritage" onClick={() => setIsMenuOpen(false)} className="text-zinc-500 hover:text-red-800 transition-colors">Heritage</Link>
           <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="text-zinc-500 hover:text-red-800 transition-colors">Shop</Link>
           <Link to="/collections" onClick={() => setIsMenuOpen(false)} className="text-zinc-500 hover:text-red-800 transition-colors">Collections</Link>
           <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 my-4"></div>
           <a href="#" className="text-zinc-500 hover:text-red-800 transition-colors text-base font-sans">Atelier Services</a>
           <a href="#" className="text-zinc-500 hover:text-red-800 transition-colors text-base font-sans mt-2">Global Flagships</a>
        </nav>
      </div>

      <div 
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-surface/95 dark:bg-zinc-950/95 backdrop-blur-3xl z-[60] transform transition-transform duration-500 flex flex-col pt-8 px-8 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-serif text-2xl font-bold tracking-tighter text-red-900 uppercase">Your Bag</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-zinc-500 hover:text-red-900 p-2">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto w-full no-scrollbar">
          {cartItems.length === 0 ? (
            <p className="text-zinc-500 font-body text-sm mt-4">Your curated selection is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-center border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="h-20 w-16 bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0">
                   <img src={item.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1">
                   <h4 className="font-headline text-sm tracking-tight">{item.title}</h4>
                   <p className="font-body text-xs text-zinc-500 uppercase tracking-widest mt-1">${item.price.toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-zinc-400 hover:text-red-900 p-2"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            ))
          )}
        </div>
        
        <Link 
          to="/checkout" 
          onClick={() => setIsCartOpen(false)}
          className="w-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 py-4 text-xs font-label uppercase tracking-widest hover:opacity-80 transition-opacity mt-8 mb-8 flex justify-between items-center px-6"
        >
            <span>Proceed to Checkout</span>
            <span>${cartTotal.toLocaleString()}</span>
        </Link>
      </div>
    </>
  );
}
