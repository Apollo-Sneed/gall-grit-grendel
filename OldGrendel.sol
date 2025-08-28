// === Grendel.sol ===

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OldGrendel is ERC20 {
    uint8 private constant _decimals = 18;
    uint256 public constant TOTAL_SUPPLY = 230_630_400 * 1e18;
    uint256 public constant MIN_UNIT = 20_000_000;

    event TransferRounded(address indexed sender, address indexed recipient, uint256 requested, uint256 rounded);

    constructor() ERC20("Grendel", "GRN") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    function decimals() public pure override returns (uint8) {
        return _decimals;
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(amount >= MIN_UNIT, "Amount must be at least one Grendel-Grit");
        uint256 roundedAmount = (amount / MIN_UNIT) * MIN_UNIT;
        require(roundedAmount > 0 && roundedAmount <= amount, "Rounded amount must be > 0 and <= input");
        emit TransferRounded(msg.sender, recipient, amount, roundedAmount);
        return super.transfer(recipient, roundedAmount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        require(amount >= MIN_UNIT, "Amount must be at least one Grendel-Grit");
        uint256 roundedAmount = (amount / MIN_UNIT) * MIN_UNIT;
        require(roundedAmount > 0 && roundedAmount <= amount, "Rounded amount must be > 0 and <= input");
        emit TransferRounded(sender, recipient, amount, roundedAmount);
        return super.transferFrom(sender, recipient, roundedAmount);
    }

    function isWholeGrendelGritBalance(address account) public view returns (bool) {
        return balanceOf(account) % MIN_UNIT == 0;
    }
}
