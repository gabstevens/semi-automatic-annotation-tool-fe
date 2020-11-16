/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Table } from "@devexpress/dx-react-grid-material-ui";
import { styled } from "@material-ui/core";

const TableRow = styled(Table.Row)({
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#efefef"
  }
});

const ClickableRow = callback => ({ row, ...restProps }) => {
  return <TableRow {...restProps} onClick={() => callback(row)} />;
};

export default ClickableRow;
