# Morpho Pool Parser

This script parses the Morpho pool data and outputs it in the format required by the lending protocol adapter.

## Usage
1. Go to the Morpho API and download the pool data for the chains you want to support. Use [this link](https://blue-api.morpho.org/graphql?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QEcYIE4CeAFACQDuAFvgugAQBqAhjADYoBiAlm-gM4CUtYAB0ktWgDdmbXkUrU65KngSCRY8bU4oEcXkNGbNjMGBW9eho7SSNEVo5W0IWnXjrAPjFhCgMbrWhMzBAsvIzAEKE44RhZLAM0AX3DaKApGTjF1QPFOT0SjJF8yCDwAa1SUxOrxaqSQABoQKTxORgAjFlCMEBzaYRB5FUG6fvFB9MykAEkwAH0s0doADgAWAFYAZkavQacdV3cETwxaFDxcXY16kCSgA) to get the query. <<< note that you need to change the `chainId` to the chain you want to support >>> , currently only Ethereum and Base are supported.

2. Run the script with the following command:
```bash
node morphoPoolParser.js <inputFile> <chainId> <outputFile>
```