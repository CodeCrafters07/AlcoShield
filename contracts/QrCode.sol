// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract QrCode {
    error HashIsntStored(uint blockId);

    event ManufacturerAdded(address indexed manufacturer);
    event RetailerAdded(address indexed retailer);
    event RetailerRemoved(address indexed retailer);

    event PasswordChanged(address indexed admin);
    event ownershipTransferred(address indexed newAdmin);

    event ItemAdded_M(uint256 indexed id);
    event ItemDetailsUpdated_M(
        uint256 indexed id,
        string itemName,
        string description
    );
    event ItemRecorded_M(uint256 indexed id);
    event qrHashStored(uint indexed timestamp);
    // event ItemNotFound(string qrHash);
    event qrHashDeleted(uint256 _blockId);

    struct Manufacturer {
        address manufacturer;
        string name;
        string location;
        string email;
        string phoneNumber;
        bytes32 password;
        bool isSignedUp;
    }

    struct Retailer {
        address retailer;
        uint256 retailerID;
        string name;
        string location;
        string email;
        string phoneNumber;
    }

    struct ItemDetails {
        string itemName;
        string description;
    }

    //@dev create system account structure
    struct SystemOwner {
        address sysOwner;
        bytes32 password /*audit*/;
        bool isLogin;
    }

    address private owner;
    SystemOwner public sysowner;

    uint256 private s_retailerID;

    mapping(address => SystemOwner) public sysOwnerMap;

    mapping(address => Manufacturer) public manufacturerDetails;
    mapping(address => mapping(address => Retailer))
        public manufacturerToRetailerDetails;
    mapping(string => Retailer) public retailerDetails;

    //STORING
    mapping(address => mapping(uint256 => string))
        private qrHashMapByManufacturer; // stored by manufacturer when generating hash + id

    uint256[] public manufacturerIDHashArr; //scanned by only manufacturer
    mapping(uint => bool) private storedIDs; //just stored

    //MATCHING
    mapping(string => uint256) public matchHashToId; //used by users when scanning

    mapping(string => bool) public matchedItems; //matched hash to items

    mapping(uint256 => ItemDetails) public itemDetails;

    constructor() {
        owner = msg.sender;
        sysowner = SystemOwner(owner, keccak256(abi.encode(("admin"))), false);
        sysOwnerMap[owner] = sysowner;
    }

    //@dev Josephat only owner condition
    modifier onlySysOwner() {
        require(
            msg.sender == owner,
            "Only system owner can perform this action"
        );
        require(
            msg.sender != address(0),
            "Only system owner can perform this action"
        );
        _;
    }

    modifier onlyManufacturer() {
        require(
            manufacturerDetails[msg.sender].isSignedUp,
            "Only manufacturer can add retailer details"
        );
        require(
            msg.sender != address(0),
            "Only manufacturer can perform this action"
        );
        _;
    }

    /*@dev System Owner functions*/
    function loginSysOwner(
        bytes32 _password
    ) external onlySysOwner returns (bool) {
        require(
            bytes32(sysOwnerMap[msg.sender].password) ==
                keccak256(abi.encode(_password)),
            "Invalid password of account address"
        );
        sysOwnerMap[msg.sender].isLogin = true;
        return true;
    }

    function changePassword(
        bytes32 oldPassword,
        bytes32 _newPassword
    ) external onlySysOwner {
        require(
            bytes32(sysOwnerMap[msg.sender].password) ==
                keccak256(abi.encode(oldPassword)),
            "Invalid password of account address"
        );
        require(_newPassword.length > 0, "Password should not be empty");
        require(
            bytes32(sysOwnerMap[msg.sender].password) !=
                keccak256(abi.encode(_newPassword)),
            "Invalid password of account address"
        );
        require(sysOwnerMap[msg.sender].isLogin == true, "Not logged in");

        emit PasswordChanged(msg.sender);
        // SystemOwner storage newSystemPassword = SystemOwner(,keccak256(abi.encode(_newPassword)),);
        // sysowner = SystemOwner(,keccak256(abi.encode(_newPassword)),);
        sysOwnerMap[msg.sender].password = _newPassword;
    }

    function transferOwnership(address _address) external onlySysOwner {
        delete sysOwnerMap[owner];
        emit ownershipTransferred(_address);
        owner = _address;
        sysOwnerMap[owner];
    }

    /*@dev Manufacturer functions*/
    function signUp(
        string memory _manfName,
        string memory _location,
        string memory _email,
        string memory _phoneNumber,
        bytes32 _password
    ) external {
        require(msg.sender != address(0), "Address not valid");
        require(msg.sender != owner, "Address shouldn't be system owner");
        require(
            manufacturerDetails[msg.sender].isSignedUp,
            "Manufacturer is already registered"
        );
        require(
            bytes(_manfName).length > 0,
            "Manufacturer name cannot be empty"
        );
        require(bytes(_location).length > 0, "Location name cannot be empty");
        require(bytes(_email).length > 0, "Email address cannot be empty");
        require(bytes(_phoneNumber).length > 0, "Phone number cannot be empty");
        require(_password.length > 0, "Email address cannot be empty");

        // Generate a salt (you can use a random number or a unique value)
        bytes32 salt = bytes32(
            uint256(
                keccak256(abi.encodePacked(block.timestamp, block.prevrandao))
            )
        );

        // Hash the password with the salt
        bytes32 passwordHash = keccak256(abi.encode(_password, salt));

        emit ManufacturerAdded(msg.sender);
        manufacturerDetails[msg.sender] = Manufacturer(
            msg.sender,
            _manfName,
            _location,
            _email,
            _phoneNumber,
            passwordHash,
            true
        );
    }

    function addRetailerInfo(
        address _retailer,
        string memory _name,
        string memory _location,
        string memory _email,
        string memory _phoneNumber
    ) external onlyManufacturer {
        require(_retailer != address(0), "Retailer address cannot be zero");
        require(bytes(_name).length > 0, "Manufacturer name cannot be empty");
        require(bytes(_location).length > 0, "Location name cannot be empty");
        require(bytes(_email).length > 0, "Email address cannot be empty");
        require(bytes(_phoneNumber).length > 0, "Phone number cannot be empty");

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

    function storeQrHash(string memory _qrHash) external onlyManufacturer {
        uint timestamp = block.timestamp;
        emit qrHashStored(timestamp);
        qrHashMapByManufacturer[msg.sender][timestamp] = _qrHash;
        manufacturerIDHashArr.push(timestamp);
        storedIDs[timestamp] = true;
    }

    function deleteQrHash(uint _blockId) external onlyManufacturer {
        emit qrHashDeleted(_blockId);
        delete qrHashMapByManufacturer[msg.sender][_blockId];
        delete manufacturerIDHashArr[_blockId];
        delete storedIDs[_blockId];
    }

    //@dev returns qrcodeHash array to the manufacturer frontend
    function getManfItemIDList()
        public
        view
        onlyManufacturer
        returns (uint256[] memory)
    {
        return manufacturerIDHashArr;
    }

    //@dev TO BE REVIEWEDDD!! views qrcodeHash and ID one by one. Used when manf wants to match stored ids & hashes to every item
    function getQrHashAndID()
        private
        view
        onlyManufacturer
        returns (string memory _qrHash, uint256 _blockId)
    {
        // uint256[] memory ids = getManfItemIDList(); //gets list of id's; takes one and puts it to the qrHash mapping to get its corresponding hash which will then be used to match items

        _qrHash = qrHashMapByManufacturer[msg.sender][_blockId];
        return (_qrHash, _blockId); //used at addItemDetails
    }

    /*@dev matches the stored hashes to each item & returns a bool for evidence */
    function addItemDetails(
        string memory _qrHash,
        uint256 _blockId,
        string memory _itemName,
        string memory _description
    ) external onlyManufacturer {
        // require(
        //     compareStrings(
        //         qrHashMapByManufacturer[msg.sender][_blockId],
        //         _qrHash
        //     ),
        //     "Hash isn't stored"
        // );
        // require(manufacturerIDHashArr[_blockId], "ID isn't stored");
        require(storedIDs[_blockId] == true, "ID isn't stored");

        require(bytes(_itemName).length > 0, "Item name cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");

        emit ItemAdded_M(_blockId);
        emit ItemDetailsUpdated_M(_blockId, _itemName, _description);
        emit ItemRecorded_M(_blockId);

        itemDetails[_blockId] = ItemDetails(_itemName, _description);
        matchHashToId[_qrHash] = _blockId;
        matchedItems[_qrHash] = true;
    }

    function scanItem(string memory _qrHash) external view returns (bool) {
        if (matchedItems[_qrHash]) {
            return true;
        } else {
            return false;
        }
    }

    function moreDetailsForScannedItem(
        string memory _qrHash
    ) external view returns (ItemDetails memory) {
        uint id = matchHashToId[_qrHash];
        return itemDetails[id];
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
