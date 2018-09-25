pragma solidity ^0.4.21;

library Addresses {
  function isContract(address _base) view internal returns (bool) {
      uint codeSize;
      assembly {
          codeSize := extcodesize(_base)
      }
      return codeSize > 0;
  }
}
