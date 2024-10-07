import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star } from 'lucide-react';
import axios from "axios";
import { BASEURL } from "../../BaseUrl";
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; 

export default function CategoryPage() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState<any[]>([]); 

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASEURL}/products`);
        setProducts(data.allproduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    })();
  }, []);

  const handleQuickView = (product: any) => {
    navigate(`/product/${product.name}`, {
      state: {
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      },
    });
  };

  const capitalizeCategory = (category: string | undefined) => {
    if (!category) return '';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const filteredProducts = useMemo(() => {
    if (!category || category === 'all') return products;
    return products.filter((product: any) => product.category.toLowerCase() === category.toLowerCase());
  }, [category, products]);

  const handleAddToCart = (product: any) => {
    // setCart((prevCart) => [...prevCart, product]);
    toast.success(`${product.name} has been added to the cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      <Toaster />  {/* This is required to display the toast notifications */}
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {category && category !== 'all' && (
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Category : <span className="text-blue-500">{capitalizeCategory(category)}</span>
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts?.map((product: any) => (
                <Card
                  key={product.name}
                  className="overflow-hidden bg-white border border-gray-200 rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleQuickView(product)}
                      >
                        Quick View
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-yellow-500 font-bold mb-2">Price: {product.price}</p>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(4.5) ? 'text-yellow-400' : 'text-gray-300'
                          } transition-colors duration-300`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">4.5</span>
                    </div>
                    <Button
                      className="w-full mt-4 bg-yellow-500 text-white hover:bg-yellow-600"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
