import { VoteInputProps } from "@/definitions/party";
import {useId, useState} from "react";


export default function PartyInputForm(props: VoteInputProps) {

    const id1 = useId();
    const id2 = useId();

    const handleSubmit = () => {
        const partyName = document.getElementById(id1).value;
        const votes = document.getElementById(id2).value;
        props.submit(partyName, votes);
    }

    return (
        <tr>
            <td className="px-4"><input id={id1} className="border-2 rounded-md border-black" defaultValue={props.theInput.partyName} type="text"></input></td>
            <td className="px-4"><input id={id2} className="border-2 rounded-md border-black" type="number" defaultValue={props.theInput.votes} min={1}></input></td>
            <td >
                <button className="btn btn-blue" onClick={handleSubmit}>Submit</button>
            </td>
        </tr>)
}