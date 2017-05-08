import { OnInit, OnDestroy, Component } from '@angular/core';
import { Http } from '@angular/http';
import { contentHeaders } from '../common/headers';
declare var d3: any;
declare var jQuery: any;
@Component({
  selector: 'app-quarterMeetings',
  templateUrl: './quarterMeetings.component.html',
  styleUrls: ['./quarterMeetings.component.css']
})
export class QuarterMeetingsComponent implements OnInit {
  public months: any;
  public quarterDates: any;
  public quarterDisplayStart: string;
  public quarterDisplayEnd: string;
  public meetingData: any;
  public selectedMeetingType: string;
  public displayMeetingData: any;
  public counts = [];
  public details = [];
  public test = [];
  public d;
  constructor(private http: Http) {
    this.displayHeatMap();
  //  document.getElementById("errorId").innerHTML = "";
}
displayHeatMap: () => void
= function(): void {
    var width = 960,
      height = 136,
      cellSize = 17,
      gridSize = Math.floor(width / 24),
            legendElementWidth = gridSize*2,
      radius = (width - 400)/2,
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
        var colors = ["#FFF8DC", "#FFEBCD", "#ccd9ff", "#FFDEAD", "#4d79ff","#F08080", "#0040ff", "#FFA07A","#002699","#8B0000","#00134d"];
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

  //           var legendRectSize = (radius * 0.15);
  // var legendSpacing = radius * 0.05;
  //
  // var legend = svg.selectAll('.legend')
  //     .data(color.domain())
  //     .enter()
  //     .append('g')
  //     .attr('class', 'legend')
  //     .attr('transform', function(d, i) {
  //         var height = legendRectSize + legendSpacing;
  //         var offset =  height * color.domain().length / 2;
  //         var horz = 400 + (-3 * legendRectSize);
  //         var vert = i * height - offset;
  //         return 'translate(' + horz + ',' + vert + ')';
  //     });
  //
  // legend.append('rect')
  //     .attr('width', legendRectSize)
  //     .attr('height', legendRectSize)
  //     .style('fill', color)
  //     .style('stroke', color);
  //
  // legend.append('text')
  //     .attr('x', legendRectSize + legendSpacing)
  //     .attr('y', legendRectSize - legendSpacing)
  //     .text(function(d) { return d; });

  // var legend = svg.selectAll(".legend")
  //              .data([0].concat(color.quantiles()), function(d) { return d; });
  //
  //          legend.enter().append("g")
  //              .attr("class", "legend");
  //
  //          legend.append("rect")
  //            .attr("x", function(d, i) { return legendElementWidth * i; })
  //            .attr("y", height)
  //            .attr("width", legendElementWidth)
  //            .attr("height", gridSize / 2)
  //            .style("fill", function(d, i) { return colors[i]; });
  //
  //          legend.append("text")
  //            .attr("class", "mono")
  //            .text(function(d) { return "≥ " + Math.round(d); })
  //            .attr("x", function(d, i) { return legendElementWidth * i; })
  //            .attr("y", height + gridSize);
  //
  //          legend.exit().remove();


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
generateGraph: () => any
= function() {
  var currDate = new Date();
  var startDateVal = new Date(this.selectDate);
  var startDate = (startDateVal.getFullYear().toString()) + "-" + ("0" + (startDateVal.getMonth() + 1).toString()).substr(-2) + "-" + ("0" + startDateVal.getDate().toString()).substr(-2);
  var startDateValue = JSON.stringify({ "startDate": startDate });
  d3.select(".chartBody").append("svg")
    .attr("width", 960)
    .attr("height", 350);
  d3.selectAll('g').remove();
  if (currDate >= startDateVal) {
    this.http.get('http://localhost:8081/getActionItemsInformationForGraph/' + startDateValue, { headers: contentHeaders })
      .subscribe(
      response => {
        this.graphValue = [];
        this.datasetValues = [];
        this.graphValue = response.json();
        if ((this.graphValue).length != 0) {
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
var divTooltip = d3.select("body").append("div").attr("class", "toolTip");
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
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#645BC7", " #CE99C6", "#9CD8D1"]);

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
        data = arr;
        console.log("arr",arr);

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

            var g = svg.selectAll("rect")
              .data(data)
              .enter().append("g")
              .on("mouseover", function (d) {
              d3.select("#tooltip")
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px")
                .style("opacity", 1)
                .style("z-index",100)
                .style("visibility",'visible')
                .select("#value")
                .text(d.value)
              })
            .on("mouseout", function () {
            // Hide the tooltip
            d3.select("#tooltip")
                .style("opacity", 0);
              })
            .on("mouseenter", function(d) {
                d3.select(this)
                       .attr("stroke","white")
                       .transition()
                       .duration(1000)
                       .attr("d", "rect")
                       .attr("stroke-width",6);
                })
            .on("mouseleave", function(d) {
              d3.select(this).transition()
               .attr("d", "rect")
               .attr("stroke","none");
             });

      } else {
        document.getElementById("informationNotValid").innerHTML = "Meeting Information is not Available for the Selected Date";
        setTimeout(function() {
        document.getElementById("informationNotValid").innerHTML = ""; }, 3000);
      }
      },
      error => {
        console.log(error.text());
        this.router.navigate(['/errorPage']);
      }
      );

  } else {
    document.getElementById("informationNotAvailable").innerHTML = "Select Valid Date";
    setTimeout(function() {
    document.getElementById("informationNotAvailable").innerHTML = "";
  }, 3000);

  }
}



  ngOnInit() {
  }

  //To get meetings for the quarter
  getQuarterMeetings: () => void
  = function(): void {
    d3.select("svg").remove();
    document.getElementById("quarterInfo").innerHTML = "";
    var currDate = new Date();
    var startDateVal = new Date(this.quarterDatesStart);
    if ( currDate >= startDateVal ) {
    var startDate = (startDateVal.getFullYear().toString()) + "-" + ("0" + (startDateVal.getMonth() + 1).toString()).substr(-2) + "-" + ("0" + startDateVal.getDate().toString()).substr(-2);
    this.quarterDisplayStart =  ("0" + startDateVal.getDate().toString()).substr(-2) + "-" + ("0" + (startDateVal.getMonth() + 1).toString()).substr(-2) + "-" + (startDateVal.getFullYear().toString());
    var startDatePlus2 = new Date(startDateVal.setMonth(startDateVal.getMonth() + 3));
    var startDateEndDate  = new Date(startDatePlus2.setDate(0));
    var endDate = (startDateEndDate.getFullYear().toString()) + "-" + ("0" + (startDateEndDate.getMonth() + 1).toString()).substr(-2) + "-" + ("0" + startDateEndDate.getDate().toString()).substr(-2);
    this.quarterDisplayEnd =  ("0" + startDateEndDate.getDate().toString()).substr(-2) + "-" + ("0" + (startDateEndDate.getMonth() + 1).toString()).substr(-2) + "-" + (startDateEndDate.getFullYear().toString());
    var quarterDates = JSON.stringify({ "startDate": startDate, "endDate": endDate });
    this.http.get('http://localhost:8081/quarterMeetings/' + quarterDates, { headers: contentHeaders })
      .subscribe(
      response => {
        this.quarterDates = (response.json())[0].countData;
        this.meetingData = (response.json())[0].meetingData;
        if ( this.quarterDates.length != 0 ) {
          this.createQuarterMeetings();
         document.getElementById("quarterInfo").innerHTML = "  Meetings conducted in the quarter : "+this.quarterDisplayStart+" - "+this.quarterDisplayEnd;
         setTimeout(function() {
           document.getElementById("quarterInfo").innerHTML = ""; }, 7000);

        }
        else {
          document.getElementById("aheadOfTime").innerHTML = "No information is available for the selected quarter period";
          setTimeout(function() {
            document.getElementById("aheadOfTime").innerHTML = ""; }, 4000);
        }
      },
      error => {
        console.log(error.text());
      });
    }
    else {
      document.getElementById("aheadOfTime").innerHTML = "Don't get ahead of time*";
      setTimeout(function() {
        document.getElementById("aheadOfTime").innerHTML = ""; }, 4000);
    }
  }

  //To get meetings for the quarter
  createQuarterMeetings: () => void
  = function(): void {
    var self = this;
    var getMeetingData = function() {
      var displayMeetingData = [];
      for ( var val in self.meetingData ) {
        if ( self.meetingData[val].meetingType == self.selectedMeetingType) {
          displayMeetingData.push({meetingDate:self.meetingData[val].meetingDate, meetingTitle:self.meetingData[val].meetingTitle, meetingId:self.meetingData[val].meetingId});
        }
      }
      self.displayMeetingData = displayMeetingData;
    }

    // margin
    var margin = { top: 30, right: 20, bottom: 20, left: 20 },
      width = 700 - margin.right - margin.left,
      height = 400 - margin.top - margin.bottom,
      radius = (width - 400) / 2;

    // color range
    var color = d3.scaleOrdinal()
      .range(["#FFA07A","#BC8F8F", "#FAEBD7", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);

    // define the svg for pie chart
    var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("opacity",1)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // pie chart arc. Need to create arcs before generating pie
    var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    // arc for the labels position
    var labelArc = d3.arc()
      .outerRadius(radius - 50)
      .innerRadius(radius - 50);

    // generate pie chart
    var pie = d3.pie()
      .sort(null)
      .value(function(d) { return d.count; });

    // Getting the data from the backend
    var data = this.quarterDates;

    // "g element is a container used to group other SVG elements"
    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc")
      .on("mouseover", function (d) {
      d3.select("#tooltip")
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px")
        .style("opacity", 1)
        .style("z-index",100)
        .style("visibility",'visible')
        .select("#value")
        .text(d.value)
      })
    .on("mouseout", function () {
    // Hide the tooltip
    d3.select("#tooltip")
        .style("opacity", 0);
      })
    .on("mouseenter", function(d) {
        d3.select(this)
               .attr("stroke","white")
               .transition()
               .duration(1000)
               .attr("d", arc)
               .attr("stroke-width",6);
        })
    .on("mouseleave", function(d) {
      d3.select(this).transition()
       .attr("d", arc)
       .attr("stroke","none");
     })
     .on("click", function(d)  {
       self.selectedMeetingType = d.data.label;
       getMeetingData();
       jQuery('#infoModal').modal('show');
     });

    // append path
    g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.label); })
      // transition
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .attrTween("d", transformPie);

var legendRectSize = (radius * 0.15);
var legendSpacing = radius * 0.05;

var legend = svg.selectAll('.legend')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing;
        var offset =  height * color.domain().length / 2;
        var horz = 250 + (-3 * legendRectSize);
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', color)
    .style('stroke', color);

legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function(d) { return d; });


    // append text
    // g.append("text")
    //   .transition()
    //   .ease(d3.easeLinear)
    //   .duration(2000)
    //   .style("text-anchor","middle")
    //   .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
    //   .attr("dy", ".35em")
    //   .text(function(d) { return d.data.label; });

    // svg repositioning
    jQuery("svg").css({top: 300, left: 100, position:'absolute'});

    // Helper function for animation of pie chart and donut chart
    function transformPie(b) {
      b.innerRadius = 0;
      var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
      return function(t) { return arc(i(t)); };
    }
  }

  // To open create new meeting form
  edit: () => void
  = function(): void {
  jQuery('.modal-backdrop').remove();
  }

  removeSvg: () => void
  = function(): void {
  d3.select("svg").remove();
 //document.getElementById("quarterInfo").innerHTML = "Hello ";
  }

}
