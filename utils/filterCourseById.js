const wp_lms_user_courses = require("../wp_lms_user_courses.json");

const filterCourseById = (...ids) =>
  wp_lms_user_courses.filter(
    ({ course_id }) =>
      course_id === ids[0] ||
      course_id === ids[1] ||
      course_id === ids[2] ||
      course_id === ids[3]
  );

module.exports = filterCourseById;
