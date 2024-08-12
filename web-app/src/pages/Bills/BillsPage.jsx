import React from 'react';
import Container from '../../components/Container/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { PieChart } from '@mui/x-charts/PieChart';
import styles from './Bills.module.css';

const BillsPage = ({ children }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.billsContainer}>
        <div className={styles.logoMiddle}>
          <img src='/Logo-D.svg' alt='logo' className={styles.logoClass} />
        </div>
        <div className={styles.pieSection}>
        <div className={styles.pieColumn}>
          <div className={styles.pieTitle}>MONTHLY REPORTS</div>
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
                        { id: 0, value: 20 },
                        { id: 1, value: 30 },
                        { id: 2, value: 40 },
                        { id: 3, value: 10}
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
          <div className={styles.pieTitle}>ANNUAL REPORTS</div>
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
          <div className={styles.pieTitle}>YEARLY REPORTS</div>
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
        <div className={styles.billsButtons}>
          <button className={styles.billsButton}>MONTHLY DUES</button>
          <button className={styles.billsButton}>BASKETBALL COURT</button>
          <button className={styles.billsButton}>MULTI PURPOSE HALL</button>
        </div>
      </div>
    </div>
  );
}

export default BillsPage;
