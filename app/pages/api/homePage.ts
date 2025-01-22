import { getDetails } from "./singleMoviePage";

export async function getTmdbInfo(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const type = await getItemType(id);
  const url = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    const id = data.id;
    const itemDetails = await getDetails(id);
    const dataItem = await itemDetails.json();

    return new Response(JSON.stringify(dataItem), { status: 200 });
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

export async function getTrailerMovieVideo(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

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
