import React, { useState } from 'react';
import FilePage from './FilePage';
import styles from './Files.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 

const HousePermit = () => {
    const [housePermitData, sethousePermitData] = useState([
        { name: 'Sakura Haruno', permit: '101', status: 'HARD COPY' },
        { name: 'Kakashi Hatake', permit: '104', status: 'SOFT COPY' },
        { name: 'Sasuke Uchiha', permit: '102', status: 'HARD COPY' },
        { name: 'Naruto Uzumaki', permit: '105', status: 'HARD COPY' },
        { name: 'Hinata Hyuga', permit: '106', status: 'SOFT COPY' },
        { name: 'Shikamaru Nara', permit: '107', status: 'HARD COPY' },
        { name: 'Ino Yamanaka', permit: '108', status: 'SOFT COPY' },
        { name: 'Choji Akimichi', permit: '109', status: 'HARD COPY' },
        { name: 'Tenten', permit: '110', status: 'HARD COPY' },
        { name: 'Neji Hyuga', permit: '111', status: 'SOFT COPY' },
        { name: 'Rock Lee', permit: '112', status: 'HARD COPY' },
        { name: 'Gaara', permit: '113', status: 'SOFT COPY' },
        { name: 'Temari', permit: '114', status: 'HARD COPY' },
        { name: 'Kankuro', permit: '115', status: 'SOFT COPY' },
        { name: 'Jiraiya', permit: '116', status: 'HARD COPY' }
    ]);

    const fileArray = (array, fileArray) => {
        const result = [];
        for (let i = 0; i < array.length; i += fileArray) {
            result.push(array.slice(i, i + fileArray));
        }
        return result;
    };

    const table = fileArray(housePermitData, 5);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <FilePage>
            <Slider {...settings}>
                {table.map((slide, slideIndex) => (
                    <div className={styles.slideContainer} key={slideIndex}>
                        <div className={styles.housePermitContainer}>
                            <div className={styles.headerContainer}>
                                <div className={styles.housePermitHeader}>Full Name</div>
                                <div className={styles.housePermitHeader}>Permit No</div>
                                <div className={styles.housePermitHeader}>Status</div>
                                <div className={styles.housePermitHeader}>Actions</div>
                            </div>
                            {slide.map((housePermitData, index) => (
                                <div className={styles.outputContainer} key={index}>
                                    <div className={styles.outputFile}>{housePermitData.name}</div>
                                    <div className={styles.outputFile}>{housePermitData.permit}</div>
                                    <div className={styles.outputFile}>{housePermitData.status}</div>
                                    <div className={`${styles.outputFile} ${styles.actions}`}>
                                        <button className={styles.editButton}>Message</button>
                                        <button className={styles.deleteButton}>Notify</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </Slider>
        </FilePage>
    );
};

export default HousePermit;
