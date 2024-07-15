"use client"
import {useState} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import search from '../../../public/assets/search.png';
import profile from '../../../public/assets/profile.png';
import notification from '../../../public/assets/notification.png';
import cart from '../../../public/assets/cart.png';
import menu from '../../../public/assets/menu.png';

const Header = () => {
    const [ham,setHam] = useState(0);
    return (
        <header className="relative">
            <div className="bg-white flex items-center justify-end py-2 px-10 gap-5 border-b-[1px]" style={{ color: '#4A4B4D', borderBottomColor: '#D2D2D2' }}>
                <p className="text-xs cursor-pointer">Return</p>
                <p className="text-xs cursor-pointer">Help</p>
                <p className="text-xs cursor-pointer">Register/Sign In</p>
            </div>
        
            <div className="flex items-center justify-between py-5 px-5 lg:py-8 lg:px-10">
                <div className="cursor-pointer lg:w-[180px]" >
                    <Image src={search} alt="Search" width={22} height={22} />
                </div>

                <div className="flex items-center justify-center gap-12">
                    <Link href="/allproducts" className="text-base cursor-pointer hidden lg:block">SHOP</Link>
                    <Link href="/allproducts" className="text-base cursor-pointer hidden lg:block">ESSENTIALS</Link>
                    <Link href="/" className="text-2xl lg:text-4xl text-center italic">
                        <p style={{color: '#E2342D'}}>Macc</p>
                        <p style={{color: '#004197'}}>Essentials</p>
                    </Link>
                    <Link href="/allproducts" className="text-base cursor-pointer hidden lg:block">BEST SELLERS</Link>
                    <p className="text-base cursor-pointer hidden lg:block">ABOUT US</p>
                </div>

                <div className="flex justify-between items-center hidden lg:flex" style={{width:'180px'}}>
                    <Link href="/orders" className="cursor-pointer"><Image src={profile} alt="Profile" width={22} height={22} /></Link>
                    <div className="relative p-2 cursor-pointer">
                        <Image src={notification} alt="Notifications" width={22} height={22} />
                        <div className="h-3 w-3 absolute right-0 top-0 rounded-md" style={{ backgroundColor: '#E2342D' }}></div>
                    </div>
                    <Link href="/cart" className="cursor-pointer"><Image src={cart} alt="Cart" width={22} height={22} /></Link>
                </div>


                {/* Responsive hamburger menu */}
                <div className="lg:hidden">
                    <div className="cursor-pointer lg:hidden" onClick={()=>setHam(!ham)}>
                        <Image src={menu} alt="menu" width={24} height={24} />
                    </div>
                    {
                    ham?
                    <div className="absolute top-full left-2 right-2 p-3 bg-gray-200">
                        <div className="p-2 cursor-pointer hover:bg-gray-300" style={{borderBottom: '1px solid gray'}}><Link href="/orders">ORDERS</Link></div>
                        <div className="p-2 cursor-pointer hover:bg-gray-300" style={{borderBottom: '1px solid gray'}}><p>NOTIFICATIONS</p></div>
                        <div className="p-2 cursor-pointer hover:bg-gray-300" style={{borderBottom: '1px solid gray'}}><Link href="/cart">CART</Link></div>
                        <div className="p-2 cursor-pointer hover:bg-gray-300" style={{borderBottom: '1px solid gray'}}><Link href="/allproducts">SHOP</Link></div>
                        <div className="p-2 cursor-pointer hover:bg-gray-300" style={{borderBottom: '1px solid gray'}}><Link href="/allproducts">ESSENTIALS</Link></div>
                        <div className="p-2 cursor-pointer hover:bg-gray-300" style={{borderBottom: '1px solid gray'}}><Link href="/allproducts">BEST SELLERS</Link></div>
                        <div className="p-2 cursor-pointer hover:bg-gray-300" style={{borderBottom: '1px solid gray'}}><p>ABOUT US</p></div>
                    </div>
                    : 
                    <></>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;
