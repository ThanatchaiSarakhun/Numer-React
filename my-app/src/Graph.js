import Chart from "react-apexcharts";
function Graph(it,xm) {
    return(
<div>

<center> <Chart options={it} series={xm} width={700}height={320}/> </center>
</div>
    )
}

export default Graph;