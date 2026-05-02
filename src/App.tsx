import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, ChevronRight, MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';
import { Category, MenuItem, CartItem } from './types';
import { MENU_ITEMS } from './constants';

// --- Types ---
type NavProps = { cartCount: number; onCartClick: () => void };

// --- Navbar ---
const Navbar = ({ cartCount, onCartClick }: NavProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navCartBump, setNavCartBump] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (cartCount > 0) {
      setNavCartBump(true);
      const t = setTimeout(() => setNavCartBump(false), 300);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToLocation = () => {
    const el = document.getElementById('location');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

    return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-bg/90 backdrop-blur-md border-b border-brand-tamarind/10 py-3 text-brand-tamarind' : 'bg-transparent py-6 text-white'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden">
            <Menu size={24} />
          </button>
          <div className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold">
            <button onClick={() => navigate('/menu')} className="hover:text-brand-orange transition-colors">Menu</button>
            <button onClick={() => { navigate('/'); setTimeout(scrollToAbout, 50); }} className="hover:text-brand-orange transition-colors">About</button>
            <button onClick={() => { navigate('/'); setTimeout(scrollToLocation, 50); }} className="hover:text-brand-orange transition-colors">Location</button>
          </div>
        </div>

        <button onClick={() => { navigate('/'); scrollToTop(); }} className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group">
          <span className={`heading text-2xl lg:text-3xl font-black tracking-tighter leading-none group-hover:text-brand-orange transition-colors duration-300 ${isScrolled ? 'text-brand-tamarind' : 'text-white'}`}>EL TAMARINDO</span>
          <span className={`text-[10px] uppercase tracking-[0.3em] font-bold font-sans ${isScrolled ? 'text-brand-tamarind/80' : 'text-white/80'}`}>Cafe & Bar</span>
        </button>

        <div className="flex items-center gap-4">
          <div className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold ${isScrolled ? 'border-brand-tamarind/30 text-brand-tamarind' : 'border-white/30 text-white'}`}>
            <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            Ordering Open
          </div>
          <button
            onClick={onCartClick}
            className={`relative group p-2 rounded-full border hover:bg-brand-tamarind hover:text-brand-bg transition-all duration-300 ${navCartBump ? 'scale-125 bg-brand-orange border-brand-orange' : isScrolled ? 'border-brand-tamarind text-brand-tamarind hover:text-brand-bg' : 'border-white/50 text-white hover:text-brand-bg'}`}
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
                <span className="heading text-xl font-black">EL TAMARINDO</span>
                <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
              </div>
              <div className="flex flex-col gap-8 text-2xl heading uppercase">
                <button onClick={() => { setIsMenuOpen(false); navigate('/menu'); }} className="hover:translate-x-2 transition-transform text-left">Menu</button>
                <button onClick={() => { setIsMenuOpen(false); navigate('/'); setTimeout(scrollToAbout, 50); }} className="hover:translate-x-2 transition-transform text-left">About</button>
                <button onClick={() => { setIsMenuOpen(false); navigate('/'); setTimeout(scrollToLocation, 50); }} className="hover:translate-x-2 transition-transform text-left">Location</button>
                <button className="bg-brand-maroon text-brand-cream py-4 rounded-xl text-lg mt-8 font-sans">Order Online</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Hero ---
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
          <h1 className="heading text-6xl md:text-8xl lg:text-9xl text-brand-bg font-black leading-[0.85] tracking-tighter mb-8 drop-shadow-2xl">
            REDEFINING <br />
            LATIN <br />
            <span className="text-outline italic">FLAVOR</span>
          </h1>
          <p className="text-white font-medium text-lg md:text-xl mb-12 max-w-md drop-shadow-lg">
            Welcome to the new era of El Tamarindo. Bold traditions met with modern craft.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/menu" className="bg-brand-orange hover:bg-white text-brand-tamarind px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center gap-2 group">
              ORDER ONLINE <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
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

// --- About Section ---
const About = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <section id="about" className="py-8 md:py-12 bg-brand-tamarind text-brand-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] border border-brand-orange rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] border border-brand-orange rounded-full" />
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
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
              <p className="heading text-xl font-bold text-white mb-2 uppercase">"Flavor without borders."</p>
              <p className="text-white/80 text-xs italic font-sans">Our pupusas are made using the same heritage corn masa recipe from 1985.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-brand-orange font-bold uppercase tracking-[0.3em] text-xs font-sans">Our Heritage</span>
            <h2 className="heading text-6xl md:text-8xl font-black leading-none uppercase">Rooted in <br />Tradition.</h2>
            <p className="text-white text-lg leading-relaxed font-medium font-sans">
              El Tamarindo is more than a restaurant—it's a celebration of the vibrant cultures of El Salvador and Latin America. We focus on bold spices, fresh ingredients, and the hospitality we're known for.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-4">
              <div className="rounded-xl px-3 py-2 bg-white/10 border border-white/20 backdrop-blur-sm flex flex-col justify-center">
                <h4 className="heading text-xl md:text-2xl font-bold text-brand-orange uppercase leading-none">100%</h4>
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-white font-sans mt-0.5">Handmade Masa</p>
              </div>
              <div className="rounded-xl px-3 py-2 bg-white/10 border border-white/20 backdrop-blur-sm flex flex-col justify-center">
                <h4 className="heading text-xl md:text-2xl font-bold text-brand-orange uppercase leading-none">Daily</h4>
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-white font-sans mt-0.5">Fresh Ingredients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Marquee ---
const Marquee = () => (
  <section className="py-8 md:py-12 bg-brand-bg overflow-hidden">
    <div className="flex overflow-hidden whitespace-nowrap border-y border-brand-tamarind/10 py-4">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="flex gap-20 text-6xl md:text-8xl heading font-black text-brand-tamarind/10 select-none uppercase italic"
      >
        <span>Handmade Masa · Fresh Salsa · Slow Cooked · Street Style · </span>
        <span>Handmade Masa · Fresh Salsa · Slow Cooked · Street Style · </span>
      </motion.div>
    </div>
  </section>
);

// --- Footer ---
const Footer = () => (
  <footer id="location" className="bg-brand-tamarind text-brand-bg pt-12 md:pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-12">
        <div>
          <h2 className="heading text-5xl md:text-7xl font-black mb-12 uppercase leading-none">Find Us <br />at the Heart <br />of the City</h2>
          <div className="grid sm:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-brand-orange">
                <MapPin size={20} />
                <span className="uppercase tracking-[0.2em] font-bold text-[10px] font-sans">Location</span>
              </div>
              <p className="text-lg font-sans">123 Tamarindo Way<br />San Salvador, ES 10101</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-brand-orange">
                <Clock size={20} />
                <span className="uppercase tracking-[0.2em] font-bold text-[10px] font-sans">Hours</span>
              </div>
              <p className="text-lg font-sans">Mon-Thu: 11am - 10pm<br />Fri-Sun: 11am - 11pm</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-brand-orange">
                <Phone size={20} />
                <span className="uppercase tracking-[0.2em] font-bold text-[10px] font-sans">Contact</span>
              </div>
              <p className="text-lg font-sans">(503) 1234-5678<br />ciao@eltamarindo.com</p>
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

      <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase font-bold tracking-[0.3em] opacity-40 font-sans">
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

// --- Cart Drawer ---
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
                <h2 className="heading text-2xl font-black uppercase">Your Order</h2>
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
                    <h3 className="heading text-xl font-bold mb-2 uppercase">Cart is empty</h3>
                    <p className="text-gray-500 text-sm font-sans">Add some delicious Latin flavors to get started!</p>
                  </div>
                  <button onClick={onClose} className="bg-brand-tamarind text-brand-bg px-8 py-3 rounded-full font-bold font-sans">
                    Browse Menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <img src={item.image} className="w-20 h-20 rounded-xl object-cover" alt="" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-sm font-sans">{item.name}</h4>
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
                  <div className="flex justify-between text-gray-500 text-sm font-sans">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-sm font-sans">
                    <span>Tax</span>
                    <span>${(subtotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-brand-tamarind font-black text-xl pt-4 border-t border-brand-tamarind/5 font-sans">
                    <span>Total</span>
                    <span>${(subtotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-brand-tamarind text-brand-bg py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-orange transition-colors duration-300 font-sans">
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

// --- Menu Page (Dedicated, not scroll-down) ---
const MenuPage = ({ onAddToCart }: { onAddToCart: (item: MenuItem) => void }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('Pupusas');
  const categories: Category[] = ['Appetizers', 'Pupusas', 'Main Entrees', 'Tacos', 'Drinks'];
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-brand-bg pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-2 mb-10">
          <span className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-2 block font-sans">The Menu</span>
          <h1 className="heading text-5xl md:text-7xl font-black leading-none mb-4 uppercase">Crafted Dishes</h1>
          <p className="text-brand-tamarind/70 font-sans max-w-lg">Authentic Latin flavors, prepared fresh daily. Tap a category to explore our full menu.</p>
        </div>

        <div className="flex flex-wrap gap-2 p-1 bg-black/5 rounded-full backdrop-blur-sm w-fit mb-12">
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

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bento-card bento-card-hover group relative overflow-hidden rounded-[24px]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between bg-white min-h-[160px]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-brand-tamarind/50 font-sans">{item.category}</span>
                      {item.popular && (
                        <span className="text-[8px] font-bold uppercase tracking-widest bg-brand-orange text-white px-2 py-0.5 rounded-full">Best Seller</span>
                      )}
                    </div>
                    <h3 className="heading text-xl font-bold uppercase leading-tight mb-1">{item.name}</h3>
                    <p className="text-brand-tamarind/70 text-xs font-sans line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-mono font-black text-xl text-brand-orange">${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="bg-brand-tamarind text-brand-bg rounded-full font-bold hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center px-5 py-2 text-xs font-sans"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

// --- Home Page ---
const HomePage = () => (
  <>
    <Hero />
    <About />
    <section className="py-6 md:py-10 bg-brand-bg px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-3 auto-rows-auto">
        <div className="md:col-span-8 md:row-span-2 bento-card p-5 md:p-6 bg-brand-orange text-white flex flex-col justify-center">
          <h3 className="heading text-2xl md:text-4xl font-bold mb-1 uppercase leading-none">Craving something local?</h3>
          <p className="text-white/95 mb-3 text-sm max-w-sm font-medium font-sans">Skip the line. Order your pupusas online and pick them up in as little as 15 minutes.</p>
          <Link to="/menu" className="bg-brand-tamarind text-white px-6 py-2.5 rounded-full font-extrabold w-fit text-sm hover:scale-105 transition-transform shadow-xl text-center font-sans">ORDER NOW</Link>
        </div>

        <div className="md:col-span-4 md:row-span-2 bento-card p-5 md:p-6 bg-brand-tamarind text-white flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <Clock size={24} className="text-brand-orange" />
            <div className="text-[10px] uppercase font-bold tracking-widest text-brand-orange font-sans">Status</div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest leading-none text-green-400 font-sans">Accepting Orders</span>
            </div>
            <p className="text-lg md:text-2xl heading uppercase leading-none mt-1">Ready to serve.</p>
          </div>
        </div>
      </div>
    </section>
    <Marquee />
    <Footer />
  </>
);

// --- App Shell ---
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
    <BrowserRouter>
      <div className="relative">
        <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage onAddToCart={addToCart} />} />
        </Routes>
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      </div>
    </BrowserRouter>
  );
}
