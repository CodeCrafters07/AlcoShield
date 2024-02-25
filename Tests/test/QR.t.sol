// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {QrCode} from "../src/QR.sol";

contract CounterTest is Test {
    QrCode public qrContract;

    struct SystemOwner {
        address sysOwner;
        bytes32 password /*audit*/;
        bool isLogin;
    }
    SystemOwner public sysowner;
    sysowner = SystemOwner(owner, keccak256(abi.encode(("admin"))), false);
    address public owner;
    owner = msg.sender;
    sysOwnerMap[owner] = sysowner;

    mapping(address => SystemOwner) private sysOwnerMap;

    function setUp() public {
        qrContract = new QrCode(owner, sysowner, sysOwnerMap[owner] = sysowner);
    }
}
