// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

contract Bank {
  
  using SafeMath for uint256;
  mapping(address => uint) public balances;

  function deposit(address _to) public payable {
    balances[_to] = balances[_to].add(msg.value);
  }

  function balanceOf(address _who) public view returns (uint balance) {
    return balances[_who];
  }

  function balance() public view returns (uint) {
    return address(this).balance;
  }

  function withdraw(uint _amount) public {
    // added to test attack script
    if(address(this).balance == 0) {
        return;
    }

    if(balances[msg.sender] >= _amount) {
      (bool result,) = msg.sender.call.value(_amount)("");
      require(result, "e/transfer_failed");
      balances[msg.sender] -= _amount;
    }
  }

  receive() external payable {}
}
