// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Item {
        uint id;
        string name;
        uint price;
        address payable seller;
        bool isSold;
    }

    mapping(uint => Item) public items;
    uint public nextItemId;
    mapping(address => uint[]) public ownerItems;
    mapping(address => uint) public pendingWithdrawals;

    event ItemListed(uint id, string name, uint price, address seller);
    event ItemPurchased(uint id, address buyer, uint price);
    event FundsWithdrawn(address seller, uint amount);

    constructor() {
        nextItemId = 1; // Start item IDs from 1
    }

    function listItem(string memory _name, uint _price) external {
        require(_price > 0, "Price must be greater than zero");

        items[nextItemId] = Item({
            id: nextItemId,
            name: _name,
            price: _price,
            seller: payable(msg.sender),
            isSold: false
        });

        ownerItems[msg.sender].push(nextItemId);

        emit ItemListed(nextItemId, _name, _price, msg.sender);
        nextItemId++;
    }

    function purchaseItem(uint _itemId) external payable {
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId < nextItemId, "Item does not exist");
        require(msg.value == item.price, "Incorrect Ether amount");
        require(!item.isSold, "Item is already sold");

        item.seller.transfer(msg.value);
        item.isSold = true;
        ownerItems[msg.sender].push(_itemId);

        emit ItemPurchased(_itemId, msg.sender, msg.value);
    }

    function withdrawFunds() external {
        uint amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "No funds to withdraw");

        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit FundsWithdrawn(msg.sender, amount);
    }

    function getItemsByOwner(address _owner) external view returns (uint[] memory) {
        return ownerItems[_owner];
    }
}
