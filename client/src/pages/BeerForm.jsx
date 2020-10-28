import React from "react";
import useForm from "../other/use-form";
import { useParams, useHistory } from "react-router-dom";
import AuthContext from "../components/AuthContext";
import PropTypes from "prop-types";

const initalFieldValues = {
  name: "",
  brand: "",
  color: "",
  aroma: "",
  flavor: "",
  price: "",
  pints: "",
  alcoholContent: "",
};

const BeerForm = ({ beers, setBeers, setError }) => {
  const { getToken } = AuthContext.useAuth();
  const { id } = useParams();
  const history = useHistory();
  const validate = (fieldValues = values) => {
    let temp = { ...formErrors };
    let fieldNumber;
    const keys = Object.keys(fieldValues);
    for (let index = 0; index < fieldValues.length; index++) {
      const val = fieldValues[index];
      const key = keys[index];
      if (key in fieldValues) {
        if (index < 5) {
          temp[key] = val ? "" : "Field cannot be blank";
        } else {
          fieldNumber = parseInt(fieldValues[index]);
          if (isNaN(fieldNumber)) {
            temp[key] = "Field must be a number";
          } else {
            if (index === fieldValues.length - 1) {
              temp[key] =  fieldNumber < 0 || fieldNumber > 80 ? "Field must be between 0 and 80" : "";
            } else {
              temp[key] = fieldNumber < 1 || fieldNumber > 10000 ? "Field must be between 1 and 10000" : "";
            }
          }
        }
      }   
    }
    setFormErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    formErrors,
    setFormErrors,
    handleInputChange,
  } = useForm(initalFieldValues, validate);

  React.useEffect(() => {
    const beer = beers && id && beers.find((x) => x.beerId === parseInt(id));
    if (beer) {
      setValues(beer);
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      const { updateBeer, createBeer } = await import("../other/beer-service");
      id
        ? updateBeer(getToken(), id, values)
        : createBeer(getToken(), values)
            .then((res) => {
              setBeers(
                id
                  ? [...beers.map((x) => (x.beerId === res.beerId ? res : x))]
                  : [...beers, res]
              );
              history.push("/beers");
            })
            .catch(setError);
    }
  }

  return (
    <div
      id="beer-form"
      className="main-content"
      data-test="component-beer-form"
    >
      <h1>{!id && <>Add a new beer</>}</h1>
      <form autoComplete="off" method="post" noValidate onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="input"
            value={values.name}
            onChange={handleInputChange}
          />
          {formErrors.name && <div>{formErrors.name}</div>}
        </div>
        <div className="form-control">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            name="brand"
            className="input"
            value={values.brand}
            onChange={handleInputChange}
          />
          {formErrors.brand && <div>{formErrors.brand}</div>}
        </div>
        <div className="form-control">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            name="color"
            className="input"
            value={values.color}
            onChange={handleInputChange}
          />
          {formErrors.color && <div>{formErrors.color}</div>}
        </div>
        <div className="form-control">
          <label htmlFor="aroma">Aroma</label>
          <input
            type="text"
            name="aroma"
            className="input"
            value={values.aroma}
            onChange={handleInputChange}
          />
          {formErrors.aroma && <div>{formErrors.aroma}</div>}
        </div>
        <div className="form-control">
          <label htmlFor="flavor">Flavor</label>
          <input
            type="text"
            name="flavor"
            className="input"
            value={values.flavor}
            onChange={handleInputChange}
          />
          {formErrors.flavor && <div>{formErrors.flavor}</div>}
        </div>
        <div>
          <div>
            <div className="form-control">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                className="input"
                value={values.price}
                onChange={handleInputChange}
              />
              {formErrors.price && <div>{formErrors.price}</div>}
            </div>
          </div>
          <div>
            <div className="form-control">
              <label htmlFor="alcoholContent">Alcohol Content</label>
              <input
                type="text"
                name="alcoholContent"
                className="input"
                value={values.alcoholContent}
                onChange={handleInputChange}
              />
              {formErrors.alcoholContent && (
                <div>{formErrors.alcoholContent}</div>
              )}
            </div>
          </div>
          <div>
            <div className="form-control">
              <label htmlFor="pints">Pints</label>
              <input
                type="text"
                name="pints"
                className="input"
                value={values.pints}
                onChange={handleInputChange}
              />
              {formErrors.pints && <div>{formErrors.pints}</div>}
            </div>
          </div>
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

BeerForm.propTypes = {
  beers: PropTypes.array.isRequired,
  setBeers: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

export default BeerForm;