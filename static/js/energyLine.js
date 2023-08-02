// Chart JS Line Chart

// Get oil and electric data

d3.json('input/json_files/ev_oil_electricity.json').then(function(data) {
    //  console.log("JSON output", data);

    let years = [];
    let oil = [];
    let elect = [];
    // Build lists out of each year's entries
     for (let i = 0; i < data.length; i++) {
        let oneYear = data[i].year;
        let oneOil = -(data[i].oil_displacement_mbd)*365;
        let oneElect = data[i].electricity_demand_gwh;
        years.push(oneYear);
        oil.push(oneOil);
        elect.push(oneElect);
     }

    // Chart js 2 axis line plot
    var canvas = document.getElementById('myChart');
    new Chart(canvas, {
    type: 'line',
    data: {
        labels: years,
        datasets: [{
        backgroundColor: '#d7301f',
        borderColor: '#990000',  
        label: 'Oil Displacement Millions of Barrels',
        yAxisID: 'A',
        data: oil
        }, {
        backgroundColor: '#41ab5d',
        borderColor: '#41ab5d',
        label: 'Electricity Usage increase (gwH)',
        yAxisID: 'B',
        data: elect
        }]
    },
    options: {
        plugins: {
        title: {
            display: true,
            text: 'US Oil Displacement vs. Increased Electricity Demand',
            font: {
                size: 20,
            },
            },
        },
        // Slow down animation
        animation: {
            duration: 10000,
        },
        scales: {
        A: {
            id: 'A',
            type: 'linear',
            position: 'left',
            ticks: {
                max: 0,
                min: -.15
            }
        }, 
        B: {
            id: 'B',
            type: 'linear',
            position: 'right',
            ticks: {
            max: 16000,
            min: 0
            }
        }
        }
    }
    });

});