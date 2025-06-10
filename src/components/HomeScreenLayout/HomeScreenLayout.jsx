import React from 'react';
import "../components/HomeScreenLayout.css"
import { Container, Row, Col} from 'react-bootstrap';

function HomeScreenLayout() {
  return (
    <Container fluid>
        <Row>
            <Col lg='2' className='Side-bar'>
                SideBar
            </Col>


            <Col lg='7' className='Side-bar'>
                MainDashboard
            <Row>
                <Col sm='12'
                     className='TotalRevenueGraph'>

                TotalRevenueGraph
                    
                </Col>
            </Row>

            <Row>
                <Col sm='12'
                     className='Cards'>

                CardsDisplay
                    
                </Col>



            </Row>


            <Row>
                <Col sm='4'
                     className='MostSellingDishes'>

                MostSellingDishes
                    
                </Col>

                <Col sm='8'
                     className='ReviewRatingsGraph'>

                    ReviewRatingsGraph              

                </Col>



            </Row>

            <Row>
                <Col sm='12' className='TopSellingDishes'>
                    Top Selling Dishes
                </Col>
            </Row>


            



            </Col>

            <Col lg='3' className='Side-bar'>
                Order_SideBar
            </Col>
        </Row>
    </Container>
  );
}

export default HomeScreenLayout;
