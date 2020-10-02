import React from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import useForm from "../../components/useForm";
import { useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";

export default ({ beers, onBeerFormSubmit }) => {
  const { id } = useParams();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
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
    const beer = beers && id && beers.find((x) => x.beerId === parseInt(id));
    if (beer) {
      setValues(beer);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      onBeerFormSubmit(id, values);
    }
  }

  return (
    <Container className="main-content">
      <h1>{!id && <>Add a new beer</>}</h1>
      <form autoComplete="off" method="post" noValidate onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <OutlinedInput
          type="text"
          name="name"
          fullWidth
          value={values.name}
          onChange={handleInputChange}
        />
        {errors.name && <div>{errors.name}</div>}
        <label htmlFor="brand">Brand</label>
        <OutlinedInput
          type="text"
          name="brand"
          fullWidth
          value={values.brand}
          onChange={handleInputChange}
        />
        {errors.brand && <div>{errors.brand}</div>}
        <label htmlFor="color">Color</label>
        <OutlinedInput
          type="text"
          name="color"
          fullWidth
          value={values.color}
          onChange={handleInputChange}
        />
        {errors.color && <div>{errors.color}</div>}
        <label htmlFor="aroma">Aroma</label>
        <OutlinedInput
          type="text"
          name="aroma"
          fullWidth
          value={values.aroma}
          onChange={handleInputChange}
        />
        {errors.aroma && <div>{errors.aroma}</div>}
        <label htmlFor="flavor">Flavor</label>
        <OutlinedInput
          type="text"
          name="flavor"
          fullWidth
          value={values.flavor}
          onChange={handleInputChange}
        />
        {errors.flavor && <div>{errors.flavor}</div>}
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <label htmlFor="price">Price</label>
            <OutlinedInput
              type="text"
              name="price"
              fullWidth
              value={values.price}
              onChange={handleInputChange}
            />
            {errors.price && <div>{errors.price}</div>}
          </Grid>
          <Grid item xs={4}>
            <label htmlFor="alcoholContent">Alcohol Content</label>
            <OutlinedInput
              type="text"
              name="alcoholContent"
              fullWidth
              value={values.alcoholContent}
              onChange={handleInputChange}
            />
            {errors.alcoholContent && <div>{errors.alcoholContent}</div>}
          </Grid>
          <Grid item xs={4}>
            <label htmlFor="pints">Pints</label>
            <OutlinedInput
              type="text"
              name="pints"
              fullWidth
              value={values.pints}
              onChange={handleInputChange}
            />
            {errors.pints && <div>{errors.pints}</div>}
          </Grid>
        </Grid>
        <Button className="button" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};
