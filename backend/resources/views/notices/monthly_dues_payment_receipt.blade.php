@php
    $transactions = collect($transactions);
@endphp

@component('mail::message')
# Monthly Dues Payment Receipt

Hello {{ $resident->firstname }},

Your payment for the bill for **{{ date('F Y', strtotime($bill->due_date)) }}** has been received.

@component('mail::table')
| Reference No. | Amount Paid | Payment Method | Transaction Date |
|---------------|-------------|----------------|------------------|
@foreach ($transactions as $transaction)
| {{ $transaction->reference_number }} | {{ number_format($transaction->amount, 2) }} pesos | {{ ucfirst($transaction->payment_method) }} | {{ date('F d, Y', strtotime($transaction->transaction_date)) }} |
@endforeach
@endcomponent

**Total Paid:** {{ number_format($transactions->sum('amount'), 2) }} pesos  
**Balance Remaining:** {{ number_format($totalAmount - $transactions->sum('amount'), 2) }} pesos  
**Payment Status:** {{ $bill->status == 'paid' ? 'Paid' : 'Partial Payment' }}

Thank you for your payment!

Best Regards,  
{{ config('app.name') }}
@endcomponent
