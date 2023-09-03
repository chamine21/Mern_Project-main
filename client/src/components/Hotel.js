import React from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

const Hotel = ({ hotel}) => {
  // console.log(hotel.rooms);


  return (
    <div className="row profile">
      <div className="col-md-4">
        <img src={hotel.image} className="smallimg" alt="" />
      </div>
      <div className="col-md-7">
        <h1>{hotel.name}</h1>
        <b>
          <p>Address: {hotel.address}</p>
          <p>Phone Number: {hotel.phone}</p>
          <StarRating rating={hotel.rating} />
         
        </b>

        <div style={{ float: "right" }}>


          <button className="btn btn-primary" ><Link key={hotel._id} to={`/hotel/rooms/${hotel._id}`}>View Rooms</Link>
            
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default Hotel;
