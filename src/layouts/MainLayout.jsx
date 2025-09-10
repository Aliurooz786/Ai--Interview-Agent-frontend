import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            dead<span className="text-red-600">PR</span>
          </Link>
          <div className="space-x-2">
            <Button asChild variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1 bg-gray-50">
        {/* Yahan par hamare pages render honge */}
        <Outlet />
      </main>
      
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} deadPR. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;

