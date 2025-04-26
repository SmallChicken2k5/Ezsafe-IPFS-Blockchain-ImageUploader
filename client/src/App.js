import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [metamaskInstalled, setMetamaskInstalled] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const openGuide = () => {
    setShowGuide(true);
  };

  const closeGuide = () => {
    setShowGuide(false);
  };
  useEffect(() => {
    // Kiểm tra xem MetaMask có được cài đặt hay không
    if (typeof window.ethereum === "undefined") {
      setMetamaskInstalled(false);
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  if (!metamaskInstalled) {
    return (
      <div className="App">
        <h1 style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
          EzSafe
        </h1>
        <p style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
          Để sử dụng ứng dụng, bạn cần cài đặt và đăng nhập vào ví MetaMask. Nếu chưa có, bạn có thể tải MetaMask tại đây:{" "}
          <a
            href="https://metamask.io/download.html"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00ffff", textDecoration: "underline" }}
          >
            đây
          </a>.
        </p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <img
            src="https://media.giphy.com/media/xdH0MjQ83lGFVv7gjR/giphy.gif"
            alt="Loading..."
            style={{
              width: "200px",
              height: "200px",
              border: "5px solid #00ffff",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Quyền Truy Cập
        </button>
      )}
      {/* Nút hướng dẫn */}
      <button className="guide-button" onClick={openGuide}>
        Hướng Dẫn
      </button>
      {/* Modal hướng dẫn */}
      {showGuide && (
        <div className="guide-modal">
          <div className="guide-content">
            <h2>Hướng Dẫn Thiết Lập MetaMask</h2>
            <p>
              1. Cài đặt MetaMask từ{" "}
              <a
                href="https://metamask.io/download.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                đây
              </a>.
            </p>
            <p>2. Kết nối MetaMask với mạng local:</p>
            <ul>
              <li>Network Name: Localhost 8545</li>
              <li>New RPC URL: http://127.0.0.1:8545</li>
              <li>Chain ID: 1337</li>
              <li>Currency Symbol: ETH</li>
            </ul>
            <p>3. Chọn tài khoản thử nghiệm từ danh sách tài khoản Hardhat.</p>
            <p>4. Cấp quyền kết nối MetaMask với ứng dụng.</p>
            <p>
              <strong>Chi tiết hơn:</strong> Xem file{" "}
              <a
                href="https://github.com/SmallChicken2k5/Ezsafe-IPFS-Blockchain-ImageUploader/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                README.md
              </a>.
            </p>
            <button onClick={closeGuide}>Đóng</button>
          </div>
        </div>
      )}

      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
        <h1 style={{ color: "white" }}>EzSafe</h1>
        <div className="container">
          <div className="bubbles">
            <span style={{ "--i": 37 }}></span>
            <span style={{ "--i": 12 }}></span>
            <span style={{ "--i": 24 }}></span>
            <span style={{ "--i": 10 }}></span>
            <span style={{ "--i": 14 }}></span>
            <span style={{ "--i": 23 }}></span>
            <span style={{ "--i": 41 }}></span>
            <span style={{ "--i": 16 }}></span>
            <span style={{ "--i": 19 }}></span>
            <span style={{ "--i": 20 }}></span>
            <span style={{ "--i": 22 }}></span>
            <span style={{ "--i": 25 }}></span>
            <span style={{ "--i": 36 }}></span>
            <span style={{ "--i": 21 }}></span>
            <span style={{ "--i": 15 }}></span>
            <span style={{ "--i": 42 }}></span>
            <span style={{ "--i": 26 }}></span>
            <span style={{ "--i": 17 }}></span>
            <span style={{ "--i": 13 }}></span>
            <span style={{ "--i": 27 }}></span>
            <span style={{ "--i": 35 }}></span>
            <span style={{ "--i": 11 }}></span>
            <span style={{ "--i": 24 }}></span>
            <span style={{ "--i": 43 }}></span>
            <span style={{ "--i": 14 }}></span>
            <span style={{ "--i": 27 }}></span>
            <span style={{ "--i": 18 }}></span>
            <span style={{ "--i": 12 }}></span>
            <span style={{ "--i": 17 }}></span>
            <span style={{ "--i": 34 }}></span>
            <span style={{ "--i": 24 }}></span>
            <span style={{ "--i": 25 }}></span>
            <span style={{ "--i": 11 }}></span>
            <span style={{ "--i": 29 }}></span>
            <span style={{ "--i": 30 }}></span>
            <span style={{ "--i": 13 }}></span>
            <span style={{ "--i": 33 }}></span>
            <span style={{ "--i": 44 }}></span>
            <span style={{ "--i": 13 }}></span>
            <span style={{ "--i": 28 }}></span>
            <span style={{ "--i": 25 }}></span>
            <span style={{ "--i": 18 }}></span>
            <span style={{ "--i": 21 }}></span>
            <span style={{ "--i": 15 }}></span>
            <span style={{ "--i": 13 }}></span>
            <span style={{ "--i": 32 }}></span>
            <span style={{ "--i": 17 }}></span>
            <span style={{ "--i": 13 }}></span>
            <span style={{ "--i": 28 }}></span>
            <span style={{ "--i": 10 }}></span>
            <span style={{ "--i": 12 }}></span>
            <span style={{ "--i": 45 }}></span>
            <span style={{ "--i": 16 }}></span>
            <span style={{ "--i": 11 }}></span>
            <span style={{ "--i": 31 }}></span>
          </div>
        </div>

        <p style={{ color: "white" }}>
          Địa chỉ ví của bạn : {account ? account : "Không kết nối"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
      <footer style={{ color: "white", textAlign: "center", padding: "10px 0", marginTop: "20px" }}>
        <p>© 2025 EzSafe. All rights reserved.</p>
        <p>
          Developed by <a href="https://github.com/SmallChicken2k5" target="_blank" rel="noopener noreferrer" style={{ color: "#00ffff", textDecoration: "underline" }}>SmallChicken2k5</a>
        </p>
      </footer>
    </>
  );
}

export default App;