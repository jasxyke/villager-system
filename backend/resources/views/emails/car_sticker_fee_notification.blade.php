<!DOCTYPE html>
<html>
<head>
    <title>Car Sticker Request Fee Update</title>
</head>
<body>
    <h1>Hello {{ $stickerRequest->resident->user->firstname }},</h1>

    <p>Your car sticker request for the vehicle {{ $stickerRequest->car_model }} ({{ $stickerRequest->car_plate_number }}) has been updated.</p>

    <p>Please pay the following fees to continue with your sticker application: </p>
    
    <p><strong>Sticker Fee:</strong> {{ $stickerRequest->sticker_fee }}</p>
    <p><strong>Processing Fee:</strong> {{ $stickerRequest->processing_fee }}</p>

    @if($stickerRequest->note)
        <p><strong>Note:</strong> {{ $stickerRequest->note }}</p>
    @endif

    <p>Thank you for your patience!</p>
</body>
</html>
