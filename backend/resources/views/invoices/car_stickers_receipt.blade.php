<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Sticker Payment Receipt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        .container {
            max-width: 700px;
            margin: 0 auto;
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 8px;
        }
        .header {
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .header p {
            margin: 0;
            font-size: 14px;
            color: #555;
        }
        .details {
            margin-top: 20px;
        }
        .details h2 {
            font-size: 18px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
        }
        .details table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        .details table th, .details table td {
            text-align: left;
            padding: 8px;
            border: 1px solid #ddd;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 14px;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        @include('partials.header', ['headerData' => $headerData])
        <div class="header">
            <h5>Car Sticker Payment Receipt</h5>
        </div>

        <div class="details">
            <h2>Payment Details</h2>
            <table>
                <tr>
                    <th>Resident Name:</th>
                    <td>{{ $resident->firstname }} {{ $resident->middlename }} {{ $resident->lastname }}</td>
                </tr>
                <tr>
                    <th>Car Details:</th>
                    <td>
                        Model: {{ $carStickerRequest->car_model }}<br>
                        Plate Number: {{ $carStickerRequest->car_plate_number }}
                    </td>
                </tr>
                <tr>
                    <th>Amount Paid:</th>
                    <td>{{ $payment->amount }} pesos</td>
                </tr>
                <tr>
                    <th>Payment Date:</th>
                    <td>{{ $payment->payment_date }}</td>
                </tr>
                <tr>
                    <th>Payment Status:</th>
                    <td>{{ ucfirst($payment->payment_status) }}</td>
                </tr>
                <tr>
                    <th>Payment Method:</th>
                    <td>In-person</td>
                </tr>
                <tr>
                    <th>Reference Number:</th>
                    <td>{{ $carStickerRequest->reference_number }}</td>
                </tr>
            </table>
        </div>

        <div class="footer">
            <p>Thank you for your payment!</p>
            <p>Generated on {{ $payment->payment_date }}</p>
        </div>
    </div>
</body>
</html>
