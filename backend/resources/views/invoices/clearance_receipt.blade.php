<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clearance Payment Receipt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 700px;
            margin: 0 auto;
            background: #fff;
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            color: #333;
        }
        .header p {
            margin: 5px 0;
            font-size: 14px;
            color: #555;
        }
        .details {
            margin-top: 20px;
        }
        .details h2 {
            font-size: 18px;
            border-bottom: 2px solid #ddd;
            padding-bottom: 5px;
            color: #333;
        }
        .details table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        .details table th,
        .details table td {
            text-align: left;
            padding: 8px;
            border: 1px solid #ddd;
        }
        .details table th {
            background-color: #f4f4f4;
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
            <h5>Clearance Payment Receipt</h5>
        </div>

        <div class="details">
            <h2>Payment Details</h2>
            <table>
                <tr>
                    <th>Reference Number:</th>
                    <td>{{ $permitRequest->reference_number }}</td>
                </tr>
                <tr>
                    <th>Resident Name:</th>
                    <td>{{ $resident->firstname }} {{ $resident->middlename }} {{ $resident->lastname }}</td>
                </tr>
                <tr>
                    <th>Clearance Type:</th>
                    <td>{{ $permitRequest->permit_type }}</td>
                </tr>
                <tr>
                    <th>Purpose:</th>
                    <td>{{ $permitRequest->purpose }}</td>
                </tr>
                <tr>
                    <th>Expected Duration:</th>
                    <td>{{ $permitRequest->expect_start_date }} to {{ $permitRequest->expect_end_date }}</td>
                </tr>
                <tr>
                    <th>Permit Fee:</th>
                    <td>{{ $permitRequest->permit_fee }} pesos</td>
                </tr>
                <tr>
                    <th>Processing Fee:</th>
                    <td>{{ $permitRequest->processing_fee }} pesos</td>
                </tr>
                <tr>
                    <th>Total Amount to be Paid:</th>
                    <td>{{ number_format($permitRequest->permit_fee + $permitRequest->processing_fee, 2) }} pesos</td>
                </tr>
                <tr>
                    <th>Amount Paid:</th>
                    <td>{{ $payment->amount }} pesos</td>
                </tr>
                <tr>
                    <th>Remaining Balance:</th>
                    <td>{{ ($permitRequest->permit_fee + $permitRequest->processing_fee) - $payment->amount }} pesos</td>
                </tr>
                <tr>
                    <th>Payment Date:</th>
                    <td>{{ $payment->payment_date }}</td>
                </tr>
                <tr>
                    <th>Payment Status:</th>
                    <td>{{ ucfirst($payment->payment_status) }}</td>
                </tr>
            </table>
        </div>

        <div class="footer">
            <p>Thank you for your payment!</p>
        </div>
    </div>
</body>
</html>
