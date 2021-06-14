import { fetchWrapper } from '../utils/fetchWrapper';

export const { get, post, put } = fetchWrapper('http://localhost:3000');
