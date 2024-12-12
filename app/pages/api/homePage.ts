export async function getUpcoming() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&region=US`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    //console.log(data);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getPopular() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&region=US&sort_by=popularity.desc&vote_count.gte=100&vote_average.gte=7`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Filter results to ensure the original language is English
    const filteredData = data.results.filter(
      (movie: any) => movie.original_language === "en"
    );

    //console.log(filteredData);

    return new Response(JSON.stringify(filteredData), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getNowPlaying() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  // const today = new Date().toISOString().split("T")[0];
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&region=US`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getTrending() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  // const today = new Date().toISOString().split("T")[0];
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&region=US`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getNewReleases() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  // const today = new Date().toISOString().split("T")[0]; // Get today's date
  // const startDate = new Date(new Date().setDate(new Date().getDate() - 60)) // 30 days ago
  //   .toISOString()
  //   .split("T")[0]; // Adjust to your desired time range

  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&region=US&sort_by=popularity.desc&vote_count.gte=100&vote_average.gte=7`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getTrendingSeries() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  // const today = new Date().toISOString().split("T")[0];
  const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&region=US`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Filter results to ensure the original language is English
    const filteredData = data.results.filter(
      (movie: any) => movie.original_language === "en"
    );

    //console.log(filteredData);

    return new Response(JSON.stringify(filteredData), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

//This only has movies, so I need to make other calls if i want to include other swiperes of series

export async function getNewOnNetflix() {
  // const url =
  //   "https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&order_direction=desc&order_by=release_date&year_min=2024&show_original_language=en&output_language=en&show_type=movie&catalogs=netflix&rating_min=60"; //show_type=movie
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-key": "fea68af338mshcbba231507b945ap1efc48jsn1fb59f860ffb",
  //     "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
  //   },
  // };

  try {
    const response = await fetch(url, options);

    console.log("API Response Status:", response.status);

    const data = await response.json();

    const items = data.shows;

    //console.log(items);

    // Fetch and normalize image data
    const normalizedItems = await Promise.all(
      items.map(async (item: any) => {
        try {
          //const mediaType = item.showType;
          //console.log(mediaType);

          const id = parseInt(item.tmdbId.split("/")[1], 10);
          const responseImage = await getTmdbInfo(id);
          const dataImage = await responseImage.json();
          //console.log("Image Data:", dataImage);

          const poster = dataImage.find((img: any) => img.file_path) || {};
          return {
            ...item,
            poster_path: poster.file_path || null,
          };
        } catch (error) {
          console.error(`Error normalizing item ${item.tmdbId}:`, error);
          return null; // Or handle as needed
        }
      })
    );

    const validItems = normalizedItems.filter(
      (media) => media !== null && media !== undefined
    );

    //console.log("validItems Netflix:", validItems);

    return new Response(JSON.stringify(validItems), { status: 200 });
  } catch (error) {
    console.error("Error in getTrendingSeries:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getTmdbInfo(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    const englishPosters = data.posters.filter(
      (poster: any) => poster.iso_639_1 === "en"
    );

    //console.log(englishPosters);

    return new Response(JSON.stringify(englishPosters), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getNewOnHulu() {
  // const url =
  //   "https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&order_direction=desc&order_by=release_date&year_min=2024&show_original_language=en&output_language=en&show_type=movie&catalogs=hulu&rating_min=60"; //show_type=movie
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-key": "fea68af338mshcbba231507b945ap1efc48jsn1fb59f860ffb",
  //     "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
  //   },
  // };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const items = data.shows;

    // Fetch and normalize image data
    const normalizedItems = await Promise.all(
      items.map(async (item: any) => {
        try {
          //const mediaType = item.showType;
          const id = parseInt(item.tmdbId.split("/")[1], 10); // Convert to number
          const responseImage = await getTmdbInfo(id);
          const dataImage = await responseImage.json();

          // Find the first English poster and normalize it to `poster_path`
          const poster = dataImage.find((img: any) => img.file_path) || {};
          return {
            ...item, //If you remove ...item and write the return statement like this: The returned object will only have the poster_path property. All the other properties from item (like title, tmdbId, release_date, etc.) will be missing in the final object.
            poster_path: poster.file_path || null, // Normalize `file_path` to `poster_path`, so renaming file_path to poster_path while keeping all the other properties from the original item intact.
          };
        } catch (error) {
          console.error(`Error normalizing item ${item.tmdbId}:`, error);
          return null; // Or handle as needed
        }
      })
    );

    const validItems = normalizedItems.filter(
      (media) => media !== null && media !== undefined
    );

    // console.log("validItems Hulu:", validItems);

    return new Response(JSON.stringify(validItems), { status: 200 });
  } catch (error) {
    console.error("Error in getTrendingSeries:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getNewOnPrime() {
  // const url =
  //   "https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&order_direction=desc&order_by=release_date&year_min=2024&show_original_language=en&output_language=en&show_type=movie&catalogs=prime&rating_min=60"; //show_type=movie
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-key": "fea68af338mshcbba231507b945ap1efc48jsn1fb59f860ffb",
  //     "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
  //   },
  // };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const items = data.shows;

    // Fetch and normalize image data
    const normalizedItems = await Promise.all(
      items.map(async (item: any) => {
        try {
          //const mediaType = item.showType;
          const id = parseInt(item.tmdbId.split("/")[1], 10); // Convert to number
          const responseImage = await getTmdbInfo(id);
          const dataImage = await responseImage.json();

          // Find the first English poster and normalize it to `poster_path`
          const poster = dataImage.find((img: any) => img.file_path) || {};
          return {
            ...item, //If you remove ...item and write the return statement like this: The returned object will only have the poster_path property. All the other properties from item (like title, tmdbId, release_date, etc.) will be missing in the final object.
            poster_path: poster.file_path || null, // Normalize `file_path` to `poster_path`, so renaming file_path to poster_path while keeping all the other properties from the original item intact.
          };
        } catch (error) {
          console.error(`Error normalizing item ${item.tmdbId}:`, error);
          return null; // Or handle as needed
        }
      })
    );

    const validItems = normalizedItems.filter(
      (media) => media !== null && media !== undefined
    );

    // console.log("validItems Prime:", validItems);

    return new Response(JSON.stringify(validItems), { status: 200 });
  } catch (error) {
    console.error("Error in getTrendingSeries:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getAction() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const actionAndAdventureMovies = 28;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${actionAndAdventureMovies}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getAdventure() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const actionAndAdventureMovies = 12;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${actionAndAdventureMovies}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getHorror() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const horror = 27;
  const animation = 16;

  try {
    const allPagesData: any[] = [];

    // Loop through the desired pages (e.g., page 1 and 2)
    for (let page = 1; page <= 2; page++) {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${horror}&page=${page}&without_genres=${animation}`;
      const response = await fetch(url);
      const data = await response.json();

      // Filter results to ensure the original language is English
      const filteredData = data.results.filter(
        (movie: any) => movie.original_language === "en"
      );

      // Append the filtered data to the allPagesData array
      allPagesData.push(...filteredData);
    }

    return new Response(JSON.stringify(allPagesData), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getThriller() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const animation = 16;
  const thriller = 53;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${thriller}&without_genres=${animation}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getTeaserMovieVideo(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    //console.log(data);

    // Filter teasers
    let teasers = data.results.filter(
      (item: any) => item.type === "Teaser" && item.official === true
    );

    // If no Teasers, fallback to Trailers
    if (teasers.length === 0) {
      teasers = data.results.filter(
        (item: any) => item.type === "Trailer" && item.official === true
      );
    }

    //console.log(teasers);

    // Sort by published_at date in ascending order
    const sortedTeasers = teasers.sort(
      (a: any, b: any) =>
        new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
    );

    // Get the first teaser released
    const firstTeaser = sortedTeasers.length > 0 ? sortedTeasers[0] : null;
    //console.log(firstTeaser);

    return new Response(JSON.stringify(firstTeaser), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}





export async function getTeaserSeriesVideo(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    //console.log(data);

    // Filter teasers
    const trailers = data.results.filter(
      (item: any) => item.type === "Trailer" && item.official === true
    );

    // Sort by published_at date in ascending order
    const sortedTeasers = trailers.sort(
      (a: any, b: any) =>
        new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
    );

    // Get the first teaser released
    const firstTeaser = sortedTeasers.length > 0 ? sortedTeasers[0] : null;
    //console.log(firstTeaser);

    return new Response(JSON.stringify(firstTeaser), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}



export async function getRatings(id: string) {
  const url = `https://film-show-ratings.p.rapidapi.com/item/?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "fea68af338mshcbba231507b945ap1efc48jsn1fb59f860ffb",
      "x-rapidapi-host": "film-show-ratings.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    //console.log(data);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
