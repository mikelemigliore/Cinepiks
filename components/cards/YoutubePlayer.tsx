import React, { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";

interface YoutubePlayerProps {
  isPlaying: boolean;
  fadeOut: boolean;
  videoKey: string;
  unmute: boolean;
  VideoEnd: () => void;
}

const YoutubePlayer = ({
  isPlaying,
  fadeOut: fadeOutProp,
  videoKey,
  unmute,
  VideoEnd,
}: YoutubePlayerProps) => {
  const [fadeOut, setFadeOut] = useState(fadeOutProp);
  const playerRef = useRef<any>(null); // To store player reference

  // YouTube player options
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

  // Event handler when the player is ready
  const onReady = (event: any) => {
    playerRef.current = event.target; // Store player reference

    if (isPlaying && playerRef.current) {
      playerRef.current.playVideo(); // Only call playVideo if playerRef.current is not null
    }

    // Set mute/unmute based on the initial prop
    if (playerRef.current) {
      if (unmute) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
    }

    setTimeout(() => {
      setFadeOut(true);
    }, 2000); // 2-second delay for the fade-out effect
  };

  // Clean up the player when the component unmounts
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current = null; // Reset reference to avoid lingering issues
      }
    };
  }, []);

  // Ensure mute/unmute behavior is handled properly on state change
  useEffect(() => {
    if (playerRef.current) {
      if (unmute) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
    }
  }, [unmute]);

  // Defensive check in case playerRef is null
  useEffect(() => {
    if (isPlaying && playerRef.current) {
      playerRef.current.playVideo();
    }
  }, [isPlaying]);

  return (
    <div>
      <img
        src="https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg"
        className={`absolute top-0 left-0 w-full h-full object-cover z-10 transition-opacity duration-500 ease-in-out ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      />
      <YouTube
        videoId={videoKey}
        opts={opts}
        onReady={onReady}
        onEnd={VideoEnd}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ transform: "scale(1.7)", objectFit: "cover", zIndex: 1 }}
      />
    </div>
  );
};

export default YoutubePlayer;









// import React, { useEffect, useState, useRef } from "react";
// import YouTube from "react-youtube";

// interface YoutubePlayerProps {
//   isPlaying: boolean;
//   fadeOut: boolean;
//   videoKey: string;
//   unmute: boolean;
//   VideoEnd: () => void;
// }

// const YoutubePlayer = ({
//   isPlaying,
//   fadeOut: fadeOutProp,
//   videoKey,
//   unmute,
//   VideoEnd,
// }: YoutubePlayerProps) => {
//   const [fadeOut, setFadeOut] = useState(fadeOutProp);
//   const playerRef = useRef<any>(null); // To store player reference

//   // YouTube player options
//   const opts = {
//     height: "100%", // Ensure it fills the height of the container
//     width: "100%", // Ensure it fills the width of the container
//     playerVars: {
//       autoplay: isPlaying ? 1 : 0,
//       mute: 1,
//       controls: 1, // Hide the controls (play/pause, volume, etc.)
//       modestbranding: 1, // Reduce YouTube branding
//       rel: 0, // Don't show related videos at the end
//       showinfo: 0, // Hide video title (deprecated but useful in some cases)
//       disablekb: 1, // Disable keyboard controls
//       loop: 0,
//       fs: 0, // Disable fullscreen button
//     },
//   };

//   // Event handler when the player is ready
//   const onReady = (event: any) => {
//     playerRef.current = event.target; // Store player reference
//     console.log(playerRef.current);

//     if (isPlaying) {
//       if (playerRef.current) {
//         playerRef.current.playVideo(); // Only call playVideo if playerRef.current is not null
//       }
//     }

//     // Set mute/unmute based on the initial prop
//     if (unmute) {
//       playerRef.current.unMute();
//     } else {
//       playerRef.current.mute();
//     }

//     // Trigger the fade-out effect after a 2-second delay
//     setTimeout(() => {
//       setFadeOut(true);
//     }, 2000); // 2-second delay for the fade-out effect
//   };

//   const onEnd = (event: any) => {
//     VideoEnd();
//   };

//   // Handle mute/unmute changes without restarting the video
//   useEffect(() => {
//     if (playerRef.current) {
//       if (unmute) {
//         playerRef.current.unMute();
//       } else {
//         playerRef.current.mute();
//       }
//     }
//   }, [unmute]);


//   return (
//     <div>
//       <img
//         src="https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg"
//         className={`absolute top-0 left-0 w-full h-full object-cover z-10 transition-opacity duration-500 ease-in-out ${
//           fadeOut ? "opacity-0" : "opacity-100"
//         }`}
//       />
//       <YouTube
//         videoId={videoKey}
//         opts={opts}
//         onReady={onReady}
//         onEnd={onEnd}
//         className="absolute top-0 left-0 w-full h-full pointer-events-none"
//         style={{ transform: "scale(1.5)", objectFit: "cover", zIndex: 1 }}
//       />
//     </div>
//   );
// };

// export default YoutubePlayer;
