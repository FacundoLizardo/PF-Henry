import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { storage } from "../../firebase/firebase";
import Styles from "./EditCourse.module.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from "../../Components/Button/Button";
import Swal from "sweetalert2";
import updateCourse from "../../utils/updateCourse";
import { getAllCourses } from "../../utils/getAllCourses";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newDataCourse, setNewDataCourse] = useState({});
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const image = document.getElementById("image");

  useEffect(() => {
    const allCourses = JSON.parse(localStorage.getItem("coursesData"));

    const categoriesData = JSON.parse(localStorage.getItem("categoriesData"));
    setCategoriesData([
      ...new Set(categoriesData.map((category) => category.name)),
    ]);
    setNewDataCourse(...allCourses.filter((i) => i.id === id));
  }, []);
  console.log(newDataCourse);
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
    console.log(newDataCourse);
  };

  const onSubmit = async (newDataCourse) => {
    console.log("estoy en on submit");
    const imagePath = await uploadImage();
    console.log(imagePath);
    if (image.files.length === 1) {
      console.log("estoy subiendo la imagen");
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
            confirmButtonText: "LISTA DE CURSOS",
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
          confirmButtonText: "INTENTARLO NUEVAMENTE",
          customClass: {
            popup: "mySwal",
          },
        });
      }
    }
    console.log(newDataCourse);
    const response = await updateCourse({ ...newDataCourse });
    getAllCourses();
    if (response) {
      Swal.fire({
        title: "¡Tu curso se modificó correctamente!",
        text: "Dirigete a la lista de cursos, ahí podras encontrar tu curso actualizado.",
        icon: "success",
        confirmButtonText: "LISTA DE CURSOS",
        customClass: {
          popup: "mySwal",
        },
      }).then(() => navigate(`/courses`));
    }
    setLoading(false);
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
