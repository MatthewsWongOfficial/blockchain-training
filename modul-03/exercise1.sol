// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exercise1 {
    mapping(address => bool) private members;

    event MemberAdded(address member);
    event MemberRemoved(address member);

    function addMember(address _member) external {
        require(!members[_member], "Address is already a member");
        members[_member] = true;
        emit MemberAdded(_member);
    }

    function removeMember(address _member) external {
        require(members[_member], "Address is not a member");
        members[_member] = false;
        emit MemberRemoved(_member);
    }

    function isMember(address _member) external view returns (bool) {
        return members[_member];
    }
}
