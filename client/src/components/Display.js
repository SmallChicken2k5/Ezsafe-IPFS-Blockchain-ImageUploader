import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // State để lưu hình ảnh được chọn

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      const images = str_array.map((item, i) => {
        return (
          <div href={item} key={i} target="_blank" rel="noreferrer">
            <img
              key={i}
              src={item}
              alt="new"
              className="image-list"
              onClick={() => setSelectedImage(item)} // Khi bấm vào hình, lưu URL vào state
            ></img>
          </div>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };

  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Nhập Địa Chỉ Ví Cần Hiển Thị (Nếu bỏ trống sẽ hiển thị của bạn)"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Hiển Thị Ảnh
      </button>

      {/* Modal hiển thị hình ảnh full màn hình */}
      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full View" className="modal-image" />
        </div>
      )}
    </>
  );
};

export default Display;