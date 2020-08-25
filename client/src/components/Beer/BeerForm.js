import React from "react";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import useForm from "../hooks/useForm";

export default ({ ...props }) => {
  const { beers, onBeerFormSubmit } = props;
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
      temp.price = !isNaN(parseInt(fieldValues.price))
        ? ""
        : "Field must be a number";
    if ("alcoholContent" in fieldValues)
      temp.alcoholContent = !isNaN(parseInt(fieldValues.alcoholContent))
        ? ""
        : "Field must be a number";
    if ("pints" in fieldValues)
      temp.pints = !isNaN(parseInt(fieldValues.pints))
        ? ""
        : "Field must be a number";
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
    if (id && beers) {
      const beer = beers.find((x) => x.beerId === parseInt(id));
      setValues(beer);
    }
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      onBeerFormSubmit(id, values);
    }
  }

  return (
    <Container className="white-text" maxWidth="sm">
      <span className="white-text-large">{!id && <>Add a new beer</>}</span>
      <form autoComplete="off" method="post" noValidate onSubmit={handleSubmit}>
        <InputLabel className="white-text mrgn-t16" htmlFor="name">
          Name
        </InputLabel>
        <TextField
          type="text"
          name="name"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text",
          }}
          value={values.name}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.name && {
            error: true,
            helperText: errors.name,
          })}
        />
        <InputLabel className="white-text mrgn-t16" htmlFor="brand">
          Brand
        </InputLabel>
        <TextField
          type="text"
          name="brand"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text",
          }}
          value={values.brand}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.brand && {
            error: true,
            helperText: errors.brand,
          })}
        />
        <InputLabel className="white-text mrgn-t16" htmlFor="color">
          Color
        </InputLabel>
        <TextField
          type="text"
          name="color"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text",
          }}
          value={values.color}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.color && {
            error: true,
            helperText: errors.color,
          })}
        />
        <InputLabel className="white-text mrgn-t16" htmlFor="aroma">
          Aroma
        </InputLabel>
        <TextField
          type="text"
          name="aroma"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text",
          }}
          value={values.aroma}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.aroma && {
            error: true,
            helperText: errors.aroma,
          })}
        />
        <InputLabel className="white-text mrgn-t16" htmlFor="flavor">
          Flavor
        </InputLabel>
        <TextField
          type="text"
          name="flavor"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text",
          }}
          value={values.flavor}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.flavor && {
            error: true,
            helperText: errors.flavor,
          })}
        />
        <InputLabel className="white-text mrgn-t16" htmlFor="price">
          Price
        </InputLabel>
        <TextField
          type="text"
          name="price"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text",
          }}
          value={values.price}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.price && {
            error: true,
            helperText: errors.price,
          })}
        />
        <InputLabel className="white-text mrgn-t16" htmlFor="alcoholContent">
          Alcohol Content
        </InputLabel>
        <TextField
          type="text"
          name="alcoholContent"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text",
          }}
          value={values.alcoholContent}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.alcoholContent && {
            error: true,
            helperText: errors.alcoholContent,
          })}
        />
        <InputLabel className="white-text mrgn-t16" htmlFor="pints">
          Pints
        </InputLabel>
        <TextField
          type="text"
          name="pints"
          fullWidth
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text",
          }}
          value={values.pints}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.pints && {
            error: true,
            helperText: errors.pints,
          })}
        />
        <div style={{ minHeight: "38px" }} className="mrgn-t8">
          <Button className="buttons float-right" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};
