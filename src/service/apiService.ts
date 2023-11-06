export const fetchData = async (
  queryParam: string | undefined,
  page: string,
  pageSize: string,
  startPage: boolean
) => {
  let url;
  if (startPage) {
    url = `https://belka.romakhin.ru/api/v1/rimorti?search.name=${queryParam}`;
  } else if (queryParam || pageSize) {
    url = `https://belka.romakhin.ru/api/v1/rimorti?page=${
      Number(page) - 1
    }&page_size=${pageSize}&search.name=${queryParam}`;
  } else {
    url = 'https://belka.romakhin.ru/api/v1/rimorti';
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};

export const fetchCharacter = async (id: string) => {
  const url = `https://belka.romakhin.ru/api/v1/rimorti/${id}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
};
