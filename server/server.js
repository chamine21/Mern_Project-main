const express = require('express');
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser");
const hotelRoutes = require("./routes/hotel");
const authRoute = require("./routes/user.routes");

// const roomsRoute = require("./routes/roomRoute");
// const usersRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/booking");




// load .env vars
// require('dotenv').config(); 

// middleware
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
// load the port
const port = 8000

// app.use("/api/rooms", roomsRoute);
// app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingRoute);
require("./config/config")
app.use(cookieParser());
app.use("/", authRoute);
app.use(hotelRoutes);

// require("./routes/hotel")(app)

app.listen(port, () => console.log(`Listening on port ${port} for REQuests to RESpond to.`));