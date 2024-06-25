// src/components/LoginForm.js
import React, { useState } from 'react';

function LoginForm() {
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, password }),
            });
            const data = await response.json();
            if (response.status === 200) {
                alert('Inicio de sesión exitoso');
                console.log(data); // Procesa los datos recibidos del servidor
            } else {
                alert('Error de inicio de sesión: ' + data.message);
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nombre">Nombre:</label>
                <input
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Iniciar sesión</button>
        </form>
    );
}

export default LoginForm;
/*
import React, { useState } from 'react';
import './App.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LoginForm from './Login';
import CreditCardForm from './CreditCardForm';
import AddressForm from './AddressForm';

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [creditCardAdded, setCreditCardAdded] = useState(false);
  const [addressAdded, setAddressAdded] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // Estado para controlar la visibilidad del formulario de inicio de sesión
  const [products] = useState([
    { id: 1, name: 'TITANIUM BEEF', description: 'SAN NUTRITION 100% PURE TITANIUM BEEF 4 LBS :: SUPLEMENTOS DEPORTIVOS', price: 999.00, image: 'product1.jpg' },
    { id: 2, name: 'AMP 2000', description: 'Total Fitness Supplements AMP 2000 Pre Workout Powder', price: 1199.00, image: 'product2.jpg' },
    { id: 3, name: 'WHEY PROTEIN', description: '100% WHEY PROTEIN 2 LIBRAS MUSCLETECH (PAQUETE DE 2 PIEZAS)', price: 1299.00, image: 'product3.jpg' },
    { id: 4, name: 'CREATINE', description: 'MuscleTech Platinum Creatine Monohydrate Powder, 100% Pure', price: 799.00, image: 'product4.jpg' },
    { id: 5, name: 'VENOM INFERNO', description: 'PRE ENTRENO,VENOM,DRAGON PHARMA, SUPLEMENTO', price: 675.00, image: 'product5.jpg' },
    { id: 6, name: 'Best Protein', description: 'Best Protein 5 Libras Bpi Proteina Suplemento Fitness Gym', price: 1250.00, image: 'product6.jpg' },
  ]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleLoginSuccess = (nombre) => {
    setLoggedIn(true);
    setMenuOpen(false);
    setShowLogin(false); // Ocultar el formulario de inicio de sesión después del inicio de sesión exitoso
    console.log(`Inicio de sesión exitoso como ${nombre}`);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setMenuOpen(false);
    console.log("Sesión cerrada");
  };

  const handleAddCreditCard = () => {
    setCreditCardAdded(true);
    setMenuOpen(false);
    setShowCreditCardForm(false);
    alert('Tarjeta de crédito agregada.');
  };

  const handleAddAddress = () => {
    setAddressAdded(true);
    setMenuOpen(false);
    setShowAddressForm(false);
    alert('Dirección agregada.');
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`¡${product.name} agregado al carrito!`);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    alert('Producto eliminado del carrito.');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleBuy = () => {
    if (loggedIn && creditCardAdded && addressAdded) {
      setShowPaymentForm(true);
    }
  };

  const handleSearch = () => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredProducts(results);
  };

  const handleCancelSearch = () => {
    setSearchInput('');
    setFilteredProducts(products);
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="navbar">
          <h1 className="logo">
            <span className="brand-name">GymBoosters</span>
          </h1>
          <div className="menu">
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </div>
            {menuOpen && (
              <div className="menu-dropdown">
                {!loggedIn ? (
                  <div>
                    <button onClick={() => setShowLogin(true)}>Iniciar sesión</button>
                    <button onClick={() => setShowCreditCardForm(true)}>Agregar tarjeta de crédito</button>
                    <button onClick={() => setShowAddressForm(true)}>Agregar dirección</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                    <button onClick={handleAddCreditCard}>Agregar tarjeta de crédito</button>
                    <button onClick={handleAddAddress}>Agregar dirección</button>
                  </div>
                )}
                <button onClick={() => setMenuOpen(false)}>Cerrar</button>
              </div>
            )}
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>
            <button onClick={handleCancelSearch}>Cancelar</button>
          </div>
          <div className="right-menu">
            <div className="cart-icon" onClick={() => setCartOpen(!cartOpen)}>
              🛒 <span className="cart-count">{cart.length}</span>
            </div>
            {cartOpen && (
              <div className="cart-dropdown">
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-details">
                        <p><strong>{item.name}</strong></p>
                        <p>{item.description}</p>
                        <p>Precio: ${item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  Total: ${getTotalPrice()}
                </div>
                <button className="buy-button" onClick={handleBuy}>Comprar</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {showLogin && <LoginForm onLoginSuccess={handleLoginSuccess} />}

      {showCreditCardForm && <CreditCardForm handleAddCreditCard={handleAddCreditCard} />}
      {showAddressForm && <AddressForm handleAddAddress={handleAddAddress} />}

      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <button className="buy-button" onClick={handleBuy}>Comprar</button>
            <button className="add-to-cart-button" onClick={() => addToCart(product)}>Agregar al carrito</button>
          </div>
        ))}
      </div>

      <div className="carousel">
        <Slider {...carouselSettings}>
          <div>
            <img src='ad1.jpg' alt="Anuncio 1" />
          </div>
          <div>
            <img src= 'ad2.jpg' alt="Anuncio 2" />
          </div>
          <div>
            <img src='ad3.jpg' alt="Anuncio 3" />
          </div>
        </Slider>
      </div>

      <footer>
        {showPaymentForm && (
          <div className="payment-form">
            <h2>Elegir método de pago</h2>
            <form>
              <label>
                Número de tarjeta de crédito:
                <input type="text" />
              </label>
              <label>
                Fecha de vencimiento:
                <input type="text" />
              </label>
              <label>
                CVV:
                <input type="text" />
              </label>
              <button type="submit">Pagar ahora</button>
            </form>
            <button onClick={() => setShowPaymentForm(false)}>Cancelar</button>
          </div>
        )}
      </footer>
    </div>
  );
}

export default App;
*/