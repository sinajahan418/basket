import { Products } from "@/lib/mockData";

interface Product extends Products {
  quntity: number;
}

export interface Basket {
  items: Product[];
  invoice: {
    totalPrice: 0;
  };
  action: {
    addToCard: (item: Product) => void;
    remoweCard: (item: Product) => void;
  };
}
