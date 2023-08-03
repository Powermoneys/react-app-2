import React, { useState } from 'react'
import { AiOutlineShopping } from "react-icons/ai";
import Order from './Order'

const showNothing = () => {
  return (
    <div className='empty'>
      В корзине нет товаров.
    </div>
  )
}

const showOrders = (props) => {
  let sum = 0;
  props.orders.forEach(el => sum += Number.parseFloat(el.price))
  return (
    <div>
      {props.orders.map(el => (
        <Order key={el.id} item={el} onDelete={props.onDelete}/>
      ))}
      Итого: {sum}₽
    </div>)
}

export default function Header(props) {
  let [cartOpen, setOpen] = useState(false);


  return (
    <header>
        <div>
            <span className='logo'>Sport staff</span>
            <ul className='nav'>
              <li>Контакты</li>
              <li>Личный кабинет</li>
            </ul>
            <AiOutlineShopping onClick={() => setOpen(cartOpen = !cartOpen)} className={`shop-button ${cartOpen && 'active'}`} />

            {cartOpen && (
              <div className='shop-cart'>
                {props.orders.length > 0 ?
                  showOrders(props) : showNothing()}
              </div>
            
            )}
        </div>
        <div className='presentation'></div> 
    </header>
  )
}
