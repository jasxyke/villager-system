import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from "./AnnouncementPage.module.css";
import mainLogo from "../../assets/logo.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AnnouncementPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [slides, setSlides] = useState([
        `Ilang oras na akong andito
        Umuwi na nga ang tropa ko
        Sino ba naman kasing mag-aakala
        Sa larawan ay matutulala?
        Sa likod ng tanawin
        Tila may tumatawag sa 'kin
        'Di ko na namalayan
        Papalapit na pala'ng hakbang
        'Di ko maiwasang pagmasdan ang 'yong larawan
        Kahit 'di mo mamalayan, ikaw lang ang gustong tignan
        'Di ko man masabi, kahit na 'di maaari
        Puwede ba 'kong manatili? Ikaw lang ang gustong pagmasdan
        Tinatawag ako ng 'yong anino
        Naririnig ko rin ang boses mo
        Hindi na nga nila ako maunawaan
        Nababaliw na raw sa simpleng larawan
        Maaari bang
        Manatili na lang sa museong ito?
        'Di ko na namalayan
        Biglang ayoko na lang lumisan
        'Di ko maiwasang pagmasdan ang 'yong larawan
        Kahit 'di mo mamalayan, ikaw lang ang gustong tignan
        'Di ko man masabi, kahit na 'di maaari
        Puwede ba 'kong manatili? Ikaw lang ang gustong pagmasdan
        Kay sarap pagmasdan
        Kahit na ilang araw, taon, at buwan
        Hindi man maintindihan ng iba
        Tila ako'y nakaramdam ng mahika
        'Di ko maiwasang pagmasdan ang 'yong larawan
        Kahit 'di mo mamalayan, ikaw lang ang gustong tignan
        'Di ko man masabi, kahit na 'di maaari
        Puwede ba 'kong manatili? Ikaw lang ang gustong pagmasdan`,
        `A flower is not a flower until they bloom
        Like my first time living life the day I met you
        Hate to think that humans have to die someday
        A thousand years won't do ooh
        No wonder I fell in love
        Even though I'm scared to love
        Baby I know the pain is unbearable
        There's no way
        Pinsala'y ikinamada
        Oh binibining may salamangka
        You've turned my limbics into a bouquet
        Ikaw ay tila sining sa museong 'di naluluma
        Binibini kong ginto hanggang kaluluwa
        Gonna keep you like the nu couché
        All my life
        At kung sa tingin mo na ang oras mo'y lumipas na
        Ako'y patuloy na mararahuyo sa ganda
        I'd still kiss you every single day
        All my life
        If I could paint a perfect picture
        Of the girl of my dreams with a curvy figure
        Voice of an angel like a symphony
        No doubt she's a masterpiece
        No matter the color you're beautiful
        You're one of a kind like a miracle
        Hindi ka papanaw hanggang huling araw
        Maging kabilang buhay ikaw ay ikaw
        No wonder I fell in love
        Even though I'm scared to love
        Baby I know the pain is unbearable
        There's no way
        Pinsala'y ikinamada
        Binibining may salamangka
        You've turned my limbics
        Into a bouquet
        Ikaw ay tila sining sa museong 'di naluluma
        Binibini kong ginto hanggang kaluluwa
        Gonna keep you like the nu couché
        All my life
        At kung sa tingin mo na ang oras mo'y lumipas na
        Ako'y patuloy na mararahuyo sa ganda
        I'd still kiss you every single day
        All my life
        At sa pagdating ng huling araw 'wag mag-alala
        Naramdama'y habang buhay nakamantsa
        That the world will never take away
        After life`,
        `Oh, eto ka na naman, umiiwas ng tingin
        Laging nakatanaw sa mga tala't nakadungaw sa bintana
        Kailan mo ba magagawang
        Italiwas sa dilim ang natatanging kagandahang
        Nababalot ng hiwagang humalina sa akin
        Kahit na ika'y hindi ko maintindihan?
        Nais masilayan ang iyong mga matang puno ng lihim at ng kislap
        Mananatili na nga lang bang isang estranghero
        O pagbibigyan ang puso kong natotorete sa 'yo?
        Hindi alam kung bakit ba 'ko nabighani sa iyo
        Hindi alam kung bakit ba gan'to, kahit na alam kong
        Mukhang wala rin naman itong patutunguhan
        At kahit pa ilaan lahat ng oras sa 'yo
        Hindi titigil hanggang ako na ang dahilan
        Ng 'yong ngiting misteryoso
        Oh, araw-araw na lang
        Akong bumubulong sa hangin (ha)
        Ilang awit pa ba ang isusulat?
        Wala na bang hangganan?
        Kailan mo ba mapapansin?
        Nais masilayan ang iyong mga matang puno ng lihim at ng kislap
        Mananatili na nga lang bang isang estranghero
        O pagbibigyan ang puso kong natotorete sa 'yo?
        Hindi alam kung bakit ba 'ko nabighani sa iyo
        Hindi alam kung bakit ba gan'to, kahit na alam kong
        Mukhang wala rin naman itong patutunguhan
        Kahit pa ilaan lahat ng oras sa 'yo
        Hindi titigil hanggang ako na ang dahilan
        Ng 'yong ngiting misteryoso
        Mga mata'y nagkatagpo habang naglalaban ang hiwaga ng liwanag at ng dilim
        Ngayong biglang napagtanto na ikaw na rin pala ay narahuyo
        'Di maipaliwanag kung bakit nabighani sa iyo
        Walang rason, walang "pero, " basta ito ay totoo
        'Di akalaing makakapiling ko ang isang katulad mo
        Tila isang engkantong laging hinahanap-hanap ko
        Oh giliw, tanging ikaw ang patutunguhan
        Kahit pa salungat ang aking oras sa 'yo
        'Di makapaniwalang ako na ang dahilan
        Ng 'yong ngiting misteryoso
        Da-ram, da-ra-ra-ram
        Misteryoso
        Oh, oh
        Misteryoso`
    ]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(null);
    const [newSlideContent, setNewSlideContent] = useState("");

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
  };

  const handleEditButtonClick = (index) => {
      setCurrentSlideIndex(index);
      setIsEditing(true);
  };

  const handleSlideContentChange = (newContent) => {
      if (currentSlideIndex !== null) {
          const updatedSlides = [...slides];
          updatedSlides[currentSlideIndex] = newContent;
          setSlides(updatedSlides);
      }
  };

  const handleAddButtonClick = () => {
      setIsAdding(true);
  };

  const handleNewSlideContentChange = (e) => {
      setNewSlideContent(e.target.value);
  };

  const handleAddNewSlide = () => {
      if (newSlideContent.trim() !== "") {
          setSlides([...slides, newSlideContent]);
          setNewSlideContent("");
          setIsAdding(false);
      }
  };

  const handleModalClose = () => {
      setIsEditing(false);
      setIsAdding(false);
      setCurrentSlideIndex(null);
  };

  const handleSaveChanges = () => {
      handleModalClose();
  };

  return (
      <div className={styles.mainContainer}>
          <div className={styles.announcementContainer}>
              <div className={styles.logoContainer}>
                  <img src={mainLogo} alt="Main Logo" className={styles.mainLogo} />
              </div>
              <div className={styles.announcementButtons}>
                  <button className={styles.announcementButton}>Previous</button>
                  <button className={styles.announcementButton}>Assigned</button>
                  <button 
                      className={styles.announcementButton}
                      onClick={handleAddButtonClick}
                  >
                      Add
                  </button>
              </div>
              <div className={styles.remindersContainer}>
                  <div className={styles.remindersHeader}>
                      <div className={styles.txtReminder}>REMINDER</div>
                  </div>
                  <div className={styles.reminderSlider}>
                      <Slider {...settings}>
                          {slides.map((slide, index) => (
                              <div className={styles.sliderContainer} key={index}>
                                  <div className={styles.sliderContent}>
                                      <p>{slide}</p>
                                      <button 
                                          className={styles.editButton}
                                          onClick={() => handleEditButtonClick(index)}
                                      >
                                          Edit Slide
                                      </button>
                                  </div>
                              </div>
                          ))}
                      </Slider>
                  </div>
              </div>
          </div>

          <Modal
              isOpen={isEditing}
              onRequestClose={handleModalClose}
              contentLabel="Edit Slide"
              className={styles.modal}
              overlayClassName={styles.overlay}
          >
              <h2>Edit Slide</h2>
              {currentSlideIndex !== null && (
                  <textarea
                      value={slides[currentSlideIndex]}
                      onChange={(e) => handleSlideContentChange(e.target.value)}
                      className={styles.editableTextArea}
                  />
              )}
              <button onClick={handleSaveChanges} className={styles.saveButton}>
                  Save
              </button>
              <button onClick={handleModalClose} className={styles.cancelButton}>
                  Cancel
              </button>
          </Modal>

          <Modal
              isOpen={isAdding}
              onRequestClose={handleModalClose}
              contentLabel="Add New Slide"
              className={styles.modal}
              overlayClassName={styles.overlay}
          >
              <h2>Add New Slide</h2>
              <textarea
                  value={newSlideContent}
                  onChange={handleNewSlideContentChange}
                  className={styles.editableTextArea}
                  placeholder="Enter new reminder content here..."
              />
              <button onClick={handleAddNewSlide} className={styles.saveButton}>
                  Add Slide
              </button>
              <button onClick={handleModalClose} className={styles.cancelButton}>
                  Cancel
              </button>
          </Modal>
      </div>
  );
};

export default AnnouncementPage;