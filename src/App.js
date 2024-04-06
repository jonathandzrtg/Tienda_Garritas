import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid, CardMedia } from '@mui/material';
import './styles.css';

function ProductList({ products, addToCart }) {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              className="cardImage"
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.price} $
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => addToCart(product)}>Agregar al carrito</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

function App() {
  const [cart, setCart] = useState({});
  const products = [
    { id: 1, name: 'Collar para perro', price: 10000, image: 'collar_perro.png' },
    { id: 2, name: 'Corta uñas para gato', price: 15000, image: 'cortaunas.png' },
    { id: 3, name: 'Plato para comida', price: 8000, image: 'plato para comida.png' },
    { id: 4, name: 'Collar isabelino', price: 8000, image: 'collar_isabelino.png' },
    { id: 5, name: 'Antipulgas', price: 8000, image: 'antipulgas.png' },
    { id: 6, name: 'Cepillo para mascota', price: 8000, image: 'cepillo_para_mascotas.png' },
    { id: 7, name: 'Champú mascotas', price: 8000, image: 'shampoo_mascotas.png' },
    { id: 8, name: 'Concentrado gatos', price: 8000, image: 'concentrado_gato.png' }
  ];

  const addToCart = (product) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[product.id]) {
        newCart[product.id].quantity += 1;
      } else {
        newCart[product.id] = { ...product, quantity: 1 };
      }
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId].quantity > 1) {
        newCart[productId].quantity -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalPrice = () => {
    return Object.values(cart).reduce((acc, product) => acc + (product.price * product.quantity), 0);
  };

  return (
    <div className="container">
      <div className="productList">
        <h1>Tienda Garritas</h1>
        <ProductList products={products} addToCart={addToCart} />
      </div>
      <Cart cart={cart} removeFromCart={removeFromCart} getTotalPrice={getTotalPrice} />
    </div>
  );
}

function Cart({ cart, removeFromCart, getTotalPrice }) {
  return (
    <div className="cart">
      <h2>Carrito de compras</h2>
      <ul>
        {Object.values(cart).map((product) => (
          <li key={product.id}>
            <div className="product-info">
              <div>
                <span>{product.name} - {product.price} $</span>
              </div>
              <div>
                <span>Cantidad: {product.quantity}</span>
                <button onClick={() => removeFromCart(product.id)}>Quitar del carrito</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: {getTotalPrice()} $</h3>
    </div>
  );
}



export default App;

