const API_BASE = "localhost:5000";

export function convertVoteInputIntoDict(voteArray: Array<VoteInput>) {
    let dict: Object = {};
    for ( let i = 0; i < voteArray.length; i++) {
        dict[voteArray[i].partyName] = Number(voteArray[i].votes);
    }
    return dict;
}

export async function postAPI(endpoint: string, theInput: Object) {
    const response = await fetch(`http://${API_BASE}/${endpoint}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(theInput)
    });

    const data = await response.json();

    return data;
    
}