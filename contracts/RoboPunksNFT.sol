// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;
// import contract for minting, secure and reuse
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// define functions that only owner can use 
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunksNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;


    constructor() payable ERC721('RoboPunks', 'RP') {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
    }

    function setIsPublcMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
    // allows us to change var true or false 
    // if false, no one can mint
    // if true, allow someone to mint
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    // url of where images will be located 
    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    // token that openSea calls to grab images
    // exists in ERC721, already defined
    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist!');
        // taking url that we identified, grabbing id, then attach .json
        // allows open sea to grab every url of the images
        // call tokenuri for each token
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), '.json'));
    }

    function withdraw() external onlyOwner {
        // grab funds,
        // pass in balance and empty
        // allows us to withdraw funds to address specified
        // grabs success val that returns from it and keep going or hit fail check
        (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
        require(success, 'withdraw failed');
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, 'minting not enabled');
        // make sure user inputs correct value
        // make sure quantty * mint price is equal to value
        require(msg.value == quantity_ * mintPrice, 'wrong mint value');
        require(totalSupply * quantity_ <= maxSupply, 'sold out');
        // keeps track of quantity of mints in wallet
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceed max wallet');


        for (uint256 i = 0; i < quantity_; i++) {

            uint256 newTokenId = totalSupply + 1;
            totalSupply++;

            // safeMint is function that exists within erc721, inherited
            // pass in address that receives NFT in msg.sender
            _safeMint(msg.sender, newTokenId);
        }
    }
}




