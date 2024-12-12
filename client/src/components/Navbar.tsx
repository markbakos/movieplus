import {Link} from "react-router-dom";
import {Film, Home, Search, Tv, User} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu.tsx"


export const Navbar = () => {
    return(
        <nav className="w-screen h-20 bg-gray-900 flex flex-row items-center overflow-hidden">
            <Link to="/home">
                <button className="text-3xl text-white font-bold select-none p-5 md:p-10">Movie+</button>
            </Link>

            <div className="flex justify-between w-full">
                <div className="flex flex-row text-white text-xl font-semibold select-none">
                    <button className="flex items-center justify-center w-12 md:w-32 h-20">
                        <Home className="mx-1"/>
                        <p className="hidden md:block">Home</p>
                    </button>

                    <button className="flex items-center justify-center w-12 md:w-32 h-20">
                        <Search className="mx-1"/>
                        <p className="hidden md:block">Search</p>
                    </button>

                    <button className="flex items-center justify-center w-12 md:w-32 h-20">
                        <Film className="mx-1"/>
                        <p className="hidden md:block">Movies</p>
                    </button>

                    <button className="flex items-center justify-center w-12 md:w-32 h-20">
                        <Tv className="mx-1"/>
                        <p className="hidden md:block">Series</p>
                    </button>
                </div>

                <div className="flex items-center px-16">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="text-white font-semibold hover:text-gray-300  flex items-center"> <User className="mx-1" /></button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800 hover:text-gray-200">
                            <DropdownMenuItem className=" text-white text-md">
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}