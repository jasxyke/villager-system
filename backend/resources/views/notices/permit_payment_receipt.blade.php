<!DOCTYPE html>
<html>
<head>
    <title>Clearance Payment Receipt</title>
</head>
<body>
    <p>Dear {{ $resident->firstname }} {{ $resident->lastname }},</p>

    <p>Thank you for your payment of <strong>{{ number_format($payment->amount, 2) }}</strong> for your clearance request.</p>

    <p>Attached is your payment receipt for your reference.</p>

    <p>Best regards,<br>
    HOA Treasurer</p>
</body>
</html>
