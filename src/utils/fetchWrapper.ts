/* eslint-disable @typescript-eslint/no-unused-vars */
export const fetchWrapper = (domain: string) => ({
  get: <R, E extends null = any>(url: string) => _get<R, E>(domain + url),
  post: <R, E extends null = any>(url: string, body: Record<string, any>) =>
    _post<R, E>(domain + url, body),
  put: <R, E extends null = any>(url: string, body: Record<string, any>) =>
    _put<R, E>(domain + url, body),
  delete: <R, E extends null = any>(url: string) => _delete<R, E>(domain + url),
});

const _get = <R, E>(url: string) => {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(url, requestOptions).then((res) => res.json());
};

const _post = <R, E>(url: string, body: Record<string, any>) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then((res) => res.json());
};

const _put = <R, E>(url: string, body: Record<string, any>) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then((res) => res.json());
};

const _delete = <R, E>(url: string) => {
  const requestOptions = {
    method: 'DELETE',
  };
  return fetch(url, requestOptions).then((res) => res.json());
};
