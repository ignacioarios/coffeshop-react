import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.module.css';
function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="justify-content-center">
          <Col md="auto" className="text-center">
            <h3>No olvides visitar <span style={{ textDecoration: 'underline' }}>Caffe Maledetto</span> en Avenida Siempre Viva 742, Santa Fe, Santa Fe.</h3>
            <ul className="social-links">
              <li><a href="https://www.linkedin.com/in/ignacio-rios-386509310/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
            <h4> Desarrollado por N.RiversDev</h4>
            
          </Col>
        </Row>
        <p className='secundaryy'><strong>© 2024 Todos los derechos reservados.*</strong></p>
      </Container>
    </footer>
  );
}

export default Footer;
