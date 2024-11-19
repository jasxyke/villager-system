<!DOCTYPE html>
<html>
<head>
    <title>Report</title>
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
        .header {
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 20px;
            font-weight: bold;
        }
        .header p {
            margin: 5px 0;
            font-size: 12px;
        }
        .logo {
            position: absolute;
            top: 10px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #d1d5db; /* Placeholder color */
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
        .content p {
            font-size: 12px;
            margin: 0 0 20px;
        }
        .table-container {
            background-color: #4b6b47;
            color: white;
            padding: 20px;
            border-radius: 10px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
        }
        .table th, .table td {
            border: 1px solid #fff;
            padding: 8px;
            text-align: left;
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
            display: flex;
            align-items: center;
            margin-top: 10px;
        }
        .line {
            flex: 1;
            border-top: 2px solid #000;
            margin-right: 10px;
        }
        .certified {
            text-align: right;
        }
        .certified img {
            width: 80px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{ $associationName }}</h1>
            <p>{{ $address }}</p>
            <p>{{ $phone1 }} | {{ $phone2 }}</p>
            <p>{{ $email }}</p>
            <p>{{ $hlurbNumber }} | {{ $tin }}</p>
        </div>
        <div class="logo">
            <img src="{{ $logoUrl }}" alt="Logo" style="width: 100%; height: 100%; border-radius: 50%;">
        </div>
        <div class="divider"></div>
        <div class="content">
            <h2>{{ $reportTitle }}</h2>
            <p>{{ $reportDescription }}</p>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            @foreach ($columns as $column)
                                <th>{{ $column }}</th>
                            @endforeach
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($data as $row)
                            <tr>
                                @foreach ($columns as $columnKey)
                                    <td>{{ $row[$columnKey] ?? '' }}</td>
                                @endforeach
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
        <div class="footer">
            <div class="prepared-by">
                PREPARED BY:
                <div class="signature">
                    <div class="line"></div>
                    <span>HOA TREASURER</span>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
