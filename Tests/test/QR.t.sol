// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {QrCode} from "../src/QR.sol";

contract CounterTest is Test {
    QrCode public qrContract;

    function setUp() public {
        qrContract = new QrCode();
    }
}
