import { createContext, use, useEffect, useState } from "react";

import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
export const ShopContext = createContext();

const ShopContextProvider = (props)=>{
    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([])
    const  navigate = useNavigate();
 
    const fetchProducts = async()=>{
        try{
            const response = await fetch("http://localhost:4400/api/product/list");
            const data = await response.json();
            if(response.ok){
                setProducts(data.products);
                console.log(data)
            }
        } catch(err){
            console.log(err);

        }
    }
    useEffect(()=>{
        fetchProducts();
        
    },[])
    const addToCart = async(itemId, size)=>{
        
        if(!size)return  toast.error(" Pleas select product size")
        let cartData = structuredClone(cartItems);


        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
               cartData[itemId][size] = 1; 
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1
        }

        setCartItems(cartData);
        toast('Item added to cart successfully')
    }

    const getCartCount = ()=>{
      let totalCount = 0;
      for (const items in cartItems){
        for( const item in cartItems[items]){
            try{
                if(cartItems[items][item] > 0){
                    totalCount += cartItems[items][item];
                }

            }catch{

            }
        }
      }
      return totalCount;

   }

    const updateQuantity = async (itemId, size, quantity)=>{
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);
        console.log("function is getting executed")
    }

    const getCartAmount =  ()=>{
        let totalAmount = 0;
        for(const items in  cartItems){
            let itemInfo = products.find((product)=>product._id === items);
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch(err){
                    console.log(err);

                }
            }
        }
        return totalAmount;

    }
    

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider