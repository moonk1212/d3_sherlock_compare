var svgW = 400;
var svgH = 250;
var barPadding = 1;

var data_d = [50, 10, 30, 10, 15, 20];
var data_standard = ["키", "사교성", "신체능력", "감정의 폭", "유쾌함", "잘생김"];
var data_m = [45, 10, 50, 35, 40, 50];

var barWidth = 20;
var barMargin = 25;



var drama = d3.select("body")
  .append("div")
  .attr("class", "container")
  .append("svg")
  .attr("width", svgW)
  .attr("height", svgH);

drama.selectAll("rect")
  .data(data_d)
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
    return i * (svgW / data_d.length)
  })
  .attr("y", function(d) {
    return svgH - (d * 4);
  })
  .attr("width", svgW / data_d.length - barPadding)
  //SVG의 폭 : svgW
  //데이터 집합의 개수 : data_d.length
  .attr("height",function(d) {
    return d * 4;
  })
  .attr("fill", function(d) {
    return "#f9a11b";
  })
  .on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#ffffff");//마우스오버 시 색상

  })
  .on("mouseout", function(d, i) {
    d3.select(this).attr("fill", function() {
      return "#f9a11b";
    });
  });
//bar의 색상

/*

funtion handleMouseOut(d,i){

  d3.select(this).attr({
    fill:"orange"
  });
}
*/
function handleMouseOver(d, i) {  // Add interactivity

            // Use D3 to select element, change color and size

            d3.select(this)
              .attr("fill", function(d) {
              return "#f9a11b";
            });

          }














drama.selectAll("text")
  .data(data_d)
  .enter()
  .append("text")
  .text(function(d) {
    return d;
  })
  .attr("text-anchor", "middle")
  .attr("x", function(d, i) {
    return i * (svgW / data_d.length) + (svgW / data_d.length - barPadding) / 2;
  })
  .attr("y", function(d) {
    return svgH - (d * 4) + 14;
  })
  .attr("font-size", "11px")
  .attr("fill", "white");







var standard = d3.select("body")
  .append("div")
  .attr("class", "container_text")
  .append("svg")
  .attr("width", svgW)
  .attr("height", svgH / 7);

standard.selectAll("text")
  .data(data_standard)
  .enter()
  .append("text")
  .text(function(d) {
    return d;
  })
  .attr("text-anchor", "middle")
  .attr("x", function(d, i) {
    return i * (svgW / data_d.length) + (svgW / data_d.length - barPadding) / 2;
  })
  .attr("y", function(d) {
    return 30;
  })
  .attr("fill", "black");






var movie = d3.select("body")
  .append("div")
  .attr("class", "container")
  .append("svg")
  .attr("width", svgW)
  .attr("height", svgH);

movie.selectAll("rect")
  .data(data_m)
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
    return i * (svgW / data_m.length)
  })
  .attr("width", svgW / data_m.length - barPadding)
  //SVG의 폭 : svgW
  //데이터 집합의 개수 : data_m.length
  .attr("height", function(d) {
    return d * 4;
  })
  .attr("fill", function(d) {
    return "#ff7761";
  })
  .on("mouseover", function() {
    d3.select(this)
      .attr("fill", "#ffffff");//마우스오버 시 색상

  })
  .on("mouseout", function(d, i) {
    d3.select(this).attr("fill", function() {
      return "#ff7761";
    });
  });
//bar의 색싱


movie.selectAll("text")
  .data(data_m)
  .enter()
  .append("text")
  .text(function(d) {
    return d;
  })
  .attr("text-anchor", "middle")
  .attr("x", function(d, i) {
    return i * (svgW / data_m.length) + (svgW / data_m.length - barPadding) / 2;
  })
  .attr("y", function(d) {
    return (d * 4) - 14;
  })
  .attr("font-size", "11px")
  .attr("fill", "white");
