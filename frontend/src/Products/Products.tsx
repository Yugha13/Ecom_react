import { ChevronRight, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom'; 
import Navbar from '../Navbar/Navbar';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BASEURL } from "../../BaseUrl";

const categories = [
  { name: 'All', icon: '📦', link: '/category/all' },
  { name: 'Electronics', icon: '💻', link: '/category/electronics' },
  { name: 'Clothes', icon: '👕', link: '/category/clothes' },
  { name: 'Shoes', icon: '👟', link: '/category/shoes' },
  { name: 'Sports', icon: '⚽', link: '/category/sports' },
  { name: 'Books', icon: '📚', link: '/category/books' },
  { name: 'Toys', icon: '🧸', link: '/category/toys' },
  { name: 'Home', icon: '🏠', link: '/' },
];

export default function Products() {
  const navigate = useNavigate();
  const [info, setInfo] = useState<any[]>([]); 
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${BASEURL}/products`);
        setInfo(data.allproduct || []);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.link}
                  className="bg-gray-100 p-4 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex flex-col items-center justify-center group"
                >
                  <span className="text-4xl mb-2 group-hover:animate-bounce">{category.icon}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {info.slice(0,12).map((product) => (
                <Card key={product.name} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-102 group">
                  <div className="relative overflow-hidden">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
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
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-300">{product.name}</h3>
                    <p className="text-indigo-600 font-bold mb-2">Price: {product.price}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(4) ? 'text-yellow-400' : 'text-gray-300'} transition-colors duration-300`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">4</span>
                    </div>
                    <Button className="w-full mt-4" variant="default">
                      Add to Cart
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-indigo-600 rounded-lg shadow-xl overflow-hidden">
              <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">Want product news and updates?</span>
                    <span className="block text-indigo-200">Sign up for our newsletter.</span>
                  </h2>
                </div>
                <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
                  <form className="sm:flex">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-5 py-3 border-white focus:ring-offset-indigo-700"
                    />
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Button type="submit" className="w-full bg-white text-indigo-600 hover:bg-indigo-50">
                        Subscribe
                      </Button>
                    </div>
                  </form>
                  <p className="mt-3 text-sm text-indigo-200">
                    We care about your data. Read our{' '}
                    <a href="#" className="font-medium underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}