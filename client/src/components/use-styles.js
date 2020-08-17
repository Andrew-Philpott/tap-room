import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  buttons: {
    backgroundColor: "white",
    minWidth: "100px",
    "&:hover": {
      backgroundColor: "white !important",
      color: "black",
    },
  },
  floatRight: { float: "right" },
  table: {
    "& .MuiTableHead-root": {
      color: "white",
    },
    "& .MuiTableCell-root": {
      borderBottom: "none",
      color: "white",
    },
  },
  actionLinkStyle: {
    cursor: "pointer",
    color: "white",
    minWidth: "100",
    "&:hover, &:focus, &:visited, &:link, &:active ": {
      textDecoration: "none",
    },
  },
  whiteTextField: {
    borderColor: "white !important",
  },
  whiteText: {
    color: "white !important",
  },
  marginTopTwo: { marginTop: theme.spacing(2) },
  marginTopOne: { marginTop: theme.spacing(1) },
  marginRightTen: { marginRight: "10px" },
  textAlignCenter: {
    textAlign: "center",
  },
  pointer: {
    cursor: "pointer",
  },
  appBar: {
    backgroundColor: "#cc7000",
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    "& a,span": {
      color: "white",
      marginRight: "50px",
      "&:hover, &:focus, &:visited, &:link, &:active": {
        color: "white",
      },
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  menuLink: {
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.87)",
  },
  navLinks: {
    color: "white",
    "&:hover, &:focus, &:visited, &:link, &:active": {
      textDecoration: "none",
      color: "white",
    },
  },
  navbar: {
    backgroundColor: "#00acee",
  },
  tapHouseLogo: {
    height: "100px",
    width: "auto",
  },
  input: {
    "&::placeholder": {
      color: "white",
    },
  },
}));
