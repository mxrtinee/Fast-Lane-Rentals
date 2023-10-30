const User = require("./User");
const Car = require("./Car");
const Booking = require("./Booking");

User.hasMany(Car, {
  foreignKey: "user_id",
});

Car.belongsTo(User, {
  foreignKey: "user_id",
});

Booking.belongsTo(User, {
  foreignKey: "user_id",
});

Booking.belongsTo(Car, {
  foreignKey: "car_id",
});
