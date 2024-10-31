<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Overdue Bills Report</title>
    <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 8px; border: 1px solid #ddd; text-align: left; }
        th { background-color: #f4f4f4; }
        .header { font-size: 24px; font-weight: bold; text-align: center; }
        .subheader { font-size: 18px; margin-top: 10px; text-align: center; }
    </style>
</head>
<body>
    <div class="header">Overdue Bills Report</div>
    <div class="subheader">Generated on {{ now()->format('Y-m-d') }}</div>

    <table>
        <thead>
            <tr>
                <th>Resident</th>
                <th>Months Behind</th>
                <th>Overdue Months</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($residents as $resident) <!-- Change here -->
                <tr>
                    <td>{{ $resident->user->firstname }} {{ $resident->user->lastname }}</td>
                    <td>{{ $resident->bills->count() }}</td>
                    <td>
                        @foreach ($resident->bills as $bill)
                            {{ \Carbon\Carbon::parse($bill->due_date)->format('F Y') }}@if (!$loop->last), @endif
                        @endforeach
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
