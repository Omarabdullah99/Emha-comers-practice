import React from 'react';
import './Product.css'

const Product = (props) => {
    
    const{img,name,price,seller,ratings}=props.product
    return (
        <div>
          <div className='product'>

          <img src={img} alt="" />
          <h3>{name}</h3>
          <p>{price} </p>
          <p>Manifacture:{seller} </p>
          <p>Ratting{ratings} </p>
          <button onClick={()=>props.handleAddToCart(props.product)} className='product-btn'>Add To Cart</button>
          
          </div>
        </div>
    );
};

export default Product;