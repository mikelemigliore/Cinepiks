export async function getMovieDetails(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getTrailerMovieVideo(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const trailers = data.results.filter(
      (item: any) => item.type === "Trailer" && item.official === true
    );

    // Sort by published_at date in ascending order
    const sortedTrailer = trailers.sort(
      (a: any, b: any) =>
        new Date(a.published_at).getTime() - new Date(b.published_at).getTime()
    );

    // Get the first trailer released
    const firstTrailer = sortedTrailer.length > 0 ? sortedTrailer[0] : null;

    return new Response(JSON.stringify(firstTrailer), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getMovieCertification(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const url = `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${apiKey}`;

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

export async function getSocials(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const url = `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${apiKey}`;

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

export async function getCast(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
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
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
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
