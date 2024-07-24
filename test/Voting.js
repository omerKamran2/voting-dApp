const assert = require('assert');
const Voting = artifacts.require("Voting");

contract('Voting', (accounts) => {

    it('should allow users to cast votes', async () => {
        const instance = await Voting.deployed();

        await instance.vote(0, {from: accounts[0]});
        await instance.vote(1, { from: accounts[1] });

        const yesVotes = await instance.yesVotes.call();
        const noVotes = await instance.noVotes.call();

        assert.equal(yesVotes.toNumber(), 1, "Yes votes should be 1");
        assert.equal(noVotes.toNumber(), 1, "No votes should be 1");
    });

    it("should prevent double voting", async () => {const instance = await Voting.deployed();
        try {
            await instance.vote(0, { from: accounts[0] });
            assert.fail("Expected error not received");
        } catch (error) {
            assert(error.message.includes("You have already voted"), "Expected 'You have already voted'");
        }
    });

    let votingInstance;

    before(async () => {
        votingInstance = await Voting.new(2);
    });

    it("should not allow voting after the voting period has ended", async() => {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        try{
            await votingInstance.vote(0, {from: accounts[0]});
            assert.fail("Vote was cast after the voting period expired");
        } catch (error) {
            assert(error.message, "Voting period has ended", "Expected 'Voting period has ended' error");
            assert(error.message.includes("Voting period has ended"), "Expected 'Voting period has ended'");
        }
    });
    
})