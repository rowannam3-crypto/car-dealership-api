import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK");
});

app.post("/webhook", (req, res) => {
  console.log("Incoming request:", req.body);

  res.json({
    result: "Webhook received",
    received: req.body
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
