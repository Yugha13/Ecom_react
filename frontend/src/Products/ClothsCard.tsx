import { useLocation } from "react-router-dom";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { StarIcon } from "lucide-react";
import ProductDetails from "./ElectroCard"; 
import Navbar from "@/Navbar/Navbar";


export default function ClothsCard() {
  const location = useLocation();
  const { name, price, imageUrl, category } = location.state || { name: "Product Name", price: "N/A", imageUrl: "/placeholder.svg", category: "other" };
  // console.log(category);

  if (category === "Clothes") {
    return (
      <div>
        <Navbar/>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6 mt-5">
        <div className="grid md:grid-cols-5 gap-3 items-start">
          <div className="hidden md:flex flex-col gap-3 items-start">
            {Array.from({ length: 4 }, (_, index) => (
              <button
                key={index}
                className="border hover:border-primary rounded-lg overflow-hidden transition-colors"
              >
                <img
                  src={imageUrl}
                  alt={`Preview thumbnail ${index + 1}`}
                  width={100}
                  height={120}
                  className="aspect-[5/6] object-cover"
                />
                <span className="sr-only">{`View Image ${index + 1}`}</span>
              </button>
            ))}
          </div>
          <div className="md:col-span-4">
            <img
              src={imageUrl}
              alt="Product Image"
              width={600}
              height={900}
              className="aspect-[2/3] object-cover border w-full rounded-lg overflow-hidden"
            />
          </div>
        </div>
        <div className="grid gap-4 md:gap-10 items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl lg:text-4xl">{name}</h1>
            <div>
              <p>60% combed ringspun cotton/40% polyester jersey tee.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
              <div className="text-4xl font-bold">Price: {price}</div>
            </div>
          </div>
          <form className="grid gap-4 md:gap-10" onSubmit={(e) => {e.preventDefault()}}>
            <div className="grid gap-2">
              <Label htmlFor="color" className="text-base">Color</Label>
              <RadioGroup id="color" defaultValue="black" className="flex items-center gap-2">
                <Label htmlFor="color-black" className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                  <RadioGroupItem id="color-black" value="black" />
                  Black
                </Label>
                <Label htmlFor="color-white" className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                  <RadioGroupItem id="color-white" value="white" />
                  White
                </Label>
                <Label htmlFor="color-blue" className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                  <RadioGroupItem id="color-blue" value="blue" />
                  Blue
                </Label>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="size" className="text-base">Size</Label>
              <RadioGroup id="size" defaultValue="m" className="flex items-center gap-2">
                {['xs', 's', 'm', 'l', 'xl'].map(size => (
                  <Label key={size} htmlFor={`size-${size}`} className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                    <RadioGroupItem id={`size-${size}`} value={size} />
                    {size.toUpperCase()}
                  </Label>
                ))}
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity" className="text-base">Quantity</Label>
              <Select defaultValue="1">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 5 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg">Add to cart</Button>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }

  if (category === "Electronics") {
    return <ProductDetails info = {{name, price, imageUrl}} />;
  }

  return <ProductDetails hideLearnMore info = {{name, price, imageUrl}}/>;
}
