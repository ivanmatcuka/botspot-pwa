import { customUrl, MenuItem } from '.';
import { fetchEntity } from './fetchEntity';

export const getNavigations = async (): Promise<MenuItem[]> => {
  const data = await fetchEntity<MenuItem[]>(`${customUrl}/navigations/`);
  return data ?? [];
};
