import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, ChevronRight, MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';
import { Category, MenuItem, CartItem } from './types';
import { MENU_ITEMS } from './constants';

// --- Components ---

const Navbar = ({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-bg/90 backdrop-blur-md border-b border-brand-tamarind/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-brand-tamarind">
            <Menu size={24} />
          </button>
          
          <div className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold">
            <a href="#menu" className="hover:text-brand-orange transition-colors">Menu</a>
            <a href="#about" className="hover:text-brand-orange transition-colors">About</a>
            <a href="#location" className="hover:text-brand-orange transition-colors">Location</a>
          </div>
        </div>

        <a href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group">
          <span className="serif text-2xl lg:text-3xl font-black tracking-tighter leading-none group-hover:text-brand-orange transition-colors duration-300">EL TAMARINDO</span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-tamarind/80">Cafe & Bar</span>
        </a>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 border border-brand-tamarind/30 rounded-full text-[10px] uppercase tracking-widest font-bold text-brand-tamarind">
            <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            Ordering Open
          </div>
          <button 
            onClick={onCartClick}
            className="relative group p-2 rounded-full border border-brand-tamarind hover:bg-brand-tamarind hover:text-brand-bg transition-all duration-300"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-brand-bg group-hover:border-brand-tamarind">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-brand-cream z-50 lg:hidden p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="serif text-xl font-black">EL TAMARINDO</span>
                <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
              </div>
              <div className="flex flex-col gap-8 text-2xl serif">
                <a href="#menu" onClick={() => setIsMenuOpen(false)} className="hover:translate-x-2 transition-transform">Menu</a>
                <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:translate-x-2 transition-transform">About</a>
                <a href="#location" onClick={() => setIsMenuOpen(false)} className="hover:translate-x-2 transition-transform">Location</a>
                <button className="bg-brand-maroon text-brand-cream py-4 rounded-xl text-lg mt-8">Order Online</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop" 
        className="w-full h-full object-cover scale-105"
        alt="Atmospheric cafe"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-maroon/90 via-brand-maroon/40 to-transparent" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-brand-orange text-sm font-bold uppercase tracking-[0.3em] mb-4 block">Salvadoran & Latin Excellence</span>
          <h1 className="serif text-6xl md:text-8xl lg:text-9xl text-brand-bg font-black leading-[0.85] tracking-tighter mb-8 drop-shadow-2xl">
            REDEFINING <br />
            LATIN <br />
            <span className="text-outline italic">FLAVOR</span>
          </h1>
          <p className="text-white font-medium text-lg md:text-xl mb-12 max-w-md drop-shadow-lg">
            Welcome to the new era of El Tamarindo. Bold traditions met with modern craft.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#menu" className="bg-brand-orange hover:bg-white text-brand-tamarind px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center gap-2 group">
              ORDER ONLINE <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="border border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-bold transition-all duration-300">
              EXPLORE STORY
            </button>
          </div>
        </motion.div>
      </div>
    </div>

    <div className="absolute bottom-12 left-6 right-6 flex justify-between items-end">
      <div className="hidden lg:flex flex-col gap-4 text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
        Scroll to Explore
        <div className="h-12 w-[1px] bg-white/40 mx-auto" />
      </div>
      
      <div className="flex flex-col items-end gap-2 text-brand-bg/80 text-xs font-mono font-bold">
        <span>EST. 2024</span>
        <span>LATIN FOOD & BAR</span>
      </div>
    </div>
  </section>
);

const MenuSection = ({ onAddToCart }: { onAddToCart: (item: MenuItem) => void }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('Pupusas');
  const categories: Category[] = ['Appetizers', 'Pupusas', 'Main Entrees', 'Tacos', 'Drinks'];

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-4 block">The Menu</span>
            <h2 className="serif text-5xl md:text-7xl font-black leading-none mb-6 italic">Crafted Dishes</h2>
          </div>
          
          <div className="flex flex-wrap gap-2 p-1 bg-black/5 rounded-full backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${activeCategory === cat ? 'bg-brand-tamarind text-brand-bg shadow-lg' : 'text-brand-tamarind hover:bg-black/5'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[280px] gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              // Create bento-like variation in sizing
              const isLarge = idx === 0 || (idx === 3 && filteredItems.length > 5);
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`bento-card bento-card-hover group relative ${isLarge ? 'lg:col-span-8 row-span-2' : 'lg:col-span-4'}`}
                >
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-tamarind via-brand-tamarind/20 to-transparent" />
                  </div>

                  <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                    <div className="flex justify-between items-end gap-4 text-white">
                      <div className="max-w-[70%] drop-shadow-lg">
                        {item.popular && (
                          <span className="text-[8px] font-bold uppercase tracking-widest bg-brand-orange px-2 py-1 rounded mb-2 inline-block shadow-lg">Best Seller</span>
                        )}
                        <h3 className={`serif font-bold leading-tight ${isLarge ? 'text-3xl lg:text-5xl mb-2' : 'text-xl mb-1'}`}>{item.name}</h3>
                        {isLarge && <p className="text-white text-xs line-clamp-2 md:line-clamp-none mb-4 font-medium opacity-90">{item.description}</p>}
                        <span className="font-mono text-brand-orange font-black text-xl drop-shadow-sm">${item.price.toFixed(2)}</span>
                      </div>
                      
                      <button 
                        onClick={() => onAddToCart(item)}
                        className={`bg-brand-bg text-brand-tamarind rounded-full font-bold hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center p-3 sm:px-6 shadow-2xl active:scale-95`}
                      >
                        <span className="hidden sm:inline mr-2 text-xs font-black">ADD</span>
                        <ShoppingBag size={16} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cart, 
  updateQuantity, 
  removeItem 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
}) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-brand-bg z-[70] flex flex-col shadow-2xl"
          >
            <div className="p-8 border-b border-brand-tamarind/10 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} />
                <h2 className="serif text-2xl font-black">Your Order</h2>
              </div>
              <button onClick={onClose} className="p-2 border border-brand-tamarind/10 rounded-full hover:bg-brand-tamarind/5 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-brand-tamarind/5 rounded-full flex items-center justify-center text-brand-tamarind/20">
                    <ShoppingBag size={40} />
                  </div>
                  <div>
                    <h3 className="serif text-xl font-bold mb-2">Cart is empty</h3>
                    <p className="text-gray-500 text-sm">Add some delicious Latin flavors to get started!</p>
                  </div>
                  <button onClick={onClose} className="bg-brand-tamarind text-brand-bg px-8 py-3 rounded-full font-bold">
                    Browse Menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <img src={item.image} className="w-20 h-20 rounded-xl object-cover" alt="" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm">{item.name}</h4>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500"><X size={14} /></button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 border border-brand-tamarind/10 rounded-full px-3 py-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-brand-tamarind font-black">-</button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-brand-tamarind font-black">+</button>
                        </div>
                        <span className="font-mono font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 bg-white border-t border-brand-tamarind/10 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-sm">
                    <span>Tax</span>
                    <span>${(subtotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-brand-tamarind font-black text-xl pt-4 border-t border-brand-tamarind/5">
                    <span>Total</span>
                    <span>${(subtotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-brand-tamarind text-brand-bg py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-orange transition-colors duration-300">
                  Proceed to Checkout <ChevronRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Footer = () => (
  <footer id="location" className="bg-brand-tamarind text-brand-bg pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-24 mb-24">
        <div>
          <h2 className="serif text-5xl md:text-7xl font-black mb-12 italic leading-none">Find Us <br />at the Heart <br />of the City</h2>
          <div className="grid sm:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-brand-orange">
                <MapPin size={20} />
                <span className="uppercase tracking-[0.2em] font-bold text-[10px]">Location</span>
              </div>
              <p className="text-lg">123 Tamarindo Way<br />San Salvador, ES 10101</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-brand-orange">
                <Clock size={20} />
                <span className="uppercase tracking-[0.2em] font-bold text-[10px]">Hours</span>
              </div>
              <p className="text-lg">Mon-Thu: 11am - 10pm<br />Fri-Sun: 11am - 11pm</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-brand-orange">
                <Phone size={20} />
                <span className="uppercase tracking-[0.2em] font-bold text-[10px]">Contact</span>
              </div>
              <p className="text-lg">(503) 1234-5678<br />ciao@eltamarindo.com</p>
            </div>
          </div>
        </div>
        
        <div className="relative rounded-[32px] overflow-hidden grayscale contrast-125 border border-white/10 h-[400px] lg:h-full min-h-[400px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15504.6644408544!2d-89.18718!3d13.693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f63310000000000%3A0x0!2zMTPCsDQxJzM0LjgiTiA4OcKwMTEnMTMuOSJX!5e0!3m2!1sen!2ssv!4v1631234567890!5m2!1sen!2ssv" 
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" 
          />
        </div>
      </div>
      
      <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase font-bold tracking-[0.3em] opacity-40">
        <span>© 2024 EL TAMARINDO CAFE & BAR</span>
        <div className="flex gap-12">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
        <span>BUILT WITH PASSION</span>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <Hero />

      {/* Featured Dish Section */}
      <section id="about" className="py-24 bg-brand-tamarind text-brand-bg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] border border-brand-orange rounded-full" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] border border-brand-orange rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[24px] overflow-hidden border-8 border-brand-orange/10">
                <img 
                  src="https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=1200&auto=format&fit=crop" 
                  alt="Traditional Cooking"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bento-card p-8 shadow-2xl hidden md:block max-w-xs bg-brand-orange border-none transition-transform hover:scale-105">
                <p className="serif text-xl font-bold text-white mb-2">"Flavor without borders."</p>
                <p className="text-white/80 text-xs italic">Our pupusas are made using the same heritage corn masa recipe from 1985.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-xs">Our Heritage</span>
              <h2 className="serif text-6xl md:text-8xl font-black leading-none italic">Rooted in <br />Tradition.</h2>
              <p className="text-white text-lg leading-relaxed font-medium">
                El Tamarindo is more than a restaurant—it's a celebration of the vibrant cultures of El Salvador and Latin America. We focus on bold spices, fresh ingredients, and the hospitality we're known for.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-12">
                <div className="bento-card p-6 bg-white/10 border-white/20 backdrop-blur-md">
                   <h4 className="serif text-3xl font-bold text-brand-orange mb-1">100%</h4>
                   <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white">Handmade Masa</p>
                </div>
                <div className="bento-card p-6 bg-white/10 border-white/20 backdrop-blur-md">
                   <h4 className="serif text-3xl font-bold text-brand-orange mb-1">Daily</h4>
                   <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white">Fresh Ingredients</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <MenuSection onAddToCart={addToCart} />
      
      <section className="py-24 bg-brand-bg md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[120px]">
          {/* Quick Order Bento Card */}
          <div className="md:col-span-8 md:row-span-2 bento-card p-10 bg-brand-orange text-white flex flex-col justify-center">
            <h3 className="serif text-4xl font-bold mb-2">Craving something local?</h3>
            <p className="text-white/95 mb-6 text-sm max-w-sm font-medium">Skip the line. Order your pupusas online and pick them up in as little as 15 minutes.</p>
            <button className="bg-brand-tamarind text-white px-8 py-3 rounded-full font-extrabold w-fit text-sm hover:scale-105 transition-transform shadow-xl">ORDER NOW</button>
          </div>
          
          {/* Status Bento Card */}
          <div className="md:col-span-4 md:row-span-2 bento-card p-10 bg-brand-tamarind text-white flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <Clock size={32} className="text-brand-orange" />
              <div className="text-[10px] uppercase font-bold tracking-widest text-brand-orange">Status</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest leading-none text-green-400">Accepting Orders</span>
              </div>
              <p className="text-2xl serif">Ready to serve.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-bg overflow-hidden">
        <div className="flex overflow-hidden whitespace-nowrap border-y border-brand-tamarind/10 py-8">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="flex gap-20 text-6xl md:text-8xl serif font-black text-brand-tamarind/10 select-none uppercase italic"
          >
            <span>Handmade Masa · Fresh Salsa · Slow Cooked · Street Style · </span>
            <span>Handmade Masa · Fresh Salsa · Slow Cooked · Street Style · </span>
          </motion.div>
        </div>
      </section>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </div>
  );
}
