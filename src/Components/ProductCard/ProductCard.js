import Image from 'next/image';
import React from "react";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setProduct } from '../../Store/productSlice';  // Import the setProduct action

const ProductCard = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Function to calculate discount percentage
  const calculateDiscount = (originalPriceStr, discountedPriceStr) => {
    if (!originalPriceStr || !discountedPriceStr) return 0;

    const originalPrice = parseFloat(originalPriceStr.replace('$', ''));
    const discountedPrice = parseFloat(discountedPriceStr.replace('$', ''));

    if (isNaN(originalPrice) || isNaN(discountedPrice) || originalPrice <= 0) return 0;

    return ((originalPrice - discountedPrice) / originalPrice) * 100;
  };

  const discountPercentage = Math.round(calculateDiscount(product?.product_original_price, product?.product_minimum_offer_price));

  // Function to handle product click
  const handleProductClick = () => {
    dispatch(setProduct(product));  // Add the product to the Redux store
    router.push(`/product/${product.asin}`);  // Navigate to the product detail page
  };

  return (
    <div
      className="relative w-[260px] h-[530px] sm:w-[320px] sm:h-[530px] cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="w-full flex items-center justify-center bg-[#F3F3F3]" style={{ height: '440px' }}>
        <div className="relative" style={{ height: '280px', width: '280px' }}>
          <Image
            className="w-full h-full object-cover"
            height={280}
            width={280}
            src={product?.product_photo || '/assets/default-product.png'}  // Fallback image
            alt={product?.product_title || 'Product Photo'}
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-center gap-1 p-2" style={{ height: '90px' }}>
        <p className="text-center text-lg sm:text-2xl overflow-hidden text-ellipsis whitespace-nowrap">
          {product?.product_title}
        </p>
        <div className="flex justify-center gap-2 text-sm sm:text-base">
          <p className="line-through">{product?.product_original_price}</p>
          <p className="font-semibold">{product?.product_minimum_offer_price}</p>
        </div>
      </div>

      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-0 right-0 w-1/3 py-1 bg-[#E2342D]">
          <p className="text-white text-sm sm:text-base text-center">{discountPercentage}% OFF</p>
        </div>
      )}

      {/* Top Seller Badge */}
      {product?.is_best_seller && (
        <div className="absolute top-0 left-0 w-1/3 py-1 bg-[#E2342D]">
          <p className="text-white text-sm sm:text-base text-center">TOP SELLER</p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
