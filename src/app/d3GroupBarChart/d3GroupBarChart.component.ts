import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {Http} from '@angular/http';
import { contentHeaders } from '../common/headers';
declare var jQuery: any;
import { AuthenticationService } from '../services/auth.service';
declare var d3: any;

@Component({
  selector: 'app-d3GroupBarChart',
  templateUrl: './d3GroupBarChart.component.html',
  styleUrls: ['./d3GroupBarChart.component.css']
})

export class D3GroupBarChartComponent implements OnInit {
  public graphValue = [];
  public displayGraph = [];
  public datasetValues = [];

  constructor(private http: Http, private activatedRoute: ActivatedRoute, private authService: AuthenticationService, private router: Router) {
    document.getElementById("errorId").innerHTML = "";
  }
  ngOnInit() {
    //this.generateGraph();
  }

  // d3 visualiuzation
  generateGraph: () => any
  = function() {
    this.http.get('http://localhost:8081/getActionItemsInformationForGraph', { headers: contentHeaders })
      .subscribe(
      response => {
        this.graphValue = response.json();
        console.log(this.graphValue);

        var userlist = [];
        for (var i = 0; i < this.graphValue.length; i++) {
          var user = this.graphValue[i].userName;
          if (userlist.indexOf(user) === -1) {
            userlist.push(user);
          }
        }

        var exp = [];
        for (var j = 0; j < userlist.length; j++) {
          var name = userlist[j];
          var obj = {};
          obj['label'] = name;
          for (var i = 0; i < this.graphValue.length; i++) {
            if (name === this.graphValue[i].userName) {
              obj[this.graphValue[i].meetingTitle] = this.graphValue[i].dateDiff;
            }
          }
          this.datasetValues.push(obj);
        }
        console.log("!!!!!!!!!!!!", this.datasetValues);

        var array = typeof this.datasetValues != 'object' ? JSON.parse(this.datasetValues) : this.datasetValues;
        var str = '';
        var keyList = Object.keys(array[0]);
        for (var j = 0; j < keyList.length; j++) {
          var column = '';
          column += '"' + keyList[j].replace(/"/g, '""') + '",';
          for (var i = 0; i < array.length; i++) {
            var value = array[i][keyList[j]] + "";
            column += '"' + value.replace(/"/g, '""') + '",';
          }
          column = column.slice(0, -1);
          str += column + '\r\n';
        }
        console.log(str)

        //d3.select("svg").remove();
        var svg = d3.select("svg"),
          margin = { top: 20, right: 20, bottom: 30, left: 40 },
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom,
          g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x0 = d3.scaleBand()
          .rangeRound([0, width])
          .paddingInner(0.1);

        var x1 = d3.scaleBand()
          .padding(0.05);

        var y = d3.scaleLinear()
          .rangeRound([height, 0]);

        var z = d3.scaleOrdinal()
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#645BC7"," #CE99C6", "#9CD8D1" ]);

        console.log("1", this.datasetValues);

        var data = this.datasetValues;
        var keysList = [];
        var user;
        for (var i = 0; i < this.datasetValues.length; i++) {
          user = Object.keys(data[i]).slice(1);
          for (var j = 0; j < user.length; j++) {
            if (keysList.indexOf(user[j]) === -1) {
              keysList.push(user[j]);
            }
          }

        }
        console.log("userlist", keysList);
        var keys = [];
        for (var i = 0; i < data.length; i++) {
          keys.push(data[i].label);
        }
        //new
        var arr = [];
        for (var i = 0; i < keysList.length; i++) {
          var obj = {};
          obj['label'] = keysList[i];
          for (var j = 0; j < data.length; j++) {
            if (data[j][keysList[i]]) {
              obj[data[j]['label']] = data[j][keysList[i]];
            } else {
              obj[data[j]['label']] = 0;
            }
          }
          arr.push(obj);
        }
        console.log("arr", arr);
        //end
        data = arr;

        console.log("keys", keys);

        x0.domain(data.map(function(d) { return d.label; }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

        g.append("g")
          .selectAll("g")
          .data(data)
          .enter().append("g")
          .attr("transform", function(d) { return "translate(" + x0(d.label) + ",0)"; })
          .selectAll("rect")
          .data(function(d) {
            return keys.map(function(key) { return { key: key, value: d[key] }; });
          })
          .enter().append("rect")
          .attr("x", function(d) {
            return x1(d.key);
          })
          .attr("y", function(d) {
            return y(d.value);
          })
          .attr("width", x1.bandwidth())
          .attr("height", function(d) {
            return height - y(d.value);
          })
          .attr("fill", function(d) {
            return z(d.key);
          });

        g.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x0));

        g.append("g")
          .attr("class", "axis")
          .call(d3.axisLeft(y).ticks(null, "s"))
          .append("text")
          .attr("x", 2)
          .attr("y", y(y.ticks().pop()) + 0.5)
          .attr("dy", "0.32em")
          .attr("fill", "#000")
          .attr("font-weight", "bold")
          .attr("text-anchor", "start")
          .text("Days");

        var legend = g.append("g")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .attr("text-anchor", "end")
          .selectAll("g")
          .data(keys.slice().reverse())
          .enter().append("g")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
          .attr("x", width - 19)
          .attr("width", 19)
          .attr("height", 19)
          .attr("fill", z);

        legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9.5)
          .attr("dy", "0.32em")
          .text(function(d) { return d; });
        //      });

      },
      error => {
        console.log(error.text());
        this.router.navigate(['/errorPage']);
      }
      );

  }
}
