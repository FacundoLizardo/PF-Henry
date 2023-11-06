import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import Styles from "./DetailCourse.module.css";
import Button from "../../Components/Button/Button";

const DetailCourse = () => {
	const { id } = useParams();
	const [dataDetail, setDataDetail] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`/courses/${id}`)
			.then((response) => {
				setDataDetail(response.data);
				window.scrollTo(0, 0);
			})
			.catch((error) => {
				console.error("Error al cargar los datos del curso", error);
			});
	}, [id]);

	return (
		<div className={Styles.detailCourseContainer}>
			<div>
				{dataDetail && (
					<>
						<h1>{dataDetail.title}</h1>
						<div className={Styles.detailContentTop}>
							<div className={Styles.imageContainer}>
								{dataDetail.image && (
									<img
										src={dataDetail.image}
										alt={dataDetail.title}
										className={Styles.courseImage}
									/>
								)}
							</div>
							<div className={Styles.descriptionContainer}>
								{dataDetail.description}
							</div>
						</div>
						<div className={Styles.detailContentBottom}>
							<div className={Styles.classContainer}>
								<h4>Clase 1</h4>
								<p>01:25</p>
							</div>
							<div className={Styles.classContainer}>
								<h4>Clase 2</h4>
								<p>01:42</p>
							</div>
							<div className={Styles.classContainer}>
								<h4>Clase 3</h4>
								<p>01:10</p>
							</div>
							<div className={Styles.classContainer}>
								<h4>Clase 4</h4>
								<p>00:50</p>
							</div>
							<div className={Styles.classContainer}>
								<h4>Clase 5</h4>
								<p>01:15</p>
							</div>
							<div className={Styles.classContainer}>
								<h4>Clase 6</h4>
								<p>01:25</p>
							</div>
						</div>
						<div className={Styles.buttonsContainer}>
							<Button
								text={"Volver"}
								className={Styles.button}
								onClick={() => navigate(-1)}
							/>
							<Button text={"Agregar al carrito"} className={Styles.button} />
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default DetailCourse;

{
	/* <div className={Styles.classContainer}>
              {dataDetail.lessons ? (
                dataDetail.lessons.map((lesson, index) => (
                  <div key={lesson.lesson_id} className={Styles.classItem}>
                    <div className={Styles.classItemTitle}>{lesson.title}</div>
                    <div>{lesson.duration}</div>
                  </div>
                ))
              ) : (
                <p>No se encontraron lecciones para este curso.</p>
              )}
            </div> */
}
