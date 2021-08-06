let output
let sc = [], sd = []
let row = []

$(document).ready(function () {
  console.log('ready')

// get/extract the data from csv into arrays, sd (date for x-axis) and sc (data for y-axis)
  function getData(output) {

// extract data for Sabah state
    let s = output.data.filter(row => row.state == 'Sabah')

    // echo extracted data
    console.log(s)
    s.forEach((row) => {
      sd.push(row['date'])  // date for x-axis
      sc.push(parseInt(row['cases_new'])) // data for y-axis
    })
  }

// plot the data
  function plotData() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: sd, // date for x-axis
        datasets: [{
          label: 'Daily New Cases in Sabah',
          data: sc, // data for y-axis
          borderWidth: 1,
          borderColor: 'green'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

// import data from github. change value for url if you want to look at another dataset.
  $.ajax({
    url: "https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/cases_state.csv",
    success: function (csv) {
      output = Papa.parse(csv, {
        header: true, // Convert rows to Objects using headers as properties
      });
      if (output.data) {
        getData(output) // get data from the csv into array
        plotData()  // plot the result
      } else {
        console.log(output.errors);
      }
    },
    error: function (jqXHR, textStatus, errorThrow) {
      console.log(textStatus);
    }
  });

})
