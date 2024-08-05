import React from 'react'
import Layout from '../../components/Layout/Layout'
import "./Home.css"

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';


const data2 = [

  { label: 'B1', value: 150, color: "#99cc00" },
  { label: 'B2', value: 100, color: "#00aeef" },
  { label: 'A2', value: 30, color: "#ff7f00" },
  { label: 'A1', value: 40, color: "#ff4c4c" },

];
const series = [
  {
    innerRadius: 80,
    outerRadius: 120,
    id: 'series-2',
    data: data2,
  },
];


const Homepage = () => {


  return (
    <Layout>
      <div>
        <div className={'logoMiddle'}>
          <img src='/Logo-D.svg' alt='logo' className='logoClass' />
        </div>
        <div className='reportSection'>
          <div>
            <div className='reportTitle'>MONTHLY REPORTS</div>
            <div className='reportList'>

              <div>
                <div className='reportlistmenu'>USER MONTHLY REPORTS:</div>
                <span className='box'></span>
              </div>
              <div>
                <div className='reportlistmenu'>PAYMENTS MONTHLY REPORTS:</div>
                <span className='box'></span>
              </div>
              <div>
                <div className='reportlistmenu'>AMENITIES MONTHLY REPORTS:</div>
                <span className='box'></span>
              </div>

            </div>
          </div>
          <div className='barClass'>
            <BarChart
            xAxis={[{ scaleType: 'band', data: ['Monthly Reports'] }]}
            series={[{ data: [500] }, { data: [250] }, { data: [100] }]}
            width={420}
            height={225}
            />
          </div>
        </div>
        <div className='pieSection'>
          <div className='piecolumn'>
            <div className='pie-title'>USERS REPORTS</div>
            <div className='pie-img bg-white'>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 0, md: 4 }}
                sx={{ width: '100%' }}
              >
              <Box sx={{ flexGrow: 1 }}>
                <PieChart
                  series={[
                    {
                    data: [
                      { id: 0, value: 10},
                      { id: 1, value: 15},
                      { id: 2, value: 20},
                      ],
                    },
                  ]}
                  width={360}
                  height={250}
                />{' '}
                </Box>
              </Stack>
            </div>
          </div>
          <div className='piecolumn'>
            <div className='pie-title'>PAYMENTS REPORTS</div>
            <div className='pie-img bg-white'>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 0, md: 4 }}
                sx={{ width: '100%' }}
              >
                <Box sx={{ flexGrow: 1 }}>
                <PieChart
                  series={[
                    {
                    data: [
                      { id: 0, value: 10},
                      { id: 1, value: 15},
                      { id: 2, value: 20},
                      { id: 3, value: 25},
                      ],
                    },
                  ]}
                  width={360}
                  height={250}
                />{' '}
                </Box>
              </Stack>
            </div>
          </div>
          <div className='piecolumn'>
            <div className='pie-title'>AMENITIES REPORTS</div>
            <div className='pie-img bg-white'>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 0, md: 4 }}
                sx={{ width: '100%' }}
              >
                <Box sx={{ flexGrow: 1 }}>
                <PieChart
                  series={[
                    {
                    data: [
                      { id: 0, value: 10},
                      { id: 1, value: 15},
                      ],
                    },
                  ]}
                  width={360}
                  height={255}
                />{' '}
                </Box>
              </Stack>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </Layout>
  )
}

export default Homepage