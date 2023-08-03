// app.js
import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Items from './components/Items'
import InfoItem from './components/InfoItem'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state =  {
            orders: [],
            items: [], // изначально пустой массив
            infoItem: false,
            boxItem: {}
        }
        this.addToOrder = this.addToOrder.bind(this)
        this.deleteFromOrder = this.deleteFromOrder.bind(this)
        this.showItem = this.showItem.bind(this)
    }

    // добавляем этот метод для запроса данных на стороне сервера
    componentDidMount() {
      // делаем запрос к server.js и получаем данные в виде JSON
      fetch('http://localhost:9001/items')
      .then(res => res.json())
      .then(data => {
        // обновляем состояние items с помощью setState
        this.setState({ items: data })
      })
      .catch(err => console.error(err))
    }
 
    render() {
    return (
        <div className='wrapper'>
            <Header orders={this.state.orders} onDelete={this.deleteFromOrder}/>
            <Items showItem={this.showItem} items={this.state.items} onAdd={this.addToOrder}/>
            {this.state.infoItem && <InfoItem onAdd={this.addToOrder} item = {this.state.boxItem} showItem={this.showItem}/> }
            <Footer />
        </div>
    )
    }

    showItem(item) {
        this.setState({boxItem: item})
        this.setState({infoItem: !this.state.infoItem})
    }

    addToOrder(item) {
        let inArray = false
        this.state.orders.forEach(el => {
            if (el.id === item.id) {
                inArray = true;
            }
        })
        if (!inArray) {
            this.setState({orders: [...this.state.orders, item]})
        }
    }

    deleteFromOrder(id) {
        this.setState({orders: this.state.orders.filter(el => el.id !== id)})
    }
}

export default App;
