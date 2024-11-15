import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Pagination, Row } from 'react-bootstrap';
import '/src/styles.css'; // Include your custom styles here

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addedToCart, setAddedToCart] = useState(null);
  const productsPerPage = 20;

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 1000);
  };

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Filter products..."
            value={filter}
            onChange={e => { setFilter(e.target.value); setCurrentPage(1); }}
            className="input-3d"
          />
        </Col>
      </Row>
      <Row>
        {currentProducts.map(product => (
          <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="product-card">
              <Card.Img variant="top" src={product.images[0]} className="product-image" />
              <Card.Body>
                <Card.Title className="product-title">{product.title}</Card.Title>
                <Card.Text className="product-price">${product.price}</Card.Text>
                <Button
                  className={`button-3d ${addedToCart === product.id ? 'button-added' : ''}`}
                  onClick={() => handleAddToCart(product)}
                  disabled={addedToCart === product.id}
                >
                  {addedToCart === product.id ? "Added!" : "Add to Cart"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => paginate(idx + 1)}>
            {idx + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </Container>
  );
};

export default ProductList;
