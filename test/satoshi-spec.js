const { expect } = require("chai");
const { hardhead } = require('./shared/sats.js');

const WBTC_ADDR = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";

describe("Satoshi", function() {
	var token;

    beforeEach(async function() {
    const deployer = await ethers.getContractFactory("Satoshi");
    token = await deployer.deploy();
	});

	// test some constants
  it("name, version, symbol, decimals, supplyCap, balanceOf, WBTC, DOMAIN_SEPARATOR, DOMAIN_TYPE_HASH, PERMIT_TYPE_HASH", async function() {
      const name = await token.name()
      console.log("chain id:",token.chainId)
      expect(name).to.equal('Satoshi');
      expect(await token.version()).to.equal("1");
	  expect(await token.symbol()).to.equal("SATS");
      expect(await token.decimals()).to.equal(18);
      expect(await token.supplyCap()).to.equal(hardhead());
      expect(await token.WBTC()).to.equal(WBTC_ADDR);

      expect(await token.DOMAIN_TYPE_HASH()).to.equal(
      ethers.utils.solidityKeccak256(['string'],['EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)']))

      expect(await token.PERMIT_TYPE_HASH()).to.equal(
        ethers.utils.solidityKeccak256(['string'],['Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)']))
      expect(await token.DOMAIN_SEPARATOR()).to.equal(
        ethers.utils.keccak256(
            ethers.utils.defaultAbiCoder.encode(
                ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
                 [
                    ethers.utils.keccak256(ethers.utils.toUtf8Bytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')),
                    ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name)),
                    ethers.utils.keccak256(ethers.utils.toUtf8Bytes('1')),
                    1,
                    token.address
                    ])
        )
      )
  });
});
