import { Box } from "@mui/material";
import Image from "next/image";
import SwiperCore, { A11y, Autoplay, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "../../assets/slider/banner1.jpg";
import slide2 from "../../assets/slider/banner2.jpg";
import slide3 from "../../assets/slider/banner3.jpg";
import slide4 from "../../assets/slider/banner4.jpg";

SwiperCore.use([Autoplay, EffectFade, A11y]);

function HomePageSlider(props) {
  return (
    <Box className="home-page-slider">
      <Swiper
        effect="fade"
        slidesPerView={1}
        speed={700}
        loop={true}
        autoplay={{ delay: 3000 }}
      >
        <SwiperSlide>
          <figure>
            <Image src={slide1} />
          </figure>
        </SwiperSlide>
        <SwiperSlide>
          <figure>
            <Image src={slide2} />
          </figure>
        </SwiperSlide>
        <SwiperSlide>
          <figure>
            <Image src={slide3} />
          </figure>
        </SwiperSlide>
        <SwiperSlide>
          <figure>
            <Image src={slide4} />
          </figure>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}

export default HomePageSlider;
