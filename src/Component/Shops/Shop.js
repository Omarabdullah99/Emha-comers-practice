import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';

import Product from '../Products/Product'

import './Shop.css'

const Shop = () => {
    const [products, setproducts] = useState([])
    const [cart, setcart] = useState([])
    // console.log(products)
    useEffect(() => {
        fetch('products.json')
        .then(res => res.json())
        .then(data=> setproducts(data))
      
    }, [])

    useEffect(() => {
     const storedCart=getStoredCart();
     const savedCart=[];
     for(const id in storedCart){
        const addedProduct=products.find(product => product.id === id)
        if(addedProduct){
            const quantity=storedCart[id]
            addedProduct.quantity=quantity;
            savedCart.push(addedProduct)
        }
     }
     setcart(savedCart)
    }, [products])
    

    const  handleAddToCart=(selectedproduct)=>{
        // console.log(product)
        let newCart=[];
        const exist=cart.find(product => product.id === selectedproduct.id);
        if(!exist){
            selectedproduct.quantity=1;
            newCart=[...cart,selectedproduct]

        }
        else{
            const rest= cart.fill(product => product.id !== selectedproduct.id)
            exist.quantity=exist.quantity +1
            newCart=[...rest,exist]
        }

       
        setcart(newCart)
        addToDb(selectedproduct.id)


    }
    
    return (
        <div className='shops'>
        <div className="shops-container">

        <div className='Product-container'>
        {
            products.map(product => <Product
                 product={product}
                  key={product.id} 
                  handleAddToCart={handleAddToCart}
                  >
                  
                  </Product>)
        }
        
        </div>

        <div className='cart-container'>
        <Cart cart={cart}></Cart>
        </div>
        
        
        </div>
        
        
        </div>
    );
};

export default Shop;