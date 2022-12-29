function fetchCheckStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function loadData(url) {
  const option = {
    method: "GET",
    headers: new Headers(),
    mode: "cors",
    cache: "default"
  };

  return fetch(url, option)
    .then(fetchCheckStatus)
    .then(function (resp) {
      const contentType = resp.headers.get("Content-Type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return resp.json();
      }
      return resp.text();
    })
    .then(function (data) {
      return data;
    })
    .catch(function () {
      console.log("Something went wrong! Please check data/schema files");
    });
}

Promise.all([
  loadData(
    "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/weekly-binning-on-time-axis_data.json"
  ),
  loadData(
    "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/weekly-binning-on-time-axis_schema.json"
  )
]).then((res) => {
  const data = res[0];
  const schema = res[1];

  const dataStore = new FusionCharts.DataStore(data, schema);

  new FusionCharts({
    type: "timeseries",
    renderAt: "chart-container",
    width: "100%",
    height: "100%",
    dataSource: {
      chart: {
        startOfWeek: 0,
        theme: "fusion"
      },
      // caption: {
      //   text: "Weekly Online Sales of a SuperStore in the US"
      // },
      xAxis: {
        plot: "Time",
        binning: {
          year: [],
          month: [],
          day: [],
          week: [2],
          hour: [],
          minute: [],
          second: []
        }
      },
      yAxis: [
        {
          plot: {
            value: "Sales",
            aggregation: "Average"
          }
        }
      ],
      data: dataStore.getDataTable()
    }
  }).render();
});


//-----JS for Price Range slider-----

//-----JS for Price Range slider-----