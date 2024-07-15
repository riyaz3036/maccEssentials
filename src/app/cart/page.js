"use client";

import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import Image from "next/image";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { removeFromCart } from '../../Store/cartSlice';  

export default function Cart() {
    const router = useRouter();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);  

    const checkout = () => {
        router.push('/checkout'); 
    };

    const handleRemoveFromCart = (asin) => {
        dispatch(removeFromCart(asin)); 
    };

    // Check if there are items in the cart
    const isCartEmpty = cartItems.length === 0;

    return (
        <main>
            <Header />
            <div className="py-10 px-5">
                <p className="text-3xl font-bold mb-5">CART</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center md:place-items-start gap-5">
                    {/* Map through cart items */}
                    {cartItems.map((product) => (
                        <div key={product.asin} className="flex flex-col gap-3 w-[250px] sm:w-[300px] h-[450px]" style={{border: '1px solid #F3F3F3'}}>
                            <div className="bg-red-200 w-full h-[300px]" style={{backgroundColor: '#F3F3F3'}}>
                                <Image className="h-full w-full object-cover" width={300} height={300} src={product.product_photo} alt="Product Image" />
                            </div>
                            <div className="flex flex-col justify-between p-3">
                                <div className="mb-4">
                                    <p className="text-xl font-bold mb-1 overflow-hidden text-ellipsis whitespace-nowrap">{product.product_title}</p>
                                    <p className="text-xl font-bold mb-1" style={{color: '#E2342D'}}>{product.product_minimum_offer_price}</p>
                                </div>
                                <div className="bg-green-200">
                                    <button className="w-full text-white py-1 px-3" style={{backgroundColor: '#E2342D'}} onClick={() => handleRemoveFromCart(product.asin)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="py-5 flex justify-center">
                    <button 
                        className={`text-white text-lg font-bold py-2 px-5 ${isCartEmpty ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#004197]'}`}
                        onClick={checkout}
                        disabled={isCartEmpty}
                    >
                        Checkout
                    </button>
                </div>           
            </div>
            <Footer />
        </main>
    );
}
