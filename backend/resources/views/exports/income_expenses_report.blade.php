<!DOCTYPE html>
<html>
<head>
    <style>
        .data-table {
            width: 100%;
            border-collapse: collapse;
        }

        .data-table th, .data-table td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }

        .data-table th {
            background-color: #f2f2f2;
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
    @include('partials.header', ['headerData' => $headerData])

    <table class="data-table">
        <thead>
            <tr>
                <th colspan="2">Income and Expenses Report</th>
            </tr>
            <tr>
                <th>Month:</th>
                <td>{{ $month }}</td>
            </tr>
            <tr>
                <th>Year:</th>
                <td>{{ $year }}</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th colspan="2">Income</th>
            </tr>
            @foreach ($incomeData as $income)
            <tr>
                <td>{{ $income['category'] }}</td>
                <td>{{ number_format($income['amount'], 2) }}</td>
            </tr>
            @endforeach

            <tr>
                <th colspan="2">Expenses</th>
            </tr>
            @foreach ($expenseData as $expense)
            <tr>
                <td>{{ $expense['category'] }}</td>
                <td>{{ number_format($expense['amount'], 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <div class="footer">
        <div class="prepared-by">
            <p>PREPARED BY:</p>
            <div class="signature">
                <div class="line"></div>
                <p>HOA TREASURER</p>
            </div>
        </div>
    </div>
</body>
</html>
