function GetTemp() {
    $.get("http://localhost/temp", function (data) {
        $("#water-temp").html("Water temperature: " + data);
        var date = new Date();
        var timeString = date.toISOString().substr(11, 8);
        addData(data, timeString)
    });
}

function addData(data, label) {
    window.myLine.data.labels.push(label);
    window.myLine.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    window.myLine.update();
    console.log(data)
}

window.onload = function() {
    var config = {
        type: 'line',
        data: {
            datasets: [{
                label: 'Temperature',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature (degrees)'
                    }
                }]
            }
        }
    };

    var ctx = document.getElementById('water-temp-chart').getContext('2d');
    window.myLine = new Chart(ctx, config);

    GetTemp();
    setInterval(GetTemp, 1000);
};

