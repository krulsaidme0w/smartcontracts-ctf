// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


contract UnpayableCrack {  
  
  function deposit() external payable {}
  
  function destroy(address payable addr) external { 
    selfdestruct(addr);
  }
}
