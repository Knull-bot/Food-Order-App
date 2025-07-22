import { useState, useEffect, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
}

export default function useHttp(url, config, initialValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  function clearData() {
    setFetchedData(initialValue);
  }

  const sendRequest = useCallback(
    async function sendRequest(reqData) {
      setIsFetching(true);
      setError(null);
      try {
        const data = await sendHttpRequest(url, {
          ...config,
          body: reqData,
        });
        setFetchedData(data);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsFetching(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    isFetching,
    error,
    fetchedData,
    sendRequest,
    clearData,
  };
}
