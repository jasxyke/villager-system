<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monthly Dues Payment Receipt</title>
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
            <h5>Monthly Dues Payment Receipt</h5>
        </div>

        <div class="details">
            <h2>Resident Details</h2>
            <table>
                <tr>
                    <th>Resident Name:</th>
                    <td>{{ $user->firstname }} {{ $user->middlename }} {{ $user->lastname }}</td>
                </tr>
                <tr>
                    <th>Block and Lot:</th>
                    <td>{{ $house->block }} {{ $house->lot }}</td>
                </tr>
                <tr>
                    <th>Billing Month/s:</th>
                    <td>@foreach($bills as $monthlyDue)
                        {{ date('F Y', strtotime($monthlyDue->due_date)) }}
                        @endforeach
                    </td>
                </tr>
                <tr>
                    <th>Amount Due:</th>
                    <td>{{ number_format($totalAmount, 2) }} pesos</td>
                </tr>
            </table>

            <h2>Payment Breakdown</h2>
            <table>
                <thead>
                    <tr>
                        <th>Reference No.</th>
                        <th>Amount Paid</th>
                        <th>Payment Method</th>
                        <th>Transaction Date</th>
                    </tr>
                </thead>
                <tbody>
                    @php $totalPaid = 0; @endphp
                    @foreach ($transactions as $transaction)
                        @php $totalPaid += $transaction->amount; @endphp
                        <tr>
                            <td>{{ $transaction->reference_number }}</td>
                            <td>{{ number_format($transaction->amount, 2) }} pesos</td>
                            <td>{{ ucfirst($transaction->payment_method) }}</td>
                            <td>{{ date('F d, Y', strtotime($transaction->transaction_date)) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <h2>Summary</h2>
            <table>
                <tr>
                    <th>Total Paid:</th>
                    <td>{{ number_format($totalPaid, 2) }} pesos</td>
                </tr>
                <tr>
                    <th>Balance Remaining:</th>
                    <td>{{ number_format($totalAmount - $totalPaid, 2) }} pesos</td>
                </tr>
                <tr>
                    <th>Payment Status:</th>
                    <td>{{ $bill->status == 'paid' ? 'Paid' : 'Partial Payment' }}</td>
                </tr>
            </table>
        </div>

        {{-- <div class="footer">
            <p>Thank you for your payment!</p>
        </div> --}}
    </div>
</body>
</html>
