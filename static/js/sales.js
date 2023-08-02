
function getHistData(histSalesURL) {

  evSales = [];
  evShares = [];
  hybridSales = [];

  
  
  d3.json('input/json_files/historical_ev_car_sales.json').then(function(data) {
  
    const filtered = data.filter(item => item.parameter === "EV sales" || item.parameter === "EV sales share"); 

    // Populate evSales and hybridSales arrays
    if (filtered) { 
      for (let i = 0; i < filtered.length; i++) {
        const entry = {
          region: filtered[i].region,
          year: filtered[i].year,
          powertrain: filtered[i].powertrain,
          value: filtered[i].value
        };
        if (filtered[i].parameter == "EV sales") {
          if (filtered[i].powertrain === "BEV") {
              evSales.push(entry);
          } else if (filtered[i].powertrain === "PHEV") {
              hybridSales.push(entry);
          }
        } else {
              evShares.push(entry);
          }
        };   
      };

      console.log("EV Sales: " + evSales.length);
      console.log("hybrids: " + hybridSales.length);
      console.log("EV shares: " + evShares.length);
      
      // draw the plots
      plotHistData(evSales);
      plotTopTen(evShares);
      plotTaxData(evSales, hybridSales);

    });
};

function plotHistData (sales) {

      // filter for the selected regions
      const usItems = sales.filter(item => item.region === "USA"); 
      const worldItems = sales.filter(item => item.region === "World"); 
      const europeItems = sales.filter(item => item.region === "Europe");
  
      // create arrays for plotting
      const years = [];
      const usSales = [];
      const worldSales = [];
      const euSales = [];
  
      for (let i = 0; i < usItems.length; i++) {

          let year = usItems[i].year;
          years.push(year);
          
          let usCount =  usItems[i].value;
          usSales.push(usCount);

          let euCount =  europeItems[i].value;
          euSales.push(euCount);

          let worldCount =  worldItems[i].value;
          worldSales.push(worldCount);
      };

      console.log("world sales ", worldSales);

      //  get location to add chart
      let ctx = document.getElementById("histBarChart").getContext("2d");

      // define data to use
      // Colors: Chroma.js color palette, accessible for all three types of color blindness
      const plotData = {
        labels: years,
        datasets: [
        {
        backgroundColor: '#3761ab',
        borderColor: 'black',  
        label: 'US Sales',
        data: usSales,
        }, 
        {
        backgroundColor: '#93c4d2',
        borderColor: 'black',
        label: 'European Sales',
        data: euSales,
        },
        {
        backgroundColor: '#ffa59e',
        borderColor: 'black',
        label: 'World Sales',
        data: worldSales,
        }]
       };

       //stack the data [stacking is based on chart.js instructions and stackOverflow review]
      let cumulativeSales = new Array(years.length).fill(0);

      let stackedData = plotData.datasets.map(dataset => {
       return dataset.data.map((value, index) => {
         cumulativeSales[index] += value; 
          return cumulativeSales[index];
        });
      });

      // Modify the plotData object with the stackedData
      plotData.datasets.forEach((dataset, index) => {
        dataset.data = stackedData[index];
      });

      // define chart options
      const options = {
        plugins : {
          title: {
            display: true,
            text: 'Electric Vehicle Sales by Year',
            font: {
              size: 22,
            },
          },
          legend: {
            display: true,
            labels: {
                font: {
                    size: 16,
                },
            },
          },
          tooltip: {
            backgroundColor: 'purple', 
            titleFontSize: 18, 
            bodyFontSize: 16, 
            titleFont: {
              weight: 'bold', 
            },
          },
        },
        animation: {
          duration: 5000,
        },
        scales: {
          x: {
              stacked:  false,
              ticks: {
                font: {
                  size: 14,
                },
              },
            },  
          y: {
            type: 'logarithmic', 
              stacked: false,
              ticks: {
                padding: 12,
                font: {
                  size: 14,
                },
                min: 0,
                max: 10,
              },
          },
        },
      };

      // draw the chart
      const histChart = new Chart(ctx,
        {
        type: 'bar',
        data: plotData,
        options: options,
        });

};

