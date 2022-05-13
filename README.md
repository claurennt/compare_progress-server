<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Compare Progress API</title>

</head>

<body>
    <h1>Welcome to the Compare Progress API!</h1>
    <h2>This is a simple API that allows you to compare the progress of the students during Primer on a daily basis.</h2>
    <ul>
        <h3>Routes</h3>
        <li><strong>POST /primer</strong>
            <p>creates a new entry on MongoDB with the data fetched from the Wordpress Route <strong>/user-courses-table?id=[course_id]</strong>. The request expects an api key in the headers: <code>headers: { "api-key": yourKey },</code></p>
            <details>more info on: <a href="https://wordpress-735786-2549847.cloudwaysapps.com/wp-json/wbs/">https://wordpress-735786-2549847.cloudwaysapps.com/wp-json/wbs/</a></details>
        </li>
        <br />
        <li><strong>GET /wp-primer-courses</strong>
            <p>Sends the data fetched from the Wordpress Route <strong>/user-courses-table?id=[course_id]</strong>.The request expects an api key in the headers: <code>headers: { "api-key": yourKey },</code></p>
            <details>more info on: <a href="https://wordpress-735786-2549847.cloudwaysapps.com/wp-json/wbs/">https://wordpress-735786-2549847.cloudwaysapps.com/wp-json/wbs/</a></details>
        </li>
        <br />
        <li><strong>GET /mongodb-primer-courses</strong>
            <p>Sends the most recently created document with the Primer Course data on MongoDB</p>
        </li>
        <br />
        <li><strong>GET /compare-progress</strong>
            <p>Sends the list of students who made progress in the Primer since previous day. After the comparison between the Wordpress most recent data and the MongoDB data from the previous day is made, the MongoDB data is replaced with the newly fetched data coming from Wordpress. The request expects an api key in the headers: <code>headers: { "api-key": yourKey },</code></p>
        </li>
    </ul>
</body>

</html>
