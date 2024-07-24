pragma solidity >=0.4.22 <0.9.0;

contract Votin {

    address public owner;
    uint256 public votingEndTime;
    mapping(address => bool) public hasVoted;
    uint256 public yesVotes;
    uint256 public noVotes;

    enum VoteOption { Yes, No }

    constructor(uint256 _votingDuration) public {
        owner = msg.sender;
        votingEndTime = block.timestamp + _votingDuration;
    }

    function vote(VoteOption _vote) public {
        require(block.timestamp < votingEndTime, "Voting period has ended");
        require(!hasVoted[msg.sender], "You have already voted");

        hasVoted[msg.sender] = true;

        if (_vote == VoteOption.Yes) {
            yesVotes += 1;
        } else {
            noVotes += 1;
        }
    }

}
