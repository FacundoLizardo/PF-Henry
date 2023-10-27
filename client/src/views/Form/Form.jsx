/* eslint-disable */
import { useState, useEffect } from "react";
import { sendData } from "../../utils/postCreateCourse";
import { storage } from "../../firebase/firebase";
import style from "./Form.module.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Form = () => {
	const navigate = useNavigate();
	const [categoriesData, setCategoriesData] = useState([]);
	const [imagePath, setImagePath] = useState("");
	const [course, setCourse] = useState({
		title: "",
		description: "",
		instructor_id: "ab518b48-1a30-4d10-b525-479167e4fdd4",
		category: "",
		image: "",
	});

	useEffect(() => {
		setCategoriesData(JSON.parse(localStorage.getItem("categoriesData")));
	}, []);

	const uploadImage = async (imageUpload) => {
		const nombreCurso = document.getElementById("title").value;
		const imageRef = ref(storage, `courses/${nombreCurso}/${imageUpload.name}`);
		await uploadBytes(imageRef, imageUpload);
		const downloadURL = await getDownloadURL(imageRef);
		setImagePath(downloadURL);
		return downloadURL;
	};

	const handleUploadImage = async (e) => {
		const imageUpload = e.target.files[0];
		const newPath = await uploadImage(imageUpload);
		setCourse({ ...course, image: `${newPath}` });
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setCourse({ ...course, [name]: value });
		console.log(course);
		console.log(imagePath);
		//getId();
	};
	const onSubmit = async (course) => {
		await sendData(course);
		navigate("/courses");
	};
	return (
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
							value={course.category}
							onInput={handleChange}>
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
							onChange={handleUploadImage}
						/>
						<p className={style.input__description}>{}</p>
					</div>
				</div>
				<div className={style.modal__footer}>
					<button className={style.button} onClick={() => onSubmit(course)}>
						Create project
					</button>
				</div>
			</div>
		</div>
	);
};

export default Form;
