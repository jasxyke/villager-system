<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Overdue Bills Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.5;
        }
        .container {
            padding: 20px;
        }
        .header-container {
            width: 100%;
            text-align: center;
            border-bottom: 3px solid #4b5563;
            margin-bottom: 20px;
        }
        .header-container table {
            width: 100%;
            margin: 0 auto;
            border-spacing: 10px; /* space between logo and text */
        }
        .header-container td {
            vertical-align: middle; /* Vertically center the content in each cell */
        }
        .logo {
            width: 100px; /* Size of the logo */
            height: 100px;
            border-radius: 50%;
        }
        .header {
            font-size: 12px;
            text-align: center;
        }
        .header h5 {
            margin: 0;
            font-size: 14px;
            font-weight: bold;
        }
        .header p {
            margin: 5px 0;
        }
        .divider {
            border-top: 3px solid #4b5563;
            margin: 10px 0;
        }
        .content {
            text-align: center;
        }
        .content h2 {
            margin: 20px 0 10px;
            font-size: 18px;
        }
        .table-container {
            padding: 20px;
            border-radius: 10px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
        }
        .table th, .table td {
            border: 1px solid #ddd;
            padding: 4px;
        }
        .table td {
            text-align: left;
        }

        .table th {
            text-align: center;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
        }
        .prepared-by {
            margin-top: 40px;
            font-weight: bold;
            text-align: left;
        }
        .signature {
            margin-top: 80px;
            width: 200px;
            text-align: center;
        }
        .signature .line {
            border-top: 2px solid #000;
            margin: 0 auto;
            width: 100%;
        }
    </style>
</head>
<body>
    <div class="container">
        @include('partials.header', ['headerData' => $headerData])
        <div class="content">
            <h2>Overdue Bills Report</h2>
        </div>
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>Resident</th>
                        <th>Months Behind</th>
                        <th>Overdue Months</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($residents as $resident)
                        <tr>
                            <td>{{ $resident->user->firstname }} {{ $resident->user->lastname }}</td>
                            <td style="text-align: center">{{ $resident->bills->count() }}</td>
                            <td>
                                @foreach ($resident->bills as $bill)
                                    {{ \Carbon\Carbon::parse($bill->due_date)->format('F Y') }}@if (!$loop->last), @endif
                                @endforeach
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <div class="subheader">Generated on {{ now()->format('Y-m-d') }}</div>

        <div class="footer">
            <div class="prepared-by">
                <p>PREPARED BY:</p>
                <div class="signature">
                    <div class="line"></div>
                    <p>HOA TREASURER</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
