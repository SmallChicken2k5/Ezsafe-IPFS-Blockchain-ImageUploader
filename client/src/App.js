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

  useEffect(() => {
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
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Quyền Truy Cập
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="App">
        <h1 style={{ color: "white" }}>EzSafe</h1>
        {/* <div class="bg"></div</div>>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div> */}
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
    </>
  );
}

export default App;
