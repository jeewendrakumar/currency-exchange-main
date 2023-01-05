import { Fragment } from "react";
import { Divider } from "@mui/material";

import "./ExchangeView.css";

const ExchangeView = (props) => {
  const exchange = props.exchangeRate;
  const formatCurrency = (q) => {
    return q.toLocaleString();
  }
  return (
    <Fragment>
      <div className="exchange-section">
        <div className="exchange-result">
          <div className="exchange-from">
            {exchange?.query?.amount} {exchange?.query?.from}
          </div>
          <div className="equal">=</div>
          <div className="exchange-to">
            {formatCurrency(exchange?.result)} {exchange?.query?.to}
          </div>
        </div>
        <div className="exchange-rates">
          <div className="exchange">
            1 {exchange?.query?.from} = {props.ratesTo} {exchange?.query?.to}
          </div>
          <div className="exchange">
            1 {exchange?.query?.to} =  {props.ratesFrom} {exchange?.query?.from}
          </div>
        </div>
      </div>
      <Divider />
    </Fragment>
  );
};

export default ExchangeView;
