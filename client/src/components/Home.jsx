import { Col, Container, Row } from 'reactstrap';
import Header from './Header';
import User from './User';
import SharePost from './SharePost';
import Posts from './Posts';
import Footer from './Footer';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
    const email=useSelector((state)=>state.user.user.email);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!email)
            navigate("/");
    },[email]);

     return (
    <div className="app-shell">
        <Row>
           <Header />  
        </Row>
      <Container fluid className="dashboard-body">
        <Row className="g-0 h-100">
          <Col lg="3" md="4" className="sidebar-left">
            <User />
          </Col>
          <Col  md="8" className="feed-section">

              <SharePost />

            <div className="feed-scroll">
              <Posts />
            </div>
          </Col>
        </Row>
      </Container>
      <Row>
         <Footer />
      </Row>
     
    </div>
  );
}
export default Home;