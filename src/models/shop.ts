export interface Product {
  id: string;
  image_url: string;
  stock: number;
  productName: string;
  price: number;
  productDescription: string;
  favorite: boolean;
}

export interface CartItem {
  id: string;
  quantity: number;
}
