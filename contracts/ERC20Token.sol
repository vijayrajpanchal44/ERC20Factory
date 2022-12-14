// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Token is ERC20 {
    uint8 private _decimals;
    address public owner;

    modifier onlyOwnerOrigin {
        require(msg.sender == owner," Only owner can mint");
        _;
    }
    constructor(string memory name, string memory symbol, uint8 decimal) 
    ERC20(name, symbol){
        setDecimals(decimal);
        owner = tx.origin;
    }

    function mint(uint256 amount) public onlyOwnerOrigin{
        _mint(msg.sender, amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function setDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
}

