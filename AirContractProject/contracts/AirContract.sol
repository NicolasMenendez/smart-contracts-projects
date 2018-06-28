pragma solidity ^0.4.24;

import "./AirToken.sol";

contract AirContract is AirToken {

  uint256 tokensAvailable;
  address owner;

     constructor() public {
      owner = msg.sender;
    }

    modifier onlyOwner() {
      require(msg.sender == owner);
      _;
    }

    function setAllowance(address reciever, uint amount) public onlyOwner
    {
        increaseApproval(reciever,amount);
    }


    function pullTokens(uint amount) public {
          tokensAvailable = allowance(owner,msg.sender);

          require(tokensAvailable == amount);

          transferFrom(owner, msg.sender, amount);
    }

  }
