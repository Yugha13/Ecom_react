import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuGroup } from "@/components/ui/dropdown-menu"
import { LogOut, Mail, Package2Icon, SearchIcon, User } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom';
import useStore  from "../store/adminState"


const Navbar = () => {
    const { logout, data } = useStore();
    const navigate = useNavigate();
    // console.log("in nav data - ",data);
    
    const handleLogout = () => {
        logout();
        navigate('/');
    };
  return (
    <div>
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-4 sm:px-6">
            <Link to="#" className="lg:hidden">
              <Package2Icon className="h-6 w-6" />
              <span className="sr-only">Home</span>
            </Link>
            <h1 className="font-semibold text-lg flex-1">Dashboard</h1>
            <div className="flex items-center gap-4">
              <form className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="pl-8 sm:w-[200px] lg:w-[300px]" />
              </form>
              <DropdownMenu>
                {data ? (
                  <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="ml-4 p-2 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none transition-colors duration-300">
                              <User className="h-6 w-6 hover:cursor-pointer hover:text-blue-500 transition-colors duration-300" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem className="hover:bg-gray-100 transition-colors duration-300">
                              <Mail className="mr-2 h-4 w-4" />
                              <span>{data?.email}</span>
                            </DropdownMenuItem>
                            
                          </DropdownMenuGroup>
                          <DropdownMenuItem className="hover:bg-gray-100 transition-colors duration-300" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4 text-red-800" />
                            <span className='text-red-800'>Log out</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                ) : (
                    <Link to={"/"}>
                      <button
                        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none "
                      >
                        Log In
                      </button>
                    </Link>
                )}
              </DropdownMenu>
            </div>
          </header>
    </div>
  )
}

export default Navbar