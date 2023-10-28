import { Carousel } from "react-responsive-carousel";
import Styles from "./ProjectsCarrousel.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import image1 from "../../assets/imgCarrousel/img1.jpg";
import image2 from "../../assets/imgCarrousel/img2.jpg";
import image3 from "../../assets/imgCarrousel/img3.jpg";
import image4 from "../../assets/imgCarrousel/img4.jpg";
import image5 from "../../assets/imgCarrousel/img5.jpg";

const objSlides = [
  { image: image1 },
  { image: image2 },
  { image: image3 },
  { image: image4 },
  { image: image5 },
];

export const Carrousel = () => {
  return (
    <div id="projects" className={Styles.container}>
      <Carousel
        showStatus={false}
        animationHandler="fade"
        autoPlay={true}
        interval={2000}
        infiniteLoop={true}
        showThumbs={false}
      >
        {objSlides?.map((objSlide, index) => (
          <div key={index}>
            <img
              src={objSlide.image}
              alt={`Image ${index}`}
              className={Styles.imgContainer}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
