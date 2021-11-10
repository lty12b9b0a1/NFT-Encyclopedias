let web3 = require('./web3')
let abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "characters",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "imgurl",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "magic",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "strength",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "intelligence",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "luck",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "level",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "onsale",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "startprice",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "setaside",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "endtime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "gameOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "result",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "imgurl",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "magic",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "strength",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "intelligence",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "luck",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "level",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "onsale",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "startprice",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "setaside",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "endtime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "temp",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_imgurl",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_magic",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_strength",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_intelligence",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_luck",
        "type": "uint256"
      }
    ],
    "name": "createNewCharacter",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_sender",
        "type": "address"
      }
    ],
    "name": "getCharacter",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imgurl",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "magic",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "strength",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "intelligence",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "luck",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "level",
            "type": "uint256"
          },
          {
            "internalType": "address[]",
            "name": "ownerhistory",
            "type": "address[]"
          },
          {
            "internalType": "bool",
            "name": "onsale",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "startprice",
            "type": "uint256"
          },
          {
            "internalType": "address[]",
            "name": "bidderhistory",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "bidpricehistory",
            "type": "uint256[]"
          },
          {
            "internalType": "bool",
            "name": "setaside",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "endtime",
            "type": "uint256"
          }
        ],
        "internalType": "struct auction.Character[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAuction",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imgurl",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "magic",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "strength",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "intelligence",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "luck",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "level",
            "type": "uint256"
          },
          {
            "internalType": "address[]",
            "name": "ownerhistory",
            "type": "address[]"
          },
          {
            "internalType": "bool",
            "name": "onsale",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "startprice",
            "type": "uint256"
          },
          {
            "internalType": "address[]",
            "name": "bidderhistory",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "bidpricehistory",
            "type": "uint256[]"
          },
          {
            "internalType": "bool",
            "name": "setaside",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "endtime",
            "type": "uint256"
          }
        ],
        "internalType": "struct auction.Character[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_sec",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_startprice",
        "type": "uint256"
      }
    ],
    "name": "createNewAuction",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "refreshAllAuction",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "checkAllOverTime",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "ownerconfirm",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "buyerconfirm",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "bid",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_sender",
        "type": "address"
      }
    ],
    "name": "getbid",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "imgurl",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "magic",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "strength",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "intelligence",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "luck",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "level",
            "type": "uint256"
          },
          {
            "internalType": "address[]",
            "name": "ownerhistory",
            "type": "address[]"
          },
          {
            "internalType": "bool",
            "name": "onsale",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "startprice",
            "type": "uint256"
          },
          {
            "internalType": "address[]",
            "name": "bidderhistory",
            "type": "address[]"
          },
          {
            "internalType": "uint256[]",
            "name": "bidpricehistory",
            "type": "uint256[]"
          },
          {
            "internalType": "bool",
            "name": "setaside",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "endtime",
            "type": "uint256"
          }
        ],
        "internalType": "struct auction.Character[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
let address = 'a76c47F40472dE3e21a1D37bb7325eedD9B36397'

let contractInstance = null
if(web3==null){

}
else{
  contractInstance = new web3.eth.Contract(abi, address)
}
module.exports = contractInstance