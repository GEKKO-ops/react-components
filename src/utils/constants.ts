import { ApiData, IApi } from './types/types';

const searchResults: IApi = {
  id: 0,
  name: '',
  status: '',
  species: '',
  gender: '',
  image: '',
};

export const searchApiResults: ApiData = {
  results: [searchResults],
  total: 0,
};
