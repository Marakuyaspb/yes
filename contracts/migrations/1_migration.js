const YesNo = artifacts.require('YesNo');
module.exports = function (deployer) {
	deployer.deploy(YesNo);
}