function plotTopTen (percents) {

  const plotYear = 2022;

  // Colors: Chroma.js color palette, accessible for all three types of color blindness
  clrs = ['#00429d', '#3761ab', '#5681b9', '#73a2c6', '#93c4d2', '#b9e5dd', '#ffffe0', '#ffd3bf', '#ffa59e', '#f4777f', '#dd4c65', '#be214d', '#93003a']
  
  // filter for current year only
  const sharesSold = percents.filter(item => item.year == plotYear); 

  //sort descending
  sharesSold.sort((a, b) => b.value - a.value);

  // take only the top ten
  const pct = sharesSold.slice(0, 10);  

  // create arrays for plotting
  const regions = [];
  const shares = [];

  for (let i = 0; i < 10; i++) {
      let country = pct[i].region;
      regions.push(country);
      
      let pctSold =  pct[i].value;
      shares.push(pctSold);
  };

  //  get location to add chart
  let ctx = document.getElementById("topTenChart").getContext("2d");

  // define data to use

  const topTenData = {
    labels: regions,
    datasets: [
    {
    backgroundColor: clrs,
    borderColor: 'gray',
    label: 'Percentage of Vehicles Sold',
    data: shares,
    }]
   };

  // define chart options
  const options = {
    cutout: "10%",
    radius: "98%",
    animation: {
      duration: 2000,
    },
    responsive: true,
    hoverOffset : 4,
    plugins : {
      title: {
        display: true,
        text: 'Top Ten Countries for Percentage of EVs Sold',
        font: {
          size: 22,
        },
      },
      legend: {
        display: true,
        padding: 20, 
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: 'purple', 
        titleFontSize: 18, 
        bodyFontSize: 16, 
        titleFont: {
          weight: 'bold', 
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: Math.round,
        font: {
            weight: 'bold',
            size: 16,
            color: "black"
        },
      },
    },
  };

  // draw the chart
  const topTenChart = new Chart(ctx,
    {
    type: 'doughnut',
    data: topTenData,
    options: options,
    });
};

function plotTaxData (esales, hsales) {

  // filter for US data
  // there is no hybrid data for 2010, so exclude that year from ev sales retrieved
 
  const evItems = esales.filter(item => item.region === "USA" && item.year > 2010); 
  const hybridItems = hsales.filter(item => item.region === "USA"); 

  // create arrays for plotting butterfly chart
  const years = [];
  const evs = [];
  const hybrids = [];

  for (let i = 0; i < evItems.length; i++) {
      let year = evItems[i].year;
      years.push(year);
      
      let evCount = evItems[i].value;
      evs.push(evCount); 

      let hybridCount = hybridItems[i].value;
      hybrids.push(hybridCount);
  };

  //  get location to add chart
  let ctx = document.getElementById("txChart").getContext("2d");

  // define data to use
  // Colors: Chroma.js color palette, accessible for all three types of color blindness
    const txData = {
      labels: years,
      datasets: [
    {
      backgroundColor: '#73a2c6',
      borderColor: '#73a2c6',
      label: 'EV Sales',
      data: evs,
      borderWidth: 4,
      fill: false, 
      tension: 0.3,
    },
    {
      backgroundColor: '#be214d',
      borderColor: '#be214d',
      label: 'Hybrid Sales',
      data: hybrids,
      borderWidth: 4,
      fill: false, 
      tension: 0.3,
    },
    ]
  };

  // define chart options
  const options = {
    legend: {
      display: true,
      position: 'center',
      labels: {
        font: {
            size: 20,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'US EV Sales and Tax Incentives',
        font: {
          size: 22,
        },
      },
      annotation: {
        clip: false,
          annotations: [
          {
            id: 'incentiveThresholdLine',
            type: 'line',
            display: true,
            yMin: 200000, 
            yMax: 200000,
            borderWidth: 1,
            borderColor: 'red', 
            label: {
              font: { 
                backgroundColor: 'red'
              },
              content: ['Manufacturer vehicle limit'],
            },
          },     
          { id: "incentiveLabel",
            type: 'label',
            drawTime: 'beforeDraw',
            xValue: 2012,
            yValue: 250000,
            display: true,
            backgroundColor: 'red',
            textStrokeColor: 'black', 
            content: ['Manufacturer vehicle limit'],
            font: {
              size: 18
            },
          },
          {
            id: 'exceededThreholdLine',
            type: 'line',
            //drawTime: 'beforeDraw',
            display: true,
            mode: 'vertical',
            //xMin: 2019,
            //xMax: 2019, 
            //value: 2019,
            //endvalue: 2019, 
            scaleID: "x",
            borderWidth: 2,
            borderColor: 'red', 
          },
          {
            id: 'threatenedEliminationLine',
            type: 'line',
            //drawTime: 'beforeDraw',
            display: true,
            mode: 'vertical',
            //xMin: 2017,
            //xMax: 2017, 
            //value: 2017,
            //endvalue: 2017, 
            scaleID: "x",
            borderWidth: 2,
            borderColor: 'red', 
          },
        ],
      },
      elements: {
        point: {
          radius: 3, 
          hitRadius: 10,
          hoverRadius: 8,
        },
      },
      tooltip: {
        backgroundColor: 'purple', 
        titleFontSize: 18, 
        bodyFontSize: 16, 
        titleFont: {
        weight: 'bold', 
        },
      },
    },
    animation: {
     duration: 4000,
      tension: {
        duration: 4000,
        easing: 'easeInOutQuad',
        from: 1,
        to: 0,
        loop: false
      }
   },
    scales: {
      x: {
          //id : 'x-axis-label',
          ticks: {
            font: {
                size: 14,
            },
          beginAtZero: true,
          },
        },  
      y: {
          stacked: false,
          //yAxisID: 'y1',
          ticks: {
            padding: 10,
            font: {
              size: 14,
            },
            beginAtZero: true,
          },
      },
    },
  };

  // draw the chart
  const txChart = new Chart(ctx,
    {
    type: 'line',
    data: txData,
    options: options,
    });
};

function buildDropdown(countries) {

  const selectedRegions = new Set();

// Access the dropdown menu element
  var dropdownMenu = document.getElementById("#selRegDataset");

  // add the list of names to the selection
  countries.forEach(country => {
    let option = document.createElement("option");
    option.value = country;
    option.text = country;
    dropdownMenu.appendChild(option);
  });

  // Add event listener to the dropdown
  dropdownMenu.addEventListener('change', (event) => {      
    const selectedRegion = event.target.value;

    // If selection region not already selected, add it to set
    if (selectedRegion && !selectedRegions.has(selectedRegion)) {
    
      selectedRegions.add(selectedRegion);

      if (selectedRegions.size === 3) { 
        console.log('All three options selected:', selectedRegions);
    };
  };
  });
};

function drawPlots() {

    const taxIncentivesURL = 'input/json_files/ev_tax_incentives.json';
    const histSalesURL = 'input/json_files/historical_ev_car_sales.json';

      // Call the function to load and map the hist sales data
    getHistData(histSalesURL);

};

// This function is called after a dropdown region is selected
function regionsSelected(region) {

    // Fetch the new JSON data and log ii
    fetchData(histSalesURL).then(data => {
        
            console.log("cars for " + data);
            }); 
};

drawPlots();

// d3.selectAll("#selRegDataset").on("change", regionSelected(newID));
