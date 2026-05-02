export type Category = 'Appetizers' | 'Pupusas' | 'Main Entrees' | 'Tacos' | 'Drinks' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image?: string;
  popular?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
