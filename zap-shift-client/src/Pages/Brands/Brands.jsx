import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import amazon from "../../assets/brands/amazon.png";
import amazon_vectoe from "../../assets/brands/amazon_vector.png";
import casio from "../../assets/brands/casio.png";
import moonstar from "../../assets/brands/moonstar.png";
import randstand from "../../assets/brands/randstad.png";
import star from "../../assets/brands/star.png";
import star_people from "../../assets/brands/start_people.png";
const brandLogos = [
  amazon,
  amazon_vectoe,
  casio,
  moonstar,
  randstand,
  star,
  star_people,
];
const Brands = () => {
  return (
    <Swiper
      loop={true}
      
      autoplay={{
        delay:1000,
        disableOnInteraction:false
      }}
      slidesPerView={3}
      grabCursor={true}
      spaceBetween={30}
      centeredSlides={true}
      
      pagination={{
        clickable: true,
      }}
      modules={[Pagination,Autoplay]}
      className="mySwiper"
    >
      {brandLogos.map((logo, index) => (
        <SwiperSlide key={index}>
          <img src={logo} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;
