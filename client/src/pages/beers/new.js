import React from "react";
import useForm from "../../components/use-form";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBeer, updateBeer } from "../../actions/beer";
import useAuth from "../../components/use-auth";
import "../../css/beer-form.css";

const initalFieldValues = {
  name: "",
  brand: "",
  color: "",
  aroma: "",
  flavor: "",
  price: "",
  alcoholContent: "",
  pints: "",
};

export default () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const beers = useSelector((state) => state.beers.beers);
  const history = useHistory();
  const validate = (fieldValues = values) => {
    let temp = { ...formErrors };
    let fieldNumber;
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "Field cannot be blank";
    if ("brand" in fieldValues)
      temp.brand = fieldValues.brand ? "" : "Field cannot be blank";
    if ("color" in fieldValues)
      temp.color = fieldValues.color ? "" : "Field cannot be blank";
    if ("aroma" in fieldValues)
      temp.aroma = fieldValues.aroma ? "" : "Field cannot be blank";
    if ("flavor" in fieldValues)
      temp.flavor = fieldValues.flavor ? "" : "Field cannot be blank";
    if ("price" in fieldValues) {
      fieldNumber = parseInt(fieldValues.price);
      if (isNaN(fieldNumber)) {
        temp.price = "Field must be a number";
      } else {
        if (fieldNumber < 1 || fieldNumber > 10000) {
          temp.price = "Field must be between 1 and 10000";
        } else {
          temp.price = "";
        }
      }
    }
    if ("alcoholContent" in fieldValues) {
      fieldNumber = parseInt(fieldValues.alcoholContent);
      if (isNaN(fieldNumber)) {
        temp.alcoholContent = "Field must be a number";
      } else {
        if (fieldNumber < 0 || fieldNumber > 80) {
          temp.alcoholContent = "Field must be between 0 and 80";
        } else {
          temp.alcoholContent = "";
        }
      }
    }
    if ("pints" in fieldValues) {
      fieldNumber = parseInt(fieldValues.pints);
      if (isNaN(fieldNumber)) {
        temp.pints = "Field must be a number";
      } else {
        if (fieldNumber < 1 || fieldNumber > 10000) {
          temp.pints = "Field must be between 1 and 10000";
        } else {
          temp.pints = "";
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

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      getToken((token) => {
        dispatch(
          id ? updateBeer(token, id, values) : createBeer(token, values)
        );
      });
    }
  }

  return (
    <div id="beer-form" className="main-content">
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
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
