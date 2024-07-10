// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    uint[] public candidateIds;
    mapping(address => bool) public hasVoted;
    uint public nextCandidateId;

    event CandidateAdded(uint id, string name);
    event VoteCast(uint candidateId);

    constructor() {
        nextCandidateId = 1; // Start candidate IDs from 1
    }

    function addCandidate(string memory _name) external {
        candidates[nextCandidateId] = Candidate(nextCandidateId, _name, 0);
        candidateIds.push(nextCandidateId);
        emit CandidateAdded(nextCandidateId, _name);
        nextCandidateId++;
    }

    function vote(uint _candidateId) external {
        require(!hasVoted[msg.sender], "You have already voted");
        require(candidates[_candidateId].id != 0, "Invalid candidate ID");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        emit VoteCast(_candidateId);
    }

    function totalVotes(uint _candidateId) external view returns (uint) {
        require(candidates[_candidateId].id != 0, "Invalid candidate ID");
        return candidates[_candidateId].voteCount;
    }

    function getWinner() external view returns (uint winnerId, string memory winnerName, uint winnerVoteCount) {
        uint highestVoteCount = 0;
        for (uint i = 0; i < candidateIds.length; i++) {
            uint candidateId = candidateIds[i];
            if (candidates[candidateId].voteCount > highestVoteCount) {
                highestVoteCount = candidates[candidateId].voteCount;
                winnerId = candidateId;
                winnerName = candidates[candidateId].name;
                winnerVoteCount = highestVoteCount;
            }
        }
    }
}
