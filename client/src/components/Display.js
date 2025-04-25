import { useState, useEffect } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [sharedAddresses, setSharedAddresses] = useState([]); // State để lưu danh sách địa chỉ ví
  const [selectedAddress, setSelectedAddress] = useState(""); // State để lưu địa chỉ ví được chọn

  useEffect(() => {
    const fetchSharedAddresses = async () => {
      try {
        const addresses = await contract.getSharedWithMe (); // Gọi hàm từ smart contract
        console.log("Shared addresses:", addresses);
        setSharedAddresses(addresses);
      } catch (e) {
        console.error("Error fetching shared addresses:", e);
      }
    };

    contract && fetchSharedAddresses();
  }, [contract]);
  const deleteImage = async (imageHash) => {
    try {
      await contract.deleteImage(imageHash); // Gọi hàm từ smart contract
      alert("Ảnh đã được xóa thành công!");
      getdata(); // Cập nhật lại danh sách ảnh sau khi xóa
    } catch (e) {
      console.error("Error deleting image:", e);
      alert("Không thể xóa ảnh. Vui lòng thử lại.");
    }
  };

  const getdata = async () => {
    setData("");
    let dataArray;
    try {
      if (selectedAddress) {
        dataArray = await contract.display(selectedAddress);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
      return;
    }
  
    const isEmpty = Object.keys(dataArray).length === 0;
  
    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      const images = str_array.map((item, i) => {
        return (
          <div key={i} className="image-container">
            <img
              src={item}
              alt="new"
              className="image-list"
              onClick={() => setSelectedImage(item)}
            />
            {(!selectedAddress || selectedAddress === account) && (
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn không cho click ảnh khi click nút
                  deleteImage(item);
                }}
              >
                Xóa
              </button>
            )}
          </div>
        );
      });
      setData(images);
    } else {
      alert("Không có hình ảnh để hiển thị");
    }
  };

  return (
    <>
      <div className="image-list">{data}</div>
      <select
        className="address-dropdown"
        value={selectedAddress}
        onChange={(e) => setSelectedAddress(e.target.value)}
      >
        <option value="">Chọn địa chỉ ví (hoặc để trống để hiển thị của bạn)</option>
        {sharedAddresses.map((address, index) => (
          <option key={index} value={address}>
            {address}
          </option>
        ))}
      </select>
      <button className="center button" onClick={getdata}>
        Hiển Thị Ảnh
      </button>

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full View" className="modal-image" />
        </div>
      )}
    </>
  );
};

export default Display;