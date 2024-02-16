// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract QrCode {
    event ManufacturerAdded(address indexed manufacturer);
    event RetailerAdded(address indexed retailer);
    event RetailerRemoved(address indexed retailer);
    event ItemAdded(uint256 indexed id);
    event ItemDetailsUpdated(
        uint256 indexed id,
        string itemName,
        string description
    );
    event ItemRecorded(uint256 indexed id);
    // event ItemNotFound(string qrHash);

    struct Manufacturer {
        address manufacturer;
        string name;
        string location;
        string email;
        uint256 phoneNumber;
        bool isSignedUp;
    }

    struct Retailer {
        address retailer;
        uint256 retailerID;
        string name;
        string location;
        string email;
        uint256 phoneNumber;
    }

    struct ItemDetails {
        string itemName;
        string description;
    }

    //@dev Josephat create system account structure
    struct SystemOwner {
        address sysOwner;
        string password;
        bool isLogin;
    }

    address public owner;
    uint256 private s_retailerID;
    uint256 private item_ID;

    mapping(address => Manufacturer) public manufacturerDetails;
    mapping(address => mapping(address => Retailer))
        public manufacturerToRetailerDetails;
    mapping(string => Retailer) public retailerDetails;

    // mapping(address => mapping(string => uint256)) public identifiers;
    // mapping(string => uint256) public hashToId;
    mapping(uint256 => ItemDetails) public itemDetails;
    mapping(string => bool) public recordedItems;

    //@dev Josephat mapping
    mapping(uint256 => string) private qrHashMap;
    mapping(address => SystemOwner) public sysOwnerMap;

    //@dev Josephat array
    uint256[] public qrHashArr;

    SystemOwner public sysowner;

    constructor() {
        owner = msg.sender;
        sysowner = SystemOwner(owner, "admin", false);
        sysOwnerMap[owner] = sysowner;
    }

    //@dev Josephat only owner condition
    modifier onlySysOwner() {
        require(
            msg.sender == owner,
            "Only system owner can perform this action"
        );
        _;
    }

    modifier onlyManufacturer() {
        require(
            manufacturerDetails[msg.sender].isSignedUp,
            "Only manufacturer can add retailer details"
        );
        _;
    }

    // @dev Josephat transfer sysOwnership
    function transerOwership(address _address) external onlySysOwner {
        owner = _address;
    }

    function signUp(
        string memory _manfName,
        string memory _location,
        string memory _email,
        uint256 _phoneNumber
    ) external {
        require(msg.sender != address(0), "Address not valid");
        require(
            !manufacturerDetails[msg.sender].isSignedUp,
            "Manufacturer is already registered"
        );
        require(
            bytes(_manfName).length > 0,
            "Manufacturer name cannot be empty"
        );

        emit ManufacturerAdded(msg.sender);
        manufacturerDetails[msg.sender] = Manufacturer(
            msg.sender,
            _manfName,
            _location,
            _email,
            _phoneNumber,
            true
        );
    }

    //@dev Josephat login system for system owner
    function loginSysOwner(
        string memory _password
    ) external onlySysOwner returns (bool) {
        require(
            compareStrings(sysOwnerMap[msg.sender].password, _password),
            "Invalid password of account address"
        );
        sysOwnerMap[msg.sender].isLogin = true;
        return true;
    }

    //@dev Josephat function to store data to the array storeQrHash executed by only manufacturer
    function storeQrHash(string memory _qrHash) external onlyManufacturer {
        uint timestamp = block.timestamp;
        qrHashMap[timestamp] = _qrHash;
        qrHashArr.push(timestamp);
    }

    //@dev Josephat function to return qrcodeHash array to the manufacturer frontend
    function getQrHashList() external view returns (uint256[] memory) {
        return qrHashArr;
    }

    //@dev Josephat function to view qrcodeHash one by one
    function getQrHash(
        uint256 _indeId
    ) external view returns (string memory _qrHash) {
        _qrHash = qrHashMap[_indeId];
    }

    function addRetailerInfo(
        address _retailer,
        string memory _name,
        string memory _location,
        string memory _email,
        uint256 _phoneNumber
    ) external onlyManufacturer {
        require(_retailer != address(0), "Retailer address cannot be zero");
        emit RetailerAdded(_retailer);
        s_retailerID++;
        manufacturerToRetailerDetails[msg.sender][_retailer] = Retailer(
            _retailer,
            s_retailerID,
            _name,
            _location,
            _email,
            _phoneNumber
        );
        retailerDetails[_name] = manufacturerToRetailerDetails[msg.sender][
            _retailer
        ];
    }

    function removeRetailer(address _retailer) external onlyManufacturer {
        require(
            manufacturerToRetailerDetails[msg.sender][_retailer].retailer !=
                address(0),
            "Retailer not found"
        );
        emit RetailerRemoved(_retailer);
        delete manufacturerToRetailerDetails[msg.sender][_retailer];
        delete retailerDetails[
            manufacturerToRetailerDetails[msg.sender][_retailer].name
        ];
    }

    function addItemDetails(
        string memory _qrHash,
        string memory _itemName,
        string memory _description
    ) external onlyManufacturer {
        // require(identifiers[msg.sender][_qrHash] == 0, "Identifier already exists");
        // require(hashToId[_qrHash] == 0, "Identifier already exists");
        // require(!recordedItems[_qrHash], "Item already recorded");
        // require(bytes(_itemName).length > 0, "Item name cannot be empty");
        // require(bytes(_description).length > 0, "Description cannot be empty");

        emit ItemAdded(item_ID);
        emit ItemDetailsUpdated(item_ID, _itemName, _description);
        emit ItemRecorded(item_ID);

        item_ID++;
        // identifiers[msg.sender][_qrHash] = item_ID;
        // hashToId[_qrHash] = item_ID;
        itemDetails[item_ID] = ItemDetails(_itemName, _description);
        recordedItems[_qrHash] = true;
    }

    // function getItemIdentifier(string memory _qrHash) public view returns (uint256) {
    //     return hashToId[_qrHash];
    // }

    function scanItem(string memory _qrHash) external view returns (bool) {
        if (recordedItems[_qrHash]) {
            // return itemDetails[getItemIdentifier(_qrHash)];
            return true;
        } else {
            // emit ItemNotFound(_qrHash);
            // return ItemDetails("", "");
            return false;
        }
    }

    // @dev Josephat helpers Functions

    // Cannot directly compare strings in Solidity
    // This function hashes the 2 strings and then compares the 2 hashes
    function compareStrings(
        string memory a,
        string memory b
    ) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}
