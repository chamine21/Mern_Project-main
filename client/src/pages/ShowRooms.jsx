import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Spin, Typography, DatePicker, Card } from "antd";
import StarRating from "../components/StarRating";
import moment from "moment";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 1000,
});

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

const ShowRooms = () => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const checkCurrentUser = async () => {
      if (!localStorage.getItem("currentUser")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("currentUser")));
      }
    };
    checkCurrentUser();
  }, [navigate]);

  useEffect(() => {
    fetchHotelData();
  }, []);

  useEffect(() => {
    setRooms(hotel?.rooms || []);
    setFilteredRooms(hotel?.rooms || []);
  }, [hotel]);

  const fetchHotelData = async () => {
    try {
      const response = await fetch(`/api/hotels/${id}`);
      const data = await response.json();
      setHotel(data.Hotel);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching hotel data:", error);
      setLoading(false);
    }
  };

  function filterByDate(dates) {
    try {
      setFromDate(dates[0]);
      setToDate(dates[1]);

      const tempRooms = duplicateRooms.filter((room) => {
        const isRoomAvailable = room.currentbookings.every((booking) => {
          return (
            !moment(dates[0]).isBetween(booking.fromdate, booking.todate) &&
            !moment(dates[1]).isBetween(booking.fromdate, booking.todate) &&
            !moment(dates[0]).isSame(booking.fromdate) &&
            !moment(dates[0]).isSame(booking.todate) &&
            !moment(dates[1]).isSame(booking.fromdate) &&
            !moment(dates[1]).isSame(booking.todate)
          );
        });
        return isRoomAvailable || room.currentbookings.length === 0;
      });

      setRooms(tempRooms);
    } catch (error) {
      console.log(error);
    }
  }



  // Check if both fromDate and toDate are selected to enable booking
  const isBookingEnabled = fromDate && toDate;

  return (
    <div style={{ display: "flex" }}>
      {loading ? (
        <Spin />
      ) : (
        <>
          <div style={{ flex: 1, paddingRight: "20px" ,marginTop:"30px"}}>
            <Card title="Hotel Details" id="t">
              <Title id="card">{hotel.name}</Title>
              <Text strong className="card1">Address: </Text>
              <Text className="card1">{hotel.address}</Text>
              <br />
              <Text strong className="card1">Phone Number: </Text>
              <Text className="card1">{hotel.phone}</Text>
              <br />
              <Text strong className="card1">Rate: </Text>
              <StarRating rating={hotel.rating} className="card1"/>
            </Card>
            {!currentUser.isAdmin ?
            <div>
              <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
            </div>:null}
     
          </div>

          <div style={{ flex: 2  ,marginTop:"30px"}}>
            <Card title="Rooms">
              {hotel.rooms.length === 0 ? (
                <p>No rooms available in this hotel.</p>
              ) : (
                <div>
                  {hotel.rooms.map((room) => (
                    <Card key={room._id} style={{ marginBottom: "10px" }}>
                      <div className="row bs">
                        <div className="col-md-4">
                          <img src={room.image} className="smallimg" alt="" />
                        </div>
                        <div className="col-md-7">


                          <Title  className="card1" id="color">{room.name}</Title>
                          <Text strong className="card1" >Rent Per Day: </Text>
                          <Text className="card1">{room.rentperday} $</Text>
                          <br />
                          <Text strong className="card1">Max Count: </Text>
                          <Text className="card1">{room.maxcount} person(s)</Text>
                          <br />
                          <Text strong className="card1">Description: </Text>
                          <Text className="card1">{room.description}</Text>
                          <br />
                          
                          
                          <div className="col-md-9 mt-3" data-aos="flip-down"></div>
                          <div style={{ float: "right" }}>
                            {/* Render the "Book Now" button conditionally */}
                            {isBookingEnabled && (
                              <Link to={`/book/${hotel._id}/${room._id}/${fromDate}/${toDate}`}>
                                <button className="btn btn-primary m-2">Book Now</button>
                              </Link>
                            )}

                            {/* <button className="btn btn-primary">View Detail</button> */}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowRooms;
