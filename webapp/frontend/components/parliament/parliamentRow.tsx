import { ParliamentRowProps } from "@/definitions/party";

export default function ParliamentRow(props: ParliamentRowProps) {

    return (
        <tr>
            <td><h5 className="table-item text-center">{props.party}</h5></td>
            <td><h5 className="table-item text-center">{props.seats}</h5></td>
        </tr>    
    
    )
}