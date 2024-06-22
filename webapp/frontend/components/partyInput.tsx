"use client"
import { PartyInputProps } from "@/definitions/party";
import { useId } from "react";


export default function PartyInput(props: PartyInputProps) {

    const deleteButton = useId();

    return (
        <tr>
            <td className="px-4"><h5 className="text-3xl">{props.partyName}</h5></td>
            <td className="px-4"><h5 className="text-3xl">{props.votes}</h5></td>
            <td >
                <button id={deleteButton} className="btn btn-danger" onClick={() => props.delete(props.index)}>Delete</button>
            </td>
        </tr>
        )
}