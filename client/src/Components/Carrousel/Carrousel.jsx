import { Carousel } from "react-responsive-carousel";
import style from "./ProjectsCarrousel.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "./img1.jpg"
import image2 from "./img2.jpg"

const objSlides = [{
	image:image1,
	
},
{
	image:image2
}
]

export const Carrousel = () => {
	return (
		<div id="projects" className={style.container}>
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
