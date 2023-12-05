export const fetchData = async (
  queryParam: string | undefined,
  page: string,
  pageSize: string
) => {
  let url;
  if (queryParam) {
    url = `https://belka.romakhin.ru/api/v1/rimorti?search.name=${queryParam}&page=${
      Number(page) - 1
    }&page_size=${pageSize}`;
  } else {
    url = `https://belka.romakhin.ru/api/v1/rimorti?page=${
      Number(page) - 1
    }&page_size=${pageSize}`;
  }

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchCharacter = async (id: string) => {
  const url = `https://belka.romakhin.ru/api/v1/rimorti/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
};
