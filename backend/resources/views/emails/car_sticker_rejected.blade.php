<!DOCTYPE html>
<html>
<head>
    <title>Car Sticker Request Rejected</title>
</head>
<body>
    <h1>Car Sticker Request Rejected</h1>
    <p>Dear {{ $carStickerRequest->resident->user->firstname }},</p>

    <p>We regret to inform you that your car sticker request for the vehicle (Model: {{ $carStickerRequest->car_model }}, Plate Number: {{ $carStickerRequest->car_plate_number }}) has been rejected.</p>

    <p><strong>Reason for Rejection:</strong></p>
    <p>{{ $carStickerRequest->note }}</p>

    <p>If you have any questions, feel free to contact us for more information.</p>

    <p>Thank you,</p>
    <p>Your Community Management</p>
</body>
</html>
