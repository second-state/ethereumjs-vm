export interface OpInfo {
  name: string
  opcode: number
  fee: number
  dynamic: boolean
  isAsync: boolean
}

const codes: any = {
  // 0x0 range - arithmetic ops
  // name, baseCost, dynamic, async
  0x00: ['STOP', 0, false],
  0x01: ['UADD', 3, false],
  0x02: ['UMUL', 5, false],
  0x03: ['USUB', 3, false],
  0x04: ['DIV', 5, false],
  0x05: ['SDIV', 5, false],
  0x06: ['MOD', 5, false],
  0x07: ['SMOD', 5, false],
  0x08: ['ADDMOD', 8, false],
  0x09: ['MULMOD', 8, false],
  0x0a: ['EXP', 10, false],
  0x0b: ['SIGNEXTEND', 5, false],
  0x0c: ['SADD', 3, false],
  0x0d: ['SSUB', 3, false],
  0x0e: ['SMUL', 3, false],

  // 0x10 range - bit ops
  0x10: ['LT', 3, false],
  0x11: ['GT', 3, false],
  0x12: ['SLT', 3, false],
  0x13: ['SGT', 3, false],
  0x14: ['EQ', 3, false],
  0x15: ['ISZERO', 3, false],
  0x16: ['AND', 3, false],
  0x17: ['OR', 3, false],
  0x18: ['XOR', 3, false],
  0x19: ['NOT', 3, false],
  0x1a: ['BYTE', 3, false],
  0x1b: ['SHL', 3, false],
  0x1c: ['SHR', 3, false],
  0x1d: ['SAR', 3, false],

  // 0x20 range - crypto
  0x20: ['SHA3', 30, false],
  0x2a: ['UFMUL', 8, false],
  0x2b: ['SFMUL', 8, false],
  0x2c: ['UFDIV', 8, false],
  0x2d: ['SFDIV', 8, false],

  // 0x30 range - closure state
  0x30: ['ADDRESS', 2, true],
  0x31: ['BALANCE', 400, true, true],
  0x32: ['ORIGIN', 2, true],
  0x33: ['CALLER', 2, true],
  0x34: ['CALLVALUE', 2, true],
  0x35: ['CALLDATALOAD', 3, true],
  0x36: ['CALLDATASIZE', 2, true],
  0x37: ['CALLDATACOPY', 3, true],
  0x38: ['CODESIZE', 2, false],
  0x39: ['CODECOPY', 3, false],
  0x3a: ['GASPRICE', 2, false],
  0x3b: ['EXTCODESIZE', 700, true, true],
  0x3c: ['EXTCODECOPY', 700, true, true],
  0x3d: ['RETURNDATASIZE', 2, true],
  0x3e: ['RETURNDATACOPY', 3, true],
  0x3f: ['EXTCODEHASH', 400, true, true],

  // '0x40' range - block operations
  0x40: ['BLOCKHASH', 20, true, true],
  0x41: ['COINBASE', 2, true],
  0x42: ['TIMESTAMP', 2, true],
  0x43: ['NUMBER', 2, true],
  0x44: ['DIFFICULTY', 2, true],
  0x45: ['GASLIMIT', 2, true],
  0x46: ['CHAINID', 2, false],

  // 0x50 range - 'storage' and execution
  0x50: ['POP', 2, false],
  0x51: ['MLOAD', 3, false],
  0x52: ['MSTORE', 3, false],
  0x53: ['MSTORE8', 3, false],
  0x54: ['SLOAD', 200, true, true],
  0x55: ['SSTORE', 0, true, true],
  0x56: ['JUMP', 8, false],
  0x57: ['JUMPI', 10, false],
  0x58: ['PC', 2, false],
  0x59: ['MSIZE', 2, false],
  0x5a: ['GAS', 2, false],
  0x5b: ['JUMPDEST', 1, false],

  // 0x60, range
  0x60: ['PUSH', 3, false],
  0x61: ['PUSH', 3, false],
  0x62: ['PUSH', 3, false],
  0x63: ['PUSH', 3, false],
  0x64: ['PUSH', 3, false],
  0x65: ['PUSH', 3, false],
  0x66: ['PUSH', 3, false],
  0x67: ['PUSH', 3, false],
  0x68: ['PUSH', 3, false],
  0x69: ['PUSH', 3, false],
  0x6a: ['PUSH', 3, false],
  0x6b: ['PUSH', 3, false],
  0x6c: ['PUSH', 3, false],
  0x6d: ['PUSH', 3, false],
  0x6e: ['PUSH', 3, false],
  0x6f: ['PUSH', 3, false],
  0x70: ['PUSH', 3, false],
  0x71: ['PUSH', 3, false],
  0x72: ['PUSH', 3, false],
  0x73: ['PUSH', 3, false],
  0x74: ['PUSH', 3, false],
  0x75: ['PUSH', 3, false],
  0x76: ['PUSH', 3, false],
  0x77: ['PUSH', 3, false],
  0x78: ['PUSH', 3, false],
  0x79: ['PUSH', 3, false],
  0x7a: ['PUSH', 3, false],
  0x7b: ['PUSH', 3, false],
  0x7c: ['PUSH', 3, false],
  0x7d: ['PUSH', 3, false],
  0x7e: ['PUSH', 3, false],
  0x7f: ['PUSH', 3, false],

  0x80: ['DUP', 3, false],
  0x81: ['DUP', 3, false],
  0x82: ['DUP', 3, false],
  0x83: ['DUP', 3, false],
  0x84: ['DUP', 3, false],
  0x85: ['DUP', 3, false],
  0x86: ['DUP', 3, false],
  0x87: ['DUP', 3, false],
  0x88: ['DUP', 3, false],
  0x89: ['DUP', 3, false],
  0x8a: ['DUP', 3, false],
  0x8b: ['DUP', 3, false],
  0x8c: ['DUP', 3, false],
  0x8d: ['DUP', 3, false],
  0x8e: ['DUP', 3, false],
  0x8f: ['DUP', 3, false],

  0x90: ['SWAP', 3, false],
  0x91: ['SWAP', 3, false],
  0x92: ['SWAP', 3, false],
  0x93: ['SWAP', 3, false],
  0x94: ['SWAP', 3, false],
  0x95: ['SWAP', 3, false],
  0x96: ['SWAP', 3, false],
  0x97: ['SWAP', 3, false],
  0x98: ['SWAP', 3, false],
  0x99: ['SWAP', 3, false],
  0x9a: ['SWAP', 3, false],
  0x9b: ['SWAP', 3, false],
  0x9c: ['SWAP', 3, false],
  0x9d: ['SWAP', 3, false],
  0x9e: ['SWAP', 3, false],
  0x9f: ['SWAP', 3, false],

  0xa0: ['LOG', 375, false],
  0xa1: ['LOG', 375, false],
  0xa2: ['LOG', 375, false],
  0xa3: ['LOG', 375, false],
  0xa4: ['LOG', 375, false],

  // '0xf0' range - closures
  0xf0: ['CREATE', 32000, true, true],
  0xf1: ['CALL', 700, true, true],
  0xf2: ['CALLCODE', 700, true, true],
  0xf3: ['RETURN', 0, false],
  0xf4: ['DELEGATECALL', 700, true, true],
  0xf5: ['CREATE2', 32000, true, true],
  0xf6: ['ISVALIDATOR', 3, false],
  0xf8: ['FREEGAS', 3, false],
  0xf9: ['RAND', 5, false],
  0xfa: ['STATICCALL', 700, true, true],
  0xfd: ['REVERT', 0, false],

  // '0x70', range - other
  0xfe: ['INVALID', 0, false],
  0xff: ['SELFDESTRUCT', 5000, false, true],
}

export function lookupOpInfo(op: number, full: boolean = false): OpInfo {
  const code = codes[op] ? codes[op] : ['INVALID', 0, false, false]
  let opcode = code[0]

  if (full) {
    if (opcode === 'LOG') {
      opcode += op - 0xa0
    }

    if (opcode === 'PUSH') {
      opcode += op - 0x5f
    }

    if (opcode === 'DUP') {
      opcode += op - 0x7f
    }

    if (opcode === 'SWAP') {
      opcode += op - 0x8f
    }
  }

  return {
    name: opcode,
    opcode: op,
    fee: code[1],
    dynamic: code[2],
    isAsync: code[3],
  }
}
