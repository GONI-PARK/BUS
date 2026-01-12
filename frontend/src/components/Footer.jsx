import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <h5>My Website</h5>
            <p className="text-muted">
              © {new Date().getFullYear()} My Website. All rights reserved.
            </p>
          </Col>

          <Col md={3}>
            <h6>Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-light text-decoration-none">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </Col>

          <Col md={3}>
            <h6>Contact</h6>
            <ul className="list-unstyled text-muted">
              <li>Email: example@email.com</li>
              <li>Phone: 010-1234-5678</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
