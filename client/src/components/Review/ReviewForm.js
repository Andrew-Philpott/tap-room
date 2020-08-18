import React from "react";
import { useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import beerActions from "../../actions/beer-actions";
import reviewActions from "../../actions/review-actions";

export default () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = React.useState(true);
  const beers = useSelector((state) => state.beers.items);
  const beer = useSelector((state) => state.beers.item);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("rating" in fieldValues)
      temp.rating =
        fieldValues.rating >= 1 && fieldValues.rating <= 5
          ? ""
          : "Rating must be between 1 and 5.";
    if ("description" in fieldValues)
      temp.description =
        fieldValues.description.length >= 50 &&
        fieldValues.description.length <= 500
          ? ""
          : "Description must be between 50 and 500 characters.";

    setErrors({ ...temp });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    {
      beerId: !id ? 0 : parseInt(id),
      rating: "",
      description: "",
    },
    validate
  );
  React.useEffect(() => {
    if (id) {
      dispatch(beerActions.getBeer(parseInt(id)));
    }
    dispatch(beerActions.getBeers());
  }, []);

  React.useEffect(() => {
    if (beer && loaded) {
      let temp = { ...values };
      temp.beerId = beer.beerId;
      setValues(temp);
      setLoaded(false);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      dispatch(reviewActions.createReview(values));
    }
  }
  return (
    <Container className="white-text mrgn-t16" maxWidth="sm">
      <form autoComplete="off" method="post" noValidate onSubmit={handleSubmit}>
        {beer ? (
          <h1>{beer.name}</h1>
        ) : (
          <React.Fragment>
            <InputLabel className="white-text mrgn-t16" htmlFor="beerId">
              Select a beer
            </InputLabel>
            <TextField
              name="beerId"
              fullWidth
              select
              InputProps={{
                classes: {
                  notchedOutline: "white-border",
                },
                className: "white-text",
              }}
              value={values.beerId}
              onChange={handleInputChange}
              variant="outlined"
            >
              <MenuItem key="" value=""></MenuItem>
              {beers &&
                beers.map((beer, index) => {
                  return (
                    <MenuItem key={index} value={beer.beerId}>
                      {beer.name}
                    </MenuItem>
                  );
                })}
            </TextField>
          </React.Fragment>
        )}
        <InputLabel className="white-text mrgn-t16" htmlFor="rating">
          Rating
        </InputLabel>
        <TextField
          name="rating"
          fullWidth
          select
          InputProps={{
            classes: {
              notchedOutline: "white-border",
            },
            className: "white-text",
          }}
          placeholder="Rating"
          value={values.rating}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.rating && {
            error: true,
            helperText: errors.rating,
          })}
        >
          <MenuItem key={1} value={1}>
            1 Star
          </MenuItem>
          <MenuItem key={2} value={2}>
            2 Stars
          </MenuItem>
          <MenuItem key={3} value={3}>
            3 Stars
          </MenuItem>
          <MenuItem key={4} value={4}>
            4 Stars
          </MenuItem>
          <MenuItem key={5} value={5}>
            5 Stars
          </MenuItem>
        </TextField>
        <InputLabel className="white-text mrgn-t16" htmlFor="description">
          Description
        </InputLabel>
        <TextField
          type="text"
          name="description"
          fullWidth
          multiline={true}
          rows={5}
          InputProps={{
            classes: { notchedOutline: "white-border" },
            className: "white-text",
          }}
          placeholder="Smooth and great taste."
          value={values.description}
          onChange={handleInputChange}
          variant="outlined"
          {...(errors.description && {
            error: true,
            helperText: errors.description,
          })}
        />
        <Button className="buttons mrgn-t16 float-right" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};
