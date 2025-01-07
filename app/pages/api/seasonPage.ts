export async function getSeasons(ids: any[]) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  try {
    const res = ids.map((id) =>
      fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`)
    );

    const content = await Promise.all(res.map((res: any) => res.json()));


    return new Response(JSON.stringify(content), { status: 200 });
    //res.status(200).json(movies);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getSeason(id: number, mediaType: string) {
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

    //console.log(content);

    const newData = {
      ...content,
      media_type: content.first_air_date ? "tv" : "movie",
    };

    //console.log("newData", newData);

    return new Response(JSON.stringify(newData), { status: 200 });
    //res.status(200).json(movies);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
