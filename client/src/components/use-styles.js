import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  buttons: {
    backgroundColor: "white",
    minWidth: "100px",
    "&:hover": {
      backgroundColor: "white !important",
    },
  },
  input: {
    borderBottom: "white",
    color: "white",
  },
  floatRightButton: {
    backgroundColor: "white",
    float: "right",
    minWidth: "100px",
    "&:hover": {
      backgroundColor: "white !important",
    },
  },
  menuLink: {
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.87)",
  },
  grow: {
    flexGrow: 1,
  },
  inputRoot: {
    color: "inherit",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  center: {
    justifyContent: "center",
  },
  navLinks: {
    color: "white",
    "&:hover, &:focus, &:visited, &:link, &:active ": {
      textDecoration: "none",
      color: "white",
    },
  },
  navbar: {
    backgroundColor: "#00acee",
  },
  marginRightFifty: {
    marginRight: "50px",
  },
  orange: {
    color: "orange",
  },
  yellow: {
    color: "yellow",
  },
  green: {
    color: "green",
  },
  tableCell: {
    borderBottom: "none",
    color: "white",
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
  blackText: {
    color: "black",
  },
  whiteText: {
    color: "white",
  },
  marginTopTwo: { marginTop: theme.spacing(2) },
  marginTopOne: { marginTop: theme.spacing(1) },
  marginRightTen: { marginRight: "10px" },
  tapHouseLogo: {
    height: "100px",
    width: "auto",
  },
  textAlignCenter: {
    textAlign: "center",
  },
}));
