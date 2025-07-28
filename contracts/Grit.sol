// === Grit.sol ===

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Grit is ERC20 {
    uint8 private constant _decimals = 0;
    uint256 public constant TOTAL_SUPPLY = 50_000_000_000 * 230_630_400;

    constructor() ERC20("Grit", "GRIT") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    function decimals() public pure override returns (uint8) {
        return _decimals;
    }
}
