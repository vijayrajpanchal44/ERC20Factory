// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Token is ERC20 {
    uint8 private _decimals;

    constructor(string memory name, string memory symbol, uint8 decimal) 
    ERC20(name, symbol){
        setDecimals(decimal);
    }

    function mint(uint256 amount) public {
        _mint(msg.sender, amount);
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function setDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
}

