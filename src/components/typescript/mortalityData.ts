export const mortalityData = {
    type: 'line',
    data: {
        labels: ["", ""],
        datasets: [
            {
                label: 'Mortality',
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
                    max: 15,
                    padding: 25,
                    callback: function (value: any) {
                        return value + "%"
                    }
                }
            }]
        }
    }
}

export default mortalityData;


