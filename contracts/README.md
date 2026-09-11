# SportProof escrow

Non-upgradeable prototype on Base Sepolia. Platform verifier is immutable. Admin can allow sellers and pause only new business; existing orders retain deadline settlement/refund and same-chain credit withdrawals. No fees, bonds, or admin fund seizure. OpenZeppelin 5.6.1 Ownable/Pausable/ReentrancyGuard; Solidity 0.8.30, Cancun; Foundry 1.8.1. Windows are 1 second–30 days; short settings are testnet demonstrations only.

Run `forge test --root contracts` (or `cd contracts && forge test`). First run `sh contracts/install-deps.sh`. Source dependencies are downloaded at pinned commits: OpenZeppelin commit `5fd1781b1454fd1ef8e722282f86f9293cacf256`; forge-std commit `0844d7e1fc5e60d77b68e469bff60265f236c398`.

Deploy using `pnpm chain:deploy:testnet` with an operator-only `DEPLOYER_PRIVATE_KEY`, separate `VERIFIER_ADDRESS`, and authorized `RPC_URL`. It requires chain 84532 and faucet ETH. The resulting `deployments/base-sepolia.json` contains actual runtime code hash (including immutable verifier), address, receipts, compiler, and constructor arguments. No deployment manifest is invented when credentials are missing. Then `pnpm exec tsx scripts/chain-verify.ts` checks RPC chain, code, and canonical receipt.

Explorer source verification after deployment:

```sh
forge verify-contract --chain 84532 --watch --compiler-version 0.8.30 --num-of-optimizations 200 --constructor-args $(cast abi-encode 'constructor(address,address)' "$ADMIN_ADDRESS" "$VERIFIER_ADDRESS") "$MARKET_CONTRACT_ADDRESS" contracts/src/SportProofMarket.sol --etherscan-api-key "$ETHERSCAN_API_KEY" --root contracts
```

Record `sourceVerification: verified` only after successful explorer confirmation. Shell substitutions above encode public constructor addresses, not private keys.

Signing API requires a durable wallet lock, budget authorization, and persistence of the signed transaction before broadcast. Retries rebroadcast exactly that stored raw transaction. Never call prepareWrite again to retry an unresolved payment. Receipt release checks funding AND delivery transaction canonical block hashes and `latest.number - receipt.blockNumber + 1 >= 2`; `latest` is sealed L2 inclusion, not pending preconfirmation or L1 finality. A provider outage fails closed. Reorganization can suspend new reads but cannot recall already learned data.

Official references checked during implementation: [Base network](https://docs.base.org/get-started/connect-to-base), [OpenZeppelin utilities](https://docs.openzeppelin.com/contracts/5.x/api/utils), [Viem receipt waiting](https://viem.sh/docs/actions/public/waitForTransactionReceipt), [Foundry invariant testing](https://www.getfoundry.sh/guides/invariant-testing). Base network specifies 84532 and BaseScan; the adapter pins that configuration. This is not security-audited or suitable for real funds.
