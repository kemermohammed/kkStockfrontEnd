'use client'
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <div className="flex flex-col w-64 h-screen bg-blue-100">
      <div className="flex items-center justify-center p-4 border-b border-gray-200">
      <img src="/logo.png" alt="Logo" className="h-16" />
      </div>
      <nav className="flex flex-col p-4 space-y-4">
        <Link href="/dashboard" className="text-blue-600 font-medium hover:underline">
          Home
        </Link>
        <Link href="/inventory" className="text-blue-600 font-medium hover:underline">
           Inventory
        </Link>
        <Link href="/transactions" className="text-blue-600 font-medium hover:underline">
         Transactions
        </Link>
        <Link href="/employees"   className="text-blue-600 font-medium hover:underline">
         Employees
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
