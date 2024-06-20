import { ParliamentListProps } from "@/definitions/party";
import ParliamentRow from "./parliamentRow";

export default function ParliamentList(props: ParliamentListProps) {

    const results = Object.keys(props.parliament).map(party => <ParliamentRow party={party} seats={props.parliament[party]} />)

    return (
    <div>
        <table className="table">
            <tbody>
                <tr>
                    <th className="w-1/2"><h1 className="table-header text-center">Party</h1></th>
                    <th className="w-1/2"><h1 className="table-header text-center">Seats</h1></th>
                </tr>
                {results}
            </tbody>
        </table>
    </div>
    );
}