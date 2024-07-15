"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddress } from '../../Store/addressSlice'; 
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Checkout_img from '../../../public/assets/checkout.png';

export default function Checkout() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentAddress = useSelector((state) => state.address); 

  // Initialize the address state with the current values from the store
  const [address, setAddress] = useState({
    firstname: '',
    lastname: '',
    street: '',
    locality: '',
    country: '',
    pincode: '',
    phone: ''
  });

  // set the initial values from the store
  useEffect(() => {
    setAddress(currentAddress); 
  }, [currentAddress]);

  // to handle changes in address
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // to update the address in the redux store
  const UpdateAddress = () => {
    // Dispatch the action to update the address in the Redux store
    console.log(address);
    dispatch(updateAddress(address));

    // navigate to payment page
    router.push('/payment');
  };

  return (
    <main>
      <Header />

      <div className="flex flex-wrap items-center justify-center gap-20 py-10 px-5">
        <div className="" style={{ width: '700px' }}>
          <p className="text-3xl font-bold mb-5">CHECKOUT</p>
          <p className="text-xl font-bold mb-1">Delivery Address</p>
          <div className="flex flex-col gap-5 mb-5">
            <div className="flex flex-wrap sm:flex-nowrap gap-5 w-full">
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Enter your first name"
                className="w-full sm:w-1/2 py-2 px-4 focus:outline-none"
                style={{ border: '1px solid #C4C4C4' }}
                required
                value={address.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Enter your last name"
                className="w-full sm:w-1/2 py-2 px-4 focus:outline-none"
                style={{ border: '1px solid #C4C4C4' }}
                required
                value={address.lastname}
                onChange={handleChange}
              />
            </div>
            <input
              type="text"
              id="street"
              name="street"
              placeholder="Enter street details"
              className="py-2 px-4 focus:outline-none"
              style={{ border: '1px solid #C4C4C4' }}
              required
              value={address.street}
              onChange={handleChange}
            />
            <input
              type="text"
              id="locality"
              name="locality"
              placeholder="Enter locality details"
              className="py-2 px-4 focus:outline-none"
              style={{ border: '1px solid #C4C4C4' }}
              required
              value={address.locality}
              onChange={handleChange}
            />
            <div className="flex flex-wrap sm:flex-nowrap w-full gap-5">
              <input
                type="number"
                id="pincode"
                name="pincode"
                placeholder="Enter pincode"
                className="w-full sm:w-1/2 py-2 px-4 focus:outline-none"
                style={{ border: '1px solid #C4C4C4' }}
                required
                value={address.pincode}
                onChange={handleChange}
              />
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter the country"
                className="w-full sm:w-1/2 py-2 px-4 focus:outline-none"
                style={{ border: '1px solid #C4C4C4' }}
                required
                value={address.country}
                onChange={handleChange}
              />
            </div>
            <input
              type="number"
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              className="py-2 px-4 focus:outline-none"
              style={{ border: '1px solid #C4C4C4' }}
              required
              value={address.phone}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap justify-between items-center gap-5">
            <div>
              <p className="text-sm cursor-pointer" style={{ color: '#231F20' }}>
                &lt; go back to cart
              </p>
            </div>
            <div>
              <button
                className="text-white text-sm sm:text-lg font-bold py-2 px-5"
                onClick={UpdateAddress}
                style={{ backgroundColor: '#E2342D' }}
              >
                Save and Continue
              </button>
            </div>
          </div>
        </div>

        <div className="" style={{ height: '500px', width: '500px' }}>
          <Image className="h-full w-full object-cover" src={Checkout_img} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
