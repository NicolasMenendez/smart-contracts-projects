pragma solidity ^0.4.21;

import "./ERC223ReceivingContract.sol";
import "./SafeMath.sol";
import "./ERC20.sol";
import "./TokenContract.sol";

contract SaleContract is ERC223ReceivingContract {

  using SafeMath for uint; // For security 4.2 Overflow , SafeMath is use when div,mul,add, or sub uints

  TokenContract private _token;

    uint256 private _rate;
    uint256 private _available;
    address public _owner;

  event Purchase(address beneficiary, uint amount);
  event WithdrawEther(address owner,uint balance);

  modifier available() {
    require(_available > 0);

    _;
  }
    modifier onlyOwner() {
    require (msg.sender == _owner);
    _;
    }

  modifier isToken() {
    require(msg.sender == address(_token));
    _;
  }

  modifier valid(address to, uint amount) {
    assert(amount > 0);
    assert(amount <= _available);
    _;
  }

  function SaleContract(address token, uint rate)
      public {
      _token = TokenContract(token);
      _rate = rate;
      _owner = msg.sender;

  }

  function ()       // Security consideration 4.1 Fallback function
      public
      payable {
      revert();
  }

  function purchase()
      public
      payable {
      return purchaseToken(msg.sender);
  }

  function purchaseToken(address beneficiary)
      public
      available
      valid(beneficiary, msg.value)
      payable {
      uint256 etherRecieve = msg.value;
      uint256 amount = etherRecieve.mul(_rate).div(1**18);
      _token.transfer(beneficiary, amount);                // Security consideration 4.3 not using delegateCall
      _available = _available.sub(amount);

     emit Purchase(beneficiary, amount);
  }

  function tokenFallback(address, uint256 _value, bytes)    //Is call once when sending tokens to the contract for the sale
      isToken
      public {
      _available = _available.add(_value);
  }

  function availableBalance()
    view
    public
    returns (uint) {
    return _available;
  }


  function withdrawEther() public onlyOwner {
     _owner.transfer(address(this).balance);                     //Security consideration 4.4 reentrancy usint transfer instead of call.value()
    emit WithdrawEther(_owner, address(this).balance);
  }
    function withdrawTokens(address tokenContract) external onlyOwner {
    TokenContract _tokenContract = TokenContract(tokenContract);
    _available = 0;
    require(_tokenContract.transfer(_owner, _tokenContract.balanceOf(this))); //Security consideration 4.4 reentrancy usint transfer instead of call.value()
    }

}
