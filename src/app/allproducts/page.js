"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from "next/image";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import ProductCard from '../../Components/ProductCard/ProductCard';
import cover from '../../../public/assets/cover.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import RAPIDAPI_KEY from '../Config/config'

export default function AllProducts() {
    const params = useParams();
    const { id } = params;

    // to store list of all products
    const [products, setProducts] = useState([]);

    // for infinite scroll
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [sort, setSort] = useState('RELEVANCE');

    useEffect(() => {
        const fetchProducts = async () => {
                
               let url = `https://real-time-amazon-data.p.rapidapi.com/products-by-category?category_id=2478868012&page=${page}&country=US&sort_by=${sort}&product_condition=ALL`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
                        'x-rapidapi-key': RAPIDAPI_KEY,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                // Extract deals or products array based on the id
                const productsData = data.data.products;

                setProducts(productsData);
                if (productsData.length === 0) setHasMore(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [id, page, sort]); 


    // Function to fetch more products
    const fetchMoreProducts = async () => {
        setPage(page + 1);
        let url = `https://real-time-amazon-data.p.rapidapi.com/products-by-category?category_id=2478868012&page=${page}&country=US&sort_by=${sort}&product_condition=ALL`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
                    'x-rapidapi-key': RAPIDAPI_KEY,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const moreProducts = data.data.products;

            setProducts(prevProducts => [...prevProducts, ...moreProducts]);
            if (moreProducts.length === 0) setHasMore(false);
        } catch (error) {
            console.error('Error fetching more products:', error);
        }
    };

    // Handle sort option change
    const handleSortChange = (event) => {
        setSort(event.target.value);
        setPage(1);  // Reset page to 1 for a new sort request
    };

    return (
        <main>
            <Header />

            {/* Cover Image */}
            <div className="w-full">
                <Image className="h-full w-full object-cover" src={cover} />
            </div>

            <div className="p-5 sm:p-10 flex flex-wrap lg:flex-nowrap gap-5">
                {/* Filter Options */}
                <div className="">
                    <div className="flex justify-between p-3 cursor-pointer text-sm sm:text-base border-b border-[#231F20] border-opacity-10 w-[200px] sm:w-[250px]">
                        <p>COMPANY</p>
                        <p className="text-sm rotate-90">&gt;</p>
                    </div>
                    <div className="flex justify-between p-3 cursor-pointer text-base border-b border-[#231F20] border-opacity-10 w-[200px] sm:w-[250px]">
                        <p>PRICE</p>
                        <p className="text-sm rotate-90">&gt;</p>
                    </div>
                    <div className="flex justify-between p-3 cursor-pointer text-base border-b border-[#231F20] border-opacity-10 w-[200px] sm:w-[250px]">
                        <p>CATEGORY</p>
                        <p className="text-sm rotate-90">&gt;</p>
                    </div>
                </div>

                {/* ALL Products */}
                <div className="w-full">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-base font-bold sm:text-xl">ALL PRODUCTS</p>
                        <div className="relative inline-block text-left">
                            <select
                                className="bg-white border border-black flex items-center justify-center focus:outline-none w-[200px] h-[30px] sm:w-[240px] sm:h-[50px]"
                                value={sort}
                                onChange={handleSortChange}
                            >
                                <option className="text-lg" value="" disabled>SORT BY</option>
                                <option className="text-lg" value="RELEVANCE">RELEVANCE</option>
                            </select>
                        </div>
                    </div>

                    <InfiniteScroll
                        dataLength={products.length} // Important field for the InfiniteScroll component
                        next={fetchMoreProducts} // Function to fetch more products
                        hasMore={hasMore}
                        loader={<p>Loading...</p>}
                        endMessage={<p>No more products to show</p>}
                    >
                        <div className="py-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 place-items-center md:place-items-start">
                            {products.map(product => (
                                <ProductCard key={product?.asin} product={product} />
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>

            <Footer />
        </main>
    );
}
