import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, showToast } = useAppContext();
  const [selectedSize, setSelectedSize] = useState('42');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === parseInt(id) || p.id === id);
        if (found) {
          setProduct({
            ...found,
            title: found.name,
            image: found.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
            price: parseFloat(found.price),
            details: [
              'Italian Vegetable-Tanned Calfskin',
              'Hand-painted edges',
              'Solid brass hardware',
              'Unlined interior for raw texture',
              'Made in France'
            ],
            reviews: [
              { author: 'Elena V.', location: 'London', role: 'Verified Collector', text: 'The depth of the maroon is even more striking in natural light. It feels less like an accessory and more like a piece of architecture.' },
              { author: 'Marcus Chen', location: 'Milan', role: 'Design Critic', text: 'Exceptional structural integrity. The hardware is weighted perfectly, providing a tactile satisfaction that is rare in digital commerce.' },
              { author: 'Julianne S.', location: 'Paris', role: 'Elite Member', text: 'A classic silhouette reimagined. My only critique is the wait list for the matching card holder.' }
            ],
            related: []
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch product:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-surface">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-container"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-surface gap-6">
        <h2 className="font-headline text-3xl">Piece Not Found</h2>
        <Link to="/shop" className="underline font-label uppercase text-xs tracking-widest">Back to archives</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, price: product.price });
    showToast(`Added ${product.title} to your curated bag.`);
  };

  return (
    <div className="bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <Link to="/shop" className="inline-flex items-center text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-red-900 mb-12 transition-colors">
          <span className="material-symbols-outlined text-sm mr-2">arrow_back</span>
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Image Gallery */}
          <div className="space-y-6 animate-fade-in">
            <div className="aspect-[4/5] bg-zinc-50 overflow-hidden shadow-2xl">
              <img src={product.image} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" alt={product.title} />
            </div>
            <div className="grid grid-cols-2 gap-6">
               <div className="aspect-square bg-zinc-100/50">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL31Ll2GcJZ3RDux4wzthUnNWgfOw8_WzYJCJ3Znd8zfDptkv7KoG4VyA52RqDiWPnqZQ5z2AXfoCymFcU4UG9X8vZOn5fAWTfea2vpueZhrm44EPTn_4B1hO8qo4dDqnW8MLSdjKC4b6LPQu65fHfxPUi8EJwRUfWbaR_DAZZocfqyNyyhfPpXeAMDQ1cAuTYWcsykApN6KytE_mxWS_fns4nk_WT2Kt_YERVbEcL53mbcNajFCjaG28LrTNaQZyXKBWB5oNI9Ag" className="w-full h-full object-cover opacity-80" alt="Detail 1" />
               </div>
               <div className="aspect-square bg-zinc-100/50">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQxDcW0UdyHBJ0Hdb874qoec-sBsvLA1BK_GCOksJaZwAvFJLWjkno2vkbJhiOpmXDyrp07LkN-eg_sEoFRqR9cujYuAQ1VETW982bMJlQSvnFadaFCwsbQfhPn-9H2wO_u3BFZJ1FggqS-1u7aJLzeB2TKUrBSqxseDyyN0YpBpxeXRSQzmitpyoiDgSqS5P4PK1kXeomZM9w1Rm5t20WgX38TTaEts3GCn2XROZvEikvCAF0fbCVe3bzHilKAHkvray_6NF_p0I" className="w-full h-full object-cover opacity-80" alt="Detail 2" />
               </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-fade-in-up">
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary mb-4 block">Limited Production</span>
            <h1 className="font-headline text-5xl md:text-6xl text-on-surface mb-6 leading-tight tracking-tighter">{product.title}</h1>
            <p className="font-serif text-3xl text-red-900 mb-10">${product.price.toLocaleString()}</p>
            
            <div className="space-y-8 mb-12">
              <p className="font-body text-zinc-600 leading-relaxed text-lg">
                {product.description}
              </p>
              
              <ul className="space-y-3">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs uppercase tracking-widest text-zinc-500">
                    <span className="w-1 h-1 bg-red-900 rounded-full"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-red-900 text-white py-6 uppercase font-label text-sm tracking-[0.3em] hover:bg-black transition-all shadow-xl active:scale-95"
              >
                Add to Curated Bag
              </button>
              <button className="w-full border border-zinc-200 py-6 uppercase font-label text-sm tracking-[0.3em] hover:border-red-900 transition-all">
                The Heritage Inquiry
              </button>
            </div>

            <div className="mt-16 pt-16 border-t border-zinc-100 flex items-center justify-between">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-zinc-400">local_shipping</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-zinc-400">Complimentary Global Delivery</span>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-zinc-400">verified</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-zinc-400">Artisan Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-40">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="font-headline text-4xl mb-6 tracking-tight">Honest Discourse</h2>
            <p className="font-body text-zinc-500 text-sm">Dialogue from our global community of collectors and artisans.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="bg-white p-10 border border-zinc-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col mb-6">
                  <span className="font-headline text-lg tracking-tight">{review.author}</span>
                  <span className="font-body text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-1">{review.role} • {review.location}</span>
                </div>
                <p className="font-body text-zinc-600 leading-relaxed mb-4 italic">
                  "{review.text}"
                </p>
                <div className="flex text-red-900 text-xs">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Items */}
        <section className="mt-40">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-headline text-3xl tracking-tight">The Archive Suite</h2>
            <Link to="/shop" className="font-label text-xs uppercase tracking-widest border-b border-zinc-900 pb-1">View Full Collection</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {product.related.map((item) => (
              <Link to={`/product/${item.id}`} key={item.id} className="group flex flex-col items-center">
                <div className="w-full aspect-[3/4] bg-zinc-50 overflow-hidden mb-6">
                   <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" alt="" />
                </div>
                <h3 className="font-headline text-base mb-1 group-hover:text-red-900 transition-colors uppercase tracking-widest text-xs text-center">{item.title}</h3>
                <p className="font-body text-xs text-zinc-500">${item.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
