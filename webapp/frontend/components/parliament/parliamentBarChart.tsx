import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement } from "chart.js";
import { ParliamentListProps } from "@/definitions/party";
import { Bar } from "react-chartjs-2";

export default function ParliamentBarChart(props: ParliamentListProps) {

    ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);

    const data = {
        labels: Object.keys(props.parliament),
        datasets: [{
            label: "Seats",
            data: Object.keys(props.parliament).map(party => props.parliament[party]),
            borderWidth: 1,
            backgroundColor: "rgba(255, 99, 132, 0.5)"
        }]

    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    return (
            <div className="col-7">
                <Bar data={data} options={options} />
            </div>
        )
}