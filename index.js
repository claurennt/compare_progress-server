require("dotenv").config();

require("./db/client.js");

const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

const Primer_progress = require("./db/model/primer_progress.js");

const { WP_API_KEY, WP_PRIMER_URL } = process.env;

app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.post("/primer", async (req, res) => {
  try {
    const { data: wp_primer_courses } = await axios.get(WP_PRIMER_URL, {
      headers: { "api-key": WP_API_KEY },
    });

    //save the courses in a MongoDB
    const savedPrimerCourses = await Primer_progress.create({
      createdAt: new Date().toLocaleString("de-DE", {
        timeZone: "Europe/Berlin",
      }),
      primerCourses: wp_primer_courses,
    });

    return res.status(201).send(savedPrimerCourses);
  } catch (err) {
    console.log(err);
  }
});

app.get("/wp-primer-courses", async (req, res) => {
  try {
    const { data: wp_primer_courses } = await axios.get(WP_PRIMER_URL, {
      headers: { "api-key": WP_API_KEY },
    });

    return res
      .status(200)
      .json({ "Wordpress Primer Courses data": wp_primer_courses });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching data from Wordpress", error });
  }
});

app.get("/mongodb-primer-courses", async (req, res) => {
  try {
    //retrieves the most recently created document in the MongoDB database
    const lastCreatedMongoDBPrimerData = await Primer_progress.findOne().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      "Last created MongoDB Primer Courses data": lastCreatedMongoDBPrimerData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching data from Wordpress", error });
  }
});

app.get("/compare-progress", async (req, res) => {
  try {
    const { data: wp_primer_courses } = await axios.get(WP_PRIMER_URL, {
      headers: { "api-key": WP_API_KEY },
    });

    //retrieves the most recently created document in the MongoDB database
    const { primerCourses } = await Primer_progress.findOne().sort({
      createdAt: -1,
    });

    /* compare the data coming from Wordpress and the data saved in MongoDB matched my user_id and course_id;
      return the students from Wordpress tables that have made some progress in the primer, 
      i.e. where the progress_percent value is greater than the progress_percent value in the MongoDB database  */
    const studentsWhoMadeProgress = wp_primer_courses.filter((wpObj) =>
      primerCourses.some(
        (mongoObj) =>
          wpObj.user_id == mongoObj.user_id &&
          wpObj.course_id == mongoObj.course_id &&
          wpObj.progress_percent > mongoObj.progress_percent
      )
    );

    //overwrite the MongoDB document with the most recent data, i.e. the wp_primer_courses data we just fetched from Wordpress
    await Primer_progress.replaceOne(
      {},
      {
        createdAt: new Date().toLocaleString("de-DE", {
          timeZone: "Europe/Berlin",
        }),
        primerCourses: wp_primer_courses,
      }
    );

    // return only the users who made progress with the primer
    return res
      .status(200)
      .json({ "students who made progress": studentsWhoMadeProgress });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching data from Wordpress", error });
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
