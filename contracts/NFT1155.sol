pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";

contract NFT1155 is ERC1155URIStorage{
    address public _owner;

    constructor() ERC1155("https://ipfs.io/ipfs/Qmej6ENUNfAgMn1FRfft6yfHBqRZvSxPfASkD8XwkwBV7D?filename=black_1155.json") {
        _owner = msg.sender;

        _mint(msg.sender, 1, 1, "");
    }

    function mint(address to, uint256 id, uint256 amount, bytes memory data) public virtual {
        require (_owner == to, "Not owner");
        require (to != address(0));

        _mint(to, id, amount, data);
    }
}
