import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, TextField } from "@material-ui/core";
import { beerService } from "../../services/beer-service";
import { useStyles } from "../use-styles";
import { useForm } from "../useForm";
import { history } from "../../helpers/history";
import { BEER_LIST } from "../../constants/routes";

export const BeerForm = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [apiErrors, setApiErrors] = useState(null);
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
      temp.price = (/^\d+$/).test(fieldValues.price) ? "" : "Field must be a number";
    if ("alcoholContent" in fieldValues)
      temp.alcoholContent = (/^\d+$/).test(fieldValues.alcoholContent) ? "" : "Field must be a number";
    if ("pints" in fieldValues)
      temp.pints = (/^\d+$/).test(fieldValues.pints) ? "" : "Field must be a number";
    setErrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };


  const { values, setValues, errors, setErrors, handleInputChange } = useForm({
    name: "",
    brand: "",
    color: "",
    aroma: "",
    flavor: "",
    price: "",
    alcoholContent: "",
    pints: "",
  }, validate);



  useEffect(() => {
    if (id) {
      beerService
        .getBeer(id)
        .then((response) => setValues(response))
        .catch(() =>
          setApiErrors(
            "There was a problem fetching the beer. Please try again later."
          )
        );
    }
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      if (id) {
        beerService
          .updateBeer(id, values)
          .then(() => {
            history.push(BEER_LIST);
          })
          .catch(() =>
            setApiErrors(
              "There was a problem updating the beer. Please try again later."
            )
          );
      } else {
        beerService
          .createBeer(values)
          .then(() => {
            history.push(BEER_LIST);
          })
          .catch(() =>
            setApiErrors(
              "There was a problem adding the beer to the list. Please try again later."
            )
          );
      }
    }
  }

  return (
    <Container
      className={`${classes.whiteText} ${classes.marginTopTwo}`}
      maxWidth="sm"
    >
      {apiErrors && <p className="white-text-large">{apiErrors}</p>}
      <p className="white-text-large">Add a new beer</p>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="name"
          fullWidth
          InputProps={{
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
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
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
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
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
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
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
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
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
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
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
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
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
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
            classes: { notchedOutline: classes.whiteTextField },
            className: `${classes.whiteText} ${classes.marginTopTwo}`,
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
        <div className={classes.marginTopTwo}>
          <Button
            className="buttons float-right"
            type="submit"
          >
            Submit
        </Button>
        </div>
      </form>
    </Container>
  );
};
