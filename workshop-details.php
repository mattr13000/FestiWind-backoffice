
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Workshop Details - FestiWind</title>

    <!-- CSS -->
    <link rel="stylesheet" href="css/workshop-details.css">

    <!-- JavaScript -->
    <script src="js/workshop-details.js" defer></script>
</head>

<body>
    <main>
        <h1>Workshop Details</h1>

        <form id="workshop-form">

            <label for="category">Category</label>
            <input type="text" id="category" placeholder="Value">

            <label for="startTime">Start Time</label>
            <input type="time" id="startTime">

            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Value">

            <label for="endTime">End Time</label>
            <input type="time" id="endTime">

            <label for="description">Description</label>
            <textarea id="description" placeholder="Value"></textarea>

            <div class="actions">
                <button type="button" id="delete-btn">
                    Delete
                </button>

                <button type="submit" id="update-btn">
                    Update
                </button>
            </div>

        </form>
    </main>
</body>
</html>
