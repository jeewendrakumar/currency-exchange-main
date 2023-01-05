import { Fragment, useState } from "react";
import "./ExchangeHistory.css";
import Charts from "../../UI/Chart";

import ExchangeHistoryForm from "./ExchangeHistoryForm";
import TableDatewiseComponent from "../../UI/TableDatewiseComponent";
import TableStatisticsComponent from "../../UI/TableStatsticsComponent";

const ExchangeHistroy = (props) => {
  const currency = props.currencyTo;
  const exchangeHistory = props.exchangeRateHistory;
  const minCurrencyValue = props.min;
  const maxCurrencyValue = props.max;
  const averageCurrencyValue = props.average;
  const [showReport, setShowReport] = useState("table");

  const getExchangeHistory = (event) => {
    props.exchangeHistoryHandler(event.target.value);
  };

  const switchReportHandler = (event) => {
    setShowReport(event.target.value);
  };

  return (
    <Fragment>
      <ExchangeHistoryForm duration={props.duration} showReport={showReport} getExchangeHistory={getExchangeHistory} switchReportHandler={switchReportHandler} />

      {showReport === "table" ? (
        <div className="view-conversion">
          <div className="exchange-rate-datewise">
            <TableDatewiseComponent exchangeHistory={exchangeHistory} currency={currency} />
          </div>
          <div className="statistics">
            <TableStatisticsComponent minCurrencyValue={minCurrencyValue} maxCurrencyValue={maxCurrencyValue} averageCurrencyValue={averageCurrencyValue} />
          </div>
        </div>
      ) : (
        <div className="view-conversion">
          <div className="exchange-rate-datewise">

            <Charts data={props?.chartData} label={props?.chartLabel} />

          </div>
          {
            minCurrencyValue && maxCurrencyValue && averageCurrencyValue && (

              <div className="statistics">

                <Charts
                  data={["Lowest", "Highest", "Average"]}
                  label={[
                    minCurrencyValue,
                    maxCurrencyValue,
                    averageCurrencyValue,
                  ]}
                />
              </div>
            )
          }
        </div>
      )}
    </Fragment>
  );
};

export default ExchangeHistroy;
