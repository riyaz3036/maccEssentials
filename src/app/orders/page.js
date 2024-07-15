"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import prod from '../../../public/assets/prod.png';
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux store

export default function Orders() {
    const router = useRouter();

    // Get orders from the Redux store
    const orders = useSelector((state) => state.orders);

    return (
        <main>
            <Header />
       
            <div className="py-10 px-5">
                <p className="text-3xl font-bold mb-5">ORDERS</p>
                <div>
                    {/* Map through orders and display each one */}
                    {orders.map((order, index) => (
                        <div key={index} className="flex flex-col gap-3 py-1 px-3 border border-[#c1c1c1] mb-5">
                            {order.products.map((product, prodIndex) => (
                                <div key={prodIndex} className="flex justify-between items-center">
                                    <div className="flex gap-3 items-center">
                                        <div className="bg-[#F3F3F3]" style={{height: '80px', width: '80px'}}>
                                            <Image className="h-full w-full object-cover" width={80} height={80} src={product.product_photo} alt="Product Image" />
                                        </div>
                                        <p className="font-medium px-5">{product.product_title}</p>
                                    </div>
                                    <p className="font-semibold mb-5">
                                    {product.product_minimum_offer_price ? product.product_minimum_offer_price : '$0.00'}
                                    </p>
                                </div>
                            ))}

                            <div className="flex justify-between items-center px-3 py-1" style={{borderTop: '1px solid #c1c1c1'}}>
                                <p className="font-semibold">Total</p>
                                <p className="font-semibold" style={{ color: '#E2342D' }}>${order.total}</p>
                            </div>

                            <div className="flex flex-col gap-2 px-3">
                                <p><span className="font-semibold">Address:</span> {order.address}</p>
                                <p><span className="font-semibold">Date of Booking:</span> {order.date}</p>
                                <p><span className="font-semibold">Mode of Payment:</span> {order.mode}</p>
                            </div>
                        </div>
                    ))}

                    {/* If there are no orders, show a message */}
                    {orders.length === 0 && (
                        <p className="text-center text-lg text-gray-600">No orders to display.</p>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
