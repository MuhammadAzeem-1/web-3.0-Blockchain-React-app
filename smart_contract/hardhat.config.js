// https://eth-sepolia.g.alchemy.com/v2/f1BxOoaxoQoVH85lVdluMD-jP0Hl2lzP

require("@nomiclabs/hardhat-waffle")

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/f1BxOoaxoQoVH85lVdluMD-jP0Hl2lzP",
      accounts: [
        "5868c6297f7cf44c6b4eeef658b4d46092de7cbd92acba3e9ff5b3d0eee1d15a",
      ],
    },
  },
};





// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.19",
// };
