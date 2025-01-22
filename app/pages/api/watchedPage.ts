export async function getWatchedList(ids: any[]) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const moviesId = ids
    .filter((item: any) => item.type === "movie")
    .map((item) => item.id);
  const tvId = ids
    .filter((item: any) => item.type === "tv")
    .map((item) => item.id);

  try {
    let responses: any = [];

    if (moviesId.length > 0) {
      responses = responses.concat(
        await Promise.all(
          moviesId.map((id) =>
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
          )
        )
      );
    }

    if (tvId.length > 0) {
      responses = responses.concat(
        await Promise.all(
          tvId.map((id) =>
            fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`)
          )
        )
      );
    }
    const content = responses.length
      ? await Promise.all(responses.map((res: any) => res.json()))
      : [];

    const newData = content.map((item: any) => ({
      ...item,
      media_type: item.first_air_date ? "tv" : "movie",
    }));

    return new Response(JSON.stringify(newData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getWatched(id: number, mediaType: string) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  try {
    let responses;

    if (mediaType === "movie") {
      responses = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
    } else {
      responses = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
      );
    }
    const content = await responses.json();

    const newData = {
      ...content,
      media_type: content.first_air_date ? "tv" : "movie",
    };

    return new Response(JSON.stringify(newData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
