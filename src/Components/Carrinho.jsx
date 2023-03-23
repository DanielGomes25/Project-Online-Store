import React, { Component } from 'react';

class Carrinho extends Component {
  state = {
    carrinho: [],
    text: 'cart-products',
  };

  componentDidMount() {
    const storage = this.getSaveProducts();
    this.setState({
      carrinho: storage,
    });
  }

  getSaveProducts = () => {
    const { text } = this.state;
    const storage = JSON.parse(localStorage.getItem(text)) || [];
    return storage;
  };

  increaseCart = (product) => {
    const storage = this.getSaveProducts();
    const { text } = this.state;
    const isOnStorage = storage.find((element) => element.id === product.id);

    if (isOnStorage) {
      const daniloMusk = storage.map((element) => {
        if (element.id === product.id) {
          return {
            ...element,
            quantity: element.quantity + 1,
          };
        }

        return element;
      });
      localStorage.setItem(text, JSON.stringify(daniloMusk));
      this.setState({
        carrinho: daniloMusk,
      });
    }
  };

  decreaseCart = (product) => {
    const storage = this.getSaveProducts();
    const { text } = this.state;
    const isOnStorage = storage.find((element) => element.id === product.id);

    if (isOnStorage) {
      const daniloMusk = storage.map((element) => {
        if (element.id === product.id && element.quantity > 1) {
          return {
            ...element,
            quantity: element.quantity - 1,
          };
        }

        return element;
      });
      localStorage.setItem(text, JSON.stringify(daniloMusk));
      this.setState({
        carrinho: daniloMusk,
      });
    }
  };

  removeCart = (product) => {
    const productsOnStorage = this.getSaveProducts();

    const result = productsOnStorage.filter((storage) => storage.id !== product.id);
    localStorage.setItem('cart-products', JSON.stringify(result));
    this.setState({
      carrinho: result,
    });
  };

  render() {
    const { carrinho } = this.state;
    return (
      <div>
        <p>Carrinho de Compras</p>
        <div data-testid="shopping-cart-empty-message">
          { !carrinho.length ? 'Seu carrinho está vazio' : carrinho.map((product) => (
            <div key={ product.id }>
              <h3 data-testid="shopping-cart-product-name">
                {product.title}
              </h3>
              <span>
                {product.price}
              </span>
              <p data-testid="shopping-cart-product-quantity">
                {product.quantity}
                <br />
                {new Date(product.date).toLocaleDateString()}
              </p>

              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => this.increaseCart(product) }
              >
                +

              </button>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.decreaseCart(product) }
              >
                -

              </button>
              <br />
              <button
                type="button"
                data-testid="remove-product"
                onClick={ () => this.removeCart(product) }
              >
                Excluir

              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Carrinho;
