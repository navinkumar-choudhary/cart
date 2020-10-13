import { Component } from '@angular/core';
import {Cart, Product} from "../types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cart';

  products: Product[];
  cart: Product[] = []; 
  cartTotal = 0;
  cartDiscountTotal = 0;
  cartTypeDiscount = 0;
  orderTotal = 0;

  constructor() {  }

  ngOnInit() {
    this.products = [...PRODUCTS].map((product, index) => {
      product.id = index + 1;
      product.imagePath = `${product.imagePath}`;
      product.cartQuantity = 0;
      return product;
    });
  }

  addToCart(index: number) {
    this.products[index].cartQuantity = 1;
    this.cart.push(this.products[index]);
    this.updateCart();
  }

  removeFromCart(name: string){
    this.products[this.products.findIndex(x => x.name === name)].cartQuantity = 0;
    this.cart.splice(this.cart.findIndex(x => x.name === name),1);
    this.updateCart();
  }

  decreaseQty(name: string){
    if(this.cart[this.cart.findIndex(x => x.name === name)].cartQuantity > 1){
      this.cart[this.cart.findIndex(x => x.name === name)].cartQuantity -=1;
      this.updateCart();
    }
    else if(this.cart[this.cart.findIndex(x => x.name === name)].cartQuantity = 1){
      this.cart[this.cart.findIndex(x => x.name === name)].cartQuantity -=1;
      this.removeFromCart(name);
      this.updateCart();
    }
  }

  updateCart(){
    this.cartTotal = this.cart.reduce((total, obj) => obj.price*obj.cartQuantity + total,0);
    this.cartDiscountTotal = this.cart.reduce((total, obj) => (obj.price*obj.cartQuantity-(obj.price*obj.cartQuantity-(obj.price*obj.cartQuantity*obj.discount/100))) + total,0);
    this.orderTotal = this.cartTotal - (this.cartDiscountTotal + this.cartTypeDiscount);
  }

  increaseQty(name: string){
    this.cart[this.cart.findIndex(x => x.name === name)].cartQuantity +=1;
    this.updateCart();
  }

}

export const PRODUCTS: Product[] = [
  {name: "Shoes", price: 50, discount: 10, imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSS0YFd7zhd6KDpzu6WKf6GrT-HUtcjQm6i6w&usqp=CAU"},
  {name: "Shirt", price: 20, discount: 10, imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSAEwjnDJj4V9ovpXk5LIB_TnIRdu5C96y_sQ&usqp=CAU"},
  {name: "Wallet", price: 50, discount: 10, imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQay3mpgJgpkiv74syGc-Ola0D6j8vcav0C2w&usqp=CAU"},
  {name: "Watch", price: 200, discount: 10, imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQyybwmii7u0jVpMh07Iz6Kz-6c9Yz1sG2IfA&usqp=CAU"},
  {name: "T-shirt", price: 15, discount: 10, imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQdJvUCbptm0FlRxOHJwexr8DWkf_bXgsQwBA&usqp=CAU"},
];
