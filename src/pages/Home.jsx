import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(categoryParam || 'All Items');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (categoryParam) {
      setActiveFilter(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        const mappedData = data.map(p => ({
          ...p,
          title: p.name,
          image: p.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
          price: parseFloat(p.price)
        }));
        setProductsData(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = productsData.filter(product => {
    const matchesFilter = activeFilter === 'All Items' || product.category === activeFilter;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-container"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16">
      <section className="mt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-outline mb-4 block">Seasonal Series</span>
            <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-on-surface leading-none">The Curated<br/>Shadow</h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="font-body text-sm text-secondary max-w-xs md:text-right italic">A collection exploring the interplay of light and dark through Italian leather and heavy-weight silks.</p>
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-40">
        <div className="glass-card rounded-full px-6 py-3 flex flex-wrap items-center justify-between gap-4 shadow-sm border border-white/20">
          <div className="flex items-center gap-4 flex-1 min-w-[300px]">
            <span className="material-symbols-outlined text-outline">search</span>
            <input 
              type="text" 
              placeholder="Search our archives..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none focus:ring-0 w-full font-body text-sm placeholder:text-outline/50"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {['All Items', 'Outerwear', 'Leather Goods', 'Accessories', 'Dresses', 'Footwear', 'Knitwear', 'Jewellery'].map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-label uppercase tracking-wider whitespace-nowrap transition-colors ${
                  activeFilter === filter 
                    ? 'bg-primary-container text-white' 
                    : 'bg-surface-container-high/50 text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {filter}
              </button>
            ))}
            <div className="w-px h-6 bg-outline/20 mx-2"></div>
            <button className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">tune</span>
              Filters
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <section className="mt-16 flex flex-col items-center gap-8">
        <div className="h-px w-24 bg-primary-container"></div>
        <div className="flex items-center gap-12 font-headline text-xl">
          <button className="opacity-20 cursor-not-allowed">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <div className="flex items-center gap-8">
            <span className="text-primary font-bold underline underline-offset-8">01</span>
            <span className="text-secondary hover:text-primary transition-colors cursor-pointer">02</span>
            <span className="text-secondary hover:text-primary transition-colors cursor-pointer">03</span>
          </div>
          <button className="text-primary hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
        </div>
        <p className="font-body text-xs text-outline uppercase tracking-[0.2em]">Viewing {filteredProducts.length} of {productsData.length} Artifacts</p>
      </section>
    </div>
  );
}
