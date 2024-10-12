import { useEffect, useState } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"
import { BASEURL } from "../../BaseUrl"
import Navbar from "@/Navbar/Navbar"

export default function Products() {
  const [products, setProducts] = useState([] as any)
  const [isEditing, setIsEditing] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: "", description: "", price: 0, category: "", imageUrl: "", stock: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false) 
  

  useEffect(()=>{
    (async() => {
      try {
        const { data } = await axios.get(`${BASEURL}/products`, {withCredentials : true});
        setProducts(data.allproduct)
      } catch (e) {
        console.log(e);
      }
    })()
  },[])

  const handleInputChange = (e:any) => {
    const { name, value } = e.target
    setCurrentProduct({ ...currentProduct, [name]: value })
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (isEditing) {
      await handleEdit(currentProduct);
    } else {
      const { id, ...productData } = currentProduct;
      await handleCreate(productData);
    }
    refreshProducts();
    setIsDialogOpen(false);
    setCurrentProduct({ id: null, name: "", description: "", price: 0, category: "", imageUrl: "", stock: "" }); 
  }

  const handleCreate = async (product : any) => {
    const data = await axios.post(`${BASEURL}/addproduct`, { datas: product }, { withCredentials: true });
    console.log(data);
  }

  const handleEdit = async (product : any) => {
    const data = await axios.put(`${BASEURL}/product/${product.id}`, { datas: product }, { withCredentials: true });
    console.log(data);
    
    setProducts((prevProducts:any) => prevProducts.map((p:any) => (p.id === product.id ? product : p)));
    setIsEditing(false);
    setCurrentProduct({ id: null, name: "", description: "", price: 0, category: "", imageUrl: "" , stock:""});
  }

  const handleDelete = async (id : any) => {
    await axios.delete(`${BASEURL}/product/${id}`, { withCredentials: true });
    refreshProducts();
  }

  const refreshProducts = async () => {
    try {
      const { data } = await axios.get(`${BASEURL}/products`, {withCredentials : true});
      setProducts(data.allproduct);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Navbar/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="mb-4"
            onClick={() => {
              setIsEditing(false);
              setCurrentProduct({ id: null, name: "", description: "", price: 0, category: "", imageUrl: "", stock: "" });
              setIsDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Products
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={currentProduct.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={currentProduct.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={currentProduct.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={currentProduct.stock}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={currentProduct.imageUrl}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">{isEditing ? "Update Product" : "Add Product"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product:any) => (
          <Card key={product.id} className="w-full">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="font-bold text-lg">${product.price}</p>
              <p>Remaining Stock - {product.stock}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => {
                    setIsEditing(true);
                    setCurrentProduct(product);
                    setIsDialogOpen(true);
                  }}>
                    <Pencil className="h-4 w-4 mr-2" /> Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={currentProduct.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        name="category"
                        value={currentProduct.category}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        name="description"
                        value={currentProduct.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={currentProduct.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        name="stock"
                        value={currentProduct.stock}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        value={currentProduct.imageUrl}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Button type="submit">Update Product</Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={() => handleDelete(product.id)}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
    </div>
  )
}
