const express = require('express');
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser");
const hotelRoutes = require("./routes/hotel");
const authRoute = require("./routes/user.routes");

const routeChat =require("./routes/chat.route")
const bookingRoute = require("./routes/booking");

require("./config//config")



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
const port = process.env.PORT ;


app.use("/api/bookings", bookingRoute);

app.use(cookieParser());
app.use("/", authRoute);
app.use(hotelRoutes);

app.use("/api", routeChat);



app.listen(port, () => console.log(`Listening on port ${port} for REQuests to RESpond to.`));