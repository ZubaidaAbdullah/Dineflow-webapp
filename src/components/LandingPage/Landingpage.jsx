import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import navigate
import logo from "../../assets/Logo/brand-logo.png";
import lpimg from "../../assets/LandingPageimgs/lpimg.png";
import "../LandingPage/LandingPage.css";
import { FaUser, FaUserTie } from "react-icons/fa6";
import { LuChefHat } from "react-icons/lu";

const LandingPage = () => {
    const navigate = useNavigate();
    
    const handleNavigation = (role) => {
        // Programmatically navigate to the /login route with role state
        navigate('/login', { state: { role } });
    };

    return (
        <>
            <section className='Landingpagesection'>
                <Container className='landingpageContainer'>
                    <div className='lgwrapper'>
                        <Row>
                            <Col sm={12} className='landingpageheader'>
                                <img src={logo} className='landingpagelogo' alt='lplogo'></img>
                                <h2 className='lp-title'>Dineflow login portal</h2>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6} sm={12} className='lp-img'>
                                <img src={lpimg} alt="lpimg" className='lpimgshow'></img>
                            </Col>

                            <Col lg={6} sm={12} className='lp-buttons'>
                                {/* Call handleNavigation function with role */}
                                <Button onClick={() => handleNavigation('Owner')} className='lpbtn'><FaUserTie className='iconsatlanding' />Login as Owner</Button>
                                <br />
                                <Button onClick={() => handleNavigation('Manager')} className='lpbtn'><FaUser className='iconsatlanding' />Login as Manager</Button>
                                <br />
                                <Button onClick={() => handleNavigation('KitchenStaff')} className='lpbtn'><LuChefHat className='iconsatlanding' />Login as Kitchen Staff</Button>
                                <br />
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default LandingPage;
