// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "hardhat/console.sol";

contract Unpayable {
  address owner;

  constructor() public {
    owner = msg.sender;
  }

  fallback() external {
    revert("doesn't accept funds");
  }

  function putMoney() external payable {
    require(msg.value > 500 ether, "doesn't accept too small amount");
  }

  function refund(address payable who) external {
    require(msg.sender == owner, "only owner can call refund");

    console.log("Unpayable refund: %s wei", address(this).balance);

    who.transfer(address(this).balance);
  }
}
