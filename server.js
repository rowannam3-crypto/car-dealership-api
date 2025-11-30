import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// SIMPLE DUMMY DATA (works instantly)
const cars = [
  { id: "1", make: "Toyota", model: "Camry", year: 2021, price: 24000 },
  { id: "2", make: "Honda", model: "Civic", year: 2020, price: 22000 },
  { id: "3", make: "Ford", model: "F-150", year: 2019, price: 35000 }
];

// SIMPLE HOURS
const hours = {
  sales: "9 AM to 8 PM",
  service: "7 AM to 6 PM",
  parts: "8 AM to 5 PM"
};

// GET HOURS
app.get("/hours", (req, res) => {
  res.json(hours);
});

// GET CAR BY ID
app.get("/cars/:id", (req, res) => {
  const car = cars.find(c => c.id === req.params.id);
  if (!car) return res.status(404).json({ error: "Car not found" });
  res.json(car);
});

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Dealership API running.");
});

// PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

