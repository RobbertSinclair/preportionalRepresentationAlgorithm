export type VoteInput = {
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