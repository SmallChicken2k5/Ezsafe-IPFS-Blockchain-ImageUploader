// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    struct Access {
        address user;
        bool access; //true or false
    }
    mapping(address => string[]) value;
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => Access[]) accessList;
    mapping(address => mapping(address => bool)) previousData;

    function add(address _user, string memory url) external {
        value[_user].push(url);
    }

    function allow(address user) external {
        //def
        ownership[msg.sender][user] = true;
        if (previousData[msg.sender][user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
    }

    function disallow(address user) public {
        ownership[msg.sender][user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns (string[] memory) {
        require(
            _user == msg.sender || ownership[_user][msg.sender],
            "You don't have access"
        );
        return value[_user];
    }

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }

    function getSharedWithMe() public view returns (address[] memory) {
        uint count = 0;

        // Đếm số lượng địa chỉ có quyền truy cập
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].access) {
                count++;
            }
        }

        // Tạo mảng với kích thước chính xác
        address[] memory sharedWithMe = new address[](count);
        uint index = 0;

        // Thêm các địa chỉ vào mảng
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].access) {
                sharedWithMe[index] = accessList[msg.sender][i].user;
                index++;
            }
        }

        return sharedWithMe;
    }

    function deleteImage(string memory imageHash) public {
        string[] storage userImages = value[msg.sender];
        for (uint i = 0; i < userImages.length; i++) {
            if (
                keccak256(abi.encodePacked(userImages[i])) ==
                keccak256(abi.encodePacked(imageHash))
            ) {
                userImages[i] = userImages[userImages.length - 1]; // Replace with the last element
                userImages.pop(); // Remove the last element
                break;
            }
        }
    }
}
