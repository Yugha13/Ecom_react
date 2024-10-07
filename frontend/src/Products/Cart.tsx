import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HeartIcon, TrashIcon, Minus, Plus } from 'lucide-react';
import Navbar from "@/Navbar/Navbar";
import { BASEURL } from "../../BaseUrl";
import { useEffect, useState } from "react";
import axios from "axios";

const CartCard = ({ info, updateQuantity }: { info: any; updateQuantity: (id: string, qty: number) => void; }) => {
  const [quantity, setQuantity] = useState(info.quantity || 1);


  const handleDecrement = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      updateQuantity(info.id, newQty);
    }
  };

  // Handle increment
  const handleIncrement = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    updateQuantity(info.id, newQty);
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-transform duration-300 border border-gray-300">
      <CardContent className="grid grid-cols-[100px_1fr_auto] items-center gap-4 md:gap-6">
        <img
          src={info.imageUrl}
          alt="Product Image"
          width={100}
          height={100}
          className="rounded-md object-cover"
        />
        <div className="space-y-1">
          <h3 className="font-medium text-lg text-primary">{info.name}</h3>
          <p className="text-sm text-muted-foreground">{info.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2 border p-1 rounded-md">
            <Button
              size="sm"
              variant="outline"
              onClick={handleDecrement}
              className="px-2 hover:bg-gray-100"
              disabled={quantity === 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="px-2 text-lg font-semibold">{quantity}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleIncrement}
              className="px-2 hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="font-medium text-primary">Rs: {info.price * quantity}</div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm" className="flex hover:bg-red-100 text-red-500 gap-1 place-items-center hover:text-red-600">
          <TrashIcon className="w-4 h-4 text-red-500" />
          Delete
          <span className="sr-only">Remove</span>
        </Button>
        <Button variant="outline" size="sm" className="flex hover:bg-blue-50 text-blue-400 gap-1 place-items-center hover:text-blue-500">
          <HeartIcon className="w-4 h-4 text-blue-400" />
          Move To Wishlist
          <span className="sr-only">Save for later</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function Cart() {
  const [items, setItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASEURL}/cart`);
        const products = data.Cart.flatMap((i: any) => i.products);
        setItems(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);

  useEffect(() => {
    const newSubtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    setSubtotal(newSubtotal);
  }, [items]);

  const updateQuantity = (productId: string, newQuantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
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
                  {items.map((item) => (
                    <CartCard key={item.id} info={item} updateQuantity={updateQuantity} />
                  ))}
                </div>
              </div>
              <div className="bg-muted/50 rounded-md p-6 md:p-8 shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-primary">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">Rs {subtotal}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span className="font-medium">Rs 50</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>Rs {subtotal + 50}</span>
                  </div>
                </div>
                <Button size="lg" className="w-full mt-6 bg-primary hover:bg-primary-dark text-white">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
