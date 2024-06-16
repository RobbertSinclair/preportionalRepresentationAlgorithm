"use client"
import { PartyInputProps } from "@/definitions/party";
import { useId } from "react";


export default function PartyInput(props: PartyInputProps) {

    const editButton = useId();
    const deleteButton = useId();

    return (
        <tr>
            <td className="px-4"><h1 className="text-3xl">{props.partyName}</h1></td>
            <td className="px-4"><h1 className="text-3xl">{props.votes}</h1></td>
            <td >
                <button id={editButton} className="btn btn-blue">Edit</button>
                <button id={deleteButton} className="btn btn-red" onClick={() => props.delete(props.index)}>Delete</button>
            </td>
        </tr>
        )
}