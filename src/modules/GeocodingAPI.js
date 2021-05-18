const APIKey = "d00251ce110d25d4425b2eede28a4a09";


export default async function getCoordinates(city) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`
  );
  const data = await response.json();
  return data[0];
}
