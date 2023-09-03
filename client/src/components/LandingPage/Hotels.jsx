import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';



const Hotels = () => {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hotels, setHotels] = useState([]);



  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (await axios.get("/api/hotels")).data;
        setHotels(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  hotels.sort((a, b) => b.rating - a.rating);
  const topThreeHotels = hotels.slice(0, 3);

  return (
    <div class="container-xxl py-5">
      <div class="container">
        <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
          <br/>
          <h6 class="section-title text-center text-primary text-uppercase">Our Hotels</h6>
          <h1 class="mb-5">
            Explore Our <span class="text-primary text-uppercase">Hotels</span>
          </h1>
        </div>
        <div class="row g-4">
          {topThreeHotels.map((hotel, index) => (
            <div key={index} class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`0.${index + 1}s`}>
              <div class="room-item shadow rounded overflow-hidden">
                <div class="position-relative">
                  <img class="img-fluid" src={hotel.image} alt="" />
                  {/* <small class="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                    {room.price}
                  </small> */}
                </div>
                <div class="p-4 mt-2">
                  <div class="d-flex justify-content-between mb-3">
                    <h5 class="mb-0">{hotel.name}</h5>
                    <div class="ps-2">
                      {Array.from({ length: hotel.rating }).map((_, starIndex) => (
                        <small key={starIndex} class="fa fa-star text-primary"></small>
                      ))}
                    </div>
                  </div>

                  <p class="text-body mb-3">Address: {hotel.address}</p>
                  <p class="text-body mb-3">Phone: {hotel.phone}</p>

                  <p class="text-body mb-3">Email: {hotel.email}</p>

                  <div class="d-flex justify-content-end" >
                    <a class="btn btn-sm btn-dark rounded py-2 px-4"href={`/hotel/rooms/${hotel._id}`}>
                      View Detail
                    </a>
                  </div>
                  {/* <div class="text-center mt-5">
  <Link to="/home">
    View All
  </Link>
</div> */}
                </div>
              </div>
              
            </div>
            
          ))}
          
        </div>
      </div>
      
      <div class="text-center mt-5">
  <Link to="/home">
    View All
  </Link>
</div>
    </div>
    
  );
};

export default Hotels;
