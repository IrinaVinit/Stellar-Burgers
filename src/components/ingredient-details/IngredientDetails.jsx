import styles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";
import { IngredientPropType } from "../types/common-types.js";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getStoreIngredients } from "../utils/data";

export function IngredientDetails({ bac }) {
  const { id } = useParams();
  const { ingredients } = useSelector(getStoreIngredients);
  const ingredient = ingredients?.find((ingredient) => ingredient._id === id);

  const IngredientDetailsModal = () => {
    return ingredient ? (
      <div className={`${styles.container}`}>
        <img
          className="mb-4"
          src={ingredient.image_large}
          alt={ingredient.name}
        ></img>
        <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
        <div className={styles.energyValue}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.textCenter}`}
          >
            Калории,ккал
          </p>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.textCenter}`}
          >
            Белки, г
          </p>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.textCenter}`}
          >
            Жиры, г
          </p>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.textCenter}`}
          >
            Углеводы, г
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.textCenter}`}
          >
            {ingredient.calories}
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.textCenter}`}
          >
            {ingredient.proteins}
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.textCenter}`}
          >
            {ingredient.fat}
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.textCenter}`}
          >
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    ) : null;
  };

  const IngredientDetailsRoute = () => {
    return ingredient ? (
      <div className={`${styles.routeStyle}`}>
        <h1 className={`${styles.title} text text_type_main-large`}>
          Детали ингредиента
        </h1>
        <img
          className="mb-4"
          src={ingredient.image_large}
          alt={ingredient.name}
        ></img>
        <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
        <div className={styles.energyValue}>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.textCenter}`}
          >
            Калории,ккал
          </p>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.textCenter}`}
          >
            Белки, г
          </p>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.textCenter}`}
          >
            Жиры, г
          </p>
          <p
            className={`text text_type_main-default text_color_inactive ${styles.textCenter}`}
          >
            Углеводы, г
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.textCenter}`}
          >
            {ingredient.calories}
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.textCenter}`}
          >
            {ingredient.proteins}
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.textCenter}`}
          >
            {ingredient.fat}
          </p>
          <p
            className={`text text_type_digits-default text_color_inactive ${styles.textCenter}`}
          >
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    ) : null;
  };

  return bac ? <IngredientDetailsModal /> : <IngredientDetailsRoute />;
}

IngredientDetails.prototype = {
  ingredient: PropTypes.shape(IngredientPropType).isRequired,
};
