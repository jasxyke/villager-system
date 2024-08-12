import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import styles from './Homepage.module.css';

const Homepage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.homepageContainer}>
      <div className={styles.logoMiddle}>
        <img src='/Logo-D.svg' alt='logo' className={styles.logoClass} />
      </div>
      <div className={styles.reportSection}>
        <div>
          <div className={styles.reportTitle}>MONTHLY REPORTS</div>
          <div className={styles.reportList}>
            <div>
              <div className={styles.reportlistmenu}>USER MONTHLY REPORTS:</div>
              <span className={styles.box}></span>
            </div>
            <div>
              <div className={styles.reportlistmenu}>PAYMENTS MONTHLY REPORTS:</div>
              <span className={styles.box}></span>
            </div>
            <div>
              <div className={styles.reportlistmenu}>AMENITIES MONTHLY REPORTS:</div>
              <span className={styles.box}></span>
            </div>
          </div>
        </div>
        <div className={styles.barClass}>
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['Monthly Reports'] }]}
            series={[{ data: [500] }, { data: [250] }, { data: [100] }]}
            width={420}
            height={225}
          />
        </div>
      </div>
      <div className={styles.pieSection}>
        <div className={styles.pieColumn}>
          <div className={styles.pieTitle}>USERS REPORTS</div>
          <div className={styles.pieImg}>
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
                        { id: 0, value: 10 },
                        { id: 1, value: 15 },
                        { id: 2, value: 20 },
                      ],
                    },
                  ]}
                  width={360}
                  height={250}
                />
              </Box>
            </Stack>
          </div>
        </div>
        <div className={styles.pieColumn}>
          <div className={styles.pieTitle}>PAYMENTS REPORTS</div>
          <div className={styles.pieImg}>
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
                        { id: 0, value: 10 },
                        { id: 1, value: 15 },
                        { id: 2, value: 20 },
                        { id: 3, value: 25 },
                      ],
                    },
                  ]}
                  width={360}
                  height={250}
                />
              </Box>
            </Stack>
          </div>
        </div>
        <div className={styles.pieColumn}>
          <div className={styles.pieTitle}>AMENITIES REPORTS</div>
          <div className={styles.pieImg}>
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
                        { id: 0, value: 10 },
                        { id: 1, value: 15 },
                      ],
                    },
                  ]}
                  width={360}
                  height={255}
                />
              </Box>
            </Stack>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Homepage;
