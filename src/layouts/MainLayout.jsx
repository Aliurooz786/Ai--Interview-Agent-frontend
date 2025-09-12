import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { User as UserIcon } from 'lucide-react';


const MainLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    
    const userInitial = (user?.email || user?.sub)?.[0]?.toUpperCase();

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white border-b shadow-sm sticky top-0 z-10">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-2xl font-bold text-gray-900 transition-colors hover:text-gray-700">
                                dead<span className="text-red-600">PR</span>
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    to="/"
                                    className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/trainers"
                                    className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Trainers
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                            
                                {user ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarFallback className="bg-slate-700 text-slate-100 flex items-center justify-center">
                                                        {userInitial ? userInitial : <UserIcon className="h-5 w-5" />}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56" align="end" forceMount>
                                            <DropdownMenuLabel className="font-normal">
                                                <div className="flex flex-col space-y-1">
                                                    <p className="text-sm font-medium leading-none">My Account</p>
                                                    <p className="text-xs leading-none text-muted-foreground">
                                                        {user.email || user.sub}
                                                    </p>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild className="cursor-pointer">
                                                <Link to="/dashboard">Dashboard</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild className="cursor-pointer">
                                                <Link to="/profile">Profile</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                                                Log out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <div className="space-x-2">
                                        <Button asChild variant="outline">
                                            <Link to="/login">Login</Link>
                                        </Button>
                                        <Button asChild>
                                            <Link to="/register">Register</Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="bg-white border-t">
                <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} deadPR. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;

