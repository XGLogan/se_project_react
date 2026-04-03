export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/Day/Sunny.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/Day/Cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/Day/Rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/Night/Night.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/Night/CloudyNight.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/Night/RainNight.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/Day/Cloudy.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/Night/RainNight.png", import.meta.url).href,
  },
};

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "warm",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
  {
    _id: 4,
    name: "Shorts",
    weather: "hot",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Shorts.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    imageUrl:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];

export const coordinates = {
  longitude: -73.6111,
  latitude: 40.7088,
};

export const APIkey = "9a3a96fe1985a7df16d56592a6650978";
