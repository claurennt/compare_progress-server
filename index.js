require("dotenv").config();

require("./db/client.js");

const Primer_progress = require("./db/model/primer_progress.js");
const filterDataByPrimerId = require("./utils/filterCourseById.js");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/primer", async (req, res) => {
  const { id1, id2, id3, id4 } = req.body;

  try {
    const filteredCourses = filterDataByPrimerId(id1, id2, id3, id4);

    const savedData = await Primer_progress.create(filteredCourses);

    if (!savedData.length) {
      return res.status(400).send("No data saved to database");
    }

    return res.status(201).send("Data saved to database");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
