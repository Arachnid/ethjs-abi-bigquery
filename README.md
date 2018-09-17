# ethjs-abi-bigquery

This module repackages ethjs-abi for use in BigQuery, to decode Ethereum event logs.

Example usage:
```
CREATE TEMP FUNCTION
  DECODE_ERC721_TRANSFER(data STRING, topics ARRAY<STRING>)
  RETURNS STRUCT<`from` STRING, `to` STRING, tokenId STRING>
  LANGUAGE js AS """
    var CRYPTOKITTY_TRANSFER = {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    };
    return abi.decodeEvent(CRYPTOKITTY_TRANSFER, data, topics, false);
"""
OPTIONS
  ( library="https://storage.googleapis.com/ethlab-183014.appspot.com/ethjs-abi.js" );
SELECT
  DECODE_ERC721_TRANSFER(data, topics) AS transfer
FROM
  `bigquery-public-data.ethereum_blockchain.logs`
WHERE
  topics[SAFE_OFFSET(0)] = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
  AND address = "0x06012c8cf97bead5deae237070f9587f8e7a266d"
LIMIT 100;
```

The above query returns decoded CryptoKitty transfer events.
