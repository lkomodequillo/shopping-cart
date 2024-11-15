import React, { useState } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import '/src/styles.css';

const Cart = ({ cart, updateQuantity, onCheckout }) => {
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const filteredCart = cart.filter(item => item.quantity > 0);
  const total = filteredCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      setItemToRemove(item);
      setShowModal(true);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const confirmRemoval = () => {
    if (itemToRemove) {
      updateQuantity(itemToRemove.id, 0);
      setItemToRemove(null);
      setShowModal(false);
    }
  };

  const cancelRemoval = () => {
    setItemToRemove(null);
    setShowModal(false);
  };

  return (
    <>
      <h2 className="my-4 cart-title">Your Cart</h2>
      {filteredCart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <Table striped bordered hover responsive className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredCart.map(item => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>
                  <img src={item.images[0]} alt={item.title} className="cart-image" />
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <Form.Control
                    type="number"
                    min="0"
                    value={item.quantity}
                    onChange={e =>
                      handleQuantityChange(item, parseInt(e.target.value))
                    }
                    className="input-3d"
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {filteredCart.length > 0 && <h4 className="total-amount">Total: ${total.toFixed(2)}</h4>}
      <div className="d-flex justify-content-between my-3">
        <Button
          className="button-3d"
          onClick={onCheckout}
          disabled={filteredCart.length === 0}
        >
          Proceed to Checkout
        </Button>
      </div>
      <Modal show={showModal} onHide={cancelRemoval}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemToRemove && (
            <p>
              Are you sure you want to remove{' '}
              <strong>{itemToRemove.title}</strong> from your cart?
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="button-3d-secondary" onClick={cancelRemoval}>
            Cancel
          </Button>
          <Button className="button-3d-danger" onClick={confirmRemoval}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
