export const fetchWrapper = (domain: string) => ({
  get: <R>(url: string): Promise<R> => _get(domain + url),
  post: <R>(url: string, body: Record<string, any>): Promise<R> =>
    _post(domain + url, body),
  put: <R>(url: string, body: Record<string, any>): Promise<R> =>
    _put(domain + url, body),
  delete: <R>(url: string): Promise<R> => _delete(domain + url),
});

const _get = (url: string) => {
  const requestOptions = {
    method: 'GET',
  };
  return fetch(url, requestOptions).then((res) => res.json());
};

const _post = (url: string, body: Record<string, any>) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then((res) => res.json());
};

const _put = (url: string, body: Record<string, any>) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then((res) => res.json());
};

const _delete = (url: string) => {
  const requestOptions = {
    method: 'DELETE',
  };
  return fetch(url, requestOptions).then((res) => res.json());
};
