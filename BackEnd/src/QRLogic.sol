@@ -1,208 +0,0 @@
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract QRCode {
    event manufacturerAdded(address _manufacturer);
    event retailerAdded(address _retailer);
    event RetailerRemoved(address _retailer);

    event itemAdded(uint256 id);
    event itemDetailsUpdated(string _itemName, string _description);
    event itemRecorded(uint256 id);
    event ItemNotFound(string _qrHash);

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

    address public owner;
    uint256 private s_retailerID;
    uint256 private item_ID;

    mapping(address => Manufacturer) public manufacturerDetails;
    mapping(address => mapping(address => Retailer))
        public manufacturerToRetailerDetails;
    mapping(string => Retailer) public retailerDetails;

    mapping(address => mapping(string => uint256)) public identifiers; // Mapping of manufacturer addresses to item' hash to identifiers
    mapping(string => uint256) public hashToId;
    mapping(uint256 => ItemDetails) public itemDetails; //Mapping of ids matched to its details
    mapping(string => bool) public recordedItems; //true for each of our recorded items

    constructor() {
        owner = msg.sender;
    }

    modifier onlyManufacturer() {
        require(
            manufacturerDetails[owner].isSignedUp == true,
            "Only manufacturer can add Retailer details"
        );
        require(owner != address(0), "Address not valid");
        _;
    }

    function signUp(
        string memory _manfName,
        string memory _location,
        string memory _email,
        uint256 _phoneNumber
    ) external {
        require(msg.sender != address(0), "Address not valid");
        require(
            manufacturerDetails[msg.sender].isSignedUp == false,
            "Manufacturer is already registered"
        );
        require(bytes(_manfName).length > 0, "Username cannot be empty");

        emit manufacturerAdded(msg.sender);
        manufacturerDetails[msg.sender] = Manufacturer(
            msg.sender,
            _manfName,
            _location,
            _email,
            _phoneNumber,
            true
        );
    }

    /*@dev The following functions are called by Manufacturer ONLY*/
    function addRetailerInfor(
        address _retailer,
        string memory _name,
        string memory _location,
        string memory _email,
        uint256 _phoneNumber
    ) external onlyManufacturer {
        require(_retailer != address(0), "Retailer not found");
        emit retailerAdded(_retailer);
        s_retailerID = s_retailerID + 1;
        manufacturerToRetailerDetails[msg.sender][_retailer] = Retailer(
            _retailer,
            s_retailerID,
            _name,
            _location,
            _email,
            _phoneNumber
        );
        manufacturerToRetailerDetails[msg.sender][_retailer] = retailerDetails[
            _name
        ];
    }

    function removeRetailer(address _retailer) external onlyManufacturer {
        require(
            manufacturerToRetailerDetails[msg.sender][_retailer].retailer !=
                address(0),
            "Retailer not found"
        );
        emit RetailerRemoved(_retailer);
        // Remove from manufacturerToRetailerDetails mapping
        delete manufacturerToRetailerDetails[msg.sender][_retailer];

        // Remove from retailerDetails mapping
        string memory retailerName = manufacturerToRetailerDetails[msg.sender][
            _retailer
        ].name;
        delete retailerDetails[retailerName];
    }

    function addItemDetails(
        string memory _qrHash,
        string memory _itemName,
        string memory _description
    ) external onlyManufacturer {
        require(identifiers[msg.sender][_qrHash] == 0, "Identifier in system");
        require(hashToId[_qrHash] == 0, "Identifier in system");
        require(recordedItems[_qrHash] == false, "Item in system");
        require(bytes(_itemName).length > 0, "Item name cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");

        emit itemAdded(item_ID);
        emit itemDetailsUpdated(_itemName, _description);
        emit itemRecorded(item_ID);

        item_ID = item_ID + 1;
        identifiers[msg.sender][_qrHash] = item_ID;
        hashToId[_qrHash] = item_ID;

        itemDetails[item_ID] = ItemDetails(_itemName, _description);

        recordedItems[_qrHash] = true;
    }

    function editItemDetails(
        uint _id,
        string memory _itemName,
        string memory _description
    ) external onlyManufacturer {
        require(_id > 0 && _id <= item_ID, "Invalid item ID");
        require(bytes(_itemName).length > 0, "Item name cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");

        emit itemDetailsUpdated(_itemName, _description);
        itemDetails[_id] = ItemDetails(_itemName, _description);
    }

    /*@dev The following functions are called by ANYONE*/
    function getItemIdentifier(
        string memory _qrHash
    ) public view returns (uint256) {
        return hashToId[_qrHash];
    }

    function scanItem(
        string memory _qrHash
    ) external returns (ItemDetails memory) {
        if (recordedItems[_qrHash] == true) {
            return itemDetails[getItemIdentifier(_qrHash)];
        } else {
            emit ItemNotFound(_qrHash);
            // Return an empty ItemDetails struct
            return ItemDetails("", "");
        }
    }

    function getManufacturerDetails(
        address _manufacturer
    ) external view returns (Manufacturer memory) {
        return manufacturerDetails[_manufacturer];
    }

    function getRetailerDetails(
        address _manufacturer,
        address retailer
    ) external view returns (Retailer memory) {
        return manufacturerToRetailerDetails[_manufacturer][retailer];
    }

    function getRetailerDetails(
        string memory _name
    ) external view returns (Retailer memory) {
        require(bytes(_name).length > 0, "Retailer name cannot be empty");
        require(
            retailerDetails[_name].retailer != address(0),
            "Retailer not found"
        );
        return retailerDetails[_name];
    }
}