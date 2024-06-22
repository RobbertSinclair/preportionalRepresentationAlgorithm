import { ParliamentResultProps } from "@/definitions/party";
import Loading from "./loading";
import ParliamentList from "./parliament/parliamentList";
import ParliamentBarChart from "./parliament/parliamentBarChart";

export default function ParliamentResult(props: ParliamentResultProps) {

    return (
        <div className="row">
            <div className="col-5">
                {props.loading ? <Loading /> : <ParliamentList parliament={props.parliament} />}
            </div>
            {!props.loading && <ParliamentBarChart parliament={props.parliament} />}
        </div>
    )

}