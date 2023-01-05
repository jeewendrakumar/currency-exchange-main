import React, {
  Fragment,
  useEffect,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";

import { CurrencyContext } from "../../../helper/CurrencyContext";

import ConvertCurrecnyFrom from "./ConvertCurrecnyForm";
import ExchangeHistroy from "../ExchangeHistory/ExchangeHistory";
import ExchangeView from "../ExchangeView/ExchangeView";

import {
  getCurrency,
  convertCurrency,
  getExchangeHistory,
} from "../../../helper/Api";

import "./Converter.css";

const CurrencyConverter = () => {

  const { conversionHistory, setConversionHistory,
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
    duration, setDuration } = useContext(CurrencyContext)

  const selectedAmount = useRef(1);

  let [currencyTo, setCurrencyTo] = useState("INR");
  let [currencyFrom, setCurrencyFrom] = useState("USD");


  const handleSwapCurrency = (event) => {
    setCurrencyFrom(currencyTo);
    localStorage.setItem('currencyTo', JSON.stringify(currencyTo));
    setCurrencyTo(currencyFrom);
    localStorage.setItem('currencyFrom', JSON.stringify(currencyFrom));
    [currencyFrom, currencyTo] = [currencyTo, currencyFrom];
  };

  const currencyToHandler = (event) => {
    event.preventDefault();
    const to = event.target.value;
    setCurrencyTo(to);
    localStorage.setItem('currencyTo', JSON.stringify(to));
  };

  const currencyFromHandler = (event) => {
    event.preventDefault();
    const from = event.target.value;
    setCurrencyFrom(from);
    localStorage.setItem('currencyFrom', JSON.stringify(from));
  };

  const getDateTime = () => {
    const currentdate = new Date();
    const datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();

    return datetime;
  }

  const convertHandler = (event) => {
    event.preventDefault();
    localStorage.setItem('currencyTo', JSON.stringify(currencyTo));
    localStorage.setItem('currencyFrom', JSON.stringify(currencyFrom));

    const payload = {
      amount: selectedAmount.current?.value,
      from: currencyFrom,
      to: currencyTo,
    };
    const api = convertCurrency(payload);
    api.then((response) => {
      setExchangeRate(response);
      setCurrencyRateTo(currencyList[currencyTo]);
      setCurrencyRateFrom(currencyList[currencyFrom]);

      localStorage.setItem('exchangeRate', JSON.stringify(response));
      localStorage.setItem('currencyRateTo', JSON.stringify(currencyList[currencyTo]));
      localStorage.setItem('currencyRateFrom', JSON.stringify(currencyList[currencyFrom]));


      const conversion = { 'date': getDateTime(), 'event': `${'Converted an amount of ' + payload.amount + ' from ' + currencyFrom + ' to ' + currencyTo}` };

      setConversionHistory((previousData) => {
        return [...previousData, conversion]
      });

      exchangeHistoryHandler(duration);
    });
  };

  const getDates = (selectedDuration) => {

    const currentDate = new Date();
    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const daysAgo = new Date(currentDate.getTime());

    daysAgo.setDate(currentDate.getDate() - (selectedDuration - 1));
    const dateAgo = daysAgo.getDate();
    const monthAgo = daysAgo.getMonth() + 1;
    const yearAgo = daysAgo.getFullYear();

    return {
      start_date: `${yearAgo}-${monthAgo}-${dateAgo}`,
      end_date: `${year}-${month}-${date}`,
    };
  };

  const exchangeHistoryHandler = useCallback((selectedDuration) => {

    localStorage.setItem('duration', JSON.stringify(selectedDuration));
    setDuration(selectedDuration);

    const payload = getDates(selectedDuration);
    const api = getExchangeHistory(payload);
    api.then((response) => {
      const rates = response.rates;
      const allCurrecnyVal = Object.entries(rates).map((item) =>
        parseFloat(item[1][currencyTo])
      );

      const allDates = Object.entries(rates).map((item) => item[0]);

      setChartData(allDates);
      localStorage.setItem('allDates', JSON.stringify(allDates));

      setChartLabels(allCurrecnyVal);
      localStorage.setItem('allCurrecnyVal', JSON.stringify(allCurrecnyVal));

      const minVal = Math.min(...allCurrecnyVal);
      setMin(minVal);
      localStorage.setItem('minVal', JSON.stringify(minVal));

      const maxVal = Math.max(...allCurrecnyVal);
      setMax(maxVal);
      localStorage.setItem('maxVal', JSON.stringify(maxVal));

      const avgVal =
        allCurrecnyVal.reduce((a, b) => a + b, 0) / allCurrecnyVal.length;
      setAverage(avgVal);
      localStorage.setItem('avgVal', JSON.stringify(avgVal));

      setExchangeRateHistory(rates);
      localStorage.setItem('exchangeRateHistory', JSON.stringify(rates));
    });
  }, [currencyTo, setAverage, setChartData, setChartLabels, setDuration, setExchangeRateHistory, setMax, setMin]);

  const getData = useCallback(() => {
    const api = getCurrency();
    api.then((response) => {
      localStorage.setItem('dataKey', JSON.stringify(response.rates));
      setCurrencyList(response.rates);
    });
  }, [setCurrencyList]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('dataKey'));
    if (items) {
      setCurrencyList(items);
    } else {
      getData();
    }
  }, [getData, setCurrencyList]);

  useEffect(() => {
    const currencyFrom = JSON.parse(localStorage.getItem('currencyFrom'));
    if (currencyFrom) {
      setCurrencyFrom(currencyFrom);
    }

    const currencyTo = JSON.parse(localStorage.getItem('currencyTo'));
    if (currencyTo) {
      setCurrencyTo(currencyTo);
    }

    const exchangeRate = JSON.parse(localStorage.getItem('exchangeRate'));
    if (exchangeRate) {
      setExchangeRate(exchangeRate);
    }

    const currencyRateTo = JSON.parse(localStorage.getItem('currencyRateTo'));
    if (currencyRateTo) {
      setCurrencyRateTo(currencyRateTo);
    }

    const currencyRateFrom = JSON.parse(localStorage.getItem('currencyRateFrom'));
    if (currencyRateFrom) {
      setCurrencyRateFrom(currencyRateFrom);
    }
  }, [setCurrencyRateFrom, setCurrencyRateTo, setExchangeRate])

  useEffect(() => {
    const exchangeRateHistory = JSON.parse(localStorage.getItem('exchangeRateHistory'));
    if (exchangeRateHistory) {
      setExchangeRateHistory(exchangeRateHistory);
    }
    const allDates = JSON.parse(localStorage.getItem('allDates'));
    if (allDates) {
      setChartData(allDates);
    }
    const allCurrecnyVal = JSON.parse(localStorage.getItem('allCurrecnyVal'));
    if (allCurrecnyVal) {
      setChartLabels(allCurrecnyVal);
    }
    const minVal = JSON.parse(localStorage.getItem('minVal'));
    if (minVal) {
      setMin(minVal);
    }
    const maxVal = JSON.parse(localStorage.getItem('maxVal'));
    if (maxVal) {
      setMax(maxVal);
    }
    const avgVal = JSON.parse(localStorage.getItem('avgVal'));
    if (avgVal) {
      setAverage(avgVal);
    }
  }, [setAverage, setChartData, setChartLabels, setExchangeRateHistory, setMax, setMin])

  const getHistory = useCallback(() => {
    const duration = JSON.parse(localStorage.getItem('duration'));

    if (duration) {
      setDuration(duration);
      exchangeHistoryHandler(duration);
    }
  }, [exchangeHistoryHandler, setDuration]);

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  useEffect(() => {
    if (conversionHistory.length) {
      localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
    }
  }, [conversionHistory])

  return (
    <Fragment>

      <ConvertCurrecnyFrom
        convertCurrencyHandler={convertHandler}
        currencyTo={currencyTo}
        currencyFrom={currencyFrom}
        selectedAmount={selectedAmount}
        currencyToHandler={currencyToHandler}
        currencyFromHandler={currencyFromHandler}
        currencyList={currencyList}
        handleSwapCurrency={handleSwapCurrency} />

      {exchangeRate && (
        <ExchangeView
          exchangeRate={exchangeRate}
          ratesTo={currencyRateTo}
          ratesFrom={currencyRateFrom}
        />
      )}
      {chartData.length > 0 && (
        <ExchangeHistroy
          exchangeHistoryHandler={exchangeHistoryHandler}
          exchangeRateHistory={exchangeRateHistory}
          currencyTo={currencyTo}
          currencyFrom={currencyFrom}
          min={min}
          max={max}
          average={average}
          chartLabel={chartLabels}
          chartData={chartData}
          duration={duration}
        />
      )}
    </Fragment>
  );
};

export default CurrencyConverter;
