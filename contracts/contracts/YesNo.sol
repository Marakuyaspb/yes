pragma solidity >=0.4.22 <0.9.0;

contract YesNo {
    struct Variant {
        uint id;
        string value;
        uint totalVotes;
    }

    mapping(uint => Variant) public variants;
    mapping(address => mapping(uint => uint)) public userVotes;
    uint public count;

    event votedEvent(uint indexed variantId);

    constructor() public {
        addVariant("Yes");
        addVariant("No");
    }

    function addVariant(string memory newValue) internal {
        count++;
        variants[count] = Variant(count, newValue, 0);
    }

    function vote(uint variantId) public {
        require(variantId > 0 && variantId <= count, "Invalid variant ID");
        variants[variantId].totalVotes++;
        emit votedEvent(variantId);
    }

    function getTotalVotes(uint variantId) public view returns (uint) {
        return variants[variantId].totalVotes;
    }
}