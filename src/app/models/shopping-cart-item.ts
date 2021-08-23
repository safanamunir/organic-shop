
export class ShoppingCartItem{
    key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;
    category: string;

   
    //constructor(public product: Product, public quantity: number){}
    
    get totalPrice(){
        return this.price * this.quantity;
    }
}