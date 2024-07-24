import 'bootstrap/dist/css/bootstrap.css'
const Web3 = require('web3');

import configuration from '../build/contracts/Voting.json';

const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(
    Web3.givenProvider || 'http://127.0.0.1:7545'
);

const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);


const main = async() => {
    let account;
    const accounts = await web3.eth.requestAccounts();
    account = accounts[0];
    document.getElementById('account').innerHTML = account;

    const endTime = await contract.methods.votingEndTime().call();
    document.getElementById('endTime').innerText = new Date(endTime * 1000).toLocaleString();


    const yesVotes = await contract.methods.yesVotes().call();
    const noVotes = await contract.methods.noVotes().call();

    document.getElementById('yesVotes').innerText = yesVotes;
    document.getElementById('noVotes').innerText = noVotes;

    window.vote = async(vote) => {
        try {

            await contract.methods.vote(vote ? 0 : 1).send({from: account}).catch(console.log);

        } catch (error) {
            console.log("error:");
            console.log(error);
        }
    
        
    
        document.getElementById('yesVotes').innerText = yesVotes;
        document.getElementById('noVotes').innerText = noVotes;
    };
}

main();