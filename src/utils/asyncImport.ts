import { withAsync } from '@hoc';
import { Pages } from '../models/pages';

export const importAsyncPage = (page: Pages) =>
  withAsync(() => import('../pages').then((m) => m[page]));
