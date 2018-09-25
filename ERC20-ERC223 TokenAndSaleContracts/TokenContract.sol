pragma solidity ^0.4.21;

import "./ERC20.sol";
import "./ERC223.sol";
import "./ERC223ReceivingContract.sol";
import "./SafeMath.sol";
import "./Addresses.sol";

    contract TokenContract is ERC20, ERC223 {

    using SafeMath for uint;     // For security 4.2 Overflow , SafeMath is use when div,mul,add, or sub uints
    using Addresses for address;

    string private _symbol;
    string private _name;
    uint8 private _decimals;
    uint256 private _totalSupply;
    address public _contractOwner;


    mapping (address => uint256) internal _balanceOf;
    mapping (address => mapping (address => uint256)) internal _allowances;


  function TokenContract(string symbol, string name, uint8 decimals, uint256 totalSupply) public {
        _symbol = symbol;
        _name = name;
        _decimals = decimals;
        _totalSupply = totalSupply * 10 ** uint256(decimals);

        _contractOwner = msg.sender;
        _balanceOf[msg.sender] = _totalSupply;
    }


   modifier onlyPayloadSize(uint size)  //For security consideration 4.5 To mitigate short address attack.
   {
     assert(msg.data.length == size + 4);
     _;
    }

    function name()  public  view returns (string) {
       return _name;
     }

    function symbol()  public view  returns (string) {
      return _symbol;
    }

    function decimals()  public  view  returns (uint8) {
      return _decimals;
     }

    function totalSupply()  public  view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _addr) public view returns (uint256) {
        return _balanceOf[_addr];
    }

   function contractOwner() public view returns (address) {
      return _contractOwner;
   }

    function transfer(address _to, uint256 _value) external returns (bool) {
        return transfer(_to, _value, "");
    }


    function transfer(address _to, uint256 _value, bytes _data) onlyPayloadSize(2 * 32)
        internal
        returns (bool) {
        if (_value > 0 &&
            _value <= _balanceOf[msg.sender]) {

            if (_to.isContract()) {
              ERC223ReceivingContract _contract = ERC223ReceivingContract(_to);
              _contract.tokenFallback(msg.sender, _value, _data);
            }

            _balanceOf[msg.sender] = _balanceOf[msg.sender].sub(_value);
            _balanceOf[_to] = _balanceOf[_to].add(_value);

            emit Transfer(msg.sender, _to, _value,"");

            return true;
        }
        return false;
    }

    function transferFrom (address _from, address _to, uint256 _value)
        external
        returns (bool) {
        return transferFrom(_from, _to, _value, "");
    }

    function transferFrom(address _from, address _to, uint256 _value, bytes _data) onlyPayloadSize(3 * 32)
        internal
        returns (bool) {
        if (_allowances[_from][msg.sender] > 0 &&
            _value > 0 &&
            _allowances[_from][msg.sender] >= _value &&
            _balanceOf[_from] >= _value) {

              _allowances[_from][msg.sender].sub(_value);

              if (_to.isContract()) {
                ERC223ReceivingContract _contract = ERC223ReceivingContract(_to);
                _contract.tokenFallback(msg.sender, _value, _data);
              }

            _balanceOf[_from] = _balanceOf[_from].sub(_value);
            _balanceOf[_to] = _balanceOf[_to].add(_value);

            emit Transfer(_from, _to, _value,_data);

            return true;
        }
        return false;
    }

    function approve(address _spender, uint256 _value)
        external
        returns (bool) {
        if (_balanceOf[msg.sender] >= _value) {
          _allowances[msg.sender][_spender] = _value;
          emit Approval(msg.sender, _spender, _value);
          return true;
        }
        return false;
    }


    function allowance(address _owner, address _spender)
        external
        view
        returns (uint256) {
        if (_allowances[_owner][_spender] < _balanceOf[_owner]) {
          return _allowances[_owner][_spender];
        }
        return _balanceOf[_owner];
    }
}
