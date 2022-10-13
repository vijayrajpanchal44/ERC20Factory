// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    constructor(string memory name, string memory symbol) 
    ERC20(name, symbol){
    }

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }
}