// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crud {
    struct User {
        uint id;
        string name;
        uint age;
    }

    User[] public users;
    uint public nextId;

    function create(string memory _name, uint _age) public {
        users.push(User(nextId, _name, _age));
        nextId++;
    }

    function read(uint256 _id) public view returns (User memory) {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].id == _id) {
                return users[i];
            }
        }
        revert("User not found");
    }

    function update(uint256 _id, string memory _newName, uint _age) public {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].id == _id) {
                users[i].name = _newName;
                users[i].age = _age;
                return;
            }
        }
        revert("User not found");
    }

    function deleteUser(uint256 _id) public {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].id == _id) {
                users[i] = users[users.length - 1]; 
                users.pop();
                return;
            }
        }
        revert("User not found");
    }
}