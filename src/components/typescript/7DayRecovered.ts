export const SevenDayRecoveredData = {
    type: 'line',
    data: {
        labels: ["", ""],
        datasets: [
            {
                label: 'Recovered',
                data: [0, 0, 0],
                backgroundColor: [
                    '#ab1f2c'
                ],
                borderColor: [
                    '#801722'
                ],
                borderWidth: 3
            },
        ]
    },
    options: {
        responsive: true,
        lineTension: 1,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    padding: 25,
                }
            }]
        }
    }
}

export default SevenDayRecoveredData;