import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

interface YoutubeTrailerPlayerProps {
  videoKey: string;
  src: string;
  autoplay?: boolean;
  play?: boolean;
  handlePlay: () => void;
  setIsLoading: (loading: boolean) => void;
  pause?: boolean;
  reload?: boolean;
  handleReload: () => void;
  handleEnd: () => void;
  unmute?: boolean;
  isListView?: boolean;
  isDesktop: boolean;
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
  handleEnd,
  isDesktop,
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
      playsinline: 0,
    },
  };

  useEffect(() => {
    if (isDesktop) return;
    const handleFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement;

      if (!isFullscreen && !isDesktop) {
        onEnd();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [isDesktop]);

  const onEnd = () => {
    setFadeOut(true);
    handleEnd();
    playerRef.current.playVideo();
  };

  const onPause = () => {
    if (isDesktop) {
      return;
    }
    setFadeOut(true);
    handleEnd();
    playerRef.current.pauseVideo();
  };

  const onReady = (event: any) => {
    playerRef.current = event.target;
    setIsLoading(false);
  };

  useEffect(() => {
    if (playerRef.current) {
      if (play) {
        playerRef.current.playVideo();
        setFadeOut(false);
      } else {
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
      playerRef.current.seekTo(0);
      setTimeout(() => {
        handleReload();
      }, 100);
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
          className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-500 ease-in-out  ${
            fadeOut ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      )}

      <YouTube
        videoId={videoKey}
        opts={opts}
        onReady={onReady}
        onEnd={onEnd}
        onPause={onPause}
        className="absolute top-0 left-0 w-full h-full"
        style={{
          transform: isListView ? "scale(1)" : "scale(1.6)",
          transformOrigin: "center center",
          objectFit: "cover",
          zIndex: 1,
        }}
      />
    </div>
  );
}

export default YoutubeTrailerPlayer;
