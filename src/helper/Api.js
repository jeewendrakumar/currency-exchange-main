const BASE_URL = "https://api.exchangerate.host/";
export const getCurrency = async () => {
  try {
    const response = await fetch(BASE_URL + "latest");
    return response.json();
  } catch (error) {
    console.log("error : ", error);
  }
};
export const convertCurrency = async (payload) => {
  try {
    const response = await fetch(
      `${
        BASE_URL +
        "convert?from=" +
        payload.from +
        "&to=" +
        payload.to +
        "&amount=" +
        payload.amount
      }`
    );
    return response.json();
  } catch (error) {
    console.log("error : ", error);
  }
};
export const getExchangeHistory = async (payload) => {
  try {
    const response = await fetch(
      `${
        BASE_URL +
        "timeseries?start_date=" +
        payload.start_date +
        "&end_date=" +
        payload.end_date
      }`
    );
    return response.json();
  } catch (error) {
    console.log("error : ", error);
  }
};
