<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complaints Report</title>
    <style>
        /* Add your styles here */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.5;
        }
        .container {
            padding: 20px;
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
            word-wrap: break-word; /* Allows words to break and wrap onto the next line */
            white-space: normal;   /* Ensures the text can wrap in cells */
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
            <h2>Complaints Report</h2>
        </div>

        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>Resident</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Date Sent</th>
                        <th>Message</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($groupedComplaints as $status => $group)
                        <tr>
                            <td colspan="7" style="text-align: center; font-weight: bold;">
                                {{ ucfirst($status) }} Complaints
                            </td>
                        </tr>
                        @foreach ($group as $complaint)
                            <tr>
                                <td>{{ $complaint->resident->user->firstname }} {{ $complaint->resident->user->lastname }}</td>
                                <td>Block {{ $complaint->resident->house->block }} Lot {{ $complaint->resident->house->lot }}</td>
                                <td>{{ ucfirst($complaint->status) }}</td>
                                <td>{{ ucfirst($complaint->type) }}</td>
                                <td>{{ \Carbon\Carbon::parse($complaint->date_sent)->format('F d, Y') }}</td>
                                <td>{{ $complaint->message }}</td>
                                <td>{{ $complaint->remarks ?? 'N/A' }}</td>
                            </tr>
                        @endforeach
                    @endforeach
                </tbody>
            </table>
        </div>

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
