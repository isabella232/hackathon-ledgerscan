
export interface TransferEvents {
    list: any[];
    truncated: boolean;
    next_index?: any;
}

export interface Erc721TransferEvents {
    contract: string;
    sender: string;
    receiver: string;
    token_id: string;
}

export interface Action {
    from: string;
    to: string;
    input?: any;
    value: any;
    gas: number;
    gas_used?: number;
    error?: any;
}

export interface Block {
    hash: string;
    height: number;
    time: Date;
}

export interface TX {
    hash: string;
    transaction_type: number;
    nonce: string;
    value: number;
    gas: number;
    gas_price: number;
    max_fee_per_gas: number;
    max_priority_fee_per_gas: number;
    from: string;
    to: string;
    transfer_events?: TransferEvents;
    erc721_transfer_events?: Erc721TransferEvents[];
    erc1155_transfer_events?: any[];
    approval_events?: any[];
    actions?: Action[];
    confirmations: number;
    input?: any;
    gas_used: number;
    cumulative_gas_used: number;
    status?: number;
    received_at: string;
    block?: Block;
}
