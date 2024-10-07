import { useEffect } from 'react';
import { Heart, LogOut, Mail, Search, ShoppingCart, User } from 'lucide-react';
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import axios from 'axios';
import { BASEURL } from "../../BaseUrl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"




const Navbar = () => {
    const { isAuthenticated, user, login, logout } = useKindeAuth();

    const handleLogin = () => {
        login();
        useEffect(() => {
            (async() => {
                const isUser = await axios.post(`${BASEURL}/login`,user);
                console.log(isUser);
            })()
        })
    };

    const handleLogout = () => {
        logout();
        
    };

   

    return (
        <div>
            <nav className="bg-white shadow-lg">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-yellow-500">Neo Shop</span>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <button className="p-2 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none transition-colors duration-300">
                                <Search className="h-6 w-6" />
                            </button>

                            {isAuthenticated ? (
                                <div>
                                <button className="ml-4 p-2 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none transition-colors duration-300">
                                <ShoppingCart className="h-6 w-6" />
                                </button>
                                <button className="ml-4 p-2 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none transition-colors duration-300">        
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <User className="h-6 w-6 hover:cursor-pointer hover:text-blue-500 transition-colors duration-300"/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className="hover:bg-gray-100 transition-colors duration-300">
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span>Yugha</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-gray-100 transition-colors duration-300">
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    <span>{user?.email}</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="hover:bg-gray-100 transition-colors duration-300">
                                                    <Heart className="mr-2 h-4 w-4 fill-red-500 text-red-500" />
                                                    <span className='text-red-500'>Wishlist</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuItem onClick={handleLogout} className="hover:bg-gray-100 transition-colors duration-300">
                                                <LogOut className="mr-2 h-4 w-4 text-red-800" />
                                                <span className='text-red-800'>Log out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </button>
                                </div>
                            ) : (
                                <button
                                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none "
                                    onClick={handleLogin}
                                >
                                    Log In
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;