// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC20Token.sol";

contract ERC20TokenFactory {
    ERC20Token[] public tokens;

    function tokenFactory(string memory name, string memory symbol) public {
        ERC20Token token = new ERC20Token(name, symbol);
        tokens.push(token);
    }
}

