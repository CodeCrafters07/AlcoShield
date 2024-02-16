/*global artifacts*/
/*eslint no-undef: "error"*/

const QrCode = artifacts.require("QrCode")

module.exports = function (deployer) {
    return deployer.deploy(QrCode)
}
