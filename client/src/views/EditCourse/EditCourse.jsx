import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { storage } from "../../firebase/firebase";
import Styles from "./EditCourse.module.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from "../../Components/Button/Button";
import Swal from "sweetalert2";
import updateCourse from "../../utils/updateCourse";
import { getAllCourses } from "../../utils/getAllCourses";
import updateLesson from "../../utils/updateLesson";

const EditCourse = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const lessonsBySection = [];
	const image = document.getElementById("image");
	const [newDataCourse, setNewDataCourse] = useState({});
	const [categoriesData, setCategoriesData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [lessons, setLessons] = useState([]);
	const [newLessonValues, setNewLessonValues] = useState({
		id: "",
		title: "",
		description: "",
		video_url: "",
		duration: "",
		updatedAt: new Date().toLocaleString(),
		section: 0,
	});

	const updateAllLessonsData = () => {
		if (lessons) {
			lessons.forEach((lesson) => {
				const section = lesson.section - 1;

				if (!lessonsBySection[section]) {
					lessonsBySection[section] = [];
				}
				lessonsBySection[section].push(lesson);
			});
		}
	};

	const getData = () => {
		const course = JSON.parse(localStorage.getItem("coursesData")).filter(
			(i) => i.id === id
		)[0];

		console.log(course);

		const categoriesData = JSON.parse(localStorage.getItem("categoriesData"));
		setCategoriesData([
			...new Set(categoriesData.map((category) => category.name)),
		]);
		setNewDataCourse(course);
		setLessons(course.lesson);
	};

	console.log(newDataCourse);

	useEffect(() => {
		const fetchData = async () => {
			await getData(); // o cualquier otra lógica de carga de datos que necesites
			updateAllLessonsData(); // o cualquier otra lógica relacionada con la carga de datos
		};

		fetchData();
	}, []);

	console.log(newDataCourse);
	console.log(lessons);

	updateAllLessonsData();

	console.log(newDataCourse.lesson);
	console.log(lessons);
	console.log(lessonsBySection);
	const uploadImage = async () => {
		if (document.getElementById("image").files[0]) {
			const image = document.getElementById("image");
			const imageFile = image.files[0];
			const nombreCurso = document.getElementById("title").value;
			const imageRef = ref(storage, `courses/${nombreCurso}/${imageFile.name}`);
			await uploadBytes(imageRef, imageFile);
			const path = await getDownloadURL(imageRef);
			setNewDataCourse({ ...newDataCourse, image: `${path}` });
			return path;
		} else {
			return;
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setNewDataCourse({ ...newDataCourse, [name]: value });
	};

	const onSubmit = async (newDataCourse) => {
		const imagePath = await uploadImage();
		if (image.files.length === 1) {
			try {
				const response = await updateCourse({
					...newDataCourse,
					image: imagePath,
				});
				if (response) {
					Swal.fire({
						title: "Tu curso se modificó correctamente!",
						text: "Dirigete a la lista de cursos, ahi podras encontrar tu curso actualizado.",
						icon: "success",
						confirmButtonText: "Ir a cursos",
						customClass: {
							popup: "mySwal",
						},
					}).then(() => navigate(`/courses`));
				}
			} catch (error) {
				Swal.fire({
					title: "¡Error de imagen!",
					text: "Por .",
					icon: "warning",
					confirmButtonText: "Prueba de nuevo",
					customClass: {
						popup: "mySwal",
					},
				});
			}
		}
		const response = await updateCourse({ ...newDataCourse });
		getAllCourses();
		if (response) {
			Swal.fire({
				title: "¡Tu curso se modificó correctamente!",
				text: "Dirigete a la lista de cursos, ahí podras encontrar tu curso actualizado.",
				icon: "success",
				confirmButtonText: "Ir a cursos",
				customClass: {
					popup: "mySwal",
				},
			}).then(() => navigate(`/courses`));
		}
		setLoading(false);
	};

	const uploadVideo = async () => {
		const video = document.getElementById("video");
		const videoFile = video.files[0];
		const videoRef = ref(
			storage,
			`courses/${nombreCurso[0].title}/${lecture.title} - ${id}`
		);
		await uploadBytes(videoRef, videoFile);
		const path = await getDownloadURL(videoRef);
		if (path) {
			Swal.fire({
				title: "Tu video se cargo con exito!",
				icon: "success",
				confirmButtonText: "Continuar",
				customClass: {
					popup: "mySwal",
				},
			});
		}
		return path;
	};
	const handlerModifyLesson = async (string, id) => {
		console.log(string.id);
		console.log(id);
		let [lesson] = lessons.filter((i) => i.id === id);
		console.log(lesson);

		Swal.fire({
			title: "Modificar lección",

			html:
				`<p>Si no modifica un campo este mantendra su valor actual</p>` +
				'<label for="title" class="swal2-label">Nombre:</label>' +
				`<input id="title" class="swal2-input" placeholder=${lesson.title}>` +
				'<label for="description" class="swal2-label" >Descripción:</label>' +
				`<textarea id="description" class="swal2-input-description" maxLength="300" rows="6" cols="50" placeholder=${lesson.description}></textarea>` +
				'<label for="section" class="swal2-label">Sección:</label>' +
				`<input id="section" class="swal2-input" placeholder=${lesson.section}>` +
				'<label for="section" class="swal2-label">Cargar nuevo video:</label>' +
				`<input id="video" type="file" class="swal2-input-video" >`,

			focusConfirm: false,
			confirmButtonText: "MODIFICAR",
			showCancelButton: true,
			customClass: {
				popup: "mySwalLesson",
			},
		}).then(async (result) => {
			if (!result.isConfirmed) {
				string.value = "";
			}
			if (result.isConfirmed) {
				// const videoPath = await uploadVideo();
				lesson.title = Swal.getPopup().querySelector("#title").value;
				lesson.description =
					Swal.getPopup().querySelector("#description").value;
				lesson.section = parseInt(
					Swal.getPopup().querySelector("#section").value
				);
				// lesson.video_url = videoPath;

				console.log(lesson);

				await updateLesson(lesson).then(
					await getAllCourses().then(
						getData(),
						updateAllLessonsData(),
						navigate(`localhost:5173/edit/${newDataCourse.id}`)
					)
				);
				string.value = "";
				Swal.fire({
					title: "Se modifico tu leccion con exito!",
					icon: "success",
					customClass: {
						popup: "mySwal",
					},
				});
			}
		});
	};
	console.log(newLessonValues);
	return (
		<>
			<div className={Styles.container}>
				<div className={Styles.modal}>
					<div className={Styles.modal__header}>
						<span className={Styles.modal__title}>Modifica tu curso</span>
					</div>
					<div className={Styles.modal__body}>
						<div className={Styles.input}>
							<label className={Styles.input__label}>Nombre del curso</label>
							<input
								className={Styles.input__field}
								type="text"
								id="title"
								name="title"
								maxLength={100}
								defaultValue={newDataCourse.title}
								onChange={handleChange}
							/>
							<p className={Styles.input__description}>{}</p>
							<label className={Styles.input__label}>Descripción</label>
							<textarea
								id="description"
								name="description"
								className={Styles.input__field}
								maxLength={300}
								defaultValue={newDataCourse.description}
								onChange={handleChange}
							></textarea>
							<p className={Styles.input__description}>{}</p>
							<label className={Styles.input__label}>Categorías</label>
							<select
								className={Styles.input__field}
								id="category"
								name="category"
								defaultValue={newDataCourse.category}
								onInput={handleChange}
							>
								<option value={newDataCourse.category}>
									{newDataCourse.category}
								</option>
								{categoriesData
									?.sort((a, b) => {
										const nameA = a.toUpperCase();
										const nameB = b.toUpperCase();

										if (nameA < nameB) {
											return -1;
										}
										if (nameA > nameB) {
											return 1;
										}
										return 0;
									})
									.map((category, index) => (
										<option key={index} value={category}>
											{category}
										</option>
									))}
							</select>
							<p className={Styles.input__description}>{}</p>
							<label className={Styles.input__label}>Miniatura del curso</label>
							<label className={Styles.input__label2}>
								Puedes subir una imagen nueva si asi lo deseas, en caso
								contrario se mantendra la imagen anterior
							</label>

							<input className={Styles.input__field} type="file" id="image" />

							<label className={Styles.input__label3}>
								Selecciona la clase que quieras modificar
							</label>
							<div>
								{" "}
								{lessonsBySection.map((section, i) => {
									return (
										<div>
											<label className={Styles.input__label2}>
												Lecciones de la sección {i + 1}:
											</label>
											<select
												key={i}
												id={`miSelect${i}`}
												className={Styles.input__field}
												onChange={() =>
													handlerModifyLesson(
														document.getElementById(`miSelect${i}`),
														document.getElementById(`miSelect${i}`).value
													)
												}
											>
												<option value={null}></option>
												{section.map((lesson) => {
													return (
														<option key={lesson.id} value={lesson.id}>
															{lesson.title}
														</option>
													);
												})}
											</select>
										</div>
									);
								})}
							</div>

							<p className={Styles.input__description}>{}</p>
							<div className={Styles.fieldPrice_Send}>
								<div className={Styles.priceField}>
									<label className={Styles.input__label}>Precio: US$ </label>
									<input
										className={Styles.input__price}
										type="number"
										step="0.01"
										id="price"
										name="price"
										min="0.50"
										max="9999.99"
										defaultValue={newDataCourse.price}
										onChange={handleChange}
									/>
								</div>
								<p className={Styles.input__description}>{""}</p>
								<Button
									text={"Modificar curso"}
									onClick={() => onSubmit(newDataCourse)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			{loading && (
				<div className={style.container}>
					<div className={style.loader}></div>
				</div>
			)}
		</>
	);
};

export default EditCourse;
