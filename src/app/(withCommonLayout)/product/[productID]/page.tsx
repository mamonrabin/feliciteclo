import ProductDetails from '@/components/products/ProductDetails';
import RelativeProducts from '@/components/products/RelativeProducts';
import React from 'react';

const page = () => {
    return (
        <div>
            <ProductDetails/>
            <RelativeProducts/>
        </div>
    );
};

export default page;