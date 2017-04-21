import { Component, OnInit } from '@angular/core';
//import { HeatMapComponent } from './heatmap';
import {Http} from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
//import {LoginComponent} from './login/login.component';
//import * as moment from 'moment';
declare var jQuery: any;
declare var d3: any;
//declare var moment: any;
@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})

export class HeatMapComponent implements OnInit {
  public counts = [];
  public details = [];
  public test = [];
  public d;
constructor(private http: Http, private router: Router) {

  var width = 960,
    height = 136,
    cellSize = 17,
     gridSize = Math.floor(width / 25),
    legendWidth = (width/2 + 4),
    self = this;
  this.http.get('http://localhost:8081/generateheatmap', { headers: contentHeaders })
    .subscribe(
    response => {
      this.counts = response.json();
      //console.log(this.counts);
      var formatPercent = d3.format(".1%");
      var color = d3.scaleQuantize()
        .domain([0,5])
        .range(["#FFF8DC", "#FFEBCD", "#ccd9ff", "#FFDEAD", "#4d79ff","#F08080", "#0040ff", "#FFA07A","#002699","#8B0000","#00134d"]);

      var svg = d3.select("body")
        .selectAll("svg")
        .data(d3.range(2017, 2018))
        .enter().append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

      var week_days = ['S','M','T','W','Th','F','S']
      for (let i=0; i < week_days.length ; i++) {
        svg.append("text")
          .attr("transform", "translate(-5," + cellSize*(i+1) + ")")
          .style("text-anchor", "end")
          .attr("dy", "-.25em")
          .text(function(d) { return week_days[i]; });
      }

      var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      var legend = svg.selectAll(".legend")
        .data(month)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(" + (((i + 1) * 75) + 0) + ",0)"; });

      legend.append("text")
        .attr("class", function(d, i) { return month[i] })
        .style("text-anchor", "end")
        .attr("dy", "-.25em")
        .text(function(d, i) { return month[i] });

      var rect = svg.append("g")
          .attr("fill", "none")
          .attr("stroke", "#ccc")
          .selectAll("rect")
          .data(function(d) { return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
          .enter().append("rect")
          .attr("width", cellSize)
          .attr("height", cellSize)
          .attr("x", function(d) { return d3.timeWeek.count(d3.timeYear(d), d) * cellSize; })
          .attr("y", function(d) { return d.getDay() * cellSize; })
          .datum(d3.timeFormat("%Y-%m-%d"));

        svg.append("g")
          .attr("fill", "none")
          .attr("stroke", "#000")
          .selectAll("path")
          .data(function(d) { return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
          .enter().append("path")
          .attr("d", pathMonth);

        var  csv = self.counts;
        var data = d3.nest()
          .key(function(d) { return d.meetingDate; })
          .rollup(function(d) { return d[0].count ; })
          .object(csv);

        rect.on("click",function(d) {
          self.http.get('http://localhost:8081/showmoredetails/' + d, { headers: contentHeaders })
            .subscribe(
              response => {
                self.d = d;
                self.details = response.json();
                // console.log(this.details);
                jQuery('#myModal').modal('show');
              },
              error => {
                console.log(error.text());
              }
            );
          });
          rect.filter(function(d) { return d in data; })
            .attr("fill", function(d) {
              return color(data[d]);
            })
            .append("title")
            .text(function(d) {
                return d + ":" + data[d];
            });
          // });
function pathMonth(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
    d0 = t0.getDay(), w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
    d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
    return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
    + "H" + w0 * cellSize + "V" + 7 * cellSize
    + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
    + "H" + (w1 + 1) * cellSize + "V" + 0
    + "H" + (w0 + 1) * cellSize + "Z";
      }
},
error => {
  console.log(error.text());
});
}
edit: () => void
 = function(): void {
 jQuery('.modal-backdrop').remove();
 }
  ngOnInit() {
  }
}
