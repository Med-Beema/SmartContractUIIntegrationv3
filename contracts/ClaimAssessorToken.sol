// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ClaimAssessorToken is ERC20{

    address public minter;
    constructor() ERC20("Claim Assesor Token", "CTKN"){
        minter = msg.sender;////Also the payout Wallet
        _mint(minter, 10000*(10**18));
       
    }
    function transferToken(address _buyer, uint amount) external {
        _transfer(minter, _buyer , amount);
    }
    function burn(address _tokenholder, uint _amount) external {
        _burn(_tokenholder, _amount);
    }
    function stakeToken(address staker, uint numberOfTokens) external{
        _burn(staker,numberOfTokens);
    }
    function unstakeToken(address staker, uint numberOfTokens)external{
        _transfer(minter,staker,numberOfTokens);
    }

}