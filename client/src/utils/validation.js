export const validation = (props) => {
    let errors = {}

    if (!props.title) {
        errors.title = "El nombre es obligatorio.";
    } else if (props.title.length < 3) {
        errors.title = "Debe tener al menos 3 caracteres.";
    }

    if (!props.description) {
        errors.description = "Debe ingresar una breve descripción del curso.";
    } else if (props.description.length < 20) {
        errors.description = "La descripción debe tener al menos 20 caracteres.";
    }

    if (!props.category) {
        errors.category = "Debe ingresar una categoría relacionada con el curso.";
    }

    if (!props.image) {
        errors.image = "Debe ingresar una imagen relacionada con el curso.";
    }

    if (!props.price) {
        errors.price = "El precio es obligatorio.";
    } else if (props.price.length < 0.50) {
        errors.price = "Debe ser superior a US$ 0.50.";
    }

    return errors
}