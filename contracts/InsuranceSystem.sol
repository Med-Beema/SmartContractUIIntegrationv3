// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./InvestorToken.sol";
import "./ClaimAssessorToken.sol";


contract InsuranceSystem{

InvestorToken public investorToken;
ClaimAssessorToken public claimAssesorToken;
/* Staking Parameters*/
mapping(address => uint) stakedTokens;
uint public totalStakedTokens;

/*Claim Parameters */
enum ClaimStatus{
    Accepted,
    Rejected,
    Voting,
    Pending
}
struct ClaimDetails{
        string ClaimIpfs;
        string holdersDetailsIpfsHash;
        ClaimStatus claimStatus; 
        ////// Investor Voting/////////////////
         Voting InvestorVoting;
        ////////////////////////////////
        address Claimer;
        
        ///////claim Report Voting  ///////////////////
        Voting claimReportVoting; 
        ClaimStatus claimReportStatus;
        ////////////////////////////////////////
        string claimReportIpfs;
    }

struct Voting{
        uint256 TotalVotes;
        uint256 numberOfVotesFor;
        uint256 numberOfVotesAgainst;
        uint256 VotingTime;
        }

uint claimID = 0;
mapping(uint => ClaimDetails) public PolicyholdersClaimDetails;

/*Policyholder buy cover fees paramenters*/

mapping(address => bool) public approvedHolders; //Policy holders
mapping(address => string) public holdersDetailsIpfsHash; //policyholder to theirdetailsIpfs 
uint constant public coverFees = 1 ether;
uint constant public claimAmount = 10 ether; 
mapping(address => bool) voterHasVoted;

constructor(address _investorTokenAddress, address _claimAssesorTokenAddress){
    investorToken = InvestorToken(_investorTokenAddress);
    claimAssesorToken = ClaimAssessorToken(_claimAssesorTokenAddress);
    
}

//policyholder buy cover  FOR POLICYHOLDERS

function submitPolicyHolder(string memory _holderDetailsipfsHash) public {
    
    holdersDetailsIpfsHash[msg.sender]=_holderDetailsipfsHash;
}


function depositCoverFees() public payable{
    bytes memory detailsIpfs = bytes(holdersDetailsIpfsHash[msg.sender]);
    require(detailsIpfs.length!=0 );
    require(msg.value == coverFees);
    approvedHolders[msg.sender]=true;
    
}


//submit claim  For POLICYHOLDERS
function submitClaim(string memory  _claimIpfs) public returns(uint256) {
    require(approvedHolders[msg.sender] == true);
    bytes memory detailsIpfs = bytes(holdersDetailsIpfsHash[msg.sender]);
        require(detailsIpfs.length!=0 );
        claimID++;
             
        PolicyholdersClaimDetails[claimID] = ClaimDetails( _claimIpfs,holdersDetailsIpfsHash[msg.sender], ClaimStatus.Pending,Voting(0,0,0,0),msg.sender,Voting(0,0,0,0),ClaimStatus.Pending,"");
        return claimID;

    }
 // FOR POLICYHOLDERS

function getClaimAmount(uint _claimId) public investorAfterVotingPeriod(_claimId) claimAfterVotingPeriod(_claimId) isPolicyHolder(_claimId) isClaimAccepted(_claimId){
    
    payable(msg.sender).transfer(claimAmount);
}

//depositing capital For INVESTOR
function depositCapital() public payable isNotClaimAssesor{
        require(msg.value > coverFees);
        investorToken.transferToken(msg.sender, msg.value*100);


    }


//Voting functions FOR INVESTORS
function votefor(uint256 _claimId) public isNotPolicyHolder(_claimId) investorBeforeVotingPeriod(_claimId) isInvestor() HasNotvoted(){

    PolicyholdersClaimDetails[_claimId].InvestorVoting.numberOfVotesFor += investorToken.balanceOf(msg.sender)/(10**18);
    PolicyholdersClaimDetails[_claimId].InvestorVoting.TotalVotes += investorToken.balanceOf(msg.sender)/(10**18);
    voterHasVoted[msg.sender] = true;

    }


function voteAgainst(uint256 _claimId) public isNotPolicyHolder(_claimId) investorBeforeVotingPeriod(_claimId) isInvestor() HasNotvoted() {
    
    require(investorToken.balanceOf(msg.sender) > 0);
   
    PolicyholdersClaimDetails[_claimId].InvestorVoting.numberOfVotesAgainst += investorToken.balanceOf(msg.sender)/(10**18); 
    PolicyholdersClaimDetails[_claimId].InvestorVoting.TotalVotes += investorToken.balanceOf(msg.sender)/(10**18);
    voterHasVoted[msg.sender] = true;

    }

function InvestorVotingStart(uint _claimId) public isPolicyHolder(_claimId) claimAfterVotingPeriod(_claimId){
    uint VotingStart = block.timestamp+500;

    PolicyholdersClaimDetails[_claimId].InvestorVoting.VotingTime = VotingStart;
}

function VotingResults(uint _claimId) public returns(ClaimStatus claimStatus) {
    
    if(PolicyholdersClaimDetails[_claimId].InvestorVoting.VotingTime > block.timestamp){
        claimStatus= PolicyholdersClaimDetails[_claimId].claimStatus;
    }
    else if(PolicyholdersClaimDetails[_claimId].InvestorVoting.VotingTime < block.timestamp){
        uint256 votesForRatio = (PolicyholdersClaimDetails[_claimId].InvestorVoting.numberOfVotesFor/PolicyholdersClaimDetails[_claimId].InvestorVoting.TotalVotes)*100;
        if(votesForRatio>=70)
        {
            PolicyholdersClaimDetails[_claimId].claimStatus= ClaimStatus.Accepted;
            claimStatus= PolicyholdersClaimDetails[_claimId].claimStatus;
        }
        else {
            PolicyholdersClaimDetails[_claimId].claimStatus= ClaimStatus.Rejected;
            claimStatus= PolicyholdersClaimDetails[_claimId].claimStatus;
        }
    }

  


}

function getclaim(uint _claimID) view public  returns(ClaimStatus){
    return PolicyholdersClaimDetails[_claimID].claimReportStatus;
}
//withdraw FOR INVESTOR
function withdrawCapital(uint _amount) public isInvestor(){
    investorToken.burn(msg.sender,_amount*(10**18));
    payable(msg.sender).transfer(_amount*(10**18));
     }
//// /////////////////////////////Staking functions ///////////////

function stakeTokens(uint _numberOftokens) public  {
    claimAssesorToken.stakeToken(msg.sender,_numberOftokens*(10**18));
    stakedTokens[msg.sender]+= _numberOftokens;
    totalStakedTokens+=_numberOftokens;


}
function unstakeTokens(uint _numberOftokens) public isClaimAssessor hasStaked {

    claimAssesorToken.unstakeToken(msg.sender,_numberOftokens*(10**18));
    stakedTokens[msg.sender]-=_numberOftokens;
    totalStakedTokens-=_numberOftokens;

}

//////////////////////////////////////////////////////////////////////

function buyCTKN() public payable isNotInvestor{
        require(msg.value > coverFees);
        claimAssesorToken.transferToken(msg.sender, msg.value*100);

}

//// VOTING FUNCTIONS FOR CLAIM ASSESSORS

function claimReportVoteFor(uint _claimID) public hasStaked HasNotvoted isClaimAssessor isNotPolicyHolder(_claimID)  claimBeforeVotingPeriod(_claimID){
    PolicyholdersClaimDetails[_claimID].claimReportVoting.numberOfVotesFor+= stakedTokens[msg.sender];
    PolicyholdersClaimDetails[_claimID].claimReportVoting.TotalVotes+=stakedTokens[msg.sender];
    voterHasVoted[msg.sender] = true;
} 
function claimReportVoteAgainst(uint _claimID) hasStaked public HasNotvoted isClaimAssessor isNotPolicyHolder(_claimID)  claimBeforeVotingPeriod(_claimID){
    PolicyholdersClaimDetails[_claimID].claimReportVoting.numberOfVotesAgainst+=stakedTokens[msg.sender];
    PolicyholdersClaimDetails[_claimID].claimReportVoting.TotalVotes+=stakedTokens[msg.sender];
    voterHasVoted[msg.sender] = true;
}

///////////////////////////First Claim submission function///////////////////////////////////////////////////////////////
function claimAssessorReport(uint _claimID,string memory _claimReportIpfs) public isClaimAssessor  claimReportExists(_claimID){

    bytes memory _ipfs = bytes(_claimReportIpfs);
    require(_ipfs.length!=0 );
    uint votingStart = block.timestamp+500;
    PolicyholdersClaimDetails[_claimID].claimReportIpfs=_claimReportIpfs;
    PolicyholdersClaimDetails[_claimID].claimReportVoting.VotingTime=votingStart;
    PolicyholdersClaimDetails[_claimID].claimReportStatus = ClaimStatus.Voting;


}

///////////////Claim Report Voting////////////////////////////////

function claimReportVotingResults(uint _claimID) public returns(ClaimStatus claimStatus){

    if(PolicyholdersClaimDetails[_claimID].claimReportVoting.VotingTime> block.timestamp){
        claimStatus= PolicyholdersClaimDetails[_claimID].claimReportStatus;
    }
    else if(PolicyholdersClaimDetails[_claimID].claimReportVoting.VotingTime < block.timestamp){
        uint256 votesForRatio = (PolicyholdersClaimDetails[_claimID].claimReportVoting.numberOfVotesFor/PolicyholdersClaimDetails[_claimID].claimReportVoting.TotalVotes)*100;
        if(votesForRatio>=70)
        {
            PolicyholdersClaimDetails[_claimID].claimReportStatus= ClaimStatus.Accepted;
            PolicyholdersClaimDetails[_claimID].claimStatus= ClaimStatus.Accepted;
            
            claimStatus= PolicyholdersClaimDetails[_claimID].claimReportStatus;
        }
        else {
            PolicyholdersClaimDetails[_claimID].claimReportStatus= ClaimStatus.Rejected;
            claimStatus= PolicyholdersClaimDetails[_claimID].claimReportStatus;
        }
    }


}


///////////////////////////////////////////////////////////////////////


//////////////////Withdraw function for ClaimAssesor//////////
function withdrawClaimTokens(uint _amount) public isClaimAssessor(){
    claimAssesorToken.burn(msg.sender,_amount*(10**18));
    payable(msg.sender).transfer(_amount*(10**18));
     }

/////////////////////////


/*MODIFIERS*/





modifier isPolicyHolder(uint _claimId){
    require(PolicyholdersClaimDetails[_claimId].Claimer==msg.sender);
    _;
}
modifier isClaimAccepted(uint _claimId) {
    require(PolicyholdersClaimDetails[_claimId].claimStatus == ClaimStatus.Accepted);
    _;
}
modifier isNotPolicyHolder(uint _claimId){
    require(PolicyholdersClaimDetails[_claimId].Claimer!=msg.sender);
    _;
}
modifier claimBeforeVotingPeriod(uint256 _claimId) {
    require(PolicyholdersClaimDetails[_claimId].claimReportVoting.VotingTime > block.timestamp);
    
    _;
}
modifier claimAfterVotingPeriod(uint256 _claimId) {
    require(PolicyholdersClaimDetails[_claimId].claimReportVoting.VotingTime < block.timestamp);
    
    _;
}
modifier investorBeforeVotingPeriod(uint256 _claimId) {
    require(PolicyholdersClaimDetails[_claimId].InvestorVoting.VotingTime > block.timestamp);
    
    _;
}
modifier investorAfterVotingPeriod(uint256 _claimId) {
    require(PolicyholdersClaimDetails[_claimId].InvestorVoting.VotingTime < block.timestamp,"The voting hasnot eneded");
    
    _;
}
modifier HasNotvoted(){
    require(voterHasVoted[msg.sender] == false, "You Have already voted");
    _;
}
modifier isInvestor(){
    require(investorToken.balanceOf(msg.sender)!=0 ,"You are not an Invetsor ");
    _;
}

modifier isNotClaimAssesor(){
    require(claimAssesorToken.balanceOf(msg.sender)==0, "You are not an claim Assessor");
    _;
}
modifier isNotInvestor(){
    require(investorToken.balanceOf(msg.sender)==0,"You are not an Invetsor ");
    _;
}
modifier isClaimAssessor(){
      require(claimAssesorToken.balanceOf(msg.sender)!=0, "You are not an claim Assessor");
    _;
}
modifier claimReportExists(uint claimId){
    bytes memory _ipfs = bytes(PolicyholdersClaimDetails[claimId].claimReportIpfs);
    require(_ipfs.length==0 );
    _;
}

modifier hasStaked(){
    require(stakedTokens[msg.sender] > 1);
    _;
}





}