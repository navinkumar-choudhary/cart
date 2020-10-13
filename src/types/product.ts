export interface Product {
  name: string;
  price: number;
  discount: number;
  imagePath: string;
  id?: number;
  cartQuantity?: number;
}