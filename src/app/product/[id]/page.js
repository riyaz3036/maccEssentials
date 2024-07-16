"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';
import ProductCard from '../../../Components/ProductCard/ProductCard'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../Store/cartSlice';  // Import the addToCart action

const ProductPage = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();  // Use useRouter here
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);  // Get the product from Redux state
  const allProducts = useSelector((state) => state.sampleData.items);  // Get all products from Redux state

  const [addedmsg, setAddedmsg] = useState(false);

 

  // Handle adding product to the cart
  const handleAddToCart = () => {
    dispatch(addToCart(product));  // Add the entire product object to the cart
    setAddedmsg(true);  // Show the added message
    setTimeout(() => setAddedmsg(false), 3000);  // Hide the message after 3 seconds
  };

  // Generate items for the carousel
  const items = allProducts.slice(0, 6).map((product) => (
    <div key={product.asin} className="flex justify-center w-[340px] md:w-[450px] lg:w-[500px]">
      <ProductCard product={product} />
    </div>
  ));

  return (
    <div>
      <Header />

      <div className="p-5 sm:p-10 relative">
        <p className="text-sm mb-2">Home / Products / Product</p>
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-wrap sm:flex-nowrap">
            <div className="flex sm:flex-col gap-2 flex-wrap sm:flex-nowrap sm:overflow-y-scroll max-h-[300px] md:max-h-[500px]">
              {/* Product images */}
              {product.product_photo && (
                <div className="h-[50px] w-[50px] sm:h-[100px] sm:w-[100px]">
                  <Image className="h-full w-full object-cover" width={100} height={100} src={product.product_photo} alt="Product Image" />
                </div>
              )}
            </div>

            <div className="sm:h-[300px] sm:w-[300px] md:h-[500px] md:w-[500px]" style={{ backgroundColor: '#F3F3F3' }}>
              {product.product_photo && (
                <Image className="h-full w-full object-cover" width={500} height={500} src={product.product_photo} alt="Product Image" />
              )}
            </div>
          </div>

          <div className="min-w-[250px] max-w-[600px]">
            <p className="text-xl font-bold mb-1" style={{ fontSize: '28px' }}>{product.product_title}</p>
            <p className="text-xl font-bold mb-5" style={{ color: '#E2342D' }}>{product.product_minimum_offer_price}</p>
            <div className="flex flex-wrap gap-3 mb-5">
              {product.product_colors?.map((color, index) => (
                <div key={index} className="py-2 px-2 md:px-4 border text-xs sm:text-sm" style={{ borderColor: 'rgba(112, 112, 112, 0.5)', borderWidth: '1px' }}>
                  <p>{color}</p>
                </div>
              ))}
            </div>
            <div className="w-full mb-5">
              <button className="text-white text-sm sm:text-xl w-full py-2" onClick={handleAddToCart} style={{ backgroundColor: '#004197' }}>ADD TO CART</button>
            </div>
            <div className="mb-5">
              <p>{product.product_description}</p>
            </div>
            <div className="flex flex-col gap-3">
              <button className="text-sm sm:text-xl w-full py-2" style={{ borderColor: 'rgba(112, 112, 112, 0.5)', borderWidth: '1px' }}>DESCRIPTION</button>
              <button className="text-sm sm:text-xl w-full py-2" style={{ borderColor: 'rgba(112, 112, 112, 0.5)', borderWidth: '1px' }}>RETURN POLICY</button>
              <button className="text-sm sm:text-xl w-full py-2" style={{ borderColor: 'rgba(112, 112, 112, 0.5)', borderWidth: '1px' }}>CITIZEN POLICY</button>
            </div>
          </div>

        </div>

        {/* Added to cart Message */}
        {addedmsg && (
          <div className="absolute top-0 left-0 right-0 flex text-sm items-center py-2 text-white gap-2 w-full" style={{ backgroundColor: '#29b3ac' }}>
            <div className="flex justify-center w-full">
              <p>ADDED TO CART.</p>
              <Link href="/cart" className="underline">CHECK NOW</Link>
            </div>
            <p onClick={() => setAddedmsg(false)} className="cursor-pointer text-xl px-5">x</p>
          </div>
        )}

        {/* You may also like*/}
        <div className="flex flex-col gap-2 py-10 px-10">
          <div>
            <p className="text-3xl font-bold text-center mb-3">YOU MAY ALSO LIKE</p>
          </div>
          <div>
            <AliceCarousel
              items={items}
              responsive={{
                0: { items: 1 },
                768: { items: 2 },
                1024: { items: 3 },
              }}
              autoPlay
              autoPlayInterval={3000}
              infinite
              disableDotsControls
              renderPrevButton={() => (
                <button className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-white w-12 h-12 rounded-full p-2 text-black shadow-lg">
                  &lt;
                </button>
              )}
              renderNextButton={() => (
                <button className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-white w-12 h-12 rounded-full  p-2 text-black shadow-lg">
                  &gt;
                </button>
              )}
            />         
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
