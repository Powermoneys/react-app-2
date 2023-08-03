import React, { Component } from 'react'
import { BsFillTrash3Fill } from "react-icons/bs";


export class Order extends Component {
  render() {
    return (
      <div className='item'>
        <img src={'./img/' + this.props.item.img} />
        <h2>{this.props.item.title}</h2>
        <p>{this.props.item.price}₽</p>
        <BsFillTrash3Fill className='icon-delete' onClick={() => this.props.onDelete(this.props.item.id)}></BsFillTrash3Fill>
      </div>
    )
  }
}

export default Order