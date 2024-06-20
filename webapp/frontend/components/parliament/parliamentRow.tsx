import { ParliamentRowProps } from "@/definitions/party";

export default function ParliamentRow(props: ParliamentRowProps) {

    return (
        <tr className="w-1/2">
            <td><h1 className="table-item text-center">{props.party}</h1></td>
            <td><h1 className="table-item text-center">{props.seats}</h1></td>
        </tr>    
    
    )
}