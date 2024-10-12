import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import Navbar from "@/Navbar/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { BASEURL } from "../../BaseUrl"
import { useToast } from "@/components/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function Wishlist() {
  const { toast } = useToast()
  const [details, setdetails] = useState<any>([])
  useEffect(()=>{
    (async()=>{
        const {data} = await axios.get(`${BASEURL}/wishlist`, {withCredentials:true});
        console.log(data.products);
        data.products.map((i:any)=> setdetails(i.products));
    })()
  },[])

  const handleCart = async (id:any, name:any) => {
    try {
        const toCart = await axios.post(`${BASEURL}/addcart/${id}`, {}, {withCredentials: true});
        console.log(toCart);
        setdetails((cur:any) => {
          return cur.filter((i:any) => id != i.id);
        })
        toast({
          title: `${name}`,
          description: "has been added to Cart.",
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        })
    } catch (e) {
        console.log(e);
    }
  }
  return (
    <div className="bg-background text-foreground">
        <Navbar/>
        <div className="m-5">
          <h1 className="text-2xl font-bold">My Wishlist</h1>
        </div>
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {details.map((item:any) => (
            <div key={item.id} className="rounded-lg border bg-card p-5 shadow-sm transition-all hover:shadow-md">
              <Link to="#" className="group relative block overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="aspect-square w-full rounded-lg object-cover transition-all group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-all group-hover:opacity-100">
                  <Button 
                    size="sm"
                    onClick={()=>handleCart(item.id, item.name)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Link>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-primary">{item.description}</p>
                <p className="text-primary">Price : ₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}