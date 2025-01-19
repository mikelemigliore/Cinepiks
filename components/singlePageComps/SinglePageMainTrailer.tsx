import YoutubeTrailerPlayer from "@/components/trailer/YoutubeTrailerPlayer";
import React from "react";
import { Button } from "@/components/ui/button";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { Rings } from "react-loader-spinner";
import { GoMute, GoUnmute } from "react-icons/go";
import { MdOutlineReplay } from "react-icons/md";

interface SinglePageMainTrailerProp {
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
  isLoading?: boolean;
  handleUnmute: () => void;
  handlePause: () => void;
  handleSetRelaod: () => void;
  isDesktop: boolean;
}

function SinglePageMainTrailer({
  handlePlay,
  play,
  unmute,
  pause,
  reload,
  handleReload,
  handleEnd,
  autoplay,
  videoKey,
  setIsLoading,
  src,
  isLoading,
  handleUnmute,
  handlePause,
  handleSetRelaod,
  isDesktop,
}: SinglePageMainTrailerProp) {
  return (
    <div className={`md:w-full md:h-[47.5vw] w-full h-[50vh] relative z-0`}>
      {videoKey ? (
        <YoutubeTrailerPlayer
          handlePlay={handlePlay}
          unmute={unmute}
          pause={pause}
          reload={reload}
          handleReload={handleReload}
          handleEnd={handleEnd}
          play={play}
          autoplay={autoplay}
          videoKey={videoKey}
          src={src}
          setIsLoading={setIsLoading} // Pass the loading state handler
          isDesktop={isDesktop}
        />
      ) : (
        <div className={`relative w-full md:h-full h-[50vh] overflow-hidden`}>
          <img
            src={src}
            className={`absolute inset-0 md:w-full  z-10 transition-opacity duration-500 ease-in-out`}
          />
        </div>
      )}

      <div
        className={`${
          play ? "opacity-0" : "opacity-100"
        } z-40 absolute inset-0 bg-gradient-to-t from-customColor to-transparent w-full h-full transition-opacity duration-500 ease-in-out`}
      />

      <Button
        onClick={handlePlay}
        className={`active:scale-95 duration-500 z-40 absolute top-1/2 left-1/2 md:w-[4.5vw] md:h-[4.5vw] w-[15vw] h-[15vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5 -translate-x-1/2 -translate-y-1/2 ${
          play || !videoKey ? "hidden" : ""
        }`}
      >
        {isLoading ? (
          <Rings color="#ffffff" height={40} width={40} />
        ) : (
          <CiPlay1 className="md:w-[2vw] md:h-[2vw] w-[7vw] h-[7vw]" />
        )}
      </Button>
      {isDesktop && (
        <>
          {/* Display the appropriate icon based on fullscreen state */}
          {play && (
            <div className="ml-[80vw] mt-[-10vw]  z-[100] absolute">
              <Button
                onClick={handleUnmute}
                className="mr-3 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
              >
                {unmute ? (
                  <GoUnmute className="w-[2vw] h-[2vw]" />
                ) : (
                  <div>
                    <GoMute className="w-[2vw] h-[2vw]" />
                  </div>
                )}
              </Button>
              <Button
                onClick={handlePause}
                className="mr-3 w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
              >
                <CiPause1 className="w-[2vw] h-[2vw]" />
              </Button>
              <Button
                onClick={handleSetRelaod}
                className="w-[4.5vw] h-[4.5vw] rounded-full border-2 border-white bg-slate-300 bg-transparent hover:bg-slate-300 hover:bg-opacity-5"
              >
                <MdOutlineReplay className="w-[2vw] h-[2vw]" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SinglePageMainTrailer;
