import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Bar } from "react-chartjs-2";
import MaterialTable from "material-table";

const useStyles = makeStyles(theme => ({
  chart: {
    marginLeft: theme.spacing(2)
  }
}));
function AdminDashboard(props) {
  const classes = useStyles();
  const [data, setdata] = React.useState({
    labels: ["type1", "type2", "type3", "type4"], //....categories....................
    datasets: [
      {
        label: "No. of registrations made", //..............text that comes on hover......
        backgroundColor: [
          //................................................colors of the bars............
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850"
        ],
        barThickness: 80,
        data: [50, 0, 75, 25] //......................values for each bar...........
      }
    ]
  });
  const [displaychartTable, setdisplaychartTable] = React.useState(false);
  const getChartData = canvas => {
    return data;
  };
  const barClickHandler = e => {
    if (e[0] !== undefined) {
      let item = e[0];
      let type = item._model.label;
      console.log("type of the bar is: ", type);

      setdisplaychartTable(true);
    }
  };
  const [chartData, setchartData] = React.useState([
    //this table is populated with response from the backend call
    { id: 1, date: "2020-20-06", name: "abcd" }
  ]);
  const [childRows, setChildRows] = React.useState([
    // this table will be populated with a backend response based on id in parent row
    { id: 1.1, date: "2020-20-06", name: "efgh" }
  ]);
  return (
    <React.Fragment>
      <div
        className={classes.chart}
        style={{ position: "relative", width: 900, height: 450 }}
      >
        <Bar
          options={{
            tooltips: {
              mode: "index",
              intersect: false
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: { display: false },
            title: {
              display: true,
              text: "Title for the graph"
            },
            scales: {
              yAxes: [
                {
                  minBarLength: 2,
                  ticks: {
                    display: true,
                    beginAtZero: true,
                    callback: function(value) {
                      if (Number.isInteger(value)) {
                        return value;
                      }
                    },
                    stepSize: 1
                  }
                }
              ],
              xAxes: [
                {
                  ticks: {
                    padding: 1,
                    display: true,
                    beginAtZero: true,
                    stepSize: 1
                  }
                }
              ]
            }
          }}
          onElementsClick={barClickHandler}
          data={getChartData}
        />
      </div>

      {displaychartTable ? (
        <div>
          <MaterialTable
            data={chartData}
            title="Table"
            columns={[
              {
                title: "ID",
                field: "id"
              },
              { title: "Date", field: "date", type: "Date" },
              { title: "Name", field: "name" }
            ]}
            options={{
              actionsColumnIndex: -1,
              headerStyle: {
                backgroundColor: "#3e95cd",
                color: "#FFF"
              }
            }}
            onRowClick={(evt, selectedRow) =>
              console.log("ID of selected row:", selectedRow.id)
            }
          />
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default AdminDashboard;
