import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Styles from "./EditCourse.module.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditCourse = () => {
	const { id } = useParams();
	const [newDataCourse, setNewDataCourse] = useState({
		title: "",
		description: "",
		instructor_id: id,
		category: "",
		image: "",
		price: 0,
	});
	const [oldDataCourse, setOldDataCourse] = useState({});
	const [categoriesData, setCategoriesData] = useState([]);
	const [loading, setLoading] = useState(false);

	const image = document.getElementById("image");
	// const imageFile = image.files[0];
	//const nombreCurso = document.getElementById("title").value;

	console.log(image.files);

	useEffect(() => {
		const allCourses = JSON.parse(localStorage.getItem("coursesData"));
		setOldDataCourse(...allCourses.filter((i) => i.id === id));
		const categoriesData = JSON.parse(localStorage.getItem("categoriesData"));
		setCategoriesData([
			...new Set(categoriesData.map((category) => category.name)),
		]);
	}, []);

	const uploadImage = async () => {
		const image = document.getElementById("image");
		const imageFile = image.files[0];
		const nombreCurso = document.getElementById("title").value;
		const imageRef = ref(storage, `courses/${nombreCurso}/${imageFile.name}`);
		await uploadBytes(imageRef, imageFile);
		const path = await getDownloadURL(imageRef);
		setNewDataCourse({ ...newDataCourse, image: `${path}` });
		return path;
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setNewDataCourse({ ...newDataCourse, [name]: value });
	};

	console.log(newDataCourse);

	const onSubmit = async () => {
		if (newDataCourse.title === "") {
			setNewDataCourse({ ...newDataCourse, title: oldDataCourse.title });
		}
		if (newDataCourse.description === "") {
			setNewDataCourse({
				...newDataCourse,
				description: oldDataCourse.description,
			});
		}
		if (newDataCourse.category === "") {
			setNewDataCourse({ ...newDataCourse, category: oldDataCourse.category });
		}
		if (newDataCourse.price === 0) {
			setNewDataCourse({ ...newDataCourse, price: oldDataCourse.price });
		}
		if (image.files.length === 0 && newDataCourse.image === "") {
			setNewDataCourse({ ...newDataCourse, image: oldDataCourse.image });
		}

		try {
			const imagePath = await uploadImage();

			setNewDataCourse({ ...newDataCourse, image: imagePath });
			// 	// setCourse((prevCourse) => {
			// 	// 	return {
			// 	// 		...prevCourse,
			// 	// 		image: imagePath,
			// 	// 	};
			// 	// })
			// 	const response = await axios.post("/courses/create", {
			// 		...course,
			// 		image: imagePath,
			// 	});

			// 	await getAllCourses();

			// 	if (response.data) {
			// 		Swal.fire({
			// 			title: "Tu curso se creo correctamente!",
			// 			text: "Dirigete a la lista de cursos, ahi podras verlo.",
			// 			icon: "success",
			// 			confirmButtonText: "LISTA DE CURSOS",
			// 		}).then(() => navigate(`/courses`));
			// 	}
		} catch (error) {
			Swal.fire({
				title: "Falta informacion importante!",
				text: "Por favor revisa y completa todos los campos.",
				icon: "warning",
				confirmButtonText: "INTENTARLO NUEVAMENTE",
			});
		} finally {
			setLoading(false);
		}
	};

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
								defaultValue={oldDataCourse.title}
								onChange={handleChange}
							/>
							<p className={Styles.input__description}>{}</p>
							<label className={Styles.input__label}>Descripcion</label>
							<textarea
								id="description"
								name="description"
								className={Styles.input__field}
								maxLength={300}
								defaultValue={oldDataCourse.description}
								onChange={handleChange}
							></textarea>
							<p className={Styles.input__description}>{}</p>
							<label className={Styles.input__label}>Categorias</label>
							<select
								className={Styles.input__field}
								id="category"
								name="category"
								defaultValue={oldDataCourse.category}
								onInput={handleChange}
							>
								<option value={oldDataCourse.category}>
									{oldDataCourse.category}
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
							<label className={Styles.input__label}>
								Puedes subir una imagen nueva si asi lo deseas, en caso
								contrario se mantendra la imagen anterior
							</label>

							<input className={Styles.input__field} type="file" id="image" />

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
										min="0.00"
										max="9999.99"
										defaultValue={oldDataCourse.price}
										onChange={handleChange}
									/>
								</div>
								<p className={Styles.input__description}>{""}</p>
								<button
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
