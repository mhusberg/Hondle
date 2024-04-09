import { Hero } from "../App";

export const getHeroOfTheDay = (date: Date, heroes: Hero[]) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hash = day + month + year;
    const dayIndex = hash % heroes.length;
    console.log(heroes[dayIndex]);
    return heroes[dayIndex];
  };
