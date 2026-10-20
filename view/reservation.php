<!DOCTYPE html>
<html>

<head>
    <title>Reservations</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="main.css">
    <script src=".js" defer></script>
</head>

<body>
    <nav class="navigation">
        <img src="img/playstore.png" alt="logo" width="100" height="100" class="nav-element">

        <a href="Index.php" class="nav-element">home</a>
        <a href="add-workshop.php" class="nav-element">add workshop</a>
        <a href="reservations.php" class="nav-element">reservations</a>
        <a href="events.php" class="nav-element">events</a>

        <img src="img/person.circle.fill.svg" alt="logout" fill="currentColor" class="nav-element" viewBox="0 0 16 16"
            width="100" height="100">
    </nav>
    <br>
    <h1>Reservation List</h1>
    <br>
    <table border="1">
        <thead>
            <tr>
                <th class="workshopName">workshop </th>
                <th class="userName">Name</th>
                <th class="date">Date</th>
                <th class="hour">Hour</th>
                <th class="status">Status</th>
                <th class="action">Action</th>
            </tr>
        </thead>
    </table>
</body>

</html>