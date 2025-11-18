import React from 'react'
import ProductSlider from '../ProductsComp/ProductsSlider'

const LatestProducts = () => {
  return (
    <section className='bg-white pb-10'>
        <div className="container">
            <h2 className='text-[22px] font-[500] font-montserrat mb-6'>Latest Products</h2>
            <ProductSlider items={6}/>
        </div>
    </section>
  )
}

export default LatestProducts