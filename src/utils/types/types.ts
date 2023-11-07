export interface IApi {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

export interface ApiData {
  results: IApi[];
  total: number;
}
