import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function ProductCard({ product }) {
  const { addToCart, showToast } = useAppContext();

  return (
    <div className="group cursor-pointer">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-low mb-6">
          <img 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            src={product.image} 
            alt={product.title} 
          />
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              className="w-full glass-card py-3 text-xs font-label uppercase tracking-widest text-primary font-bold hover:bg-primary-container hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 duration-500"
            >
              Quick Add — ${product.price.toLocaleString()}
            </button>
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-start">
        <Link to={`/product/${product.id}`} className="block flex-1">
          <div>
            <h3 className="font-headline text-lg tracking-tight mb-1 group-hover:text-red-900 transition-colors">{product.title}</h3>
            <p className="font-body text-xs text-outline uppercase tracking-widest">{product.category}</p>
          </div>
        </Link>
        <button 
          className="p-2 hover:text-error transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            showToast('Saved to Favorites');
          }}
        >
          <span className="material-symbols-outlined text-xl">favorite</span>
        </button>
      </div>
    </div>
  );
}
