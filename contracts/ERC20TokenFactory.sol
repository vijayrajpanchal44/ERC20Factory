// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC20Token.sol";

contract ERC20TokenFactory {
    ERC20Token[] public tokens;

    //Contracts can be created by other contracts using the new keyword. Since 0.8.0,
    // new keyword supports create2 feature by specifying salt options.
    function tokenFactory(string memory name, string memory symbol, uint8 decimal) public {
        ERC20Token token = new ERC20Token(name, symbol, decimal);
        tokens.push(token);
    }
}
//ERC20TokenFactory using EIP1167 practice


