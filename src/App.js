import React, { useState, Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { CurrencyContext } from "./helper/CurrencyContext";

import "./App.css";
import Header from "./components/Layout/Header/Header";
import CurrencyConverter from "./components/Currency/Converter/Converter";
import ConversionHistory from "./components/Currency/ConversionHistory/ConversionHistory";

import Container from "@mui/material/Container";

function App() {
  const [conversionHistory, setConversionHistory] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);

  const [currencyRateTo, setCurrencyRateTo] = useState(0);
  const [currencyRateFrom, setCurrencyRateFrom] = useState(0);

  const [exchangeRate, setExchangeRate] = useState(null);
  const [exchangeRateHistory, setExchangeRateHistory] = useState([]);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [average, setAverage] = useState(0);

  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  const [duration, setDuration] = useState(7)
  return (
    <Fragment>
      <CurrencyContext.Provider value={{
        conversionHistory, setConversionHistory,
        currencyList, setCurrencyList,
        currencyRateTo, setCurrencyRateTo,
        currencyRateFrom, setCurrencyRateFrom,
        exchangeRate, setExchangeRate,
        exchangeRateHistory, setExchangeRateHistory,
        min, setMin,
        max, setMax,
        average, setAverage,
        chartData, setChartData,
        chartLabels, setChartLabels,
        duration, setDuration

      }}>
        <Header />
        <Container maxWidth="lg">
          <Routes>
            <Route path='/currency-converter' element={<CurrencyConverter />} />
            <Route path='/conversion-history' element={<ConversionHistory />} />
            <Route path="" element={<CurrencyConverter />} />
          </Routes>
        </Container>
      </CurrencyContext.Provider>
    </Fragment>
  );
}

export default App;
