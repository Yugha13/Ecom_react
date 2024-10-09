import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/Navbar/Navbar";
import { BASEURL } from "../../BaseUrl";
import { useEffect, useState } from "react";
import axios from "axios";
import CartCard from "./CartCard";


const Cart = () => {
  const [items, setItems] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data } = await axios.get(`${BASEURL}/cart`, {withCredentials: true});
        setUserId(data.Cart.flatMap((i: any) => i.userId)[0]);
        const products = data.Cart.flatMap((i: any) => i.products);
        setItems(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchCartItems();
  }, []);
  // console.log(items);
  
  const handleOrder = async () => {
    try {
      const ids = items.map((i:any)=>(i.id));
      await axios.post(`${BASEURL}/cart/order`, { userId, totalAmount: subtotal+50, ids }, {withCredentials: true});
      setItems((cur) => {
        return cur.filter((i) => !items.some(item => item.id === i.id));
      })
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  }

  useEffect(() => {
    const newSubtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    setSubtotal(newSubtotal);
  }, [items]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-[1fr_400px] gap-8 lg:gap-12">
              <div>
                <h1 className="text-2xl font-bold mb-6 text-primary">Your Cart</h1>
                <div className="space-y-6">
                  {items.map(item => (
                    <CartCard items={items} setItems={setItems}  key={item.id} info={item} userId={userId} updateQuantity={updateQuantity} />
                  ))}
                </div>
              </div>
              <div className="bg-muted/50 rounded-md p-6 md:p-8 shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-primary">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium"> ₹{subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span className="font-medium">₹30</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹ {subtotal + 30}</span>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white"
                  onClick={handleOrder}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Cart;
