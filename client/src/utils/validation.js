export const validation = (props) => {
	let errors = {};

	if (!props.title) {
		errors.title = "El nombre es obligatorio.";
	} else if (props.title.length < 3) {
		errors.title = "Debe tener al menos 3 caracteres.";
	}

	if (!props.description) {
		errors.description = "Debe ingresar una breve descripción del curso.";
	} else if (props.description.length < 20) {
		errors.description = "La descripción debe tener al menos 20 caracteres.";
	} else if (props.description.length > 90) {
		errors.description = "La descripción debe tener menos de 80 caracteres.";
	}

	if (!props.category) {
		errors.category = "Debe ingresar una categoría relacionada con el curso.";
	}

	if (!props.price) {
		errors.price = "El precio es obligatorio.";
	} else if (parseFloat(props.price) < 0.5) {
		errors.price = "Debe ser superior a US$ 0,50.";
	} else if (props.price.indexOf('.') !== -1) {
		props.price = props.price.replace(/\./g, ',');
	}

	return errors;
};

export const validationLesson = (props) => {
	let errors = {};

	if (!props.title) {
		errors.title = "El nombre es obligatorio.";
	} else if (props.title.length < 3) {
		errors.title = "Debe tener al menos 3 caracteres.";
	}

	if (!props.description) {
		errors.description = "Debe ingresar una breve descripción de la leccion.";
	} else if (props.description.length < 20) {
		errors.description = "La descripción debe tener al menos 20 caracteres.";
	}

	if (!props.section || props.section === "Seccion:") {
		errors.section = "Debe ser una de las secciones del listado.";
	} else if (props.section === 0 || props.section < 1) {
		errors.section = "Las secciones inician desde la seccion 1";
	}

	if (!props.video_url || props.video_url === "") {
		errors.video_url = "Debe cargarse un video.";
	}

	return errors;
};
