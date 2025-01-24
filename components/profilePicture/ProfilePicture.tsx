"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CldUploadWidget } from "next-cloudinary";
import { MdModeEditOutline } from "react-icons/md";

interface ProfilePicProp {
  email: string;
  setPreview: any;
}

const ProfilePicture = ({ email, setPreview }: ProfilePicProp) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!imageUrl) return;
      try {
        const saveResponse = await fetch("/api/updateProfilePicture", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            picture: imageUrl,
          }),
        });

        const saveData = await saveResponse.json();
        if (saveData.result.modifiedCount === 1) {
          alert("Profile picture updated successfully!");
          window.location.reload();
        } else {
          alert("Error updating profile picture.");
        }
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    };

    fetchData();
  }, [imageUrl]);

  const handleImageUpload = (result: any) => {
    if (result.event === "success") {
      const { secure_url, coordinates } = result.info;

      if (coordinates && coordinates.custom) {
        const [x, y, width, height] = coordinates.custom[0];
        const croppedUrl = `${secure_url.replace(
          "/upload/",
          `/upload/c_crop,x_${x},y_${y},w_${width},h_${height}/`
        )}`;

        console.log(croppedUrl);

        setImageUrl(croppedUrl);
        setPreview(croppedUrl);
      } else {
        setImageUrl(secure_url);
        setPreview(secure_url);
      }
    }
  };

  return (
    <div className="md:ml-0 ml-[10vw]">
      <CldUploadWidget
        uploadPreset="my_movie_preset"
        options={{
          cropping: true,
          croppingAspectRatio: 1,
          croppingValidateDimensions: true,
          multiple: false,
          clientAllowedFormats: ["png", "jpg", "jpeg"],
        }}
        onSuccess={handleImageUpload}
      >
        {({ open }) => (
          <button
            className="ml-[4vw] mt-[1.5vh] md:px-[0.3vw] md:py-[0.8vw] px-[4vw] py-[2vh] rounded-full text-sm md:text-[0.8vw] bg-slate-300 bg-opacity-10 backdrop-blur-xl hover:bg-white/90 hover:text-black active:bg-white active:scale-95 duration-500 outline-none focus:outline-none"
            onClick={() => open()}
          >
            <MdModeEditOutline className="md:w-[2vw] md:h-[2vh] w-[5vw] h-[5vw] " />
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ProfilePicture;
