import { createContext, use, useEffect, useState } from "react";

import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import { getCartItems } from "../../../Backend/controllers/cart.controller";
import { set } from "mongoose";
export const ShopContext = createContext();

const ShopContextProvider = (props)=>{
    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([])
    const [token, setToken] = useState("")

       const  navigate = useNavigate();

   useEffect(() => {
     setToken(localStorage.getItem("token"));
     
   }, [])

   useEffect(() => {
        fetchCartItems();  
    }, [token])

    useEffect(() => {
    

    },[cartItems])



   const fetchCartItems = async()=>{

    if(!token || token === "undefined") return;
    try{
       
      //send request to get cartItems
      const cartdata = await fetch("http://localhost:4400/api/cart/items", 
        {
        method: "GET",
        headers: {
            "Content-Type" : "application-json",
            "Authorization": `Bearer ${token}`
        }

        },)

        const data = await cartdata.json();
      
        if(data?.cartItems && data.cartItems.length > 0){
         setCartItems(data.cartItems);
            }
        
    } catch(err){
        console.log(err);
    }

   }
   
 
 
    const fetchProducts = async()=>{
        try{
            const response = await fetch("http://localhost:4400/api/product/list");
            const data = await response.json();
            if(response.ok){
                setProducts(data.products);
                
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


       if(!token || token === "undefined") { 
        navigate("/login", { state: { from: `/product/${itemId}` } }); 
       
       }else{
       //send request to backend to add item to cart
       try{
        console.log("Adding to cart", itemId, size);
        const response = await fetch("http://localhost:4400/api/cart/add", {    
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ _id: itemId, size: size, quantity: 1 }),
        });
    
        const data = await response.json();
        console.log(data);
        
        toast.success('Item added to cart successfully')
    }catch(err){
        console.log(err);
        toast.error(err.message)   
       }
    }
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

        cartItems.map((items)=>{
            let itemInfo = items.productId;
          
                try{
                    totalAmount += itemInfo.price * items.quantity;
                    
                } catch(err){
                    console.log(err);

                }
            
        });
        return totalAmount;

    }
    

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider