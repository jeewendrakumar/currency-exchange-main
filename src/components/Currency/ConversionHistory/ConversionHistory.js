import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  Table,
  TableRow,
  Paper,
} from "@mui/material";

import "./ConversionHistory.css";



import { CurrencyContext } from "../../../helper/CurrencyContext";

const ConversionHistory = () => {

  const { setConversionHistory } = useContext(CurrencyContext);

  const conversionHistoryList = JSON.parse(localStorage.getItem('conversionHistory'));

  const deleteHandler = (event, val) => {
    event.preventDefault();
    conversionHistoryList.splice(val, 1);
    setConversionHistory(conversionHistoryList);
    localStorage.setItem('conversionHistory', JSON.stringify(conversionHistoryList));
  }

  return (
    <Fragment>
      <h1>Conversion History</h1>
      <div className="view-conversion">
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date </TableCell>
                <TableCell align="left">Event</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {conversionHistoryList && conversionHistoryList.map((item, idx) => {
                return (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                    key={idx}
                  >
                    <TableCell component="th" scope="row">
                      {item.date}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.event}
                    </TableCell>
                    <TableCell component="th" scope="row" className="actions">
                      <Link to="/currency-converter">
                        <span className="material-icons view">remove_red_eye</span>
                        View
                      </Link>
                      <Link to="deleteAction" onClick={(e) => deleteHandler(e, idx)}>
                        <span className="material-icons delete">
                          delete_forever
                        </span>
                        Delete from history
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Fragment>
  );
};

export default ConversionHistory;
