export const filmTokenAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
      {
        internalType: "address",
        name: "functionsRouterAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "ccipRouterAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "linkTokenAddress",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "destinationChainSelector",
        type: "uint64",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC1155InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC1155InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "idsLength",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "valuesLength",
        type: "uint256",
      },
    ],
    name: "ERC1155InvalidArrayLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC1155InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC1155InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC1155InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC1155MissingApprovalForAll",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptyArgs",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptySource",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "InvalidRouter",
    type: "error",
  },
  {
    inputs: [],
    name: "NoInlineSecrets",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "currentBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "calculatedFees",
        type: "uint256",
      },
    ],
    name: "NotEnoughBalanceForFees",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyAutomationForwarderOrOwnerCanCall",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyRouterCanFulfill",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    name: "UnexpectedRequestID",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "addr",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "DebugAddress",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "DebugUint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
    ],
    name: "MessageReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
    ],
    name: "MessageSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "RequestFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "RequestSent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "err",
        type: "bytes",
      },
    ],
    name: "Response",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokensBurned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokensMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "burnBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "bytes",
            name: "sender",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "destTokenAmounts",
            type: "tuple[]",
          },
        ],
        internalType: "struct Client.Any2EVMMessage",
        name: "message",
        type: "tuple",
      },
    ],
    name: "ccipReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "enum CrossChainERC1155.PayFeesIn",
        name: "payFeesIn",
        type: "uint8",
      },
    ],
    name: "crossChainBurn",
    outputs: [
      {
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "destinationChainSelector",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "enum CrossChainERC1155.PayFeesIn",
        name: "payFeesIn",
        type: "uint8",
      },
    ],
    name: "estimateCCIPFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "exists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getInvestmentCost",
    outputs: [
      {
        internalType: "uint80",
        name: "",
        type: "uint80",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInvestmentCostFunction",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRouter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "err",
        type: "bytes",
      },
    ],
    name: "handleOracleFulfillment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "mintBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_lastError",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_lastRequestId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "s_lastResponse",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "automationForwarderAddress",
        type: "address",
      },
    ],
    name: "setAutomationForwarder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newuri",
        type: "string",
      },
    ],
    name: "setURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "donHostedSecretsSlotID",
        type: "uint8",
      },
      {
        internalType: "uint64",
        name: "donHostedSecretsVersion",
        type: "uint64",
      },
      {
        internalType: "string[]",
        name: "args",
        type: "string[]",
      },
      {
        internalType: "uint64",
        name: "subscriptionId",
        type: "uint64",
      },
      {
        internalType: "uint32",
        name: "gasLimit",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "donID",
        type: "bytes32",
      },
    ],
    name: "updateInvestmentCost",
    outputs: [
      {
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const byteCode =
  "6104206040526102c56101208181529061412d6101403960009061002390826102b4565b5034801561003057600080fd5b506040516143f23803806143f283398101604081905261004f916103a5565b6001600160a01b038416608052848383838284808a33806000816100ba5760405162461bcd60e51b815260206004820152601860248201527f43616e6e6f7420736574206f776e657220746f207a65726f000000000000000060448201526064015b60405180910390fd5b600180546001600160a01b0319166001600160a01b03848116919091179091558116156100ea576100ea8161015b565b505050506100fd8161020560201b60201c565b50506001600160a01b038116610129576040516335fdcccd60e21b8152600060048201526024016100b1565b6001600160a01b0390811660a05292831660c052911660e0526001600160401b031661010052506104b4945050505050565b336001600160a01b038216036101b35760405162461bcd60e51b815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c6600000000000000000060448201526064016100b1565b600280546001600160a01b0319166001600160a01b03838116918217909255600154604051919216907fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae127890600090a350565b600a61021182826102b4565b5050565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061023f57607f821691505b60208210810361025f57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156102af57806000526020600020601f840160051c8101602085101561028c5750805b601f840160051c820191505b818110156102ac5760008155600101610298565b50505b505050565b81516001600160401b038111156102cd576102cd610215565b6102e1816102db845461022b565b84610265565b6020601f82116001811461031557600083156102fd5750848201515b600019600385901b1c1916600184901b1784556102ac565b600084815260208120601f198516915b828110156103455787850151825560209485019460019092019101610325565b50848210156103635786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b80516001600160a01b038116811461038957600080fd5b919050565b80516001600160401b038116811461038957600080fd5b600080600080600060a086880312156103bd57600080fd5b85516001600160401b038111156103d357600080fd5b8601601f810188136103e457600080fd5b80516001600160401b038111156103fd576103fd610215565b604051601f8201601f19908116603f011681016001600160401b038111828210171561042b5761042b610215565b6040528181528282016020018a101561044357600080fd5b60005b8281101561046257602081850181015183830182015201610446565b5060006020838301015280975050505061047e60208701610372565b935061048c60408701610372565b925061049a60608701610372565b91506104a86080870161038e565b90509295509295909350565b60805160a05160c05160e05161010051613bd361055a6000396000818161032001528181610b8c01528181611068015281816113340152611418015260008181610b1801528181610ff201528181611116015281816111a50152611282015260008181610b5d01528181611039015281816112530152818161130701526113e901526000818161051e0152610e1f0152600081816106d40152611b400152613bd36000f3fe6080604052600436106101e25760003560e01c80636b20c45411610102578063b1e2174911610095578063e985e9c511610064578063e985e9c5146105f9578063f242432a14610619578063f2fde38b14610639578063f5298aca1461065957600080fd5b8063b1e2174914610542578063bd85b03914610558578063d40d17bc14610585578063e33366a6146105a557600080fd5b80638da5cb5b116100d15780638da5cb5b146104aa5780639dd1aa29146104dc578063a22cb465146104ef578063b0f479a11461050f57600080fd5b80636b20c45414610435578063731133e91461045557806379ba50971461047557806385572ffb1461048a57600080fd5b806331db1ffc1161017a5780634b0795a8116101495780634b0795a8146103af5780634e1273f4146103c45780634f558e79146103f15780635f6a16eb1461042057600080fd5b806331db1ffc1461030e5780633944ea3a1461035a5780633f90679c1461036f5780633fbf10461461038f57600080fd5b80630e89341c116101b65780630e89341c1461028c57806318160ddd146102b95780631f7fdffa146102ce5780632eb2c2d6146102ee57600080fd5b8062fdd58e146101e757806301ffc9a71461021a57806302fe53051461024a5780630ca761751461026c575b600080fd5b3480156101f357600080fd5b50610207610202366004612aa1565b610679565b6040519081526020015b60405180910390f35b34801561022657600080fd5b5061023a610235366004612ae3565b6106a3565b6040519015158152602001610211565b34801561025657600080fd5b5061026a610265366004612c10565b6106bd565b005b34801561027857600080fd5b5061026a610287366004612c4c565b6106c9565b34801561029857600080fd5b506102ac6102a7366004612cbc565b61074d565b6040516102119190612d25565b3480156102c557600080fd5b50600c54610207565b3480156102da57600080fd5b5061026a6102e9366004612dc3565b6107e1565b3480156102fa57600080fd5b5061026a610309366004612e67565b6107f3565b34801561031a57600080fd5b506103427f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160401b039091168152602001610211565b34801561036657600080fd5b506102ac61085f565b34801561037b57600080fd5b5061020761038a366004612f4e565b6108ed565b34801561039b57600080fd5b506102076103aa366004613059565b610a35565b3480156103bb57600080fd5b506102ac610c15565b3480156103d057600080fd5b506103e46103df3660046130bc565b610c22565b60405161021191906131b7565b3480156103fd57600080fd5b5061023a61040c366004612cbc565b6000908152600b6020526040902054151590565b34801561042c57600080fd5b506102ac610cee565b34801561044157600080fd5b5061026a6104503660046131ca565b610cfb565b34801561046157600080fd5b5061026a610470366004613239565b610d5a565b34801561048157600080fd5b5061026a610d66565b34801561049657600080fd5b5061026a6104a5366004613283565b610e14565b3480156104b657600080fd5b506001546001600160a01b03165b6040516001600160a01b039091168152602001610211565b6102076104ea366004613059565b610e70565b3480156104fb57600080fd5b5061026a61050a3660046132cb565b6114c6565b34801561051b57600080fd5b507f00000000000000000000000000000000000000000000000000000000000000006104c4565b34801561054e57600080fd5b5061020760035481565b34801561056457600080fd5b50610207610573366004612cbc565b6000908152600b602052604090205490565b34801561059157600080fd5b5061026a6105a0366004613304565b6114d5565b3480156105b157600080fd5b506105de6105c0366004612cbc565b60009081526007602052604090205469ffffffffffffffffffff1690565b60405169ffffffffffffffffffff9091168152602001610211565b34801561060557600080fd5b5061023a610614366004613321565b6114ff565b34801561062557600080fd5b5061026a61063436600461334f565b61152d565b34801561064557600080fd5b5061026a610654366004613304565b61158c565b34801561066557600080fd5b5061026a6106743660046133ab565b61159d565b60008181526008602090815260408083206001600160a01b03861684529091529020545b92915050565b60006106ae826115a8565b8061069d575061069d826115f8565b6106c68161162e565b50565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146107125760405163c6829f8360e01b815260040160405180910390fd5b61071d83838361163a565b60405183907f85e1543bf2f84fe80c6badbce3648c8539ad1df4d2b3d822938ca0538be727e690600090a2505050565b6060600a805461075c906133e0565b80601f0160208091040260200160405190810160405280929190818152602001828054610788906133e0565b80156107d55780601f106107aa576101008083540402835291602001916107d5565b820191906000526020600020905b8154815290600101906020018083116107b857829003601f168201915b50505050509050919050565b6107ed84848484611707565b50505050565b336001600160a01b0386168114801590610814575061081286826114ff565b155b1561084a5760405163711bec9160e11b81526001600160a01b038083166004830152871660248201526044015b60405180910390fd5b610857868686868661173f565b505050505050565b6004805461086c906133e0565b80601f0160208091040260200160405190810160405280929190818152602001828054610898906133e0565b80156108e55780601f106108ba576101008083540402835291602001916108e5565b820191906000526020600020905b8154815290600101906020018083116108c857829003601f168201915b505050505081565b6006546000906001600160a01b0316331480159061091657506001546001600160a01b03163314155b15610934576040516302dc7d2f60e21b815260040160405180910390fd5b6109756040805160e0810190915280600081526020016000815260200160008152602001606081526020016060815260200160608152602001606081525090565b6109e5306001600160a01b0316635f6a16eb6040518163ffffffff1660e01b8152600401600060405180830381865afa1580156109b6573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109de919081019061341a565b82906117a6565b6001600160401b038716156109ff576109ff8189896117b3565b855115610a1057610a108187611849565b610a24610a1c82611873565b868686611b3b565b600381905598975050505050505050565b6040805160a081019091526001600160a01b03831660c082015260009081908060e0810160408051601f1981840301815291815290825280516001600160a01b038b166020828101919091529181018a90526060810189905291019060800160408051601f1981840301815291905281526020016000604051908082528060200260200182016040528015610af057816020015b6040805180820190915260008082526020820152815260200190600190039081610ac95790505b5081526020016001856001811115610b0a57610b0a613490565b14610b16576000610b38565b7f00000000000000000000000000000000000000000000000000000000000000005b6001600160a01b031681526020016040518060200160405280600081525081525090507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166320487ded7f0000000000000000000000000000000000000000000000000000000000000000836040518363ffffffff1660e01b8152600401610bc99291906134a6565b602060405180830381865afa158015610be6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c0a919061357b565b979650505050505050565b6005805461086c906133e0565b60608151835114610c535781518351604051635b05999160e01b815260048101929092526024820152604401610841565b600083516001600160401b03811115610c6e57610c6e612b00565b604051908082528060200260200182016040528015610c97578160200160208202803683370190505b50905060005b8451811015610ce657602080820286010151610cc190602080840287010151610679565b828281518110610cd357610cd3613594565b6020908102919091010152600101610c9d565b509392505050565b6000805461086c906133e0565b6001600160a01b0383163314801590610d1b5750610d1983336114ff565b155b15610d4a5760405163711bec9160e11b81523360048201526001600160a01b0384166024820152604401610841565b610d55838383611c0d565b505050565b6107ed84848484611c53565b6002546001600160a01b03163314610db95760405162461bcd60e51b815260206004820152601660248201527526bab9ba10313290383937b837b9b2b21037bbb732b960511b6044820152606401610841565b600180546001600160a01b0319808216339081179093556002805490911690556040516001600160a01b03909116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a350565b336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610e5f576040516335fdcccd60e21b8152336004820152602401610841565b6106c6610e6b82613637565b611cb0565b600083610e7d3387610679565b1015610ecb5760405162461bcd60e51b815260206004820152601860248201527f4e6f7420656e6f75676820746f6b656e2062616c616e636500000000000000006044820152606401610841565b610ed633868661159d565b604080518681526020810186905233917fccbea4088a3b7ae9ca2d15fab9a9742a4075b4d7247768a1eecea917565aba00910160405180910390a26040805160a081019091526001600160a01b03841660c08201526000908060e0810160408051601f1981840301815291815290825280516001600160a01b038b166020828101919091529181018a90526060810189905291019060800160408051601f1981840301815291905281526020016000604051908082528060200260200182016040528015610fca57816020015b6040805180820190915260008082526020820152815260200190600190039081610fa35790505b5081526020016001856001811115610fe457610fe4613490565b14610ff0576000611012565b7f00000000000000000000000000000000000000000000000000000000000000005b6001600160a01b0316815260200160405180602001604052806000815250815250905060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166320487ded7f0000000000000000000000000000000000000000000000000000000000000000846040518363ffffffff1660e01b81526004016110a59291906134a6565b602060405180830381865afa1580156110c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110e6919061357b565b905060018460018111156110fc576110fc613490565b036113a8576040516370a0823160e01b81523060048201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa158015611165573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611189919061357b565b81111561123c576040516370a0823160e01b81523060048201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa1580156111f4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611218919061357b565b6040516328fdcaa160e01b8152600481019190915260248101829052604401610841565b60405163095ea7b360e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081166004830152602482018390527f0000000000000000000000000000000000000000000000000000000000000000169063095ea7b3906044016020604051808303816000875af11580156112cb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112ef91906136ed565b506040516396f4e9f960e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906396f4e9f99061135e907f00000000000000000000000000000000000000000000000000000000000000009086906004016134a6565b6020604051808303816000875af115801561137d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113a1919061357b565b9250611488565b478111156113d2576040516328fdcaa160e01b815247600482015260248101829052604401610841565b6040516396f4e9f960e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906396f4e9f9908390611442907f00000000000000000000000000000000000000000000000000000000000000009087906004016134a6565b60206040518083038185885af1158015611460573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190611485919061357b565b92505b6040518381527f54791b38f3859327992a1ca0590ad3c0f08feba98d1a4f56ab0dca74d203392a9060200160405180910390a1505095945050505050565b6114d1338383611d6d565b5050565b6114dd611e03565b600680546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03918216600090815260096020908152604080832093909416825291909152205460ff1690565b336001600160a01b038616811480159061154e575061154c86826114ff565b155b1561157f5760405163711bec9160e11b81526001600160a01b03808316600483015287166024820152604401610841565b6108578686868686611e58565b611594611e03565b6106c681611ee6565b610d55838383611f90565b60006001600160e01b03198216636cdb3d1360e11b14806115d957506001600160e01b031982166303a24d0760e21b145b8061069d57506301ffc9a760e01b6001600160e01b031983161461069d565b60006001600160e01b031982166385572ffb60e01b148061069d57506001600160e01b031982166301ffc9a760e01b1492915050565b600a6114d18282613751565b826003541461165f5760405163d068bf5b60e01b815260048101849052602401610841565b600461166b8382613751565b5060056116788282613751565b5060008083806020019051810190611690919061380f565b60008281526007602052604090819020805469ffffffffffffffffffff191669ffffffffffffffffffff841617905551919350915085907f7873807bf6ddc50401cd3d29bbe0decee23fd4d68d273f4b5eb83cded4d2f172906116f8906004906005906138b6565b60405180910390a25050505050565b6001600160a01b03841661173157604051632bfa23e760e11b815260006004820152602401610841565b6107ed600085858585611ff4565b6001600160a01b03841661176957604051632bfa23e760e11b815260006004820152602401610841565b6001600160a01b03851661179257604051626a0d4560e21b815260006004820152602401610841565b61179f8585858585611ff4565b5050505050565b6114d18260008084612047565b60006117c06101006120c5565b90506117f3604051806040016040528060068152602001651cdb1bdd125160d21b815250826120e690919063ffffffff16565b6118008160ff85166120ff565b6040805180820190915260078152663b32b939b4b7b760c91b60208201526118299082906120e6565b61183381836120ff565b6002602085015251516080909301929092525050565b805160000361186b5760405163fe936cb760e01b815260040160405180910390fd5b60a090910152565b606060006118826101006120c5565b90506118bb6040518060400160405280600c81526020016b31b7b232a637b1b0ba34b7b760a11b815250826120e690919063ffffffff16565b82516118d99060028111156118d2576118d2613490565b829061210b565b6040805180820190915260088152676c616e677561676560c01b60208201526119039082906120e6565b604083015161191a9080156118d2576118d2613490565b604080518082019091526006815265736f7572636560d01b60208201526119429082906120e6565b60608301516119529082906120e6565b60a083015151156119de576040805180820190915260048152636172677360e01b60208201526119839082906120e6565b61198c81612144565b60005b8360a00151518110156119d4576119cc8460a0015182815181106119b5576119b5613594565b6020026020010151836120e690919063ffffffff16565b60010161198f565b506119de81612168565b60808301515115611aa257600083602001516002811115611a0157611a01613490565b03611a1f5760405163a80d31f760e01b815260040160405180910390fd5b60408051808201909152600f81526e39b2b1b932ba39a637b1b0ba34b7b760891b6020820152611a509082906120e6565b611a69836020015160028111156118d2576118d2613490565b6040805180820190915260078152667365637265747360c81b6020820152611a929082906120e6565b6080830151611aa2908290612186565b60c08301515115611b335760408051808201909152600981526862797465734172677360b81b6020820152611ad89082906120e6565b611ae181612144565b60005b8360c0015151811015611b2957611b218460c001518281518110611b0a57611b0a613594565b60200260200101518361218690919063ffffffff16565b600101611ae4565b50611b3381612168565b515192915050565b6000807f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663461d27628688600188886040518663ffffffff1660e01b8152600401611b939594939291906138db565b6020604051808303816000875af1158015611bb2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bd6919061357b565b60405190915081907f1131472297a800fee664d1d89cfa8f7676ff07189ecc53f80bbb5f4969099db890600090a295945050505050565b6001600160a01b038316611c3657604051626a0d4560e21b815260006004820152602401610841565b610d55836000848460405180602001604052806000815250611ff4565b6001600160a01b038416611c7d57604051632bfa23e760e11b815260006004820152602401610841565b60408051600180825260208201869052818301908152606082018590526080820190925290610857600087848487611ff4565b60008060008360600151806020019051810190611ccd9190613924565b925092509250611cee83838360405180602001604052806000815250610d5a565b60408051838152602081018390526001600160a01b038516917f2e8ac5177a616f2aec08c3048f5021e4e9743ece034e8d83ba5caf76688bb475910160405180910390a283516040519081527fe29dc34207c78fc0f6048a32f159139c33339c6d6df8b07dcd33f6d699ff23279060200160405180910390a150505050565b6001600160a01b038216611d965760405162ced3e160e81b815260006004820152602401610841565b6001600160a01b03838116600081815260096020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001546001600160a01b03163314611e565760405162461bcd60e51b815260206004820152601660248201527527b7363c9031b0b63630b1363290313c9037bbb732b960511b6044820152606401610841565b565b6001600160a01b038416611e8257604051632bfa23e760e11b815260006004820152602401610841565b6001600160a01b038516611eab57604051626a0d4560e21b815260006004820152602401610841565b60408051600180825260208201869052818301908152606082018590526080820190925290611edd8787848487611ff4565b50505050505050565b336001600160a01b03821603611f3e5760405162461bcd60e51b815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c660000000000000000006044820152606401610841565b600280546001600160a01b0319166001600160a01b03838116918217909255600154604051919216907fed8889f560326eb138920d842192f0eb3dd22b4f139c87a2c57538e05bae127890600090a350565b6001600160a01b038316611fb957604051626a0d4560e21b815260006004820152602401610841565b604080516001808252602082018590528183019081526060820184905260a0820190925260006080820181815291929161179f918791859085905b61200085858585612193565b6001600160a01b0384161561179f5782513390600103612039576020848101519084015161203283898985858961219f565b5050610857565b6108578187878787876122c3565b8051600003612069576040516322ce3edd60e01b815260040160405180910390fd5b8383600281111561207c5761207c613490565b9081600281111561208f5761208f613490565b905250604084018280156120a5576120a5613490565b908180156120b5576120b5613490565b9052506060909301929092525050565b6120cd612a57565b80516120d990836123ac565b5060006020820152919050565b6120f38260038351612423565b8151610d55908261253c565b6114d182600083612423565b81516121189060c2612564565b506114d1828260405160200161213091815260200190565b604051602081830303815290604052612186565b61214f8160046125cd565b6001816020018181516121629190613971565b90525050565b6121738160076125cd565b6001816020018181516121629190613984565b6120f38260028351612423565b6107ed848484846125e4565b6001600160a01b0384163b156108575760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e61906121e39089908990889088908890600401613997565b6020604051808303816000875af192505050801561221e575060408051601f3d908101601f1916820190925261221b918101906139d1565b60015b612287573d80801561224c576040519150601f19603f3d011682016040523d82523d6000602084013e612251565b606091505b50805160000361227f57604051632bfa23e760e11b81526001600160a01b0386166004820152602401610841565b805181602001fd5b6001600160e01b0319811663f23a6e6160e01b14611edd57604051632bfa23e760e11b81526001600160a01b0386166004820152602401610841565b6001600160a01b0384163b156108575760405163bc197c8160e01b81526001600160a01b0385169063bc197c819061230790899089908890889088906004016139ee565b6020604051808303816000875af1925050508015612342575060408051601f3d908101601f1916820190925261233f918101906139d1565b60015b612370573d80801561224c576040519150601f19603f3d011682016040523d82523d6000602084013e612251565b6001600160e01b0319811663bc197c8160e01b14611edd57604051632bfa23e760e11b81526001600160a01b0386166004820152602401610841565b6040805180820190915260608152600060208201526123cc602083613a4c565b156123f4576123dc602083613a4c565b6123e7906020613984565b6123f19083613971565b91505b60208084018390526040518085526000815290818401018181101561241857600080fd5b604052509192915050565b6017816001600160401b0316116124495782516107ed9060e0600585901b168317612564565b60ff816001600160401b031611612489578251612471906018611fe0600586901b1617612564565b5082516107ed906001600160401b03831660016126d0565b61ffff816001600160401b0316116124ca5782516124b2906019611fe0600586901b1617612564565b5082516107ed906001600160401b03831660026126d0565b63ffffffff816001600160401b03161161250d5782516124f590601a611fe0600586901b1617612564565b5082516107ed906001600160401b03831660046126d0565b825161252490601b611fe0600586901b1617612564565b5082516107ed906001600160401b03831660086126d0565b60408051808201909152606081526000602082015261255d83838451612755565b9392505050565b6040805180820190915260608152600060208201528251516000612589826001613971565b9050846020015182106125aa576125aa856125a5836002613a6e565b612826565b84516020838201018581535080518211156125c3578181525b5093949350505050565b8151610d5590601f611fe0600585901b1617612564565b6125f08484848461283d565b6001600160a01b038416612670576000805b83518110156126565760208181028481018201519086018201516000908152600b9092526040822080549192839261263b908490613971565b9091555061264b90508184613971565b925050600101612602565b5080600c60008282546126699190613971565b9091555050505b6001600160a01b0383166107ed576000805b83518110156126bf5760208181028481018201519086018201516000908152600b9092526040909120805482900390559190910190600101612682565b50600c805491909103905550505050565b60408051808201909152606081526000602082015283515160006126f48285613971565b9050856020015181111561271157612711866125a5836002613a6e565b6000600161272186610100613b6c565b61272b9190613984565b90508651828101878319825116178152508051831115612749578281525b50959695505050505050565b604080518082019091526060815260006020820152825182111561277857600080fd5b83515160006127878483613971565b905085602001518111156127a4576127a4866125a5836002613a6e565b8551805183820160200191600091808511156127be578482525b505050602086015b602086106127fe57805182526127dd602083613971565b91506127ea602082613971565b90506127f7602087613984565b95506127c6565b51815160001960208890036101000a0190811690199190911617905250849150509392505050565b815161283283836123ac565b506107ed838261253c565b805182511461286c5781518151604051635b05999160e01b815260048101929092526024820152604401610841565b3360005b8351811015612978576020818102858101820151908501909101516001600160a01b038816156129275760008281526008602090815260408083206001600160a01b038c168452909152902054818110156128fe576040516303dee4c560e01b81526001600160a01b038a166004820152602481018290526044810183905260648101849052608401610841565b60008381526008602090815260408083206001600160a01b038d16845290915290209082900390555b6001600160a01b0387161561296e5760008281526008602090815260408083206001600160a01b038b16845290915281208054839290612968908490613971565b90915550505b5050600101612870565b5082516001036129f95760208301516000906020840151909150856001600160a01b0316876001600160a01b0316846001600160a01b03167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6285856040516129ea929190918252602082015260400190565b60405180910390a4505061179f565b836001600160a01b0316856001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8686604051612a48929190613b78565b60405180910390a45050505050565b6040518060400160405280612a7f604051806040016040528060608152602001600081525090565b8152602001600081525090565b6001600160a01b03811681146106c657600080fd5b60008060408385031215612ab457600080fd5b8235612abf81612a8c565b946020939093013593505050565b6001600160e01b0319811681146106c657600080fd5b600060208284031215612af557600080fd5b813561255d81612acd565b634e487b7160e01b600052604160045260246000fd5b604080519081016001600160401b0381118282101715612b3857612b38612b00565b60405290565b60405160a081016001600160401b0381118282101715612b3857612b38612b00565b604051601f8201601f191681016001600160401b0381118282101715612b8857612b88612b00565b604052919050565b60006001600160401b03821115612ba957612ba9612b00565b50601f01601f191660200190565b600082601f830112612bc857600080fd5b8135602083016000612be1612bdc84612b90565b612b60565b9050828152858383011115612bf557600080fd5b82826020830137600092810160200192909252509392505050565b600060208284031215612c2257600080fd5b81356001600160401b03811115612c3857600080fd5b612c4484828501612bb7565b949350505050565b600080600060608486031215612c6157600080fd5b8335925060208401356001600160401b03811115612c7e57600080fd5b612c8a86828701612bb7565b92505060408401356001600160401b03811115612ca657600080fd5b612cb286828701612bb7565b9150509250925092565b600060208284031215612cce57600080fd5b5035919050565b60005b83811015612cf0578181015183820152602001612cd8565b50506000910152565b60008151808452612d11816020860160208601612cd5565b601f01601f19169290920160200192915050565b60208152600061255d6020830184612cf9565b60006001600160401b03821115612d5157612d51612b00565b5060051b60200190565b600082601f830112612d6c57600080fd5b8135612d7a612bdc82612d38565b8082825260208201915060208360051b860101925085831115612d9c57600080fd5b602085015b83811015612db9578035835260209283019201612da1565b5095945050505050565b60008060008060808587031215612dd957600080fd5b8435612de481612a8c565b935060208501356001600160401b03811115612dff57600080fd5b612e0b87828801612d5b565b93505060408501356001600160401b03811115612e2757600080fd5b612e3387828801612d5b565b92505060608501356001600160401b03811115612e4f57600080fd5b612e5b87828801612bb7565b91505092959194509250565b600080600080600060a08688031215612e7f57600080fd5b8535612e8a81612a8c565b94506020860135612e9a81612a8c565b935060408601356001600160401b03811115612eb557600080fd5b612ec188828901612d5b565b93505060608601356001600160401b03811115612edd57600080fd5b612ee988828901612d5b565b92505060808601356001600160401b03811115612f0557600080fd5b612f1188828901612bb7565b9150509295509295909350565b80356001600160401b0381168114612f3557600080fd5b919050565b803563ffffffff81168114612f3557600080fd5b60008060008060008060c08789031215612f6757600080fd5b863560ff81168114612f7857600080fd5b9550612f8660208801612f1e565b945060408701356001600160401b03811115612fa157600080fd5b8701601f81018913612fb257600080fd5b8035612fc0612bdc82612d38565b8082825260208201915060208360051b85010192508b831115612fe257600080fd5b602084015b838110156130235780356001600160401b0381111561300557600080fd5b6130148e602083890101612bb7565b84525060209283019201612fe7565b5096506130369250505060608801612f1e565b925061304460808801612f3a565b9598949750929591949360a090920135925050565b600080600080600060a0868803121561307157600080fd5b853561307c81612a8c565b94506020860135935060408601359250606086013561309a81612a8c565b91506080860135600281106130ae57600080fd5b809150509295509295909350565b600080604083850312156130cf57600080fd5b82356001600160401b038111156130e557600080fd5b8301601f810185136130f657600080fd5b8035613104612bdc82612d38565b8082825260208201915060208360051b85010192508783111561312657600080fd5b6020840193505b8284101561315157833561314081612a8c565b82526020938401939091019061312d565b945050505060208301356001600160401b0381111561316f57600080fd5b61317b85828601612d5b565b9150509250929050565b600081518084526020840193506020830160005b828110156125c3578151865260209586019590910190600101613199565b60208152600061255d6020830184613185565b6000806000606084860312156131df57600080fd5b83356131ea81612a8c565b925060208401356001600160401b0381111561320557600080fd5b61321186828701612d5b565b92505060408401356001600160401b0381111561322d57600080fd5b612cb286828701612d5b565b6000806000806080858703121561324f57600080fd5b843561325a81612a8c565b9350602085013592506040850135915060608501356001600160401b03811115612e4f57600080fd5b60006020828403121561329557600080fd5b81356001600160401b038111156132ab57600080fd5b820160a0818503121561255d57600080fd5b80151581146106c657600080fd5b600080604083850312156132de57600080fd5b82356132e981612a8c565b915060208301356132f9816132bd565b809150509250929050565b60006020828403121561331657600080fd5b813561255d81612a8c565b6000806040838503121561333457600080fd5b823561333f81612a8c565b915060208301356132f981612a8c565b600080600080600060a0868803121561336757600080fd5b853561337281612a8c565b9450602086013561338281612a8c565b9350604086013592506060860135915060808601356001600160401b03811115612f0557600080fd5b6000806000606084860312156133c057600080fd5b83356133cb81612a8c565b95602085013595506040909401359392505050565b600181811c908216806133f457607f821691505b60208210810361341457634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561342c57600080fd5b81516001600160401b0381111561344257600080fd5b8201601f8101841361345357600080fd5b8051613461612bdc82612b90565b81815285602083850101111561347657600080fd5b613487826020830160208601612cd5565b95945050505050565b634e487b7160e01b600052602160045260246000fd5b6001600160401b0383168152604060208201526000825160a060408401526134d160e0840182612cf9565b90506020840151603f198483030160608501526134ee8282612cf9565b6040860151858203603f19016080870152805180835260209182019450600093509101905b8083101561354a57835180516001600160a01b03168352602090810151818401529093019260019290920191604090910190613513565b5060608601516001600160a01b031660a08601526080860151858203603f190160c08701529250610c0a8184612cf9565b60006020828403121561358d57600080fd5b5051919050565b634e487b7160e01b600052603260045260246000fd5b600082601f8301126135bb57600080fd5b81356135c9612bdc82612d38565b8082825260208201915060208360061b8601019250858311156135eb57600080fd5b602085015b83811015612db9576040818803121561360857600080fd5b613610612b16565b813561361b81612a8c565b81526020828101358183015290845292909201916040016135f0565b600060a0823603121561364957600080fd5b613651612b3e565b8235815261366160208401612f1e565b602082015260408301356001600160401b0381111561367f57600080fd5b61368b36828601612bb7565b60408301525060608301356001600160401b038111156136aa57600080fd5b6136b636828601612bb7565b60608301525060808301356001600160401b038111156136d557600080fd5b6136e1368286016135aa565b60808301525092915050565b6000602082840312156136ff57600080fd5b815161255d816132bd565b601f821115610d5557806000526020600020601f840160051c810160208510156137315750805b601f840160051c820191505b8181101561179f576000815560010161373d565b81516001600160401b0381111561376a5761376a612b00565b61377e8161377884546133e0565b8461370a565b6020601f8211600181146137b2576000831561379a5750848201515b600019600385901b1c1916600184901b17845561179f565b600084815260208120601f198516915b828110156137e257878501518255602094850194600190920191016137c2565b50848210156138005786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b6000806040838503121561382257600080fd5b505080516020909101519092909150565b60008154613840816133e0565b80855260018216801561385a5760018114613876576138ad565b60ff1983166020870152602082151560051b87010193506138ad565b84600052602060002060005b838110156138a45781546020828a010152600182019150602081019050613882565b87016020019450505b50505092915050565b6040815260006138c96040830185613833565b82810360208401526134878185613833565b6001600160401b038616815260a0602082015260006138fd60a0830187612cf9565b61ffff9590951660408301525063ffffffff92909216606083015260809091015292915050565b60008060006060848603121561393957600080fd5b835161394481612a8c565b602085015160409095015190969495509392505050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561069d5761069d61395b565b8181038181111561069d5761069d61395b565b6001600160a01b03868116825285166020820152604081018490526060810183905260a060808201819052600090610c0a90830184612cf9565b6000602082840312156139e357600080fd5b815161255d81612acd565b6001600160a01b0386811682528516602082015260a060408201819052600090613a1a90830186613185565b8281036060840152613a2c8186613185565b90508281036080840152613a408185612cf9565b98975050505050505050565b600082613a6957634e487b7160e01b600052601260045260246000fd5b500690565b808202811582820484141761069d5761069d61395b565b6001815b6001841115613ac057808504811115613aa457613aa461395b565b6001841615613ab257908102905b60019390931c928002613a89565b935093915050565b600082613ad75750600161069d565b81613ae45750600061069d565b8160018114613afa5760028114613b0457613b20565b600191505061069d565b60ff841115613b1557613b1561395b565b50506001821b61069d565b5060208310610133831016604e8410600b8410161715613b43575081810a61069d565b613b506000198484613a85565b8060001904821115613b6457613b6461395b565b029392505050565b600061255d8383613ac8565b604081526000613b8b6040830185613185565b8281036020840152613487818561318556fea2646970667358221220f56f21ea65e614c778bfa794440030a320a68c4b11963df35fe220d292f99de464736f6c634300081e0033636f6e7374207b20657468657273207d203d20617761697420696d706f727428276e706d3a65746865727340362e31302e3027293b636f6e737420616269436f646572203d206574686572732e416269436f6465722e64656661756c74416269436f64657228293b636f6e737420746f6b656e4964203d20617267735b305d3b636f6e7374206964203d20617267735b315d3b636f6e73742053555041424153455f55524c203d20736563726574732e53555041424153455f55524c3b636f6e73742053555041424153455f4b4559203d20736563726574732e53555041424153455f4b45593b636f6e737420726573706f6e7365203d2061776169742046756e6374696f6e732e6d616b654874747052657175657374287b202075726c3a2060247b53555041424153455f55524c7d2f726573742f76312f66696c6d73602c2020686561646572733a207b202020206170696b65793a2053555041424153455f4b45592c20202020417574686f72697a6174696f6e3a206042656172657220247b53555041424153455f4b45597d6020207d2c706172616d733a207b73656c6563743a2060696e766573746d656e74436f7374602c69643a206065712e247b69647d607d7d293b6966202821726573706f6e7365207c7c20726573706f6e73652e6572726f7229207b20207468726f77204572726f7228275375706162617365207175657279206661696c656427293b7d636f6e737420696e766573746d656e74436f7374203d204e756d62657228726573706f6e73652e646174615b305d3f2e696e766573746d656e74436f7374293b636f6e737420656e636f646564203d20616269436f6465722e656e636f6465285b6075696e74323536602c206075696e74323536605d2c205b746f6b656e49642c20696e766573746d656e74436f73745d293b72657475726e206574686572732e676574427974657328656e636f646564293b";
