export const fetchData = (queryParam: string | undefined) => {
  let url;
  if (queryParam) {
    url = `https://rickandmortyapi.com/api/character/?name=${queryParam}`;
  } else {
    url = 'https://rickandmortyapi.com/api/character/';
  }

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
};
