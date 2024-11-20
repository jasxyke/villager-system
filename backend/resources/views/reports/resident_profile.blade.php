<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resident Profile Report</title>
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
        .header-container {
            width: 100%;
            text-align: center;
            border-bottom: 3px solid #4b5563;
            margin-bottom: 20px;
        }
        .header-container table {
            width: 100%;
            margin: 0 auto;
            border-spacing: 10px;
        }
        .header-container td {
            vertical-align: middle;
        }
        .logo {
            width: 100px;
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
        <div class="header-container">
            <table>
                <tr>
                    <td style="width: 100px;">
                        <img src="{{ $headerData['villageLogo'] }}" alt="Village Logo" class="logo">
                    </td>
                    <td class="header">
                        <h5>{{ $headerData['villageName'] }}</h5>
                        <p>{{ $headerData['address'] }}</p>
                        <p>{{ $headerData['phone1'] }} | {{ $headerData['phone2'] }}</p>
                        <p>{{ $headerData['email'] }}</p>
                        <p>{{ $headerData['hoaRegNum'] }}</p>
                        <p>TIN: {{ $headerData['tinNum'] }}</p>
                    </td>
                    <td style="width: 100px;">
                        <img src="{{ $headerData['cityLogo'] }}" alt="City Logo" class="logo">
                    </td>
                </tr>
            </table>
        </div>
        <div class="content">
            <h2>Resident Profile Report</h2>
        </div>
        <div class="table-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>Resident</th>
                        <th>Birthdate</th>
                        <th>Sex</th>
                        <th>Civil Status</th>
                        <th>Occupation Status</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($groupedResidents as $houseId => $group)
                        <tr>
                            <td colspan="3" style="text-align: center; font-weight: bold;">
                                House Block {{ $group['house']->block }} Lot {{ $group['house']->lot }}
                            </td>
                        </tr>
                        @foreach ($group['residents'] as $resident)
                            <tr>
                                <td>{{ $resident->user->firstname }} {{ $resident->user->lastname }}</td>
                                <td>{{ $resident->birthdate }}</td>
                                <td>{{ $resident->sex }}</td>
                                <td>{{ $resident->civil_status }}</td>
                                <td>{{ $resident->user->email }}</td>
                                <td>{{ $resident->user->email }}</td>
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
