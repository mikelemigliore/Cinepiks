export async function getLoginMainCarousel() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  // const today = new Date().toISOString().split("T")[0]; 
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

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


export async function getGenres() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

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


export async function getPopular() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  // const today = new Date().toISOString().split("T")[0]; 
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&region=US`;

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


export async function getUpcoming() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&region=US`;

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



export async function getMovieDetails(id:number , mediaType:string) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}`;

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


export async function getSeriesDetails(id:number , mediaType:string) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}`;

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


export async function getMovieCertification(id:number, mediaType:string) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}/release_dates?api_key=${apiKey}`;

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