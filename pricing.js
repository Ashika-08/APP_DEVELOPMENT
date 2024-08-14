// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './pricing.css';

// const Pricing = () => {
//   const navigate = useNavigate();

//   const handleDemoClick = () => {
//     navigate('/demo');
//   };

//   const handleEnrollClick = () => {
//     navigate('/demo');
//   };

//   return (
//     <div className="pricing-section">
//       <h2 className="pricing-title">Explore Courses</h2>
//       <div className="pricing-plans">
//         <div className="plan">
//           <h3 className="plan-title">Advanced</h3>
//           <h4 className="plan-type">Monthly Plan</h4>
//           <ul className="plan-features">
//             <li>Weekly 1.5 hrs interactive sessions</li>
//             <li>Weekly practice tournaments</li>
//             <li>Access to class recordings</li>
//             <li>Access to Chess resources</li>
//           </ul>
//           <div className="plan-pricing">
//             <span className="discounted-price">₹ 2500.00</span>
//             <span className="original-price">₹ 3000.00</span>
//             <span className="savings">You Save ₹ 500.00</span>
//           </div>
//           <button className="demo-button" onClick={handleDemoClick}>Book Demo</button>
//           <button className="enroll-button" onClick={handleEnrollClick}>Enroll</button>
//         </div>
        
//         <div className="plan">
//           <h3 className="plan-title">Advanced</h3>
//           <h4 className="plan-type">3 Months Plan</h4>
//           <ul className="plan-features">
//             <li>Weekly 1.5 hrs interactive sessions</li>
//             <li>Weekly practice tournaments</li>
//             <li>Access to class recordings</li>
//             <li>Access to Chess resources</li>
//           </ul>
//           <div className="plan-pricing">
//             <span className="discounted-price">₹ 6000.00</span>
//             <span className="original-price">₹ 9000.00</span>
//             <span className="savings">You Save ₹ 3000.00</span>
//           </div>
//           <button className="demo-button" onClick={handleDemoClick}>Book Demo</button>
//           <button className="enroll-button" onClick={handleEnrollClick}>Enroll</button>
//         </div>
        
//         <div className="plan">
//           <h3 className="plan-title">Advanced</h3>
//           <h4 className="plan-type">6 Months Plan</h4>
//           <ul className="plan-features">
//             <li>Weekly 1.5 hrs interactive sessions</li>
//             <li>Weekly practice tournaments</li>
//             <li>Access to class recordings</li>
//             <li>Access to Chess resources</li>
//           </ul>
//           <div className="plan-pricing">
//             <span className="discounted-price">₹ 11000.00</span>
//             <span className="original-price">₹ 18000.00</span>
//             <span className="savings">You Save ₹ 7000.00</span>
//           </div>
//           <button className="demo-button" onClick={handleDemoClick}>Book Demo</button>
//           <button className="enroll-button" onClick={handleEnrollClick}>Enroll</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pricing;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './pricing.css';

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/pricing/')
      .then(response => {
        setPlans(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the pricing data!', error);
      });
  }, []);

  const handleDemoClick = () => {
    navigate('/demo');
  };

  const handleEnrollClick = () => {
    navigate('/coursereg');
  };

  return (
    <div className="pricing-section">
      <h2 className="pricing-title">Explore Courses</h2>
      <div className="pricing-plans">
        {plans.map(plan => (
          <div key={plan.id} className="plan">
            <h3 className="plan-title">{plan.plan_name}</h3>
            <h4 className="plan-type">{plan.plan_duration}</h4>
            <ul className="plan-features">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className="plan-pricing">
              <span className="discounted-price">₹ {plan.discounted_price}</span>
              <span className="original-price">₹ {plan.original_price}</span>
              <span className="savings">You Save ₹ {plan.savings}</span>
            </div>
            <button className="demo-button" onClick={handleDemoClick}>Book Demo</button>
            <button className="enroll-button" onClick={handleEnrollClick}>Enroll</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
