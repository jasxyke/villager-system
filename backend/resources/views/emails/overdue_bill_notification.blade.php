<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Overdue Bill Notification</title>
</head>
<body>
    <h1>Dear {{ $bill->resident->user->firstname }},</h1>

    <p>
        This is a reminder that your bill for the following month is overdue:
    </p>
    <p>
        <strong>Month:</strong> {{ \Carbon\Carbon::parse($bill->due_date)->format('F Y') }}<br>
        <strong>Amount:</strong> {{ $bill->amount }}
    </p>
    <p>
        Please make the payment at your earliest convenience to avoid any late fees.
    </p>
    <p>
        Thank you.
    </p>

    <p>Best Regards,</p>
    <p>Pamahay Village</p>
</body>
</html>
