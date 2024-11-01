import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

interface YoutubeTrailerPlayerProps {
  videoKey: string;
  src: string;
  autoplay?: boolean;
  play?: boolean;
  handlePlay: () => void;
  setIsLoading: (loading: boolean) => void; // Add prop to manage loading state
  pause?: boolean;
  reload?: boolean;
  handleReload: () => void;
  handleEnd: () => void;
  unmute?: boolean;
  isListView?: boolean;
}

function YoutubeTrailerPlayer({
  videoKey,
  src,
  autoplay,
  play,
  handlePlay,
  setIsLoading,
  unmute,
  reload,
  handleReload,
  isListView,
  handleEnd
}: YoutubeTrailerPlayerProps) {
  const [fadeOut, setFadeOut] = useState(true);
  const playerRef = useRef<any>(null);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: autoplay ? 0 : 1,
      mute: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      disablekb: 1,
      loop: 0,
      fs: 1,
      vq: "hd1080",
    },
  };

  const onEnd = () => {
    setFadeOut(true);
    handleEnd(); // This should reset the play state
    playerRef.current.playVideo();
  };

  const onReady = (event: any) => {
    playerRef.current = event.target;
    setIsLoading(false); // Video is ready, hide loading spinner
  };

  useEffect(() => {
    if (playerRef.current) {
      if (play) {
        // Play the video
        playerRef.current.playVideo();
        setFadeOut(false);
      } else {
        // Pause the video
        playerRef.current.pauseVideo();
      }
    }
  }, [play]);

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

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${
        autoplay ? "" : "rounded-3xl"
      }`}
    >
      {autoplay && (
        <img
          src={src}
          className={`absolute inset-0 md:w-full z-10 transition-opacity duration-500 ease-in-out  ${
            fadeOut ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      <YouTube
        videoId={videoKey}
        opts={opts}
        onReady={onReady}
        onEnd={onEnd}
        //onStateChange={handleStateChange} // Detect state changes
        className="absolute top-0 left-0 w-full h-full"
        style={{
          transform: isListView ? "scale(1)" : "scale(1.6)", // Scale based on play state
          // transform: play ? "scale(1.6)" : "scale(1)", // Scale based on play state
          transformOrigin: "center center",
          objectFit: "cover",
          zIndex: 1,
        }}
      />
    </div>
  );
}

export default YoutubeTrailerPlayer;
