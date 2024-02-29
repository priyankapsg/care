import React from "react";

// Imported Service Images =======>
import service1 from "../assets/service1.jpg";
import service2 from "../assets/service2.jpg";
import service3 from "../assets/service3.jpg";
import service4 from "../assets/service4.jpg";
import service5 from "../assets/service5.jpg";
import service6 from "../assets/service6.jpg";
import service7 from "../assets/service7.jpg";
import service8 from "../assets/service8.jpg";


const travelers = [
  {
    id: 1,
    destinationImage: service1,
    serviceName: "BUYING MEDICINES",
  },
  {
    id: 2,
    destinationImage: service2,
    serviceName: "MENTAL SUPPORT",
  },
  {
    id: 3,
    destinationImage: service3,
    serviceName: "GROCERY SHOPPING",
  },
  {
    id: 4,
    destinationImage: service4,
    serviceName: "MEAL PREPARATION",
  },
  {
    id: 5,
    destinationImage: service5,
    serviceName: "COMPANION FOR WALKING",
  },
  {
    id: 6,
    destinationImage: service6,
    serviceName: "MEDICAL TRANSPORTATION",
  },
  {
    id: 7,
    destinationImage: service7,
    serviceName: "HOUSEHOLD WORKS",
  },
  {
    id: 8,
    destinationImage: service8,
    serviceName: "BUYING FOOD",
  },
];

const Travelers = () => {
  return (
    <div id="Travelers" className='travelers container section'>
      <div className='sectionContainer'>
        <h2>Available Services</h2>
        <div className='travelersContainer grid'>
          {travelers.map(({ id, destinationImage, serviceName }) => (
            <div key={id} className='singleService'>
              <img
                src={destinationImage}
                alt='Service'
                className='destinationImage'
              />
              <div className='serviceName'>
                <span>{serviceName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Travelers;
