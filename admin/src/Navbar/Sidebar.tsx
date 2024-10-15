import { HomeIcon, Package2Icon, PackageIcon, ShoppingCartIcon, UsersIcon } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path:any) => location.pathname === path;

  return (
    <div>
      <div className="hidden border-r bg-muted/40 lg:block h-screen">
        <div className="flex flex-col gap-2 h-screen fixed top-0 left-0 w-[280px]"> 
          <div className="flex items-center px-6 h-16 bg-muted/30">
            <Link to="#" className="flex items-center gap-2 font-semibold">
              <Package2Icon className="h-6 w-6" />
              <span>Neo Shop</span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto bg-muted/40 border-r">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                to="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all  ${
                  isActive("/dashboard") ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/order"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all  ${
                  isActive("/order") ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                <ShoppingCartIcon className="h-4 w-4" />
                Orders{" "}
              </Link>
              <Link
                to="/products"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all  ${
                  isActive("/products") ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                <PackageIcon className="h-4 w-4" />
                Products
              </Link>
              <Link
                to="/customers"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all  ${
                  isActive("/customers") ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                <UsersIcon className="h-4 w-4" />
                Customers
              </Link>
              
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
