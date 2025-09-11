"use client"
import React from "react";
import { assets, CartIcon } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { useState } from "react";

// ...existing code...

const Navbar = () => {

  const { isSeller, route, user } = useAppContext();
  const { openSignIn } = useClerk()
   const [menuOpen, setMenuOpen] = useState(false); 

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => route.push('/')}
        src={assets.logo}
        alt="logo"
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          Contact
        </Link>

        {isSeller && <button onClick={() => route.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        <button
          title="Carrito"
          onClick={() => route.push('/cart')}
          className="flex items-center hover:text-gray-900 transition"
        >
          <CartIcon />
        </button>
        <button
          title="Pedidos"
          onClick={() => route.push('/my-orders')}
          className="flex items-center hover:text-gray-900 transition"
        >
          <Image src={assets.order_icon} alt="orders icon" className="w-5 h-5" width={20} height={20} />
        </button>
        {
          user
            ? <UserButton />
            : (
              <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
                <Image src={assets.user_icon} alt="user icon" />
                Account
              </button>
            )
        }
      </ul>

      {/* Menú móvil */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 
  ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Cerrar menú */}
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)}>
            <Image src={assets.arrow_icon} alt="close" width={24} height={24} />
          </button>
        </div>

        {/* Links móvil */}
        <ul className="flex flex-col gap-6 p-6 text-lg">
          <li>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 hover:text-gray-900 transition"
            >
              <Image src={assets.box_icon} alt="home" width={20} height={20} />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/all-products"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 hover:text-gray-900 transition"
            >
              <Image src={assets.product_list_icon} alt="products" width={20} height={20} />
              Productos
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 hover:text-gray-900 transition"
            >
              <Image src={assets.cart_icon} alt="cart" width={20} height={20} />
              Carrito
            </Link>
          </li>
          <li className="flex items-center gap-2 hover:text-gray-900 transition">
            <Image src={assets.user_icon} alt="user" width={20} height={20} />
            {user ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <button
                onClick={() => {
                  openSignIn();
                  setMenuOpen(false);
                }}
              >
                Mi Cuenta
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;