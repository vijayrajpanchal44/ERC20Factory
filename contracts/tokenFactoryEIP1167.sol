// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./tokenEIP1167.sol";
contract tokenFactoryEIP1167 {

    address constant template = 0x80922Db6752eCe1C2DeFA54Beb8FB984E649308B;

    event TokenCreated(
        address referenceToken,
        address newToken,
        string name,
        string symbol
        );

    function create(string memory name, string memory symbol)
    external returns (address) {
        address wallet = createClone(template);
        ERC20Token1167(wallet).ERC20token(name, symbol);
        emit TokenCreated(template, wallet, name, symbol);
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