import { useState, useEffect } from 'react';

export default (httpClient) => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
      return Promise.reject(err);
    },
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.response.eject(resInterceptor);
      httpClient.interceptors.request.eject(reqInterceptor);
    };
  }, [httpClient, resInterceptor, reqInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
