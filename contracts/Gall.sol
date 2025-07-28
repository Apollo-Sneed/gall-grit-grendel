// === Gall.sol ===

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Gall is ERC20 {
    uint8 private constant _decimals = 18;
    uint256 public constant GRITS_PER_GALL = 230_630_400;
    uint256 public constant WEI_PER_GALL_GRIT = 4_335_941_836;
    uint256 public constant TOTAL_SUPPLY = 50_000_000_000 * GRITS_PER_GALL * WEI_PER_GALL_GRIT;

    event TransferRounded(address indexed sender, address indexed recipient, uint256 requested, uint256 rounded);

    constructor() ERC20("Gall", "GLL") {
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    function decimals() public pure override returns (uint8) {
        return _decimals;
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(amount >= WEI_PER_GALL_GRIT, "Amount must be at least one Gall-Grit");
        uint256 roundedAmount = (amount / WEI_PER_GALL_GRIT) * WEI_PER_GALL_GRIT;
        require(roundedAmount > 0 && roundedAmount <= amount, "Rounded amount must be > 0 and <= input");
        emit TransferRounded(msg.sender, recipient, amount, roundedAmount);
        return super.transfer(recipient, roundedAmount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        require(amount >= WEI_PER_GALL_GRIT, "Amount must be at least one Gall-Grit");
        uint256 roundedAmount = (amount / WEI_PER_GALL_GRIT) * WEI_PER_GALL_GRIT;
        require(roundedAmount > 0 && roundedAmount <= amount, "Rounded amount must be > 0 and <= input");
        emit TransferRounded(sender, recipient, amount, roundedAmount);
        return super.transferFrom(sender, recipient, roundedAmount);
    }

    function isWholeGritBalance(address account) public view returns (bool) {
        return balanceOf(account) % WEI_PER_GALL_GRIT == 0;
    }
}