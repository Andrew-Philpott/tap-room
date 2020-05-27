import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  white: {
    color: "white",
  },
  buttons: {
    backgroundColor: "white",
    minWidth: "100px",
    "&:hover": {
      backgroundColor: "white !important",
    },
  },
  mainContent: {
    height: "100%",
    backgroundColor: "black",
    color: "white",
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
    textDecoration: "none",
  },
  navbar: {
    backgroundColor: "#00acee",
  },
  navButton: {
    color: "white",
    marginRight: "50",
  },
}));
