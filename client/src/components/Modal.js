import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };

  const disallow = async () => {
    const address = document.querySelector(".address").value;
    await contract.disallow(address); // Gọi hàm disallow từ smart contract
    alert(`Đã hủy chia sẻ với địa chỉ: ${address}`);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Quyền Truy Cập</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Nhập địa chỉ ví cần chia sẻ"
            ></input>
          </div>
          <form id="accessListForm">
            <select
              id="selectNumber"
              onChange={(e) => {
                const value = e.target.value.split(",")[0]; // Lấy phần trước dấu phẩy
                document.querySelector(".address").value = value;
              }}
            >
              <option className="address" value="">
                Danh Sách Quyền Truy Cập
              </option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Đóng
            </button>
            <button id="shareBtn" onClick={() => sharing()}>Chia Sẻ</button>
            <button id="disallowBtn" onClick={() => disallow()}>Hủy Chia Sẻ</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;