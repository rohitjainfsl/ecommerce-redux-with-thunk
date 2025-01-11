import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {handleDeleteFromCart} from './features/ecommerceSlice'

function Cart() {
  const cart = useSelector((state) => {return state.ecommerce.cart})

  const dispatch = useDispatch()
  

  function deleteFromCart(id){
    dispatch(handleDeleteFromCart(id))
  }


  return (
    <div className='cart'>
      <h1>Cart</h1>
      {
        cart.length === 0 ? 
        <p>Your cart is empty. Do some shopping</p>
         : 
        <ul>
          {cart.map((item) => {
            return <li key={item.id}>
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
              <p>{item.price}</p>
              <button onClick={() => deleteFromCart(item.id)}>Delete from Cart</button>
            </li>
          })}
        </ul>
      }
    </div>
  )
}

export default Cart