import React from 'react'
import Feedback from './Feedback';


const Feedbackusers = () => {

  const outstanding_feedbacks = [
    {
      id: 1,
      name: "Muneeza",
      email: "john@gmail.com",
      feedback: "Food tastes like heaven!"
    },
    {
      id: 2,
      name: "Omair",
      email: "Omair@gmail.com",
      feedback: "Their fried chicken is the best, especially the breast piece."
    },
    {
      id: 3,
      name: "Alice",
      email: "alice@example.com",
      feedback: "The service was exceptional!"
    },
    {
      id: 4,
      name: "Emma",
      email: "emma@example.com",
      feedback: "Great ambiance and friendly staff."
    },
    {
      id: 5,
      name: "Michael",
      email: "michael@example.com",
      feedback: "Delicious desserts! Loved the variety."
    },
    {
      id: 6,
      name: "Sophia",
      email: "sophia@example.com",
      feedback: "Fast delivery and hot food. Impressed!"
    },
    {
      id: 7,
      name: "Ethan",
      email: "ethan@example.com",
      feedback: "Clean environment and hygienic practices observed."
    },
    {
      id: 8,
      name: "Olivia",
      email: "olivia@example.com",
      feedback: "The menu has a lot of healthy options. Very pleased."
    },
    {
      id: 9,
      name: "Ava",
      email: "ava@example.com",
      feedback: "Portions are generous, and prices are reasonable."
    },
    {
      id: 10,
      name: "Noah",
      email: "noah@example.com",
      feedback: "The ambiance was amazing. Ths staff was very professional. Food came on time  as well as warm to the touch. Their white karahi was beyond tasty and the breast piece was just mouth watering. I would definitely visit again!"
    }
  ];

  const Satsifactory_feedbacks = [
    {
      id: 1,
      name: "Omair",
      email: "sophie@example.com",
      feedback: "Waited too long for the food, and it was cold."
    },
    {
      id: 2,
      name: "Mia",
      email: "mia@example.com",
      feedback: "Rude staff and unclean tables."
    },
    {
      id: 3,
      name: "James",
      email: "james@example.com",
      feedback: "Food was bland and tasteless."
    },
    {
      id: 4,
      name: "Liam",
      email: "liam@example.com",
      feedback: "Received the wrong order, and it took forever to rectify."
    },
    {
      id: 5,
      name: "Charlotte",
      email: "charlotte@example.com",
      feedback: "Overpriced for the quality of food served."
    },
    {
      id: 6,
      name: "Benjamin",
      email: "benjamin@example.com",
      feedback: "Poor customer service, no one attended to our table for ages."
    },
    {
      id: 7,
      name: "Amelia",
      email: "amelia@example.com",
      feedback: "Dirty utensils, and the restroom was not clean."
    },
    {
      id: 8,
      name: "William",
      email: "william@example.com",
      feedback: "Limited vegetarian options available."
    },
    {
      id: 9,
      name: "Daniel",
      email: "daniel@example.com",
      feedback: "Food portions were small for the price charged."
    },
    {
      id: 10,
      name: "Emily",
      email: "emily@example.com",
      feedback: "The restaurant was noisy and overcrowded. Ths staff was rude and unprofessional. Food came late as well as cold. Their white karahi was tasteless and the breast piece was not soft."
    }
  ];

  const Average_feedbacks = [
    {
      id: 1,
      name: "Sanjay",
      email: "sophie@example.com",
      feedback: "Waited too long for the food, and it was cold."
    },
    {
      id: 2,
      name: "Mia",
      email: "mia@example.com",
      feedback: "Rude staff and unclean tables."
    },
    {
      id: 3,
      name: "James",
      email: "james@example.com",
      feedback: "Food was bland and tasteless."
    },
    {
      id: 4,
      name: "Liam",
      email: "liam@example.com",
      feedback: "Received the wrong order, and it took forever to rectify."
    },
    {
      id: 5,
      name: "Charlotte",
      email: "charlotte@example.com",
      feedback: "Overpriced for the quality of food served."
    },
    {
      id: 6,
      name: "Benjamin",
      email: "benjamin@example.com",
      feedback: "Poor customer service, no one attended to our table for ages."
    },
    {
      id: 7,
      name: "Amelia",
      email: "amelia@example.com",
      feedback: "Dirty utensils, and the restroom was not clean."
    },
    {
      id: 8,
      name: "William",
      email: "william@example.com",
      feedback: "Limited vegetarian options available."
    },
    {
      id: 9,
      name: "Daniel",
      email: "daniel@example.com",
      feedback: "Food portions were small for the price charged."
    },
    {
      id: 10,
      name: "Emily",
      email: "emily@example.com",
      feedback: "The restaurant was noisy and overcrowded. Ths staff was rude and unprofessional. Food came late as well as cold. Their white karahi was tasteless and the breast piece was not soft."
    }
  ];

  const Unsatisfactory_feedbacks = [
    {
      id: 1,
      name: "Labeeqa",
      email: "sophie@example.com",
      feedback: "Waited too long for the food, and it was cold."
    },
    {
      id: 2,
      name: "Mia",
      email: "mia@example.com",
      feedback: "Rude staff and unclean tables."
    },
    {
      id: 3,
      name: "James",
      email: "james@example.com",
      feedback: "Food was bland and tasteless."
    },
    {
      id: 4,
      name: "Liam",
      email: "liam@example.com",
      feedback: "Received the wrong order, and it took forever to rectify."
    },
    {
      id: 5,
      name: "Charlotte",
      email: "charlotte@example.com",
      feedback: "Overpriced for the quality of food served."
    },
    {
      id: 6,
      name: "Benjamin",
      email: "benjamin@example.com",
      feedback: "Poor customer service, no one attended to our table for ages."
    },
    {
      id: 7,
      name: "Amelia",
      email: "amelia@example.com",
      feedback: "Dirty utensils, and the restroom was not clean."
    },
    {
      id: 8,
      name: "William",
      email: "william@example.com",
      feedback: "Limited vegetarian options available."
    },
    {
      id: 9,
      name: "Daniel",
      email: "daniel@example.com",
      feedback: "Food portions were small for the price charged."
    },
    {
      id: 10,
      name: "Emily",
      email: "emily@example.com",
      feedback: "The restaurant was noisy and overcrowded. Ths staff was rude and unprofessional. Food came late as well as cold. Their white karahi was tasteless and the breast piece was not soft."
    }
  ];

  const Poor_feedbacks = [
    {
      id: 1,
      name: "Zubaida",
      email: "sophie@example.com",
      feedback: "Waited too long for the food, and it was cold."
    },
    {
      id: 2,
      name: "Mia",
      email: "mia@example.com",
      feedback: "Rude staff and unclean tables."
    },
    {
      id: 3,
      name: "James",
      email: "james@example.com",
      feedback: "Food was bland and tasteless."
    },
    {
      id: 4,
      name: "Liam",
      email: "liam@example.com",
      feedback: "Received the wrong order, and it took forever to rectify."
    },
    {
      id: 5,
      name: "Charlotte",
      email: "charlotte@example.com",
      feedback: "Overpriced for the quality of food served."
    },
    {
      id: 6,
      name: "Benjamin",
      email: "benjamin@example.com",
      feedback: "Poor customer service, no one attended to our table for ages."
    },
    {
      id: 7,
      name: "Amelia",
      email: "amelia@example.com",
      feedback: "Dirty utensils, and the restroom was not clean."
    },
    {
      id: 8,
      name: "William",
      email: "william@example.com",
      feedback: "Limited vegetarian options available."
    },
    {
      id: 9,
      name: "Daniel",
      email: "daniel@example.com",
      feedback: "Food portions were small for the price charged."
    },
    {
      id: 10,
      name: "Emily",
      email: "emily@example.com",
      feedback: "The restaurant was noisy and overcrowded. Ths staff was rude and unprofessional. Food came late as well as cold. Their white karahi was tasteless and the breast piece was not soft."
    }
  ];




  return (
    <Feedback
      OutstandingFeedbacks={outstanding_feedbacks}
      SatisfactoryFeedbacks={Satsifactory_feedbacks}
      AverageFeedbacks={Average_feedbacks}
      UnsatisfactoryFeedbacks={Unsatisfactory_feedbacks}
      PoorFeedbacks={Poor_feedbacks}
    />

  )
}



export default Feedbackusers;

