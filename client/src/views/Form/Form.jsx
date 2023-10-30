/* eslint-disable */
import axios from "axios";
import { useState, useEffect } from "react";
import { storage } from "../../firebase/firebase";
import style from "./Form.module.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { getAllCourses } from "../../utils/getAllCourses";

const Form = () => {
	const navigate = useNavigate();
	const id = useParams().id;
	const [categoriesData, setCategoriesData] = useState([]);
	const [price, setPrice] = useState(0.0);
	const [loading, setLoading] = useState(false);
	const [course, setCourse] = useState({
		title: "",
		description: "",
		instructor_id: id,
		category: "",
		image: "",
		price: price,
	});

	console.log(course);

	useEffect(() => {
		setCategoriesData(JSON.parse(localStorage.getItem("categoriesData")));
	}, []);

	const uploadImage = async () => {
		const image = document.getElementById("image");
		const imageFile = image.files[0];
		const nombreCurso = document.getElementById("title").value;
		const imageRef = ref(storage, `courses/${nombreCurso}/${imageFile.name}`);
		await uploadBytes(imageRef, imageFile);
		const path = await getDownloadURL(imageRef);
		setCourse({ ...course, image: `${path}` });

		return path;
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setCourse({ ...course, [name]: value });
	};

	const onSubmit = async () => {
		setLoading(true);

		try {
			const imagePath = await uploadImage();

			setCourse((prevCourse) => {
				return {
					...prevCourse,
					image: imagePath,
				};
			});

			const response = await axios.post("/courses/create", {
				...course,
				image: imagePath,
			});

			await getAllCourses();

			if (response.data) {
				alert("Se creo correctamente el curso.");
			}
		} catch (error) {
			console.error("Error al crear el curso:", error);
		} finally {
			setLoading(false);
			navigate("/courses/");
		}
	};

	return (
		<>
			{!loading && (
				<div className={style.container}>
					<div className={style.modal}>
						<div className={style.modal__header}>
							<span className={style.modal__title}>Nuevo Curso</span>
						</div>
						<div className={style.modal__body}>
							<div className={style.input}>
								<label className={style.input__label}>Nombre del curso</label>
								<input
									className={style.input__field}
									type="text"
									id="title"
									name="title"
									value={course.title}
									onInput={handleChange}
								/>
								<p className={style.input__description}>{}</p>
								<label className={style.input__label}>Descripcion</label>
								<textarea
									id="description"
									name="description"
									value={course.description}
									className={style.input__field}
									onInput={handleChange}
								></textarea>
								<p className={style.input__description}>{}</p>
								<label className={style.input__label}>Categoria:</label>
								<select
									className={style.input__field}
									id="category"
									name="category"
									defaultValue="categorias"
									value={course.category}
									onInput={handleChange}
								>
									<option name="categorias">Categorias:</option>
									{categoriesData
										?.sort((a, b) => {
											const nameA = a.name.toUpperCase();
											const nameB = b.name.toUpperCase();

											if (nameA < nameB) {
												return -1;
											}
											if (nameA > nameB) {
												return 1;
											}
											return 0;
										})
										.map((category, index) => (
											<option key={index}>{category.name}</option>
										))}
								</select>
								<p className={style.input__description}>{}</p>
								<label className={style.input__label}>Imagen:</label>
								<input className={style.input__field} type="file" id="image" />
								<p className={style.input__description}>{}</p>
								<div className={style.fieldPrice_Send}>
									<div className={style.priceField}>
										<label className={style.input__label}>Precio: </label>
										<input
											className={style.input__price}
											type="number"
											step="0.01"
											defaultValue={price.toFixed(2)}
											id="price"
											name="price"
											min="0.00"
											max="9999.99"
											onInput={handleChange}
										/>
									</div>
									<p className={style.input__description}>{}</p>
									<Button
										text={"Crear curso"}
										onClick={() => onSubmit(course)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{loading && (
				<div className={style.container}>
					<div className={style.loader}></div>
				</div>
			)}
		</>
	);
};

export default Form;
