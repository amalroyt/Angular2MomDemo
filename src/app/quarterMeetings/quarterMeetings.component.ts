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
  constructor(private http: Http) {
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
        this.quarterDates = response.json();
        if ( this.quarterDates.length != 0 ) {
         this.createQuarterMeetings();
         document.getElementById("quarterInfo").innerHTML = "  Meetings conducted in the quarter : "+this.quarterDisplayStart+" - "+this.quarterDisplayEnd;
        }
        else {
          document.getElementById("aheadOfTime").innerHTML = "No information is available for the selected quarter period";
          setTimeout(function() {
            document.getElementById("aheadOfTime").innerHTML = ""; }, 5000);
        }
      },
      error => {
        console.log(error.text());
      });
    }
    else {
      document.getElementById("aheadOfTime").innerHTML = "Don't get ahead of time*";
      setTimeout(function() {
        document.getElementById("aheadOfTime").innerHTML = ""; }, 5000);
    }
  }

  //To get meetings for the quarter
  createQuarterMeetings: () => void
  = function(): void {

    // margin
    var margin = { top: 30, right: 20, bottom: 20, left: 20 },
      width = 300 - margin.right - margin.left,
      height = 300 - margin.top - margin.bottom,
      radius = width / 2;

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
        .text(d.value);
      })
    .on("mouseout", function () {
    // Hide the tooltip
    d3.select("#tooltip")
        .style("opacity", 0);
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

    // append text
    g.append("text")
      .transition()
      .ease(d3.easeLinear)
      .duration(2000)
      .style("text-anchor","middle")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.data.label; });

    // svg repositioning
    jQuery("svg").css({top: 350, left: 200, position:'absolute'});

    // Helper function for animation of pie chart and donut chart
    function transformPie(b) {
      b.innerRadius = 0;
      var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
      return function(t) { return arc(i(t)); };
    }
  }
}
