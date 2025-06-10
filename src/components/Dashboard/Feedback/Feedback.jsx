import React, { useState, useEffect } from 'react';
import "./feedback.css";
import { Container } from 'react-bootstrap';
import Sidebar from '../../Sidebar/Sidebar';
import OrderSide from '../../Orders/OrderSide';
import Navbar from '../Navbar/Navbar';
import Usericon from "../../../assets/Feedbackimgs/user.jpg";
import MyChartComponent from './Donutchart';

const Feedback = () => {
  const [selectedType, setSelectedType] = useState('Outstanding'); // State to keep track of selected feedback type
  const [feedbacks, setFeedbacks] = useState({
    Outstanding: [],
    Satisfactory: [],
    Average: [],
    Unsatisfactory: [],
    Poor: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://ap-south-1.aws.data.mongodb-api.com/app/dineflowserver-uzklkfa/endpoint/GetReview");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const categorizedFeedbacks = categorizeFeedbacks(data);
        setFeedbacks(categorizedFeedbacks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const categorizeFeedbacks = (data) => {
    const categorized = {
      Outstanding: [],
      Satisfactory: [],
      Average: [],
      Unsatisfactory: [],
      Poor: [],
    };
    data.forEach((review) => {
      switch (review.Review) {
        case 4:
          categorized.Outstanding.push(review);
          break;
        case 3:
          categorized.Satisfactory.push(review);
          break;
        case 2:
          categorized.Average.push(review);
          break;
        case 1:
          categorized.Unsatisfactory.push(review);
          break;
        case 0:
          categorized.Poor.push(review);
          break;
        default:
          break;
      }
    });
    return categorized;
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value); // Update selected feedback type
  };

  const getFeedbacks = () => {
    return feedbacks[selectedType] || [];
  };

  const feedbacksToShow = getFeedbacks();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='feedbacks-layout'>
      <div className='feedbacks-middle'>
        <Container style={{
          boxShadow: "0px 3.1px 15.51px 0px #0000001A", margin: '10px', padding: "25px", borderRadius: "24.81px"
        }}>
          <h1 className='feedbacks-mainheading'>Feedbacks</h1>
          <div className='feedbacks-categories'>
            <select className='feedbacks-type' onChange={handleTypeChange} value={selectedType}>
              <option value="Outstanding">Outstanding</option>
              <option value="Satisfactory">Satisfactory</option>
              <option value="Average">Average</option>
              <option value="Unsatisfactory">Unsatisfactory</option>
              <option value="Poor">Poor</option>
            </select>
            {/* <select className='feedbacks-time'>
              <option>Today</option>
              <option>Weekly</option>
            </select> */}
          </div>
          <br />
          <br />
          <div className='chartandfeedback'>
            <ul>
              {feedbacksToShow.map((feedback) => (
                <div key={feedback._id}>
                  <li>
                    <div className='feedbacks-userandli'>
                      <img className='feedbacks-usericon' src={Usericon} alt="User Icon" />
                      <li className='feedback-user'> {feedback.Customer_Name} </li>
                    </div>
                    {feedback.Feedback}
                  </li>
                  <br />
                  <span className='feedback-line'>  </span>
                  <br />
                  <br />
                </div>
              ))}
            </ul>
            <MyChartComponent bgWidth="360px" bgHeight="332px" />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Feedback;
