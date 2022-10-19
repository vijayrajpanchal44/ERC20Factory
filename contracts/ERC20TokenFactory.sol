// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC20Token.sol";

contract ERC20TokenFactory {
    Token[] public tokens;

    event TokenCreated(
        string name,
        string symbol,
        uint8 decimal,
        address newToken
    );

    //Contracts can be created by other contracts using the new keyword. Since 0.8.0,
    // new keyword supports create2 feature by specifying salt options.
    function tokenFactory(string memory name, string memory symbol, uint8 decimal)
        public returns(address){
        Token token = new Token(name, symbol, decimal);
        address tokenAddress = address(token);
        tokens.push(token);
        emit TokenCreated( name, symbol, decimal, tokenAddress);
        return tokenAddress;
    }
}


