// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract ERC20Token1167 {    
    function ERC20token(string memory name, string memory symbol) public returns(ERC20){
        ERC20 token = new ERC20(name, symbol);
        return token;
    }
}