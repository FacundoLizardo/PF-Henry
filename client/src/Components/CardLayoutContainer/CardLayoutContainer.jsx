import CardLayout from "../CardLayout/CardLayout";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Styles from "./CardLayoutContainer.module.css";

const responsive = {
  XXLarge: {
    breakpoint: { max: 4000, min: 1700 },
    items: 5,
  },
  XLarge: {
    breakpoint: { max: 1700, min: 1400 },
    items: 4,
  },
  Large: {
    breakpoint: { max: 1400, min: 992 },
    items: 3,
  },
  Medium: {
    breakpoint: { max: 992, min: 768 },
    items: 3,
  },
  Small: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  ExtraSmall: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CardLayoutContainer = ({ dataCourses }) => {
  return (
    <Carousel responsive={responsive}>
      {dataCourses.map((courses, index) => (
        <div key={index} className={Styles.CardLayoutContainer}>
          <CardLayout courses={courses} />
        </div>
      ))}
    </Carousel>
  );
};

export default CardLayoutContainer;
