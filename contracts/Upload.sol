// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    struct Access {
        address user;
        bool access; // true or false
    }

    mapping(address => string[]) private value;
    mapping(address => mapping(address => bool)) private ownership;
    mapping(address => Access[]) private accessList;
    mapping(address => mapping(address => bool)) private previousData;
    mapping(address => address[]) private sharedWithMeBy; // New mapping to track who shared with me

    function add(address _user, string memory url) external {
        value[_user].push(url);
    }

    function allow(address user) external {
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

        // Add msg.sender to user's sharedWithMeBy list if not already present
        bool alreadyShared = false;
        for (uint i = 0; i < sharedWithMeBy[user].length; i++) {
            if (sharedWithMeBy[user][i] == msg.sender) {
                alreadyShared = true;
                break;
            }
        }
        if (!alreadyShared) {
            sharedWithMeBy[user].push(msg.sender);
        }
    }

    function disallow(address user) public {
        ownership[msg.sender][user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
            }
        }

        // Remove msg.sender from user's sharedWithMeBy list
        for (uint i = 0; i < sharedWithMeBy[user].length; i++) {
            if (sharedWithMeBy[user][i] == msg.sender) {
                sharedWithMeBy[user][i] = sharedWithMeBy[user][sharedWithMeBy[user].length - 1];
                sharedWithMeBy[user].pop();
                break;
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

    // Corrected function
    function getSharedWithMe() public view returns (address[] memory) {
        return sharedWithMeBy[msg.sender];
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