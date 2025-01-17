import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YoutubePlayerProps {
  unmute: boolean;
  isCarouselPlaying: boolean;
  videoKey?: string;
  VideoEnd: () => void;
  pause: boolean;
  reload:boolean
  handleReload:() => void;
  handleStarted:() => void;
  src:string
}

function YoutubePlayerMainCaroisel({
  isCarouselPlaying,
  videoKey,
  VideoEnd,
  unmute,
  pause,
  reload,
  handleReload,
  handleStarted,
  src
}: YoutubePlayerProps) {
  const [fadeOut, setFadeOut] = useState(true);
  const playerRef = useRef<any>(null); // Ref to store the player instance
  const [isReady, setIsReady] = useState(false);





  // YouTube player options
  const opts = {
    height: "100%", // Ensure it fills the height of the container
    width: "100%", // Ensure it fills the width of the container
    playerVars: {
      autoplay: isCarouselPlaying ? 1 : 0,
      mute: 1,
      controls: 0, // Hide the controls (play/pause, volume, etc.)
      modestbranding: 1, // Reduce YouTube branding
      rel: 0, // Don't show related videos at the end
      showinfo: 0, // Hide video title (deprecated but useful in some cases)
      disablekb: 1, // Disable keyboard controls
      loop: 0,
      fs: 0, // Disable fullscreen button
      vq: "hd1080", // Suggested video quality level to load
    },
  };



  useEffect(() => {
    if (playerRef.current) {
      if (pause) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  }, [pause]);


  useEffect(() => {
    if (playerRef.current) {
      if (unmute) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
    }
  }, [unmute]);


  useEffect(() => {
    if (playerRef.current && reload) {
      playerRef.current.seekTo(0); // Restart the video from the beginning
      //playerRef.current.playVideo(); // Play the video

      // Reset the reload state after the video has restarted
      setTimeout(() => {
        handleReload();
      }, 100); // Short timeout to allow reset
    }
  }, [reload]);



  // Event handler when the player is ready
  const onReady = (event: any) => {

    if (event && event.target) {
      playerRef.current = event.target; // Store player reference
      setIsReady(true);
  
      if (isCarouselPlaying) {
        playerRef.current.playVideo(); // Play the video if isCarouselPlaying is true
      }
  
      if (unmute) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
  
      playerRef.current.setPlaybackQuality('highres'); // Set to highest quality
  
      // Trigger fade-out and signal video started
      setTimeout(() => {
        setFadeOut(false);
        handleStarted();
      }, 2000);
    } else {
      console.error('Player reference is not available');
    }
  };

  const onEnd = (event: any) => {
    VideoEnd();
  };



  return (
    <div className="relative w-full h-full overflow-hidden">
      <YouTube
        videoId={videoKey}
        opts={opts}
        onReady={onReady}
        onEnd={onEnd}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          transform: `scale(1.5)`,
          transformOrigin: "center center",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-y-0 left-0 bg-gradient-to-tr from-customColor to-transparent w-full h-full z-20 opacity-100" />

      <img
        src={src}
        className={`absolute inset-0 bg-cover bg-center md:bg-top bg-no-repeat h-[25rem] md:h-[120vh] object-cover w-full mt-[4rem] md:mt-0 z-10 transition-opacity duration-500 ease-in-out ${
          fadeOut ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default YoutubePlayerMainCaroisel;
