# EzSafe

Ứng dụng cho phép upload, lưu trữ và chia sẻ hình ảnh lên IPFS (qua Pinata) kết hợp smart‑contract trên Ethereum local (Hardhat) và frontend React.

---

## 1. Cài đặt môi trường cần thiết

- **Git** (để clone code)  
- **Node.js** (phiên bản ≥ v16) & **npm**  
- **MetaMask** (extension trên trình duyệt) để tương tác với blockchain local  
- **Hardhat** local (không cần cài global, dự án đã kèm sẵn trong `node_modules`)

---

## 2. Clone repository về máy

```bash
git clone https://github.com/SmallChicken2k5/Ezsafe-IPFS-Blockchain-ImageUploader.git
```

---

## 3. Cài đặt và biên dịch smart contract

```bash
npm install          # cài Hardhat, ethers và các dependency khác
npx hardhat compile  # biên dịch Solidity contract
```

---

## 4. Khởi chạy local blockchain & deploy contract

1. **Terminal A**: khởi node local

    ```bash
    npx hardhat node
    ```

    > Hardhat sẽ khởi một local node tại `http://127.0.0.1:8545` và in ra danh sách các account thử nghiệm.

2. **Terminal B** (ở thư mục gốc dự án):

    ```bash
    npx hardhat run scripts/deploy.js --network localhost
    ```

    Khi deploy xong, bạn sẽ thấy log:

    ```text
    Library deployed to: 0xAbC...123
    ```

    > **Copy** địa chỉ contract này để sử dụng ở phần frontend.

---

## 5. Cài đặt front-end & cấu hình

```bash
cd client
npm install
```

### 5.1. Cấu hình Pinata API keys

Mở file `client/src/components/FileUpload.js`, tìm:

```js
headers: {
  pinata_api_key: `Enter Your Key`,
  pinata_secret_api_key: `Enter Your Secret Key`,
  "Content-Type": "multipart/form-data",
},
```

- Thay ``Enter Your Key`` bằng **Pinata API Key** của bạn.  
- Thay ``Enter Your Secret Key`` bằng **Pinata Secret API Key** của bạn.

### 5.2. Cấu hình địa chỉ Smart Contract

Mở file `client/src/App.js`, tìm:

```js
let contractAddress = "Your Contract Address Here";
```

- Dán địa chỉ contract bạn vừa deploy vào chuỗi này.

---

## 6. Chạy ứng dụng React

```bash
npm start
```

- Trình duyệt sẽ tự mở http://localhost:3000  
- Kết nối MetaMask vào network `localhost:8545` và chọn account tương ứng  
- Bạn có thể:
  - **Upload Image** lên IPFS  
  - **Share** cho address khác  
  - **Get Data** để xem hình đã lưu  

---

## 7. License
Dự án này được phát hành dưới giấy phép mở. Bạn được tự do sử dụng, phân phối và chỉnh sửa theo nhu cầu, miễn là tuân thủ các điều khoản của giấy phép.  
Hãy tận dụng và phát triển dự án theo cách của bạn!


---

## 8. Contributing

1. Fork project này  
2. Tạo branch feature: `git checkout -b feature/YourFeature`  
3. Commit thay đổi: `git commit -m "Add some feature"`  
4. Push lên: `git push origin feature/YourFeature`  
5. Mở Pull Request  

---
## 9. Acknowledgements

- **Original Project**: [Dgdrive3.0](https://github.com/kshitijofficial/Dgdrive3.0) - Cảm hứng và ý tưởng ban đầu cho ứng dụng.  
- **Background Effects**: [CSS-Only-Animated-Background-Effects](https://github.com/jacobscript/CSS-Only-Animated-Background-Effects) - Hiệu ứng nền động tuyệt đẹp được sử dụng trong giao diện.  

---

> Nếu có thắc mắc hoặc cần hỗ trợ, hãy mở issue trên GitHub.
