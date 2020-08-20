import React from "react";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import useForm from "../hooks/useForm";
import beerActions from "../../actions/beer-actions";
import { connect } from "react-redux";

const BeerForm = ({ ...props }) => {
  const { beer, getBeer, updateBeer, createBeer } = props;
  const { id } = useParams();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
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
    if ("price" in fieldValues)
      temp.price = !isNaN(fieldValues.price) ? "" : "Field must be a number";
    if ("alcoholContent" in fieldValues)
      temp.alcoholContent = !isNaN(fieldValues.alcoholContent)
        ? ""
        : "Field must be a number";
    if ("pints" in fieldValues)
      temp.pints = !isNaN(fieldValues.pints) ? "" : "Field must be a number";
    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    {
      name: "",
      brand: "",
      color: "",
      aroma: "",
      flavor: "",
      price: "",
      alcoholContent: "",
      pints: "",
    },
    validate
  );

  React.useEffect(() => {
    if (id) {
      getBeer(id);
    }
  }, []);

  React.useEffect(() => {
    if (JSON.stringify(beer) !== "{}") {
      setValues(beer);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      if (id) {
        updateBeer(id, values);
      } else {
        createBeer(values);
      }
    }
  }

  return (
    <Container className="white-text mrgn-t16" maxWidth="sm">
      <span className="white-text-large">Add a new beer</span>
      <form autoComplete="off" method="post" noValidate onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="name"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text mrgn-t16",
          }}
          placeholder="Name"
          value={values.name}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.name && {
            error: true,
            helperText: errors.name,
          })}
        />
        <TextField
          type="text"
          name="brand"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text mrgn-t16",
          }}
          placeholder="Brand"
          value={values.brand}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.brand && {
            error: true,
            helperText: errors.brand,
          })}
        />
        <TextField
          type="text"
          name="color"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text mrgn-t16",
          }}
          placeholder="Color"
          value={values.color}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.color && {
            error: true,
            helperText: errors.color,
          })}
        />
        <TextField
          type="text"
          name="aroma"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text mrgn-t16",
          }}
          placeholder="Aroma"
          value={values.aroma}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.aroma && {
            error: true,
            helperText: errors.aroma,
          })}
        />
        <TextField
          type="text"
          name="flavor"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text mrgn-t16",
          }}
          placeholder="Flavor"
          value={values.flavor}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.flavor && {
            error: true,
            helperText: errors.flavor,
          })}
        />
        <TextField
          type="text"
          name="price"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text mrgn-t16",
          }}
          placeholder="Price"
          value={values.price}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.price && {
            error: true,
            helperText: errors.price,
          })}
        />
        <TextField
          type="text"
          name="alcoholContent"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text mrgn-t16",
          }}
          placeholder="Alcohol Content"
          value={values.alcoholContent}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.alcoholContent && {
            error: true,
            helperText: errors.alcoholContent,
          })}
        />
        <TextField
          type="text"
          name="pints"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text mrgn-t16",
          }}
          placeholder="# of pints"
          value={values.pints}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.pints && {
            error: true,
            helperText: errors.pints,
          })}
        />
        <div className="mrgn-t16">
          <Button className="buttons float-right" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  beer: state.beers.item,
});

const mapActionToProps = {
  getBeer: beerActions.getBeer,
  updateBeer: beerActions.updateBeer,
  createBeer: beerActions.createBeer,
};

export default connect(mapStateToProps, mapActionToProps)(BeerForm);
