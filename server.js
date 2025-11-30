import express from "express";

const app = express();
app.use(express.json());

// Fake inventory database
const cars = [
  { id: 1, make: "Toyota", model: "Camry", year: 2021, price: 24000, available: true },
  { id: 2, make: "Honda", model: "Civic", year: 2020, price: 21000, available: true },
  { id: 3, make: "Tesla", model: "Model 3", year: 2022, price: 38000, available: false }
];

// 1. getCars
app.get("/cars", (req, res) => {
  res.json(cars);
});

// 2. getCarById
app.get("/cars/:id", (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  if (!car) {
    return res.status(404).json({ error: "Car not found" });
  }
  res.json(car);
});

// 3. submitLead
app.post("/lead", (req, res) => {
  const { name, phone, interest } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Missing name or phone" });
  }

  res.json({
    message: "Lead submitted successfully",
    lead: { name, phone, interest }
  });
});

// 4. scheduleTestDrive
app.post("/testdrive", (req, res) => {
  const { name, phone, carId, date } = req.body;

  if (!name || !phone || !carId || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  res.json({
    message: "Test drive scheduled",
    appointment: { name, phone, carId, date }
  });
});

// 5. serviceAppointment
app.post("/service", (req, res) => {
  const { name, phone, reason, date } = req.body;

  if (!name || !phone || !reason || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  res.json({
    message: "Service appointment created",
    service: { name, phone, reason, date }
  });
});

// 6. hours
app.get("/hours", (req, res) => {
  res.json({
    sales: "9 AM to 8 PM",
    service: "7 AM to 6 PM",
    parts: "8 AM to 5 PM"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("API running on port " + PORT);
});
