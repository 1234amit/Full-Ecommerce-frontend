import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col>
                        <p className='text-center py-3'>&copy; 2022 All Copyright Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
