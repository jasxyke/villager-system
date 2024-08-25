<!-- resources/views/emails/booking_reserved.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Reserved</title>
</head>
<body>
    <h1>Your Booking is Officially Reserved</h1>
    <p>Dear {{ $booking->full_name }},</p>
    <p>We are pleased to inform you that your booking for {{ $booking->amenity->name }} has been officially reserved.</p>
    <p><strong>Booking Date:</strong> {{ $booking->booking_date }}</p>
    <p><strong>Schedule:</strong> {{ $formattedStartTime }} - {{ $formattedEndTime }}</p>
    <p><strong>Paid Amount:</strong> {{ number_format($paidAmount, 2) }}</p>
    <p>Your booking is now confirmed. If you have any questions or need further assistance, please feel free to contact us.</p>
    <p>Thank you for choosing our service!</p>
    <p>Best regards,<br>Pamahay Village</p>
</body>
</html>
