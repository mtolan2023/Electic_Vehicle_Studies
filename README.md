# EV Studies
Monitoring the growth of EV ownership and infrastructure in the US and World

Github Pages Deployment: https://mtolan2023.github.io/Electic_Vehicle_Studies/

This is a team data presentation project to explore electric vehicle use in the United States and worldwide. The user can examine ev and hybrid sales since 2010, sales of different makes and models of EVs, sales in different countries or a set of regions, changes in electricity and oil use since 2010, and the current charging station infrastructure in the United States.

### Pie Chart - Displays Top Ten Countries EV Ownership

![Screen Shot 2023-09-18 at 8 14 54 PM](https://github.com/mtolan2023/Electic_Vehicle_Studies/assets/123139216/a614873e-7846-44a7-b882-5e876be35382)

### Bar Chart - Displays ownership growth over time, sortable by country
![newplot (5)](https://github.com/mtolan2023/Electic_Vehicle_Studies/assets/123139216/7e493be0-7c8f-4a4f-ad5e-7550a0267851)

### Oil vs. Electric Usage - Displays oil savings against increased electricity usage
![Screen Shot 2023-09-18 at 8 15 12 PM](https://github.com/mtolan2023/Electic_Vehicle_Studies/assets/123139216/cd96b84d-35fc-49bd-85a8-9cb5e686eb31)

### Sales By Model in the US annually
![Screen Shot 2023-09-18 at 8 15 33 PM](https://github.com/mtolan2023/Electic_Vehicle_Studies/assets/123139216/6daa3800-ff1e-477d-8626-2890dd59853b)

### Logarithmic Change in ownership in the US, Europe and the World
![Screen Shot 2023-09-18 at 8 15 52 PM](https://github.com/mtolan2023/Electic_Vehicle_Studies/assets/123139216/04d4ccfc-44ab-405e-bc0f-6a3ce1458ecc)

### Tax incentive impact on US sales
![Screen Shot 2023-09-18 at 8 16 01 PM](https://github.com/mtolan2023/Electic_Vehicle_Studies/assets/123139216/578b9b30-5a8d-4867-a3ea-baba85ad5150)

### Map displays EV registrations by state as well as current charging infrastructure by charger type
![Screen Shot 2023-09-18 at 8 16 37 PM](https://github.com/mtolan2023/Electic_Vehicle_Studies/assets/123139216/317c8831-384f-4436-8d98-60764915676b)


The application uses javascript, plotly, chart.js, and leaflet. 

User notes:
The index.html file imports all of the scripts from leaflet, chart.js, and plotly so nothing needs to be installed on the user's machine.

The separate javascript application files are stored in the subfolder "static/js," and the css files in the subfolder "css." The javascript files are: "leaflet.js," "bubble2.js", "sales.js", "bar.js," and "energyLine.js". All are imported at the end of the index.html.


# Citations:
Choropleth code taken from: https://leafletjs.com/examples/choropleth/

Bind legend and info to layer: https://gis.stackexchange.com/questions/68941/add-remove-legend-with-leaflet-layers-control

Chart.js 2 axis line chart: https://stackoverflow.com/questions/38085352/how-to-use-two-y-axes-in-chart-js-v2

Chart.js chartjs-plugin-annotation:
https://www.chartjs.org/chartjs-plugin-annotation/latest/guide/configuration.html

Color array: https://colorbrewer2.org/

Chroma.js Color Palette Helper at https://vis4.net

Python http server: https://docs.python.org/3/library/http.server.html#http.server.SimpleHTTPRequestHandler

# Data Sources:

Zipcode data: The zipcode dataset from this github project is being used for the "zoom to zip" feature on the US map. Resource taken from M Bostock zip visualization. https://gist.github.com/mbostock/5180185#file-zipcodes-tsv

States geojson: This dataset was organized by Eric Celeste using data from the US Census Bureau. It is a public dataset but it is requested that the Census Bureau be referenced as a resource. https://eric.clst.org/tech/usgeojson/

State populations: https://www.statsamerica.org/sip/rank_list.aspx?rank_label=pop1&ct=S18

Charging station data (US Dept of Energy- Alternative Fuels Data Center): https://afdc.energy.gov/stations/

EV US/Global sales and Oil/Electric offset/increase (International Energy Agency): https://www.iea.org/data-and-statistics/data-tools/global-ev-data-explorer

EV Registration per state (2022) (US Dept of Energy- Alternative Fuels Data Center): https://afdc.energy.gov/data/10962

US and world sales history for evs, hybrids, oil and gas usage, and sales share precentages are from IEA's Global EV data explorer https://www.iea.org/data-and-statistics/data-tools/global-ev-data-explorer

Information about tax credits for EVs in the US was collected from the Congressional Office of Management and Budget, and the IRS, and manually entered into the ev_tax_incentives collection. See, e.g.,

Congressional Research Service for May 14, 2019 US Department of Energy, ALternativeFuels Center: https://afdc.energy.gov/laws/409
https://www.irs.gov/credits-deductions/credits-for-new-clean-vehicles-purchased-in-2023-or-after Congressional Budget Office, September 2012, "Effects of Federal Tax Credits for the Purchase of Electric Vehicles"
