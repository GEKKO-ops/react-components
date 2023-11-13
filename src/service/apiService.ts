export const fetchData = async (
  queryParam: string | undefined,
  page: number,
  startPage: boolean
) => {
  let url;
  if (startPage) {
    url = `https://rickandmortyapi.com/api/character/?name=${queryParam}`;
  } else if (queryParam) {
    url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${queryParam}`;
  } else {
    url = `https://rickandmortyapi.com/api/character/?page=${page}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};

export const fetchCharacter = async (id: string) => {
  const url = `https://rickandmortyapi.com/api/character/${id}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};
