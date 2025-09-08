import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import { useEffect } from 'react';

const CartTotal = () => {
  const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);

  useEffect(() => {
    let cartTotal = getCartAmount();
    console.log(cartTotal);
  }, [getCartAmount])
  

  return (
    <div className="w-full">
      <div className="text-2xl">
      <Title text1={`CART`} text2={`TOTALS`}/>
      </div>

      <div className="flex justify-between">
        <p>Subtotal</p>
        <p>{currency} {getCartAmount()}.00</p>
      </div>
      <div className="flex justify-between">
        <p>Shipping Fee</p>
        <p>{currency} {delivery_fee}.00</p>
      </div>
      <hr/>
      <div className="flex justify-between">
        <b>Total</b>
        <b>{currency} {getCartAmount() === 0 ? "0" : Number(getCartAmount()) + delivery_fee }.00</b>

      </div>
    </div>
  )
}

export default CartTotal