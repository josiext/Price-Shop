export interface Product {
  id: string;
  title: string;
  images: string[];
  price: number;
  category: {
    id: string;
    label: string;
  };
  description?: string;
}
