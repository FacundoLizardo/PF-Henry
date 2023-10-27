import React, { useRef } from 'react';
import Styles from './Filters.module.css';
import { filterBack } from './FiltersBc';


const categories = [
    "Desarrollo web",
    "Marketing digital",
    "Programación",
    "Diseño gráfico",
    "Idiomas",
];

export default function Filters({ updateFilters, handleResetFilter }) {
  const filterCategory = useRef(null);
  const orderName = useRef(null);
  const orderPopularity = useRef(null);
  const filterRating = useRef(null);

  
  const handleFilterChange = (fieldName, selectedValue) => {
    if (fieldName === 'rating') {
      const rating = selectedValue !== 'undefined' ? parseInt(selectedValue, 10) : undefined;
      updateFilters(fieldName, rating);
    } else {
      updateFilters(fieldName, selectedValue);
    }
  
    // Restablecer filtros relacionados
    if (fieldName === 'order' && selectedValue !== 'undefined') {
      orderPopularity.current.value = 'undefined';
    }
    if (fieldName === 'popularity' && selectedValue !== 'undefined') {
      orderName.current.value = 'undefined';
    }
  };
  

  // Resetear todos los filtros
  const handleReset = () => {
    filterCategory.current.value = 'undefined';
    orderName.current.value = 'undefined';
    orderPopularity.current.value = 'undefined';
    filterRating.current.value = 'undefined';
    handleResetFilter();
  };

  return (
    <section id="container" className={Styles.filtersContainer}>
      <div className={Styles.filtOrderCont}>
        <div className={Styles.filters}>
          <select
            className={Styles.filterButt}
            ref={orderName}
            onChange={(e) => handleFilterChange('order', e.target.value)}
            defaultValue="undefined"
            
          >
            </select>
          
          <select
            className={Styles.filterButt}
            ref={filterCategory}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            defaultValue="undefined"
          >
            <option value="undefined">Categorías</option>
            {categories.length > 0 && categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
          </select>
          <select
            className={Styles.filterButt}
            ref={filterRating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            defaultValue="undefined"
          >
            <option value="undefined" disabled>
              Filtrar por rating
            </option>
            <option value="5">5 estrellas</option>
            <option value="4">4 estrellas</option>
            <option value="3">3 estrellas</option>
            <option value="2">2 estrellas</option>
            <option value="1">1 estrella</option>
          </select>
          <select
          
            className={Styles.filterButt}
            ref={orderPopularity}
            onChange={(e) => handleFilterChange('price', e.target.value)}
            defaultValue="undefined"
          >
            <option value="undefined" disabled>
            Ordenar por popularidad
            </option>
            <option value="ASC">Menor a mayor</option>
            <option value="DESC">Mayor a menor</option>
          </select>
        </div>

        <div className={Styles.reset}>
          <button
           type='submit' 
            className="reset-button"
            onClick={handleReset}
          >
            Restablecer
          </button>
        </div>
      </div>
    </section>
  );
}



