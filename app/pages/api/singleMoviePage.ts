export async function getDetails(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const type = await getItemType(id);
  const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`;

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

async function getItemType(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  try {
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
    );
    if (movieResponse.ok) {
      return "movie";
    }
  } catch {}

  try {
    const tvResponse = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
    );
    if (tvResponse.ok) {
      return "tv";
    }
  } catch {}

  return "unknown";
}


export async function getReviews(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`;
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
