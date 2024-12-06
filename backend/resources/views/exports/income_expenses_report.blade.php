<table>
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
            <td>{{ $income['category'] }}</td> <!-- Use array syntax -->
            <td>{{ number_format($income['amount'], 2) }}</td> <!-- Use array syntax -->
        </tr>
        @endforeach

        <tr>
            <th colspan="2">Expenses</th>
        </tr>
        @foreach ($expenseData as $expense)
        <tr>
            <td>{{ $expense['category'] }}</td> <!-- Use array syntax -->
            <td>{{ number_format($expense['amount'], 2) }}</td> <!-- Use array syntax -->
        </tr>
        @endforeach
    </tbody>
</table>
