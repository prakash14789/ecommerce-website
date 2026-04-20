import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Pieces');
  const { showToast } = useAppContext();

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Outerwear',
    price: '',
    stock: '',
    discount: 0,
    description: '',
    image_url: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const filters = ['All Pieces', 'Outerwear', 'Accessories', 'Footwear', 'Leather Goods', 'Knitwear', 'Jewellery', 'Dresses'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      showToast('Error retrieving master archive');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing 
        ? `http://localhost:5000/api/products/${editingId}`
        : 'http://localhost:5000/api/products';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock),
          discount: parseFloat(newProduct.discount) || 0,
          image_url: newProduct.image_url || `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80`
        })
      });

      if (response.ok) {
        showToast(isEditing ? 'Archive Entry Revised' : 'Acquisition Archived Successfully');
        fetchProducts();
        setNewProduct({ name: '', category: 'Outerwear', price: '', stock: '', discount: 0, description: '', image_url: '' });
        setIsEditing(false);
        setEditingId(null);
      } else {
        const err = await response.json();
        showToast(err.message || 'Failed to process request');
      }
    } catch (err) {
      showToast('Backend Synchronization Failure');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to remove this piece from the collection?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        showToast('Piece Removed from Collection');
        fetchProducts();
      } else {
        showToast('Removal Failed');
      }
    } catch (err) {
      showToast('Synchronization Error');
    }
  };

  const handleEditClick = (p) => {
    setNewProduct({
      name: p.name,
      category: p.category,
      price: p.price,
      stock: p.stock,
      discount: p.discount,
      description: p.description,
      image_url: p.image_url
    });
    setIsEditing(true);
    setEditingId(p.id);
    document.getElementById('add-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleCleanupDuplicates = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/cleanup', {
        method: 'POST'
      });
      const data = await response.json();
      if (response.ok) {
        showToast(data.message);
        fetchProducts();
      } else {
        showToast('Cleanup failed');
      }
    } catch (err) {
      showToast('Cleanup sync failure');
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'All Pieces' || p.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = products.reduce((sum, p) => sum + (parseFloat(p.final_price || p.price) * (p.stock || 0)), 0);
  const outOfStock = products.filter(p => p.stock === 0).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length;

  const sidebarItems = [
    { icon: 'dashboard', label: 'Analytics', to: '/admin' },
    { icon: 'inventory_2', label: 'Inventory', to: '/admin/inventory', active: true },
    { icon: 'shopping_bag', label: 'Orders', to: '/admin/orders' },
    { icon: 'group', label: 'Customers', to: '/admin/customers' },
    { icon: 'settings', label: 'Settings', to: '#' },
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex font-sans">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-xl border-r border-zinc-100 shadow-lg flex flex-col z-40">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-[#800000] tracking-tighter font-serif">THE ATELIER</h1>
        </div>
        <div className="px-6 py-4 flex items-center gap-4 mb-4">
          <div className="h-10 w-10 rounded-full bg-zinc-200 overflow-hidden shrink-0">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
              className="w-full h-full object-cover"
              alt="Admin"
            />
          </div>
          <div>
            <p className="font-serif font-bold text-xs text-[#800000]">Editorial Admin</p>
            <p className="text-[9px] uppercase tracking-widest text-zinc-400">Lead Curator</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium uppercase tracking-widest transition-all ${
                item.active
                  ? 'bg-[#800000] text-white shadow-md'
                  : 'text-zinc-500 hover:bg-zinc-100'
              }`}
            >
              <span className="material-symbols-outlined text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-zinc-100">
          <Link to="/" className="text-[10px] uppercase tracking-widest text-zinc-400 hover:text-[#800000] transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Return to Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#f9f9f9]/90 backdrop-blur-md border-b border-zinc-100 px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#800000]">menu_open</span>
            <h2 className="font-serif text-base font-bold text-[#800000] italic">The Editorial Admin</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined text-[#800000] cursor-pointer">notifications</span>
              {(outOfStock > 0 || lowStock > 0) && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-[#800000] rounded-full"></span>
              )}
            </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleCleanupDuplicates}
              className="border border-[#800000] text-[#800000] px-5 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-[#800000]/10 transition-all rounded-lg"
            >
              Purge Duplicates
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setNewProduct({ name: '', category: 'Outerwear', price: '', stock: '', discount: 0, description: '', image_url: '' });
                document.getElementById('add-form').scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#800000] text-white px-5 py-2 text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-all rounded-lg shadow-md"
            >
              + Add New Product
            </button>
          </div>
          </div>
        </header>

        <div className="p-10 flex-1">
          {/* Page Title */}
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#800000] font-bold mb-1">Admin Panel</p>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-zinc-900">Inventory Management</h1>
            <p className="text-zinc-400 text-xs mt-1">Curating the digital collection of the Atelier.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            <div className="bg-white rounded-xl p-6 border border-zinc-100 shadow-sm">
              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-3">Total Pieces</p>
              <p className="font-serif text-3xl font-bold text-zinc-900">{products.length.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-zinc-100 shadow-sm">
              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-3">In Stock</p>
              <p className="font-serif text-3xl font-bold text-zinc-900">{products.filter(p => p.stock > 0).length}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-zinc-100 shadow-sm">
              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-3">Out of Stock</p>
              <div className="flex items-end gap-2">
                <p className="font-serif text-3xl font-bold text-zinc-900">{outOfStock}</p>
                {outOfStock > 0 && <span className="text-[10px] text-red-600 font-bold mb-1">Attention</span>}
              </div>
            </div>
            <div className="bg-[#800000] rounded-xl p-6 shadow-lg">
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/60 font-bold mb-3">Portfolio Value</p>
              <p className="font-serif text-3xl font-bold text-white">${(totalRevenue / 1000).toFixed(1)}k</p>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* LEFT: Add New Product Form */}
            <section id="add-form" className="lg:col-span-1 bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm sticky top-24">
              <div className="border-l-4 border-[#800000] pl-4 mb-6">
                <h3 className="font-serif text-xl font-bold italic text-zinc-900">{isEditing ? 'Revise Artifact' : 'Curate New Piece'}</h3>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">{isEditing ? `Modifying ID: ${editingId}` : 'Add to the collection'}</p>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-500 block mb-1">Product Name *</label>
                  <input
                    required
                    type="text"
                    value={newProduct.name}
                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full bg-zinc-50 border-b border-zinc-200 focus:border-[#800000] outline-none py-2 text-sm transition-all"
                    placeholder="e.g. Midnight Silk Blazer"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-500 block mb-1">Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-zinc-50 border-b border-zinc-200 focus:border-[#800000] outline-none py-2 text-sm appearance-none cursor-pointer"
                  >
                    {['Outerwear', 'Leather Goods', 'Footwear', 'Accessories', 'Knitwear', 'Jewellery', 'Dresses', 'Lifestyle'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-500 block mb-1">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full bg-zinc-50 border-b border-zinc-200 focus:border-[#800000] outline-none py-2 text-sm resize-none transition-all"
                    rows={2}
                    placeholder="Brief product description..."
                  />
                </div>

                {/* Price & Discount */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-500 block mb-1">Price ($) *</label>
                    <input
                      required
                      type="number"
                      min="0"
                      step="0.01"
                      value={newProduct.price}
                      onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full bg-zinc-50 border-b border-zinc-200 focus:border-[#800000] outline-none py-2 text-sm transition-all"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-500 block mb-1">Discount %</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newProduct.discount}
                      onChange={e => setNewProduct({ ...newProduct, discount: e.target.value })}
                      className="w-full bg-zinc-50 border-b border-zinc-200 focus:border-[#800000] outline-none py-2 text-sm transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Final price preview */}
                {newProduct.price && (
                  <div className="bg-zinc-50 rounded-lg px-4 py-2 flex justify-between items-center border-l-2 border-[#800000]">
                    <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Final Price</span>
                    <span className="font-serif font-bold text-[#800000] text-sm">
                      ${(parseFloat(newProduct.price) * (1 - (parseFloat(newProduct.discount) || 0) / 100)).toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Stock */}
                <div>
                  <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-500 block mb-1">Stock Quantity *</label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={newProduct.stock}
                    onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="w-full bg-zinc-50 border-b border-zinc-200 focus:border-[#800000] outline-none py-2 text-sm transition-all"
                    placeholder="0"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-500 block mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newProduct.image_url}
                    onChange={e => setNewProduct({ ...newProduct, image_url: e.target.value })}
                    className="w-full bg-zinc-50 border-b border-zinc-200 focus:border-[#800000] outline-none py-2 text-sm transition-all"
                    placeholder="https://..."
                  />
                  {newProduct.image_url && (
                    <img src={newProduct.image_url} alt="Preview" className="mt-2 w-full h-24 object-cover rounded-lg" onError={e => e.target.style.display='none'} />
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-zinc-900 text-white py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#800000] transition-all rounded-lg"
                  >
                    {isEditing ? 'Sync Changes' : 'Publish to Boutique'}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setNewProduct({ name: '', category: 'Outerwear', price: '', stock: '', discount: 0, description: '', image_url: '' });
                      }}
                      className="px-4 border border-zinc-200 rounded-lg text-zinc-400 hover:text-zinc-600 transition-all"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  )}
                </div>
              </form>
            </section>

            {/* RIGHT: Product List */}
            <section className="lg:col-span-2 space-y-6">
              {/* Search & Filter */}
              <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex gap-2 flex-wrap">
                    {filters.slice(0, 5).map(f => (
                      <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`px-3 py-1.5 text-[9px] uppercase tracking-widest font-bold rounded-full transition-all ${
                          activeFilter === f
                            ? 'bg-[#800000] text-white'
                            : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-base">search</span>
                    <input
                      type="text"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search collection..."
                      className="pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-100 rounded-full text-xs focus:outline-none focus:ring-1 focus:ring-[#800000] w-52 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Product Table */}
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-50">
                  <h3 className="font-serif text-lg font-bold">The Current Collection</h3>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400">{filteredProducts.length} pieces</span>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-24">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#800000]"></div>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-20">
                    <span className="material-symbols-outlined text-5xl text-zinc-200 mb-4 block">inventory_2</span>
                    <p className="text-zinc-400 text-sm font-serif italic">No products found</p>
                    <p className="text-zinc-300 text-xs mt-1">Add your first piece using the form on the left</p>
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-zinc-50">
                        <th className="px-6 py-4 text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Product</th>
                        <th className="px-6 py-4 text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Category</th>
                        <th className="px-6 py-4 text-[9px] uppercase tracking-widest text-zinc-400 font-bold text-center">Stock</th>
                        <th className="px-6 py-4 text-[9px] uppercase tracking-widest text-zinc-400 font-bold text-right">Price</th>
                        <th className="px-6 py-4 text-[9px] uppercase tracking-widest text-zinc-400 font-bold text-center">Status</th>
                        <th className="px-6 py-4 text-[9px] uppercase tracking-widest text-zinc-400 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map(p => (
                        <tr key={p.id} className="group hover:bg-zinc-50/50 transition-colors border-b border-zinc-50 last:border-0">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-10 bg-zinc-100 overflow-hidden rounded flex-shrink-0">
                                <img
                                  src={p.image_url || `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80`}
                                  className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                  alt={p.name}
                                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80'; }}
                                />
                              </div>
                              <div>
                                <p className="font-serif font-bold text-sm text-zinc-900">{p.name}</p>
                                {p.description && <p className="text-[10px] text-zinc-400 truncate max-w-[160px]">{p.description}</p>}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-[9px] font-bold px-3 py-1 bg-zinc-100 rounded-full text-zinc-600 uppercase tracking-widest">{p.category}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`text-xs font-bold ${p.stock === 0 ? 'text-red-600' : p.stock <= 5 ? 'text-amber-600' : 'text-zinc-900'}`}>
                              {p.stock}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div>
                              {p.discount > 0 && (
                                <p className="text-[9px] text-zinc-400 line-through">${parseFloat(p.price).toFixed(2)}</p>
                              )}
                              <p className="font-serif font-bold text-sm text-[#800000]">${parseFloat(p.final_price || p.price).toFixed(2)}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 text-[8px] uppercase tracking-widest font-bold rounded-full ${
                              p.stock === 0 ? 'bg-red-50 text-red-700' :
                              p.stock <= 5 ? 'bg-amber-50 text-amber-700' :
                              'bg-green-50 text-green-700'
                            }`}>
                              {p.stock === 0 ? 'Out of Stock' : p.stock <= 5 ? 'Low Stock' : 'Active'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handleEditClick(p)}
                                className="p-2 hover:bg-zinc-100 rounded-full text-zinc-400 hover:text-[#800000] transition-all"
                                title="Edit"
                              >
                                <span className="material-symbols-outlined text-base">edit</span>
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-2 hover:bg-red-50 rounded-full text-zinc-400 hover:text-red-600 transition-all"
                                title="Delete"
                              >
                                <span className="material-symbols-outlined text-base">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
