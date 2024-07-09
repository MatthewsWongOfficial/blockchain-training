// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Exercise2 {
    uint private memberIdCounter;

    enum MembershipType { Basic, Premium, VIP }

    struct Member {
        uint id;
        string name;
        uint balance;
        MembershipType membershipType;
        uint age;
        string email;
        bool active;
    }

    mapping(address => Member) private members;

    event MemberAdded(address member, uint id);
    event MemberRemoved(address member);
    event MemberUpdated(address member, uint id);

    function addMember(address _member, string memory _name, uint _balance, MembershipType _membershipType, uint _age, string memory _email) external {
        require(members[_member].id == 0, "Address is already a member");
        memberIdCounter++;
        members[_member] = Member({
            id: memberIdCounter,
            name: _name,
            balance: _balance,
            membershipType: _membershipType,
            age: _age,
            email: _email,
            active: true
        });
        emit MemberAdded(_member, memberIdCounter);
    }

    function removeMember(address _member) external {
        require(members[_member].id != 0, "Address is not a member");
        delete members[_member];
        emit MemberRemoved(_member);
    }

    function isMember(address _member) external view returns (bool) {
        return members[_member].id != 0;
    }

    function updateName(address _member, string memory _name) external {
        require(members[_member].id != 0, "Address is not a member");
        members[_member].name = _name;
        emit MemberUpdated(_member, members[_member].id);
    }

    function updateMembershipType(address _member, MembershipType _membershipType) external {
        require(members[_member].id != 0, "Address is not a member");
        members[_member].membershipType = _membershipType;
        emit MemberUpdated(_member, members[_member].id);
    }

    function updateBalance(address _member, uint _balance) external {
        require(members[_member].id != 0, "Address is not a member");
        members[_member].balance = _balance;
        emit MemberUpdated(_member, members[_member].id);
    }

    function updateAge(address _member, uint _age) external {
        require(members[_member].id != 0, "Address is not a member");
        members[_member].age = _age;
        emit MemberUpdated(_member, members[_member].id);
    }

    function updateEmail(address _member, string memory _email) external {
        require(members[_member].id != 0, "Address is not a member");
        members[_member].email = _email;
        emit MemberUpdated(_member, members[_member].id);
    }

    function updateActiveStatus(address _member, bool _active) external {
        require(members[_member].id != 0, "Address is not a member");
        members[_member].active = _active;
        emit MemberUpdated(_member, members[_member].id);
    }
}
