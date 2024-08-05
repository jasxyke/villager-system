import React from 'react'
import Layout from '../../components/Layout/Layout'
import "./Booking.css"
import Calendar from './Calendar'

const BookingPage = () => {
  return (
    <Layout>
      <div>
        <div className={'bookingMiddle'}>
          <img src='/Logo-D.svg' alt='logo' className='logoClass' />
        </div>
        <div className='notificationSection'>
          <div>
            <div className='notificationTitle'>PENDING BOOKING APPROVAL</div>
            <div className='notificationList'>
              {
                [...Array(5)].map((res, i) => (
                  <div className='notificationCard'>
                    <div className='notificationText'>Christian Dior : Basketball Court , 9:00 AM - 12:00 PM, June 29, 2023</div>
                    <div className='notificationButtons'>

                      <svg className='notificationIcon' viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M40 12L18 34L8 24" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                      <svg className='notificationIcon' viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36 12L12 36M12 12L36 36" stroke="#EC221F" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <div className='bookingButtons'>
          <button className='active'>MULTI-PURPOSE HALL</button>
          <button className='active'>BASKETBALL COURT</button>
        </div>
        <center>
          <Calendar />
        </center>
      </div>
      <br />
      <br />
    </Layout>
  )
}

export default BookingPage