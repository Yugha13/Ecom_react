import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, ChevronRight, Star, Instagram, Twitter, Facebook } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Link } from 'react-router-dom'
import Navbar from '@/Navbar/Navbar'



const deals = [
  { name: 'Summer Sale', description: 'Up to 50% off on summer essentials', video: "https://cdn.pixabay.com/video/2022/09/07/130568-747868173_tiny.mp4" },
  { name: 'Tech Bonanza', description: 'Latest gadgets at unbeatable prices', video: 'https://cdn.pixabay.com/video/2021/03/25/68962-529839776_tiny.mp4' },
  { name: 'Fashion Frenzy', description: 'Trendy styles for less', video: 'https://cdn.pixabay.com/video/2022/07/01/122810-726391893_tiny.mp4' },
]

const featuredProducts = [
  { name: 'Wireless Earbuds', price: '$129.99', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP87CL73cvHJV-6aTv0I07qiiplnJ0EJ2lvA&s', rating: 4.5 },
  { name: 'Smart Watch', price: '$199.99', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP87CL73cvHJV-6aTv0I07qiiplnJ0EJ2lvA&s', rating: 4.2 },
  { name: 'Laptop Pro', price: '$1299.99', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP87CL73cvHJV-6aTv0I07qiiplnJ0EJ2lvA&s', rating: 4.8 },
  { name: 'Phone 12', price: '$799.99', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP87CL73cvHJV-6aTv0I07qiiplnJ0EJ2lvA&s', rating: 4.6 },
]


const Homepage = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-rose-50">
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <Navbar/>
      </header>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-rose-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      <main className="pt-16">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://videos.pexels.com/video-files/2252824/2252824-uhd_2560_1440_30fps.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-rose-500/50 mix-blend-multiply" />
          </div>
          <div className="relative z-10 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold mb-4"
            >
              Welcome to the Future of Shopping
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8"
            >
              Experience seamless, personalized, and innovative e-commerce
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link to="/products">
                <Button size="lg" className="rounded-full px-8 py-3 bg-white text-blue-600 hover:bg-blue-50">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>


        <section className="py-16 bg-gradient-to-br from-blue-100 to-rose-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="new">New Arrivals</TabsTrigger>
                <TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
                <TabsTrigger value="sale">On Sale</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <CardContent className="p-4">
                        <div className="relative overflow-hidden mb-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button variant="secondary" size="sm">
                              Quick View
                            </Button>
                          </div>
                        </div>
                        <h3 className="font-semibold mb-1 group-hover:text-blue-600 transition-colors duration-300">{product.name}</h3>
                        <p className="text-blue-600 font-bold mb-2">{product.price}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
                        </div>
                        <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-rose-500 hover:from-blue-600 hover:to-rose-600" variant="default">
                          Add to Cart
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>
              
            </Tabs>
          </div>
        </section>
        <section className="py-16 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Hot Deals</h2>
            <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {deals.map((deal, index) => (
                <CarouselItem key={index}>
                  <div className="">
                    <Card>
                      <CardContent className="flex aspect-video items-center justify-center">
                        <div className="relative w-full h-full">
                          <video
                            src={deal.video}
                            className="w-full h-full object-cover rounded-lg"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                          <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center text-white p-4">
                            <h3 className="text-2xl font-bold mb-2">{deal.name}</h3>
                            <p className="text-lg mb-4">{deal.description}</p>
                            <Button variant="secondary" size="lg">
                              Shop Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-blue-100 to-rose-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    <span className="block">Ready to revolutionize your shopping?</span>
                    <span className="block text-blue-600">Join NeoShop today!</span>
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                    Sign up now for exclusive access to cutting-edge products and personalized recommendations.
                  </p>
                </div>
                <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
                  <div className="inline-flex rounded-md shadow">
                    <Button size="lg" className="rounded-full px-8 py-3 bg-gradient-to-r from-blue-500 to-rose-500 hover:from-blue-600 hover:to-rose-600 text-white">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About NeoShop</h3>
              <p className="text-gray-400">NeoShop is revolutionizing e-commerce with cutting-edge technology and a focus on user experience. Join us in shaping the future of online shopping.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Shop</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Shipping</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Track Order</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
              <form className="flex">
                <Input type="email" placeholder="Your email" className="rounded-l-md" />
                <Button type="submit" className="rounded-r-md bg-blue-600 hover:bg-blue-700">Subscribe</Button>
              </form>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">Facebook</span>
                  <Facebook/>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">Instagram</span>                    
                  <Instagram/>             
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <Twitter/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Homepage;