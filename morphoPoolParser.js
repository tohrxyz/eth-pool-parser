const fs = require('fs')
const path = require('path')
const SupportedChain = {
    Ethereum: 1,
    Optimism: 10,
    Polygon: 137,
    Cronos: 25,
    Base: 8453,
    Arbitrum: 42161,
    Bsc: 56,
    Sepolia: 11155111,
    UnichainSepolia: 1301,
    Gnosis: 100,
    StarknetSepolia: 11155112,
    StarknetMainnet: 112211,
    World: 480,
}

const MORPHO_SUPPORTED_CHAINS = [SupportedChain.Ethereum, SupportedChain.Base]

// main function that accepts cli args and returns the pool data
const main = () => {
    const args = process.argv.slice(2)
    const inputFile = args[0]
    console.log("Input file: ", inputFile)
    const chainId = Number(args[1])
    const chainName = Object.keys(SupportedChain).find(key => SupportedChain[key] === chainId)
    console.log("Processing for chain: ", chainName, "with id: ", chainId)
    const outputFile = args[2]
    console.log("Output file: ", outputFile)

    if (!MORPHO_SUPPORTED_CHAINS.includes(chainId)) {
        throw new Error(`Chain ${chainId} is not supported`)
    }

    const morphoData = JSON.parse(fs.readFileSync(inputFile, 'utf8'))
    console.log("Loaded morpho data from input file")

    const pools = morphoData.data.vaults.items
    const poolData = pools.map((pool) => {
        return {
            underlyingToken: pool.asset.address,
            aToken: pool.address,
            pool: pool.address
        }
    })

    // open or create the output file
    const outputFilePath = path.join(__dirname, outputFile)
    
    // Create output file if it doesn't exist
    fs.writeFileSync(outputFilePath, 'morpho: {\n', { flag: 'w' })

    // Write the chain ID entry
    fs.appendFileSync(outputFilePath, `  [SupportedChain.${chainName}]: [\n`)

    // Write each pool entry
    poolData.forEach((pool, index) => {
        const entry = `    { underlyingToken: '${pool.underlyingToken}', aToken: '${pool.aToken}', pool: '${pool.pool}' }`
        // Add comma if not last entry
        fs.appendFileSync(outputFilePath, entry + (index === poolData.length - 1 ? '\n' : ',\n'))
    })

    // Close the arrays and object
    fs.appendFileSync(outputFilePath, '  ],\n')
    fs.appendFileSync(outputFilePath, '}')

    console.log("Successfully wrote to output file at ", outputFilePath)
}

main()