export async function getSeriesDetails(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const today = new Date().toISOString().split("T")[0]; 
  const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`;

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

export async function getTrailerSeriesVideo(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const trailers = data.results.filter(
      (item: any) => item.type === "Trailer" && item.official === true
    );

    const sortedTrailer = trailers.sort(
      (a: any, b: any) =>
        new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
    );

    const firstTrailer = sortedTrailer.length > 0 ? sortedTrailer[0] : null;

    return new Response(JSON.stringify(firstTrailer), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getSeriesCertification(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const url = `https://api.themoviedb.org/3/tv/${id}/content_ratings?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const filteredCertification = data.results.filter((item: any) => {
      return item.iso_3166_1 === "US";
    });

    return new Response(JSON.stringify(filteredCertification[0].rating), {
      status: 200,
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getSeriesRatings(id: string) {
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

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
  }
}

export async function getSeriesSocials(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const url = `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${apiKey}`;

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

export async function getCast(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const formattedCast = data.cast
      .slice(0, 20)
      .map(
        (member: {
          id: any;
          name: any;
          character: any;
          profile_path: any;
        }) => ({
          id: member.id,
          name: member.name,
          character: member.character,
          picture: `https://image.tmdb.org/t/p/w500${member.profile_path}`,
        })
      );
    return new Response(JSON.stringify(formattedCast), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getDirector(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    const director = data.crew.filter((item: any) => item.job === "Director");

    return new Response(JSON.stringify(director[0].name), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getWatchProviders(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data.results.US), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getReviews(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return new Response(JSON.stringify(data.results), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getCollection(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/collection/${id}?api_key=${apiKey}`;
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

export async function getSimilarMovies(genres: any[]) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const genreIds = genres
    .slice(0, 2)
    .map((genre) => genre.id)
    .join(",");

  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&region=US&vote_count.gte=100&vote_average.gte=7&sort_by=popularity.desc&with_genres=${genreIds}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data.results), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getRecommendation(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1&region=US&sort_by=primary_release_date.desc`;
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

export async function getFallBackRecommendation() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/now_playing?api_key=${apiKey}&region=US`;

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

export async function getImdbId(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data.imdb_id), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getSeriesRuntime(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/${id}/season/1?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const runtime = data.episodes.map((item: any) => {
      return item.runtime;
    });

    const totalRuntime = runtime.reduce(
      (sum: number, item: number) => sum + item,
      0
    );

    const averageRuntime =
      runtime.length > 0 ? Math.round(totalRuntime / runtime.length) : 0;

    return new Response(JSON.stringify(averageRuntime), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
