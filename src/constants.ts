import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'p1',
    name: 'Classic Revuelta Pupusa',
    description: 'Traditional handmade corn tortilla stuffed with pork, beans, and cheese. Served with curtido and tomato sauce.',
    price: 4.50,
    category: 'Pupusas',
    popular: true,
    image: 'https://images.unsplash.com/photo-1624632042260-3f473c1775f0?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'p2',
    name: 'Loroco & Cheese Pupusa',
    description: 'Handmade corn tortilla stuffed with edible tropical flower buds (loroco) and melted cheese.',
    price: 4.50,
    category: 'Pupusas',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 't1',
    name: 'Al Pastor Tacos',
    description: 'Three corn tortillas with marinated pork, pineapple, onion, and cilantro.',
    price: 14.00,
    category: 'Tacos',
    popular: true,
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 't2',
    name: 'Carne Asada Tacos',
    description: 'Three corn tortillas with grilled steak, radish, and house-made salsa verde.',
    price: 15.00,
    category: 'Tacos',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm1',
    name: 'Lomo Saltado',
    description: 'Traditional Peruvian stir-fry with beef strips, onions, tomatoes, and fries. Served with white rice.',
    price: 22.00,
    category: 'Main Entrees',
    popular: true,
    image: 'https://images.unsplash.com/photo-1544124499-58912cbddaec?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'm2',
    name: 'Arroz con Pollo',
    description: 'Seasoned rice with chicken, peas, carrots, and cilantro. Served with sweet plantains.',
    price: 18.00,
    category: 'Main Entrees',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'a1',
    name: 'Fried Plantains',
    description: 'Sweet ripe plantains fried to perfection. Served with sour cream and fried beans.',
    price: 8.00,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1599366668709-646706e2cfc2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'a2',
    name: 'Yuca con Chicharron',
    description: 'Boiled or fried cassava served with fried pork chunks and curtido.',
    price: 12.00,
    category: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1574484284002-952d9215697d?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'd1',
    name: 'Classic Margarita',
    description: 'Tequila, fresh lime juice, and agave nectar with a salt rim.',
    price: 11.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'd2',
    name: 'Horchata',
    description: 'Traditional sweet rice and cinnamon drink.',
    price: 4.00,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1553909489-ec3694f4948a?q=80&w=800&auto=format&fit=crop'
  }
];
