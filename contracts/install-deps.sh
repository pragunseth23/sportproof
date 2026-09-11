#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
mkdir -p lib
if [ ! -d lib/openzeppelin-contracts ]; then git clone --depth 1 --branch v5.6.1 https://github.com/OpenZeppelin/openzeppelin-contracts.git lib/openzeppelin-contracts; fi
if [ ! -d lib/forge-std ]; then git clone --depth 1 --branch v1.15.0 https://github.com/foundry-rs/forge-std.git lib/forge-std; fi
[ "$(git -C lib/openzeppelin-contracts rev-parse HEAD)" = '5fd1781b1454fd1ef8e722282f86f9293cacf256' ]
[ "$(git -C lib/forge-std rev-parse HEAD)" = '0844d7e1fc5e60d77b68e469bff60265f236c398' ]
