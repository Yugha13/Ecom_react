import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HeartIcon, TrashIcon } from 'lucide-react';
import Navbar from "@/Navbar/Navbar";



export default function Cart() {
  return (
    <div>
        <Navbar />
        <div className="flex flex-col min-h-screen">
        <main className="flex-1 py-8 md:py-12">
            <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-[1fr_320px] gap-8 lg:gap-12">
                <div>
                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
                <div className="space-y-6">
                    <Card>
                    <CardContent className="grid grid-cols-[80px_1fr_auto] items-center gap-4 md:gap-6">
                        <img
                            src="/placeholder.svg"
                            alt="Product Image"
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                            style={{ aspectRatio: "1" }}
                        />
                        <div>
                            <h3 className="font-medium">Cozy Blanket</h3>
                            <p className="text-sm text-muted-foreground">Warm and Soft for Chilly Nights</p>
                        </div>
                        <div className="flex items-center gap-4">
                        <div className="sm:w-20">
                            <Select defaultValue="1">
                            <SelectTrigger>
                                <SelectValue placeholder="Qty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1</SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                            <div className="font-medium">$29.99</div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                        <TrashIcon className="w-4 h-4" />
                        <span className="sr-only">Remove</span>
                        </Button>
                        <Button variant="outline" size="sm">
                        <HeartIcon className="w-4 h-4" />
                        <span className="sr-only">Save for later</span>
                        </Button>
                    </CardFooter>
                    </Card>
                    <Card>
                    <CardContent className="grid grid-cols-[80px_1fr_auto] items-center gap-4 md:gap-6">
                        <img
                            src="/placeholder.svg"
                            alt="Product Image"
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                            style={{ aspectRatio: "1" }}
                        />
                        <div>
                            <h3 className="font-medium">Autumn Mug</h3>
                            <p className="text-sm text-muted-foreground">Enjoy Your Hot Beverages in Style</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="sm:w-20">   
                        <Select defaultValue="1">
                            <SelectTrigger>
                            <SelectValue placeholder="Qty" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="font-medium">$12.99</div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                        <TrashIcon className="w-4 h-4" />
                        <span className="sr-only">Remove</span>
                        </Button>
                        <Button variant="outline" size="sm">
                        <HeartIcon className="w-4 h-4" />
                        <span className="sr-only">Save for later</span>
                        </Button>
                    </CardFooter>
                    </Card>
                </div>
                </div>
                <div className="bg-muted/40 rounded-md p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">$42.98</span>
                    </div>
                    <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span className="font-medium">$5.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                    <span>Discount</span>
                    <span className="font-medium text-green-500">-$5.00</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>$42.98</span>
                    </div>
                </div>
                <Button size="lg" className="w-full mt-6">
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