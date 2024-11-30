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
    const today = new Date().toISOString().split("T")[0]; // Get today's date
    const startDate = new Date(new Date().setDate(new Date().getDate() - 7)) // 30 days ago
      .toISOString()
      .split("T")[0]; // Adjust to your desired time range
  
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&region=US&primary_release_date.gte=${today}&sort_by=primary_release_date.desc`;
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