import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Space } from "antd";
import Loader from "../components/Loader";
import Error from "../components/Error";

import AOS from "aos";
import "aos/dist/aos.css";
import Hotel from "../components/Hotel";

AOS.init({
  duration: 1000,
});

const { RangePicker } = DatePicker;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hotels, setHotels] = useState([]);
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (await axios.get("/api/hotels")).data;
        setHotels(data);
        setDuplicateRooms(data);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  function filterBySearch() {
    const tempRooms = duplicateRooms.filter((x) =>
      x.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setHotels(tempRooms);
  }

  return (
    <div className="container ">
      <div className="row mt-5 bs">
        
          <input
            type="text"
            className="form-control"
            placeholder="search rooms"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        
        <div className="col-md-3">
          {/* Additional content */}
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : error.length > 0 ? (
          <Error msg={error} />
        ) : (
          hotels.map((x) => (
            <div className="col-md-9 mt-3" data-aos="flip-down" key={x._id}>
              <Hotel hotel={x} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
