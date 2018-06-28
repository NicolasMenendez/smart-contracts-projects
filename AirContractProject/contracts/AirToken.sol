pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract AirToken is StandardToken {

    string public name = "AirToken";
    string public symbol = "AIR";
    uint8 public decimals = 0;
    uint public INITIAL_SUPPLY = 1000000;

    constructor() public {
      totalSupply_ = INITIAL_SUPPLY;
      balances[msg.sender] = INITIAL_SUPPLY;
    }

  }
