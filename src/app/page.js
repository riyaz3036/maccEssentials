// src/app/page.js

"use client";
import Image from "next/image";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import ProductCard from '../Components/ProductCard/ProductCard'
import home_img1 from '../../public/assets/home_img1.png'
import home_img2 from '../../public/assets/home_img2.png'
import home_img3 from '../../public/assets/home_img3.png'

export default function Home() {
  const router = useRouter();
  
  // Fetch sample data from Redux store
  const products = useSelector((state) => state.sampleData.items);

  // Ensure there are at least 10 products
  if (products.length < 10) {
    throw new Error('Not enough products available');
  }

  // Select the first 6 products for the carousel
  const carouselProducts = products.slice(0, 6);

  // Generate items for the carousel
  const items = carouselProducts.map((product) => (
    <div key={product.asin} className="flex justify-center w-[340px] md:w-[450px] lg:w-[500px]">
      <ProductCard product={product} />
    </div>
  ));

  return (
    <main>
      <Header />
       
       {/* Home Top Section */}
       <div className="flex flex-wrap justify-between py-5 md:py-10 px-5 md:px-20" style={{backgroundColor: '#F8F8F8'}}>
          <div className="flex flex-col justify-center max-w-[700px] md:w-[450px] lg:w-[500px] p-5">
            <p className="text-3xl md:text-5xl font-bold mb-5" style={{color: '#3A408C'}}>PROVIDING SERVICES AT YOUR DOOR</p>
            <p className="text-base md:text-xl mb-12" style={{color: '#707070'}}>
              <span className="font-bold">MACC Essentials</span> has an important role in making supplies and services available to customers and their patients during this 
              critical time. This includes services from various domains. Our aim is to aid you. As much we can.
            </p>
            <button className="flex items-center justify-center text-white" style={{backgroundColor:'#E2342D', width: '220px',height: '50px'}}>LEARN MORE</button>
          </div>

          <div className="overflow-hidden" style={{height: '500px', width: '500px'}}>
            <Image className="h-full w-full object-cover" src={home_img1} />
          </div>
       </div>


       {/* New Products Section */}
       <div className="flex flex-col gap-2 py-10 px-10">
          <div>
              <p className="text-3xl font-bold text-center mb-3" style={{color: '#E2342D'}}><span style={{color: '#004197'}}>NEW</span> PRODUCTS</p>
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


       {/* Weekly Discount Section */}
       <div className="flex flex-wrap items-center justify-between py-10">
          <div className="" style={{height: '670px', width: '570px'}}><Image className="h-full w-full object-cover" src={home_img2} /></div>
          
          <div className="px-5 md:px-10">
              <div className="flex flex-wrap items-center justify-between gap-5 mb-5 mt-5 sm:mt-0">
                <div>
                  <p className="text-xl md:text-3xl font-bold" style={{color: '#4A4B4D'}}><span style={{color: '#E2342D'}}>MACC</span> WEEKLY DISCOUNT</p>
                </div>
                <button className="h-[40px] w-[100px] text-sm" style={{backgroundColor: '#D2D2D2',color: '#4A4B4D'}}
                onClick={()=>router.push("/allproducts")}>VIEW ALL</button>
              </div>

              <div className="flex flex-wrap gap-5">
                <ProductCard product={products[6]} />
                <ProductCard product={products[7]} />
              </div>
          </div>
       </div>


       {/* Top Selling Products Section */}
       <div className="flex flex-wrap items-center justify-between py-10 mb-40">
              
          <div className="flex flex-col gap-10 px-5 md:px-10">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div>
                  <p className="text-xl md:text-3xl font-bold" style={{color: '#4A4B4D'}}><span style={{color: '#E2342D'}}>MACC</span> TOP SELLINGS</p>
                </div>
                <button className="h-[40px] w-[100px] text-sm" style={{backgroundColor: '#D2D2D2',color: '#4A4B4D'}} 
                onClick={()=>router.push("/allproducts")}>VIEW ALL</button>
              </div>

              <div className="flex flex-wrap gap-5">
                <ProductCard product={products[8]} />
                <ProductCard product={products[9]} />
              </div>
          </div>

          <div className="" style={{height: '670px', width: '570px'}}><Image className="h-full w-full object-cover" src={home_img3} /></div>
       </div>

      <Footer />
    </main>
  );
}
