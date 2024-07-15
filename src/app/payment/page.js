"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddress } from '../../Store/addressSlice';
import { addOrder } from '../../Store/orderSlice'; // Import addOrder action
import { clearCart } from '../../Store/cartSlice'; // Import clearCart action
import Link from 'next/link';
import Image from "next/image";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import payment from '../../../public/assets/payment.png';
import Success from '../../Components/Success/Success';

export default function Payment() {
    const [success, setSuccess] = useState(0);
    const dispatch = useDispatch();
    const currentAddress = useSelector((state) => state.address);
    const cartItems = useSelector((state) => state.cart);  // Get the cart items for calculating the total

    // Object to store the Address (import from the state later)
    const [address, setAddress] = useState({
        firstname: '',
        lastname: '',
        street: '',
        locality: '',
        country: '',
        pincode: '',
        phone: ''
    });

    // Set the initial values from the store
    useEffect(() => {
        setAddress(currentAddress);
    }, [currentAddress]);

    // Calculate the total price
    const calculateTotal = () => {
        return cartItems.reduce((acc, product) => {
            const price = product?.product_minimum_offer_price ? parseFloat(product.product_minimum_offer_price.replace('$', '')) : 0;
            return acc + price;
        }, 0).toFixed(2);
    };


    const [order, setOrder] = useState({
        products: [],
        total: '',
        name: '',
        address: '',
        date: '',
        mode: ''
    });

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const PayDone = () => {
        // Checks
        if (!order.mode) {
            alert('Select a mode of Payment!!');
            return;
        }
        const { firstname, lastname, street, locality, pincode, country, phone } = address;
        if (!(firstname && lastname && street && locality && pincode && country && phone)) {
            alert("Please Fill in all the delivery address details!!");
            return;
        }

        // Update address in redux
        dispatch(updateAddress(address));

        // Create order object with the current date and total price
        const fullName = `${address.firstname} ${address.lastname}`;
        const fullAddress = `${address.street}, ${address.locality}, ${address.country}, ${address.pincode}, Phone: ${address.phone}`;
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format

        const totalAmount = calculateTotal(); // Calculate the total price of the order

        setOrder(prevOrder => ({
            ...prevOrder,
            date: formattedDate,
            name: fullName,
            address: fullAddress,
            total: totalAmount, // Set the total price of the order
            products: cartItems, // Include the cart items in the order
            mode: order.mode // Payment mode
        }));

        // Dispatch addOrder action to save the order in Redux
        dispatch(addOrder({
            products: cartItems,
            total: totalAmount,
            name: fullName,
            address: fullAddress,
            date: formattedDate,
            mode: order.mode
        }));

        // Clear the cart
        dispatch(clearCart());

        setSuccess(1);
    };

    return (
        <main>
            <Header />
            <div className="flex flex-wrap items-center justify-center gap-20 py-10 px-5">
                <div className="" style={{ width: '700px' }}>
                    <p className="text-3xl font-bold mb-5">PAYMENT</p>
                    <div className="flex flex-col mb-5">
                        <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #C4C4C4' }} onClick={() => setOrder({ ...order, mode: 'Bitcoin' })}>
                            <div className="w-3 h-3 bg-white rounded-md" style={{ border: order.mode === "Bitcoin" ? '4px solid #FF6C37' : '1px solid #C4C4C4' }}></div>
                            <p className="">Bitcoin</p>
                        </button>
                        <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #C4C4C4' }} onClick={() => setOrder({ ...order, mode: 'Apple Wallet' })}>
                            <div className="w-3 h-3 bg-white rounded-md" style={{ border: order.mode === "Apple Wallet" ? '4px solid #FF6C37' : '1px solid #C4C4C4' }}></div>
                            <p className="">Apple Wallet</p>
                        </button>
                        <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #C4C4C4' }} onClick={() => setOrder({ ...order, mode: 'Paypal' })}>
                            <div className="w-3 h-3 bg-white rounded-md" style={{ border: order.mode === "Paypal" ? '4px solid #FF6C37' : '1px solid #C4C4C4' }}></div>
                            <p className="">Paypal</p>
                        </button>
                        <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #C4C4C4' }} onClick={() => setOrder({ ...order, mode: 'Debit/Credit Card' })}>
                            <div className="w-3 h-3 bg-white rounded-md" style={{ border: order.mode === "Debit/Credit Card" ? '4px solid #FF6C37' : '1px solid #C4C4C4' }}></div>
                            <p className="">Debit/Credit Card</p>
                        </button>
                    </div>
                    <p className="text-xl font-bold mb-1">Delivery Address</p>
                    <div className="flex flex-col gap-5 mb-5">
                        <div className="flex flex-wrap sm:flex-nowrap gap-5 w-full">
                            <input type="text" id="firstname" name="firstname" placeholder="Enter your first name" className="w-full sm:w-1/2 py-2 px-4 focus:outline-none" style={{ border: '1px solid #C4C4C4' }} required value={address.firstname} onChange={handleChange} />
                            <input type="text" id="lastname" name="lastname" placeholder="Enter your last name" className="w-full sm:w-1/2 py-2 px-4 focus:outline-none" style={{ border: '1px solid #C4C4C4' }} required value={address.lastname} onChange={handleChange} />
                        </div>
                        <input type="text" id="street" name="street" placeholder="Enter street details" className="py-2 px-4 focus:outline-none" style={{ border: '1px solid #C4C4C4' }} required value={address.street} onChange={handleChange} />
                        <input type="text" id="locality" name="locality" placeholder="Enter locality details" className="py-2 px-4 focus:outline-none" style={{ border: '1px solid #C4C4C4' }} required value={address.locality} onChange={handleChange} />
                        <div className="flex flex-wrap sm:flex-nowrap w-full gap-5">
                            <input type="number" id="pincode" name="pincode" placeholder="Enter pincode" className="w-full sm:w-1/2 py-2 px-4 focus:outline-none" style={{ border: '1px solid #C4C4C4' }} required value={address.pincode} onChange={handleChange} />
                            <input type="text" id="country" name="country" placeholder="Enter the country" className="w-full sm:w-1/2 py-2 px-4 focus:outline-none" style={{ border: '1px solid #C4C4C4' }} required value={address.country} onChange={handleChange} />
                        </div>
                        <input type="number" id="phone" name="phone" placeholder="Enter phone number" className="py-2 px-4 focus:outline-none" style={{ border: '1px solid #C4C4C4' }} required value={address.phone} onChange={handleChange} />
                    </div>
                    <div className="flex flex-wrap items-center justify-between mb-5">
                        <Link href="/checkout" className="text-sm cursor-pointer" style={{ color: '#231F20' }}>&lt; go back to checkout</Link>
                        <button
                            className="text-white text-lg font-bold py-2 px-5"
                            style={{ backgroundColor: '#E2342D' }}
                            onClick={PayDone}
                        >
                            Pay ${calculateTotal()}
                        </button>
                    </div>
                    {success === 1 && <Success />}
                </div>
                
                <div className="" style={{ width: '500px' }}>
                    <div className="flex flex-col justify-center items-center gap-3">
                        <Image src={payment} alt="Payment Options" />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
