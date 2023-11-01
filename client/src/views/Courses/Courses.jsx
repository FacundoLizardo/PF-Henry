/* eslint-disable */
import { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import axios from "axios";
import Styles from "./Courses.module.css";
import Card from "../../Components/Card/Card";

const Courses = () => {
  const [dataCourses, setDataCourses] = useState({
    data: [],
    filteredData: [],
  });
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    setDataCourses((prevState) => ({
      ...prevState,
      data: JSON.parse(localStorage.getItem("coursesData")),
    }));
    setCategoriesData(JSON.parse(localStorage.getItem("categoriesData")));
  }, []);

  const dataFiltered = async (e) => {
    const categoryFilter = e.target.value;

    const url = `/courses?category=${categoryFilter}`;

    if (categoryFilter) {
      const { data } = await axios.get(url);
      setDataCourses((prevState) => ({
        ...prevState,
        filteredData: data,
      }));
    }
  };

  const [dataTitle, setDataTitle] = useState("");

  const dataFilteredByTitle = async (event) => {
    const newValue = event.target.value;
    setDataTitle(newValue);

    const url = `/courses?title=${newValue}`;

    if (newValue) {
      const { data } = await axios.get(url);
      setDataCourses((prevState) => ({
        ...prevState,
        filteredData: data,
      }));
    }
  };

  const sortByPrice = (e) => {
    const sortedData = [...dataCourses.data];
    const sortedFilteredData = dataCourses.filteredData.length
      ? [...dataCourses.filteredData]
      : [];
    const selectedOpt = e.target.value;
    if (selectedOpt === "DESC") {
      sortedData.sort((a, b) => b.price - a.price);
      sortedFilteredData.sort((a, b) => b.price - a.price);
    } else if (selectedOpt === "ASC") {
      sortedData.sort((a, b) => a.price - b.price);
      sortedFilteredData.sort((a, b) => a.price - b.price);
    }

    setDataCourses((prevState) => ({
      ...prevState,
      data: sortedData,
      filteredData: sortedFilteredData,
    }));
  };

  // Pendiente de Review y refactorizacion.
  //
  // const handleorderFilter = (e) => {
  // 	const selectedOrder = e.target.value;
  // 	setOrderFilter(selectedOrder);
  // 	sortByPrice();
  // };

  const handleReset = () => {
    const selectElement = document.getElementById("category");
    const optionToSelect = selectElement.querySelector(
      'option[name="categories"]'
    );

    if (optionToSelect) {
      optionToSelect.selected = true;
    }
    const selectElement2 = document.getElementById("order");
    const optionToSelect2 = selectElement2.querySelector(
      'option[name="Default"]'
    );
    if (optionToSelect2) {
      optionToSelect2.selected = true;
    }

    // En Desarrollo
    // const selectElement3 = document.getElementById("rating");
    // const optionToSelect3 = selectElement3.querySelector(
    // 	'option[name="default"]'
    // );
    // if (optionToSelect3) {
    // 	optionToSelect3.selected = true;
    // }

    setDataCourses(() => ({
      data: JSON.parse(localStorage.getItem("coursesData")),
      filteredData: [],
    }));
  };

  return (
    <div className={Styles.coursesContainer}>
      <section id="container" className={Styles.filtersContainer}>
        <div className={Styles.filtOrderCont}>
          <div className={Styles.filters}>
            <div className={Styles.SearchBarContainer}>
              <input
                type="text"
                value={dataTitle}
                name="title"
                onChange={dataFilteredByTitle}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="128"
                height="128"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="m229.66 218.34l-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72Z"
                />
              </svg>
            </div>

            <select
              className={Styles.filterButt}
              onChange={dataFiltered}
              name="category"
              id="category"
            >
              <option name="categories" value="categories">
                Categorías
              </option>
              {categoriesData?.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            {/*  En Desarollo           
						<select
							className={Styles.filterButt}
							onChange={() => {}}
							name="rating">
							<option value={""}>Filtrar por rating</option>
							<option value={5}>5 estrellas</option>
							<option value={4}>4 estrellas</option>
							<option value={3}>3 estrellas</option>
							<option value={2}>2 estrellas</option>
							<option value={1}>1 estrella</option>
						</select> */}

            <select
              className={Styles.filterButt}
              onChange={sortByPrice}
              name="order"
              id="order"
            >
              <option name="Default" value="Default">
                Ordenar por precio
              </option>
              <option value="ASC">Menor a mayor</option>
              <option value="DESC">Mayor a menor</option>
            </select>
          </div>
          <div className={Styles.reset}>
            <Button
              className="reset-button"
              onClick={handleReset}
              text={"Restablecer"}
            />
          </div>
        </div>
      </section>

      <section>
        <div className={`${Styles.courses}`}>
          {dataCourses.filteredData.length > 0
            ? dataCourses.filteredData.map((course, index) => (
                <Card key={index} course={course} />
              ))
            : dataCourses.data.map((course, index) => (
                <Card key={index} course={course} />
              ))}
        </div>
      </section>
    </div>
  );
};

export default Courses;
