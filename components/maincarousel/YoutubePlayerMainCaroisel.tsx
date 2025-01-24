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
  reload: boolean;
  handleReload: () => void;
  handleStarted: () => void;
  src: string;
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
  src,
}: YoutubePlayerProps) {
  const [fadeOut, setFadeOut] = useState(true);
  const playerRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: isCarouselPlaying ? 1 : 0,
      mute: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      disablekb: 1,
      loop: 0,
      fs: 0,
      vq: "hd1080",
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
      playerRef.current.seekTo(0);

      setTimeout(() => {
        handleReload();
      }, 100);
    }
  }, [reload]);

  const onReady = (event: any) => {
    if (event && event.target) {
      playerRef.current = event.target;
      setIsReady(true);

      if (isCarouselPlaying) {
        playerRef.current.playVideo();
      }

      if (unmute) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }

      playerRef.current.setPlaybackQuality("highres");

      setTimeout(() => {
        setFadeOut(false);
        handleStarted();
      }, 2000);
    } else {
      console.error("Player reference is not available");
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
