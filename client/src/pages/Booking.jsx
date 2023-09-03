import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useParams } from 'react-router-dom';

const Booking = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [room, setRoom] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  const { hotelid, roomid, fromdate, todate } = useParams();
  const fromDateFormatted = moment(fromdate, 'ddd, DD MMM YYYY HH:mm:ss z');
  const toDateFormatted = moment(todate, 'ddd, DD MMM YYYY HH:mm:ss z');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      window.location.href = "/login";
    }
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const data = (
          await axios.get(`/api/hotels/${hotelid}/rooms/${roomid}`)
        ).data;
        setRoom(data.Room);
      } catch (error) {
        console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, [hotelid, roomid]);

  useEffect(() => {
    const totaldays = moment.duration(toDateFormatted.diff(fromDateFormatted)).asDays() + 1;
    setTotalDays(totaldays);
    setTotalAmount(totaldays * room.rentperday);
  }, [room, fromDateFormatted, toDateFormatted]);

 const onToken = async (token) => {
    console.log(token);
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalAmount,
      totaldays: totalDays,
      token,
    };

    try {
      setLoading(true);
      await axios.post("/api/bookings/bookroom", bookingDetails);
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Your Room Booked Successfully",
        "success"
      ).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      setError(error);
      console.log(error);
      Swal.fire("Opps", "Error:" + error, "error");
    }
    setLoading(false);
  };
  

  return (
    <div className="m-5 ">
      {loading ? (
        <Loader />
      ) : error.length > 0 ? (
        <Error msg={error} />
      ) : (
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-6">
            <h1>{room.name}</h1>
            <img src={room.image} alt="Image room" className="bigimg" />
          </div>
          <div className="col-md-6">
          <div style={{ textAlign: "center" }}>
            <div style={{ textAlign: "right" }}>
              <h1 className="book">Booking Details</h1>
              <hr />
              <b className="card">
                <p>Name: {JSON.parse(localStorage.getItem("currentUser")).firstName} {JSON.parse(localStorage.getItem("currentUser")).lastName}</p>
                <p>From Date: {fromdate}</p>
                <p>To Date: {todate}</p>
                <p>Max Count: {room.maxcount} person(s)</p>
              </b>
            </div>
            <div style={{ textAlign: "right" }}>
              <h1 className="book">Amount</h1>
              <hr />
              <b className="card">
                <p>Total Days: {totalDays} day(s)</p>
                <p>Rent per day: {room.rentperday} $</p>
                <p>Total Amount: {totalAmount} $</p>
              </b>
            </div>

            <div style={{ float: "right" }}>
              <StripeCheckout
                amount={totalAmount * 100}
                currency="USD"
                token={onToken}
                stripeKey="pk_test_51NVUJMLnKGfzbvT6B5I6r9a7KUp6JB81UxojSBHflk5KuLRRLJpUrbt5YguVMLgLk2fVqBvKl2j4jxfOWWltg4Yy005loYB1Bo"
              >
                <button className="btn btn-primary">Pay Now</button>
              </StripeCheckout>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default Booking;
