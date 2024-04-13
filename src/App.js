import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid, CardMedia } from '@mui/material';
import 'daisyui/dist/full.css'; // Importar DaisyUI
import './styles.css';

function ProductList({ products, addToCart, toggleFavorite }) {
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
                <span className="text-white">{product.name}</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <span className="text-white">{product.price} $</span>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => addToCart(product)} className="btn btn-primary">Agregar al carrito</Button>
              <Button size="small" onClick={() => toggleFavorite(product)} className="btn btn-primary">Agregar a favoritos</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

function App() {
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

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

  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites[product.id]) {
        const newFavorites = { ...prevFavorites };
        delete newFavorites[product.id];
        return newFavorites;
      } else {
        return { ...prevFavorites, [product.id]: product };
      }
    });
  };

  const getTotalPrice = () => {
    return Object.values(cart).reduce((acc, product) => acc + (product.price * product.quantity), 0);
  };

  return (
    <div className="container bg-white">
      <div className="productList">
        <h1 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '1.5rem', fontFamily: 'Arial, sans-serif' }}>Tienda Garritas</h1>
        <ProductList products={products} addToCart={addToCart} toggleFavorite={toggleFavorite} />
      </div>
      <div className="buttons">
        <button
          className="btn btn-primary mt-4"
          onClick={() => setShowCart(!showCart)}
        >
          {showCart ? (
            <img src="/carrito_de_compras.png" alt="Carrito de compras" style={{ width: '20px', marginRight: '8px' }} />
          ) : (
            <img src="/carrito_de_compras.png" alt="Carrito de compras" style={{ width: '20px', marginRight: '8px' }} />
          )}

        </button>
        <button
          className="btn btn-primary mt-4"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? (
            <img src="/favoritos.png" alt="Favoritos" style={{ width: '20px', marginRight: '8px' }} />
          ) : (
            <img src="/favoritos.png" alt="Favoritos" style={{ width: '20px', marginRight: '8px' }} />
          )}

        </button>
      </div>
      {showCart && (
        <Cart cart={cart} removeFromCart={removeFromCart} getTotalPrice={getTotalPrice} />
      )}
      {showFavorites && (
        <Favorites favorites={favorites} />
      )}
    </div>
  );
}

function Cart({ cart, removeFromCart, getTotalPrice }) {
  return (
    <div className="cart mt-4 bg-white">
      <h1 className="text-xl font-bold mb-2">Carrito de compras</h1>
      <ul>
        {Object.values(cart).map((product) => (
          <li key={product.id} className="mb-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-white">+ {product.name} - {product.price} $</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-white">Cantidad: {product.quantity}</span>
                <button style={{ width: '130px', height: '10px' }} className="btn btn-outline btn-square btn-primary" onClick={() => removeFromCart(product.id)}>Quitar del carrito</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-bold mt-4">Total: {getTotalPrice()} $</h3>
    </div>
  );
}

function Favorites({ favorites }) {
  return (
    <div className="favorites mt-4 bg-white">
      <h1 className="text-xl font-bold mb-2">Productos Favoritos</h1>
      <ul>
        {Object.values(favorites).map((product) => (
          <li key={product.id} className="mb-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-white">{product.name} - {product.price} $</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
