import { Heart, LogOut, Mail, Search, ShoppingCart, User } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, useNavigate } from 'react-router-dom';
import useStore  from "../store/userState"

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
            <nav className="bg-white shadow-lg">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                            <Link to='/'>
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-yellow-500">Neo Shop</span>
                            </Link>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <button className="p-2 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none transition-colors duration-300">
                                <Search className="h-6 w-6" />
                            </button>

                            {data ? (
                                <div>
                                    <Link to='/cart'>
                                    <button className="ml-4 p-2 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none transition-colors duration-300">
                                        <ShoppingCart className="h-6 w-6" />
                                    </button>
                                    </Link>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="ml-4 p-2 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none transition-colors duration-300">
                                                <User className="h-6 w-6 hover:cursor-pointer hover:text-blue-500 transition-colors duration-300" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className="hover:bg-gray-100 transition-colors duration-300">
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span>{data?.name}</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-gray-100 transition-colors duration-300">
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    <span>{data?.email}</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-gray-100 transition-colors duration-300">
                                                    <Heart className="mr-2 h-4 w-4 fill-red-500 text-red-500" />
                                                    <span className='text-red-500'>Wishlist</span>
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
                                <Link to={"/login"}>
                                    <button
                                        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none "
                                    >
                                        Log In
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;