export const validation = (props) => {
    let errors = {}

    if (!props.title) {
        errors.title = "El nombre es obligatorio.";
    } else if (props.title.length < 3) {
        errors.title = "Debe tener al menos 3 letras";
    } else if (props.title.length > 70) {
        errors.title = "Debe tener menos de 70 letras.";
    }

    return errors
}