pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT721 is ERC721URIStorage {
    address private _owner;

    constructor() ERC721("Crypton ERC-721 task", "ACET7")   {
        _owner = msg.sender;

        _safeMint(msg.sender, 1);
        _setTokenURI(
            1,
            "https://ipfs.io/ipfs/QmaTeWhhRmcHAsVrVERWFHvYsarf6B2BZ3e4eHzu9bhQgq?filename=black.json"
        );
    }

    function mint(address to, uint256 tokenId) public virtual {
        require (_owner == to, "Not owner");
        require (to != address(0));

        _safeMint(to, tokenId);
    }
}
