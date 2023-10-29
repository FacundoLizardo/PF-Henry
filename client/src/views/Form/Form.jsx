/* eslint-disable */
import { useState, useEffect } from "react";
import { sendData } from "../../utils/postCreateCourse";
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
	const [imagePath, setImagePath] = useState("");
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

	const [course, setCourse] = useState({
		title: "",
		description: "",
		instructor_id: id,
		category: "",
		image: "",
		price: "",
	});

	console.log(course);

	useEffect(() => {
		setCategoriesData(JSON.parse(localStorage.getItem("categoriesData")));
	}, []);

	const uploadImage = async () => {
		const nombreCurso = document.getElementById("title").value;
		const imageRef = ref(storage, `courses/${nombreCurso}/${file.name}`);

		await uploadBytes(imageRef, file);

		const downloadURL = await getDownloadURL(imageRef);

		setImagePath(downloadURL);
		handlerPathImage(imagePath);

		return downloadURL;
	};

	const eTargetImgFile = (e) => {
		const imageUpload = e.target.files[0];
		setFile(imageUpload);
		console.log(file);
	};

	const handlerPathImage = async (newPath) => {
		setCourse({ ...course, image: `${newPath}` });
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setCourse({ ...course, [name]: value });
		console.log(course);
		console.log(file);
	};

	const onSubmit = async (course) => {
		await uploadImage();
		sendData(course)
			.then(() => console.log("Data sent successfully:"))
			.catch(() => console.log("Error on the promise"))
			.finally(setLoading(false));
		await getAllCourses();
		navigate("/courses");
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
									onInput={handleChange}></textarea>
								<p className={style.input__description}>{}</p>
								<label className={style.input__label}>Categoria:</label>
								<select
									className={style.input__field}
									id="category"
									name="category"
									defaultValue="categorias"
									value={course.category}
									onInput={handleChange}>
									<option name="categorias">Categorias:</option>
									{categoriesData?.map((category, index) => (
										<option key={index}>{category.name}</option>
									))}
								</select>
								<p className={style.input__description}>{}</p>
								<label className={style.input__label}>Imagen:</label>
								<input
									className={style.input__field}
									type="file"
									id="image"
									onChange={eTargetImgFile}
								/>
								<p className={style.input__description}>{}</p>
								<label className={style.input__label}>Precio</label>
								<input
									className={style.input__field}
									type="number"
									step="0.01"
									id="price"
									name="price"
									value={course.price}
									onInput={handleChange}
								/>
								<p className={style.input__description}>{}</p>
							</div>
						</div>
						<div className={style.modal__footer}>
							<Button
								text={"Crear curso"}
								className={style.button}
								onClick={() => onSubmit(course)}
							/>
						</div>
					</div>
				</div>
			)}
			{loading && <div className="loader"></div>}
		</>
	);
};

export default Form;
