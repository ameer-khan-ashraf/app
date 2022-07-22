import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ImageCard from "./Cards/ImageCard";
import FileUpload from "./FileUpload";

function Media({ media, setMedia }) {
  const [files, setFiles] = useState([...media]);
  const dispatch = useDispatch();

  useEffect(() => {
    return dispatch(setMedia(files));
  }, [dispatch, setMedia, files]);

  const removeFile = (index) => {
    setFiles((old) => {
      return old.filter((value, i) => i !== index);
    });
  };
  

  return (
    <>
      <div className="flex flex-row py-4 gap-2 overflow-x-auto">
        <div className="w-48">
          <FileUpload
            onChange={(event) => {
              if (event.target.files.length > 0) {
                const urls = Array.from(event.target.files).map((file) => ({
                  data: file,
                  url: URL.createObjectURL(file),
                }));
                setFiles([...files, ...urls]);
                event.target.value = null;
              }
            }}
          />
        </div>
        {files.length > 0 &&
          files.map((file, index) => (
            <div key={index} className="flex-shrink-0 w-48">
              <ImageCard
                index={index}
                media={file.url}
                removeImage={removeFile}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default Media;
