// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import 'contracts/MagicSequence.sol';

contract MagicSequenceCrack {

  MagicSequence m;
  uint8 c;

  constructor(address _m) public {
    m = MagicSequence(_m);
    c = 0;
  }

  function start() external returns (bool) {
    return m.start();
  }

  function number() external returns (uint256) {
    if(c == 0) {
      c++;
      return 42;
    }
    if(c == 1) {
      c++;
      return 55;
    }
    if(c == 2) {
      c++;
      return 256;
    }

    return 9876543;
  }
}
