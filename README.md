# ERC20 token factory 

## What does this repository contain?

1. An `ERC20` contract using the [@openzeppelin/contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) standards.
2. Simple `SimpleFactory` contract and `FactoryUsingERC1167` to deploy ERC20  contracts.
3. A Javascript test file for testing the `Factory` and `FactoryUsingERC1167` contract with [Hardhat].

## What can I use it for?

You can deploy the `Factory` contract on an Ethereum blockchain network, and then use it to trustlessly deploy secure new ERC20 tokens on that same network.

## How can I use it?

1. Install `Hardhat` with `npm install -g hardhat`.
2. Install dependencies with `npm install`.
3. Compile code with `npx hardhat compile`.
4. Start the test suite with `npx hardhat test`

## Gas uses comparison 

| Gas uses   | Simple Token Factory  | ERC1167 Token Factory | Simple ERC20 Token | For ERC1167 ERC20 token |
|------------|-----------------------|-----------------------|--------------------|-------------------------|
| Deployment | 2074219               | 802843                | 1464615            | 1565831                 |

```