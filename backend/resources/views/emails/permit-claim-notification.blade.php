<!DOCTYPE html>
<html>
<head>
    <title>Your Permit is Ready to Be Claimed</title>
    <style>
        /* Styling for the reference number */
        .reference-number {
            font-size: 1.5em;
            font-weight: bold;
            color: #2c3e50; /* Darker text color for emphasis */
            border: 2px dashed #3498db; /* Blue dashed border */
            padding: 10px;
            margin: 15px 0;
            display: inline-block;
        }

        /* General table styling */
        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 10px;
        }

        td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }

        td:first-child {
            font-weight: bold;
            text-align: right;
            width: 30%;
        }

        td:last-child {
            text-align: left;
        }
    </style>
</head>
<body>
    <h1>Hello, {{ $permitRequest->resident->user->firstname }} {{ $permitRequest->resident->user->lastname }}!</h1>

    <p>Your <strong>{{ $permitRequest->permit_type }}</strong> is ready to be claimed. Below are the details:</p>

    <!-- Highlighted Reference Number -->
    <div class="reference-number">
        Reference Number: {{ $permitRequest->reference_number }}
    </div>

    <!-- Other Details Table -->
    <table>
        <tr>
            <td>Purpose:</td>
            <td>{{ $permitRequest->purpose }}</td>
        </tr>
        <tr>
            <td>Permit Type:</td>
            <td>{{ $permitRequest->permit_type }}</td>
        </tr>
    </table>

    <p>Please bring a valid ID and your reference number when claiming your clearance.</p>

    <p>Thank you!</p>
</body>
</html>
