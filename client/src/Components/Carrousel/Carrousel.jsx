/* eslint-disable */
import { Carousel } from "react-responsive-carousel";
import style from "./ProjectsCarrousel.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";

export const Carrousel = ({ objSlides }) => {
	return (
		<div id="projects" className={style.container}>
			<h1 className={style.__text_projects}>Mi Carrousel</h1>
			<Carousel showStatus={false} animationHandler="fade">
				{objSlides?.map((objSlide, index) => (
					<div key={index}>
						<img src={objSlide.image} />
					</div>
				))}
			</Carousel>
		</div>
	);
};
