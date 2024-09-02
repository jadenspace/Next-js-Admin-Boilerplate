import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ImagePreviewUploader({ setFiles }: { setFiles: any }) {
  const [images, setImages] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles, fileRejections) => {
      const newImages = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
      setImages(newImages);
      setFiles(acceptedFiles);
    },
  });

  const handleRemove = (index) => {
    const update = (current) => {
      const newImages = [...current];
      newImages.splice(index, 1);
      return newImages;
    };
    setImages(update);
    setFiles(update);
  };

  const thumbs = images.map((file, idx) => (
    <div className="inline-flex rounded border mr-0 mb-0 w-[180px] h-[180px] p-2 m-2" key={file.name}>
      <div className="relative flex min-w-0 w-full">
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          className="block w-auto h-full"
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
        <Button
          className="!absolute top-[-12px] right-[-12px] z-100 !min-w-6 h-6 !p-0 !rounded-full !bg-black"
          onClick={() => handleRemove(idx)}
        >
          <CloseIcon fontSize="small" htmlColor="white" />
        </Button>
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => images.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [images]);

  return (
    <section className="controller flex flex-col items-center gap-3 py-6">
      <div
        {...getRootProps({
          className:
            "dropzone flex justify-center items-center w-[200px] h-[120px] border border-black rounded cursor-pointer",
        })}
      >
        <input {...getInputProps()} />
        <p>
          <UploadFileIcon />
          Drop image here.
        </p>
      </div>
      <aside>
        <p className="text-center">Selected {images.length} image(s) to upload.</p>
        {!!images.length && (
          <div className="flex flex-wrap overflow-y-auto max-h-[250px] w-full px-3 py-5 my-5">{thumbs}</div>
        )}
      </aside>
    </section>
  );
}
