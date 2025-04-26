import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState("Chưa có ảnh nào được chọn");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Vui lòng chọn ít nhất một ảnh để tải lên.");
      return;
    }

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `91ace937f9b6d69dce34`,
            pinata_secret_api_key: `cb15acd6c6705e18b7f4af985c7e5c45bf15323b8219dffb45c477fb8c8c6e85`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        await contract.add(account, ImgHash);
      }

      alert("Tải ảnh lên thành công!");
      setFileNames("Chưa có ảnh nào được chọn");
      setFiles([]);
    } catch (e) {
      console.error("Error uploading images to Pinata:", e);
      alert("Không thể tải ảnh lên Pinata. Vui lòng thử lại sau.");
    }
  };

  const retrieveFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setFileNames(selectedFiles.map((file) => file.name).join(", "));
  };

  const resetFileInput = (e) => {
    e.target.value = null; // Đặt lại giá trị của input để đảm bảo sự kiện onChange luôn được kích hoạt
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Chọn Ảnh
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          multiple // Cho phép chọn nhiều file
          onChange={retrieveFiles}
          onClick={resetFileInput} // Đặt lại input khi người dùng bấm vào
        />
        <span className="textArea">Ảnh: {fileNames}</span>
        <button type="submit" className="upload" disabled={files.length === 0}>
          Tải Ảnh Lên
        </button>
      </form>
    </div>
  );
};

export default FileUpload;