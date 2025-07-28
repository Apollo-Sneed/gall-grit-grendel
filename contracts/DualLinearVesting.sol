// === DualLinearVesting.sol ===

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract DualLinearVesting {
    address public immutable token;
    address public immutable creator;
    address public immutable community;

    uint256 public immutable creatorShare;
    uint256 public immutable communityShare;
    uint256 public immutable startTime;
    uint256 public immutable duration;

    uint256 public creatorClaimed;
    uint256 public communityClaimed;

    constructor(
        address _token,
        address _creator,
        address _community,
        uint256 _creatorShare,
        uint256 _communityShare,
        uint256 _startTime,
        uint256 _duration
    ) {
        token = _token;
        creator = _creator;
        community = _community;
        creatorShare = _creatorShare;
        communityShare = _communityShare;
        startTime = _startTime;
        duration = _duration;
    }

    function _vestedAmount(uint256 totalShare) internal view returns (uint256) {
        if (block.timestamp < startTime) return 0;
        if (block.timestamp >= startTime + duration) return totalShare;
        return (totalShare * (block.timestamp - startTime)) / duration;
    }

    function releaseCreator() external {
        uint256 vested = _vestedAmount(creatorShare);
        uint256 unreleased = vested - creatorClaimed;
        require(unreleased > 0, "Nothing to release");
        creatorClaimed += unreleased;
        require(IERC20(token).transfer(creator, unreleased), "Transfer failed");
    }

    function releaseCommunity() external {
        uint256 vested = _vestedAmount(communityShare);
        uint256 unreleased = vested - communityClaimed;
        require(unreleased > 0, "Nothing to release");
        communityClaimed += unreleased;
        require(IERC20(token).transfer(community, unreleased), "Transfer failed");
    }
}
