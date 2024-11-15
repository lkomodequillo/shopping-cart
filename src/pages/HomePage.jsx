import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';

const Screen = ({ cart, addToCart, updateQuantity }) => {
  const navigate = useNavigate();

  const navigateToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container fluid>
      <Row className="d-flex">
        <Col md={8} className="order-md-1">
          <ProductList addToCart={addToCart} />
        </Col>
        <Col md={4} className="order-md-2">
          <Cart
            cart={cart}
            updateQuantity={updateQuantity}
            onCheckout={navigateToCheckout}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Screen;
