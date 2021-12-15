export interface Input {
    output_hash: string;
    output_index: number;
    input_index: number;
    value: number;
    address: string;
    script_signature: string;
    txinwitness: string[];
    sequence: string;
}

export interface Output {
    output_index: number;
    value: number;
    address: string;
    script_hex: string;
}

export interface Block {
    hash: string;
    height: number;
    time: Date;
}

export interface BtcTransaction {
    id: string;
    hash: string;
    received_at: string;
    lock_time: number;
    fees: string;
    inputs: Input[];
    outputs: Output[];
    block: Block;
    confirmations: number;
}

