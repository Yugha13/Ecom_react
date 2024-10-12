import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartIcon, TrashIcon, Minus, Plus } from 'lucide-react';
import { BASEURL } from "../../BaseUrl";
import { useState } from "react";
import axios from "axios";

interface CartCardProps {
  info: {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    price: number;
    quantity?: number;
  };
  updateQuantity: (id: string, qty: number) => void;
  items:any;
  setItems:any;
  userId: string | null;
}

const CartCard: React.FC<CartCardProps> = ({ info, updateQuantity, userId, setItems }) => {
  const [quantity, setQuantity] = useState(info.quantity || 1);

  const handleOrder = async (id: string) => {
    try {
      await axios.post(`${BASEURL}/savelater/${id}`, { userId }, {withCredentials: true});
      setItems((cur:any) => {
        return cur.filter((i:any) => i.id != id);
      })
    } catch (error) {
      console.error("Error saving item for later:", error);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await axios.post(`${BASEURL}/delcart/${id}`, { userId }, {withCredentials: true});
      setItems((cur:any) => {
        return cur.filter((i:any) => i.id != id);
      })

    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQty = quantity + change;
    if (newQty > 0) {
      setQuantity(newQty);
      updateQuantity(info.id, newQty);
    }
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
              onClick={() => handleQuantityChange(-1)}
              className="px-2 hover:bg-gray-100"
              disabled={quantity === 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="px-2 text-lg font-semibold">{quantity}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuantityChange(1)}
              className="px-2 hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="font-medium text-primary">Price : ₹{info.price * quantity}</div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex hover:bg-red-100 text-red-500 gap-1 place-items-center hover:text-red-600"
          onClick={() => deleteOrder(info.id)}
        >
          <TrashIcon className="w-4 h-4 text-red-500" />
          Delete
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex hover:bg-blue-50 text-blue-400 gap-1 place-items-center hover:text-blue-500"
          onClick={() => handleOrder(info.id)}
        >
          <HeartIcon className="w-4 h-4 text-blue-400" />
          Move To Wishlist
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartCard;