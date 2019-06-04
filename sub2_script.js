var w = 500,
	h = 500;


//표 타이틀
var LegendOptions = ['로버트 다우니(영화주인공)','베네딕트 컴버배치(드라마주인공)'];

//데이터
var d = [
		  [
			{axis:"키",value:0.34},
			{axis:"근육량",value:0.56},
			{axis:"잘생김",value:0.42},
			{axis:"소시오패스기질",value:0.2},
			{axis:"장난끼",value:0.4},
			{axis:"유쾌함",value:0.6},
			{axis:"사교성",value:0.2}

		  ],[
			{axis:"키",value:0.5},
			{axis:"근육량",value:0.28},
			{axis:"잘생김",value:0.2},
			{axis:"소시오패스기질",value:0.7},
			{axis:"장난끼",value:0.1},
			{axis:"유쾌함",value:0.2},
			{axis:"사교성",value:0.2}
		  ]
		];

//radarChart를 위한 설정값주기
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 300
}

//Radar chart를 그리기 위한 함수설정
RadarChart.draw("#chart", d, mycfg);


var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+500)
	.attr("height", h)

//legend 타이틀 만들기
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)')
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("셜록 주인공 영화 vs 드라마");

//레젼드 글자 만들기
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)')
	;
	//squares 색깔 정하기
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)/*
	  .style("fill", "#54ccce")*/
		.style("fill", function(d,i){
			if(i==0){
				return "#ff7761"
			}
			else{
				return "#f9a11b"
			}
		})
	  ;
	//squares 글자 만들기
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;
