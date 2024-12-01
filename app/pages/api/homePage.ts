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
  const url =
    "https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&order_direction=desc&order_by=release_date&year_min=2024&show_original_language=en&output_language=en&catalogs=netflix&show_type=movie";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "fea68af338mshcbba231507b945ap1efc48jsn1fb59f860ffb",
      "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const items = data.shows;

    // Fetch and normalize image data
    const normalizedItems = await Promise.all(
      items.map(async (item:any) => {
        const id = parseInt(item.tmdbId.split("/")[1], 10); // Convert to number
        const responseImage = await getImage(id);
        const dataImage = await responseImage.json();

        // Find the first English poster and normalize it to `poster_path`
        const poster = dataImage.find((img:any) => img.file_path) || {};
        return {
          ...item,
          poster_path: poster.file_path || null, // Normalize `file_path` to `poster_path`
        };
      })
    );

    return new Response(JSON.stringify(normalizedItems), { status: 200 });
  } catch (error) {
    console.error("Error in getTrendingSeries:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

export async function getImage(id: number) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    const englishPosters = data.posters.filter(
      (poster: any) => poster.iso_639_1 === "en"
    );

    console.log(englishPosters);
    

    return new Response(JSON.stringify(englishPosters), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}

// if (tmdbId) {
//   tmdbId.map(async (id) => {
//     const responseImage = await getImage(id);
//     const dataImage = await responseImage.json();

//     const englishPosters = dataImage.posters.filter(
//       (poster: any) => poster.iso_639_1 === "en"
//     );

//     const filePaths = englishPosters.map(
//       (poster: any) => poster.file_path
//     );

//     setImage(filePaths[0]);
//   });
// }

// export async function getTrendingSeries() {
//   const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
//   // const today = new Date().toISOString().split("T")[0];
//   const url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&region=US`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch {
//     return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
//       status: 500,
//     });
//   }
// }

// export async function getStreamingServicesMovie() {
//   const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
//   // const today = new Date().toISOString().split("T")[0];
//   const url = `https://api.themoviedb.org/3/watch/providers/movie?api_key=${apiKey}&region=US`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch {
//     return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
//       status: 500,
//     });
//   }
// }
