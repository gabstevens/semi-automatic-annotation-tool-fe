import React from "react";
import PropTypes from "prop-types";
import { startCase } from "lodash";
import {
  Breadcrumbs,
  CardActions,
  CardHeader,
  Fab,
  Link,
  makeStyles,
  Toolbar,
  Tooltip
} from "@material-ui/core";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: "space-between"
  }
}));

const useEnhancer = () => {
  const { url } = useRouteMatch();
  return {
    items: url.split("/"),
    classes: useStyles()
  };
};

const BaseToolbar = ({ title, buttons, hideBreadcrumb }) => {
  const { items, classes } = useEnhancer();
  return (
    <Toolbar className={classes.root}>
      <CardHeader
        title={title}
        subheader={
          hideBreadcrumb ? null : (
            <Breadcrumbs>
              {items.map((item, index) => (
                <Link
                  key={item}
                  component={RouterLink}
                  color={index === items.length - 1 ? "textPrimary" : "inherit"}
                  to={items.filter((_, i) => i <= index).join("/")}
                >
                  {item === "" ? "Home" : startCase(item)}
                </Link>
              ))}
            </Breadcrumbs>
          )
        }
      />
      <CardActions>
        {buttons.map(({ key, tooltip, icon: Icon, to, onClick }) => (
          <Tooltip key={key} placement="top" title={tooltip}>
            <Fab size="small" component={to && RouterLink} to={to} onClick={onClick}>
              <Icon />
            </Fab>
          </Tooltip>
        ))}
      </CardActions>
    </Toolbar>
  );
};

BaseToolbar.propTypes = {
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  buttons: PropTypes.arrayOf(PropTypes.shape({})),
  hideBreadcrumb: PropTypes.bool
};

BaseToolbar.defaultProps = {
  buttons: [],
  hideBreadcrumb: false
};

export default BaseToolbar;
