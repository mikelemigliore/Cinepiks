// //import { getTrailerVideo } from "@/app/pages/api/homePage";
// import React, { useEffect, useState, useRef } from "react";
// import YouTube from "react-youtube";

// interface YoutubePlayerProps {
//   isPlaying: boolean;
//   fadeOut: boolean;
//   videoKey?: string;
//   unmute: boolean;
//   VideoEnd: () => void;
//   imgBackdrop?: string;
//   //id: number;
// }

// const YoutubePlayer = ({
//   isPlaying,
//   fadeOut: fadeOutProp,
//   videoKey,
//   unmute,
//   VideoEnd,
//   imgBackdrop,
//   //id,
// }: YoutubePlayerProps) => {
//   const [fadeOut, setFadeOut] = useState(fadeOutProp);
//   const playerRef = useRef<any>(null);

//   const opts = {
//     height: "100%",
//     width: "100%",
//     playerVars: {
//       autoplay: isPlaying ? 1 : 0,
//       mute: 1,
//       controls: 1,
//       modestbranding: 1,
//       rel: 0,
//       showinfo: 0,
//       disablekb: 1,
//       loop: 0,
//       fs: 0,
//     },
//   };

//   const onReady = (event: any) => {
//     playerRef.current = event.target;

//     if (isPlaying && playerRef.current) {
//       playerRef.current.playVideo();
//     }

//     if (playerRef.current) {
//       if (unmute) {
//         playerRef.current.unMute();
//       } else {
//         playerRef.current.mute();
//       }
//     }

//     setTimeout(() => {
//       setFadeOut(true);
//     }, 2000);
//   };



//   const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";

//   return (
//     <div>
//       <img
//         src={`${BASE_IMAGE_URL}${imgBackdrop}`}
//         className={`absolute top-0 left-0 w-full h-full object-cover z-10 transition-opacity duration-500 ease-in-out ${
//           fadeOut ? "opacity-0" : "opacity-100"
//         }`}
//       />
//       <YouTube
//         videoId={videoKey}
//         opts={opts}
//         onReady={onReady}
//         onEnd={VideoEnd}
//         //onError={onError}
//         className="absolute top-0 left-0 w-full h-full pointer-events-none"
//         style={{ transform: "scale(1.7)", objectFit: "cover", zIndex: 1 }}
//       />
//     </div>
//   );
// };

// export default YoutubePlayer;





import React, { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";

interface YoutubePlayerProps {
  isPlaying: boolean;
  fadeOut: boolean;
  videoKey?: string;
  unmute: boolean;
  VideoEnd: () => void;
  imgBackdrop?: string;
}

const YoutubePlayer = ({
  isPlaying,
  fadeOut: fadeOutProp,
  videoKey,
  unmute,
  VideoEnd,
  imgBackdrop,
}: YoutubePlayerProps) => {
  const [fadeOut, setFadeOut] = useState(fadeOutProp);
  const [error, setError] = useState(false);
  const playerRef = useRef<any>(null);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: isPlaying ? 1 : 0,
      mute: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      disablekb: 1,
      loop: 0,
      fs: 0,
    },
  };

  const onReady = (event: any) => {
    playerRef.current = event.target;

    if (isPlaying && playerRef.current) {
      playerRef.current.playVideo();
    }

    // Apply mute/unmute state initially
    if (playerRef.current) {
      if (unmute) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
    }

    setTimeout(() => {
      setFadeOut(true);
    }, 2000);
  };

  // Watch for changes to `unmute` and update the player dynamically
  useEffect(() => {
    if (playerRef.current) {
      if (unmute) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
    }
  }, [unmute]);

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";


  const onError = (event: any) => {
    const errorCode = event.data;
    if (errorCode === 101 || errorCode === 150) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div>
      <img
        src={`${BASE_IMAGE_URL}${imgBackdrop}`}
        className={`absolute top-0 left-0 w-full h-full object-cover z-10 transition-opacity duration-500 ease-in-out ${
          fadeOut && !error ? "opacity-0" : "opacity-100"
        }`}
      />
      <YouTube
        videoId={videoKey}
        opts={opts}
        onReady={onReady}
        onEnd={VideoEnd}
        onError={onError}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ transform: "scale(1.7)", objectFit: "cover", zIndex: 1 }}
      />
    </div>
  );
};

export default YoutubePlayer;