<?php
$conn = new mysqli('localhost', 'root', '', 'terracorehub');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM feedback ORDER BY id DESC";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Submitted Feedback</title>
    <link rel="stylesheet" href="feedback-data.css">
</head>
<body>
<div class="container">
    <h1>Submitted Feedback</h1>

    <?php while ($row = $result->fetch_assoc()): ?>
        <div class="feedback-entry">
            <div class="feedback-header">
                <div class="feedback-id">#<?= $row["id"] ?></div>
                <div class="feedback-name"><?= htmlspecialchars($row["name"]) ?></div>
                <div class="feedback-email" style="color: #ffe600ff"><?= htmlspecialchars($row["email"]) ?></div>
                <div class="feedback-time"><?= $row["submitted_at"] ?></div>
            </div>
            <div class="feedback-message" style="color: white"><?= nl2br(htmlspecialchars($row["message"])) ?></div>
        </div>
    <?php endwhile; ?>
</div>
</body>
</html>
<?php $conn->close(); ?>