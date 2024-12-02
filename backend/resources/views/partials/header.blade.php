<div class="header-container">
    <style>
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
    </style>
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
