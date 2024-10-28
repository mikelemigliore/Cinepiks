import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YoutubeTrailerPlayerProps {
  //   unmute: boolean;
  //   isCarouselPlaying: boolean;
  videoKey: string;
  //   VideoEnd: () => void;
  //   pause: boolean;
  //   reload:boolean
  //   handleReload:() => void;
  //   handleStarted:() => void;
  src: string;
}

function YoutubeTrailerPlayer({
  //isCarouselPlaying,
  videoKey,
  src,
}: //   VideoEnd,
//   unmute,
//   pause,
//   reload,
//   handleReload,
//   handleStarted,
//   src
YoutubeTrailerPlayerProps) {
  const [fadeOut, setFadeOut] = useState(true);

  // YouTube player options
  const opts = {
    height: "100%", // Ensure it fills the height of the container
    width: "100%", // Ensure it fills the width of the container
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 1, // Hide the controls (play/pause, volume, etc.)
      modestbranding: 1, // Reduce YouTube branding
      rel: 0, // Don't show related videos at the end
      showinfo: 0, // Hide video title (deprecated but useful in some cases)
      disablekb: 1, // Disable keyboard controls
      loop: 0,
      fs: 1, // Disable fullscreen button
      vq: "hd1080", // Suggested video quality level to load
    },
  };

  // Event handler when the player is ready
  // const onReady = (event: any) => {

  //   if (event && event.target) {
  //     playerRef.current = event.target; // Store player reference
  //     setIsReady(true);

  //     if (isCarouselPlaying) {
  //       playerRef.current.playVideo(); // Play the video if isCarouselPlaying is true
  //     }

  //     if (unmute) {
  //       playerRef.current.unMute();
  //     } else {
  //       playerRef.current.mute();
  //     }

  //     playerRef.current.setPlaybackQuality('highres'); // Set to highest quality

  //     // Trigger fade-out and signal video started
  //     setTimeout(() => {
  //       setFadeOut(false);
  //       handleStarted();
  //     }, 2000);
  //   } else {
  //     console.error('Player reference is not available');
  //   }
  // };

//   const onEnd = (event: any) => {
//     setFadeOut(true);
//   };

//   const onReady = (event: any) => {
//     setTimeout(() => {
//       setFadeOut(false);
//     }, 2000);
//   };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-3xl">
      {/* <img
        src={src}
        className={`absolute inset-0 bg-cover bg-center md:bg-top bg-no-repeat md:w-full md:h-full h-[25rem] mt-[4rem] md:mt-0 z-10 transition-opacity duration-500 ease-in-out ${
          fadeOut ? "opacity-100" : "opacity-0 pointer-events-none"//pointer-events: none; lets you "disable" the image's interactivity when it's faded out, so you can interact with the player without the image blocking it.
        }`}
      /> */}
      <YouTube
        videoId={videoKey}
        opts={opts}
        // onReady={onReady}
        // onEnd={onEnd}
        className="absolute top-0 left-0 w-full h-full"
        style={{
          transform: "scale(1)",
          transformOrigin: "center center",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      {/* <img
        src={src}
        className={`absolute inset-0 bg-cover bg-center md:bg-top bg-no-repeat md:w-full md:h-full h-[25rem] mt-[4rem] md:mt-0 z-10 transition-opacity duration-500 ease-in-out ${
          fadeOut ? "opacity-100" : "opacity-0"
        }`}
      /> */}
    </div>
  );
}

export default YoutubeTrailerPlayer;
