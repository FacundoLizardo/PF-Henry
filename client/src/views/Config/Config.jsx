/* eslint-disable */
import Styles from "./Config.module.css";
import { userContext } from "../../App";
import { useContext, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { updateUser } from "../../utils/updateUser";
import { useNavigate } from "react-router-dom";

const Config = () => {
	const userData = useContext(userContext);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		user_name: "",
		first_name: userData?.first_name,
		last_name: userData?.last_name,
		birthdate: "",
		photoURL: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};
	const uploadImage = async () => {
		const image = document.getElementById("image");
		const imageFile = image.files[0];
		const nombreCurso = document.getElementById("title").value;
		const imageRef = ref(storage, `courses/${nombreCurso}/${imageFile.name}`);
		await uploadBytes(imageRef, imageFile);
		const path = await getDownloadURL(imageRef);
		setFormData({ ...formData, image: `${path}` });

		return path;
	};

	const handleSubmit = async (event) => {
		const response = await updateUser({ ...formData });

		if (response[0]) {
			navigate("/courses/");
		}

		setFormData({
			user_name: "",
			first_name: "",
			last_name: "",
			birthdate: "",
			photoURL: "",
		});
	};

	return (
		<div className={Styles.configContainer}>
			<h1>Configuración</h1>
			<div>
				<h5>Usuario n°: {userData?.id}</h5>
			</div>
			<div className={Styles.form_container}>
				<div className={Styles.form}>
					<h1 className={Styles.textHeader}>Perfil</h1>
					<div className={Styles.flex_column}>
						<div className={Styles.lastDates}>
							<div className={Styles.inputLabel}>
								<label>Nombre:</label>
								<input
									type="text"
									name="nombre"
									placeholder="Nombre"
									className={Styles.inputForm}
									onChange={handleChange}
									value={formData.nombre}
								/>
							</div>
							<div className={Styles.inputLabel}>
								<label>Apellidos:</label>
								<input
									type="text"
									name="apellidos"
									placeholder="Apellidos"
									className={Styles.inputForm}
									onChange={handleChange}
									value={formData.apellidos}
								/>
							</div>
						</div>
						<div className={Styles.lastDates}>
							<div className={Styles.inputLabel}>
								<label>Nombre de Usuario:</label>
								<input
									type="text"
									name="user_name"
									placeholder="Nombre de usuario"
									className={Styles.inputForm}
									onChange={handleChange}
									value={formData.user_name}
								/>
							</div>
							<div className={Styles.inputLabel}>
								<label>Fecha de Nacimiento:</label>
								<input
									type="date"
									name="fecha_nacimiento"
									className={Styles.inputDate}
									onChange={handleChange}
									value={formData.fecha_nacimiento}
								/>
							</div>
						</div>
					</div>

					<div className={Styles.flex_column1}>
						<label>Cambiar foto:</label>
						<input type="file" name="foto" className={Styles.inputFile} />
					</div>
					<div className={Styles.buttonFooter}>
						<button
							type="submit"
							className={Styles.button_submit}
							onClick={() => handleSubmit}>
							Actualizar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Config;
