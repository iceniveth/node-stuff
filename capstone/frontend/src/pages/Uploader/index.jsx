import { useRef } from "react";
import axios from "axios";

export default function Uploader() {
  const inputRef = useRef();

  async function uploadFile(file) {
    // https://axios-http.com/docs/multipart
    const response = await axios.postForm("/uploads", {
      file,
    });
    console.log(response);
  }

  function onFileChange(e) {
    const firstFile = e.target.files[0];
    uploadFile(firstFile);
  }

  function onFileClick() {
    // Allow choosing the same file.
    // inputRef.current.value = "";
  }

  return (
    <>
      <input
        type="file"
        accept=".png,.md"
        ref={inputRef}
        onClick={onFileClick}
        onChange={onFileChange}
      />
    </>
  );
}
