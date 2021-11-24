import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { anilistAPI } from "../../utils/anilistAPI";

const jikanAPI = "https://api.jikan.moe/v3";
const traceMoeAPI = "https://api.trace.moe/search?url=";
const animeChan = "https://animechan.vercel.app/api/random";

export async function SEARCH_ANIME_BY_NAME(payload: string, page: number) {
  const data = await axios
    .get(`${jikanAPI}/search/anime?q=${payload}&page=${page}`)
    .then(async (response) => {
      return await response.data.results;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

export async function SEARCH_ANIME_BY_ID(id: string) {
  const data = await axios
    .get(`${jikanAPI}/anime/${id}`)
    .then(async (response) => {
      return await response.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

export async function SEARCH_ANIME_BY_IMAGE(payload: string) {
  console.log(payload);

  const data = await axios
    .get(`${traceMoeAPI}${payload}`)
    .then(async (response) => {
      const anime_name = await anilistAPI(response.data.result[0].anilist);
      const similarity = `${(response.data.result[0].similarity * 100).toFixed(
        0
      )}%`;
      const animeResults = await SEARCH_ANIME_BY_NAME(anime_name, 1);
      const data = {
        similarity,
        animeResults: await animeResults,
      };
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

export async function FETCH_QUOTE_ANIME() {
  const data = axios
    .get(animeChan)
    .then(async (response) => {
      const animeQuote = await response.data;
      const { anime, character, quote } = animeQuote;

      const data = await SEARCH_ANIME_BY_NAME(anime, 1);

      if (data.length > 0) {
        const id = await data[0].mal_id;
        const newData = {
          anime,
          character,
          quote,
          id,
        };
        return newData;
      } else {
        return animeQuote;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}

export async function SSG_HOME_PAGE() {
  async function getAnimeRandom() {
    const date = Math.floor(+new Date() / 1000);
    const myRandomFunctionAnime = date.toString().slice(4, 13).split("");
    const newArray = myRandomFunctionAnime
      .slice(1, 6)
      .map((x) => parseInt(x, 10));
    const sum = newArray.reduce(function (sum, i) {
      return sum + i;
    });
    const id = await axios
      .get(`${jikanAPI}/top/anime/${myRandomFunctionAnime[0]}/tv`)
      .then(async (response) => {
        return await response.data.top[sum].mal_id.toString();
      })
      .catch((error) => {
        console.error(error);
      });
    return parseInt(id, 10);
  }

  const TopAiring = axios
    .get(`${jikanAPI}/top/anime/1/airing`)
    .then(async (response) => {
      return await response.data.top.slice(0, 5);
    })
    .catch((error) => {
      console.error(error);
    });

  const TopPop = axios
    .get(`${jikanAPI}/top/anime/1/bypopularity`)
    .then(async (response) => {
      return await response.data.top.slice(0, 10);
    })
    .catch((error) => {
      console.error(error);
    });

  const data = {
    animeTodayID: await getAnimeRandom(),
    topAiring: await TopAiring,
    topPopular: await TopPop,
  };
  return data;
}

export default async function WhatAnimeAPI(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const params = request.query.params;
  response.setHeader("Cache-Control", "s-maxage=5, stale-while-revalidate");

  if (request.method === "GET") {
    if (params[0] === "anime") {
      switch (params[1]) {
        case "name":
          const ANIME_BY_NAME = await SEARCH_ANIME_BY_NAME(
            params[2],
            parseInt(params[3], 10)
          );
          return response.status(200).json(ANIME_BY_NAME);
        case "id":
          const ANIME_BY_ID = await SEARCH_ANIME_BY_ID(params[2]);
          return response.status(200).json(ANIME_BY_ID);
        case "image":
          const url = request.url?.replace("/api/anime/image/", "");
          if (typeof url === "string") {
            const ANIME_BY_IMAGE = await SEARCH_ANIME_BY_IMAGE(url);
            return response.status(200).json(ANIME_BY_IMAGE);
          }
      }
    } else if (params[0] === "quote") {
      const QUOTE_ANIME = await FETCH_QUOTE_ANIME();
      return response.status(200).json(QUOTE_ANIME);
    } else if (params[0] === "home") {
      const HOME_PAGE_DATA = await SSG_HOME_PAGE();
      return response.status(200).json(HOME_PAGE_DATA);
    }
  }
  return response.status(404).json({
    error: {
      code: "not_found",
      message:
        "The requested endpoint was not found or doesn't support this method.",
    },
  });
}
