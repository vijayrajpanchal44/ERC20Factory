// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC20Token.sol";


contract tokenFactory{
    address[] public createdTokens;

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct cloneTokenDetail{
        uint256 tokenId;
        string tokenName;
        string tokenSymbol;
        address tokenAddress;
        address referenceTokenAddress;
    }

    mapping (uint256 => cloneTokenDetail) public idToCloneTokenDetail;

    event TokenCreated(
        address referenceToken,
        address newToken,
        string name,
        string symbol,
        uint8 decimal
    );

    function create(string memory name, string memory symbol,uint8 decimal, address template)
    external returns (address) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        address wallet = createClone(template);
        ERC20Token(wallet).initialize(name, symbol, decimal);
        createdTokens.push(wallet);
        idToCloneTokenDetail[tokenId] = cloneTokenDetail(tokenId, name,symbol,wallet, template);
        emit TokenCreated(template, wallet, name, symbol, decimal);
        return wallet;
    }

    function createClone(address target) internal returns (address result){
        bytes20 targetBytes = bytes20(target);
        assembly {
            let clone := mload(0x40)
            mstore(clone, 0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000)
            mstore(add(clone, 0x14), targetBytes)
            mstore(add(clone, 0x28), 0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000)
            result := create(0, clone, 0x37)
    }
}
}