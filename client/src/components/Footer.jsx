import { Col, Row } from "reactstrap";

const Footer=()=>{
    return(
        <div className="footer">
            <Col>
                <Row>About Us</Row>
                <Row>Departments</Row>
                <Row>Services</Row>
            </Col>
            <Col>
                <Row>Contact Us</Row>
                <Row>Al Khuwair</Row>
                <Row>Copyrights to UTAS@2026</Row>
            </Col>
        </div>
    )
}
export default Footer;