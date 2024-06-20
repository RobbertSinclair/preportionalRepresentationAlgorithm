export type VoteInput = {
    id: number;
    partyName: string;
    votes: number;
}

export type VoteInputProps = {
    theInput: VoteInput;
    submit: Function,
}

export type PartyInputProps = {
    index: number;
    partyName: string;
    votes: number;
    delete: Function;
    edit: Function;
}

export type ParliamentResultProps = {
    parliament: Object;
    loading: Boolean;
}

export type ParliamentListProps = {
    parliament: Object;
}

export type ParliamentRowProps = {
    party: String;
    seats: Number;
}