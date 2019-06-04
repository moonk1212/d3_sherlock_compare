(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports):
	//typeof는 변수의 데이터 타입을 반환하는 연산자
	//라이브러리에서 로딩하는 방법 https://blog.outsider.ne.kr/1170
	typeof define === 'function' && define.amd ? define(['exports'], factory) :

	(factory((global.d3 = global.d3 || {})));
}

(this, (function (exports) { 'use strict';//좀 더 엄격한 검사를 실행시킬때 "use strict";를 추가

//'use strict'는 오류를 적게 해주는것, exports 이 함수 안에서 사용
function constant(x) {//constant함수를 실행시 function()을 리턴
  return function() {//function 리턴시 x리턴
    return x;
  };
}

var ellipseForce = function (padding, innerRepulsion, outerRepulsion) {//ellipseForce는 3개의 parameters를 가지고 있음 padding,innerRepulsion,outerRepulsion
  var nodes;//node 변수 지정
/*
	padding은 타원형의 반지름에 추가된 보이지 않는 패딩으로 노드 사이에 공간을 추가하는 신뢰할 수 있는 방법
	innerRepeulsion는 노드가 서로 겹치는 경우 반발 강도를 계산하는 데 사용
	outerRepulsion는 겹치지 않는 다른 노드에 대한 반발의 기본 강도입니다.
*/

  if (typeof padding !== "function") padding = constant(padding == null ? 4 : +padding);//constant 값을 삼항연산자를 사용하여 paddig 값이 null이 True인 경우 4 False인 경우 +padding

  innerRepulsion = innerRepulsion == null ? 0.7 : +innerRepulsion;//innerRepulsion라는 변수에 innerRepulsion 값이 null이 true인 경우 0.7 False인 경우 +innerRepulsion
  outerRepulsion = outerRepulsion == null ? 0.7 : +outerRepulsion;//outerRepulsion라는 변수에 outerRepulsion 값이 null이 true인 경우 0.7 False인 경우 +outerRepulsion

/*padding !== "function"이 아닌 경우 */
  function force(alpha) {
    var i, j, n = nodes.length,
        // 노드의 면적
        node, my_padding, my_w, my_h, my_x, my_y,
        my_w2, my_h2, my_wh,
        // 다른 노드들의 면적
        other, other_padding, other_w, other_h, other_x, other_y,
        //노드들 사이의 거리
        dist_x, dist_y,
        // 구성요소들의 전반적인 결과
        force_ratio, dist, gap, repulsion, x_component, y_component,
        //타원형들의 점들
        g, g2, x1, y1, x2, y2, d1, d2,
        force_ratio1, force_ratio2,
        //매개변수
        myOuterRepulsion = outerRepulsion * 10;

    for (i = 0; i < n; ++i) {
      node = nodes[i];//sub_graph에 적힌 nodes 갯수만큼 node에 할당
      my_padding = +padding(node, i, nodes);//sub_graph에 적힌 nodes, 위에서 설정한 node값을 my_padding에 저장
      my_w = node.rx + my_padding;//노드의 가로폭을 결정
      my_h = node.ry + my_padding;//노드의 세로폭을 결정
      /*밑에거는 노드들이 잘 펴져 있도록 위치 설정하는것 안쓸경우 왼쪽 모서리에 뭉쳐있음*/
	  my_w2 = my_w * my_w;//my_w2에 노드의 가로폭* 가로폭만큼의 값 할당, 노드들의 가로폭이 화면의 중간에 가게끔 만들어줌
      my_h2 = my_h * my_h;//my_h2에 노드의 세로폭* 세로폭만큼의 값 할당노드들의 세로폭이 화면의 중간에 가게끔 만들어줌
      my_wh = my_w * my_h;
      my_x = node.x + node.vx; //vx stands for visualization components. my_x에 node.x+node.vx를 할당
      my_y = node.y + node.vy; //my_y에 node.vy를 할당
	  //이 다섯문장을 안쓰면 노드들이 퍼져있지 못함.

/*이 for문장을 안쓰면 노드들이 화면가운데에 그냥 뭉쳐있음*/
      for (j = 0; j < n; ++j) {
          if (j == i) {
              continue;
          }
          other = nodes[j];////sub_graph에 적힌 nodes 갯수만큼 other에 할당
          other_padding = +padding(other, j, nodes);//sub_graph에 적힌 nodes, 위에서 설정한 node값을 my_padding에 저장
          other_w = other.rx + other_padding;//노드의 가로폭 설정
          other_h = other.ry + other_padding;//노드의 세로폭 설정
          other_x = other.x + other.vx;//other_x에 other.x+other.vx
          other_y = other.y + other.vy;//other_y에 other.y+other.vy
          dist_x = my_x - other_x;//x좌표 설정
          dist_y = my_y - other_y;//y좌표 설정
          if (dist_x == 0 && dist_y == 0) {//x죄표, y좌표가 0인 경우
              node.vx += (10 * 4) - 2;//node.vx = node.vx+(10*4)-2
              node.vy += (10 * 4) - 2;//node.vy = node.vy+(10*4) -2
              continue;
          } else if (dist_x == 0) {//dist의 x좌표가 0인경우
              force_ratio = (my_h / my_w + other_h / other_w) / 2;//force_ratio는 이용할 수 있는 힘과 가한 힘과의 비율
              dist = Math.abs(dist_y);//dist에 dist_y 절댓값 반환
              gap = dist - my_h - other_h; // gap= dist - my_h - other_h
          } else if (dist_y == 0) {//dist_y 좌표가 0인경우
              force_ratio = 1;//force_ratio =1
              dist = abs(dist_x);// dist에 dist_x의 절대값
              gap = dist - my_w - other_w;//gap = dist - my_w - other_w
          }
		  else {//dist_x ,dist_y의 값이 0이 아닐때

              g = dist_y / dist_x; //g에 dist_y/ dist_x
			  			g2 = g * g; // g2 = g * g
              x1 = my_wh / Math.sqrt(my_h2 + g2 * my_w2);	//Math.sqrt() : 제곱근을 구해주는 함수
              y1 = g * x1;//y1=dist_y / dist_x*x1

              d1 = Math.sqrt(x1 * x1 + y1 * y1);

              force_ratio1 = d1 / my_w;//force_ratio는 d1 / my_w

              x2 = (other_w * other_h) / Math.sqrt(other_h * other_h + g2 * other_w * other_w);
              y2 = g * x2;
              d2 = Math.sqrt(x2 * x2 + y2 * y2);
              force_ratio2 = d2 / other_w;//force_ratio2 = d2 / other_w

              dist = Math.sqrt(dist_x * dist_x + dist_y * dist_y);
              gap = dist - d2 - d1;/*gap = dist -d2 -d1*/
              force_ratio = (force_ratio1 + force_ratio2) / 2;
          }
          x_component = dist_x / dist;// x_component값에 dist_x /dist
          y_component = dist_y / dist;// y_component값에 dist_y /dist
          if (gap < 0) {// gap 이 0보다 작을때
              repulsion = Math.min(Math.max(1.0, innerRepulsion * force_ratio * -gap), 5.0);// repulsion에 힐당(1.0 , innerRepulsion * force_ratio * -gap) 둘중 최대값 선택 이 값중 5.0과 비교후 최소값
              node.vx += repulsion * x_component;//node.vx = node.vx + ( repulsion * x_component)
              node.vy += repulsion * y_component;//node.vy = node.vy + ( repulsion * y_component)
          }
		  else {
              repulsion = Math.min(20.0, (force_ratio * myOuterRepulsion * alpha) / gap);//(20.0, (force_ratio * myOuterRepulsion * alpha) / gap) 둘중에 최소값 선택
              node.vx += repulsion * x_component; //node.vx =node.vx + repulsion* x_component
              node.vy += repulsion * y_component;//node.vy =node.vy + repulsion* y_component
          }
      }
    }
  }


  force.initialize = function(my_nodes) {//force 초기화 시키기
    nodes = my_nodes;//nodes에 my_nodes할당
  };

  force.outerRepulsion = function(my_outerRepulsion) {//겹치지 않는 다른 노드에 대한 반발의 기본 강도
    if (arguments.length) {//arguments의 길이가 있을때
      outerRepulsion = +my_outerRepulsion;
      return force;
    } else {
      return outerRepulsion;
    }
  };


  force.innerRepulsion = function(my_innerRepulsion) {// 노드가 서로 겹치는 경우 반발 강도를 계산하는 데 사용
    if (arguments.length) {
      innerRepulsion = +my_innerRepulsion;
      return force;
    } else {
      return innerRepulsion;
    }
  };

    //padding은 현재의 동적인 노드가 크기를 만등어냄
  force.padding = function(my_padding) {// 현재 padding의 구체화된 사이즈가 있을 때
    if (arguments.length) {
      if (typeof my_padding  === "function") {
        padding = my_padding;
      } else {
        padding = constant(+my_padding);
      }
      return force;
    } else {
      return padding;
    }
  };


  return force;
};


exports.ellipseForce = ellipseForce;

Object.defineProperty(exports, '__esModule', { value: true });

})));

















//html에서 생성한 svg를 선택
//width와 height 설정
var svg = d3.select("#ellipse"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

//schemeCategory20 : D3에서 지정한 컬러 값 집합 중 하나
//D3 문서페이지 맨 마지막에 있음
var color = d3.scaleOrdinal(d3.schemeCategory20);

//노드들의 반지름 값 설정
var nd;
for (var i=0; i<graph.nodes.length; i++) {
  nd = graph.nodes[i];
  nd.rx = nd.id.length * 7;
  nd.ry = nd.id.length* 7;
}

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("collide", d3.ellipseForce(6, 0.5, 5)) //ellipseForce의 parameters : padding, innerRepulsion, outerRepulsion
    .force("center", d3.forceCenter(width/2 , height/2)); //svg의 중앙에 위치하도록 설정

var link = svg.append("g")
  .attr("class", "link") //html에서 설정한 class 'link' 속성 부여
  .selectAll("line")
  .data(graph.links) //graph.js에 있는 데이터
  .enter().append("line")
  .attr("stroke-width", function(d) { return Math.sqrt(d.value); }); //선의 굵기 결정

var node = svg.append("g")
  .attr("class", "node") //html에서 설정한 class 'link' 속성 부여
  .selectAll("ellipse")
  .data(graph.nodes) //graph.js에 있는 데이터
  .enter().append("ellipse")
  .attr("rx", function(d) { return d.rx; }) //원(노드)의 x축 반지름 결정
  .attr("ry", function(d) { return d.ry; }) //원(노드)의 y축 반지름 결정
  .attr("fill", function(d) { return color(d.group); }) //원(노드)의 색상 결정
  .call(d3.drag() //드래그할 때의 설정
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

//노드 안에 있는 텍스트 설정
var text = svg.append("g")
  .attr("class", "labels")
  .selectAll("text")
  .data(graph.nodes)
  .enter().append("text")
  .attr("dy", 2)
  .attr("text-anchor", "middle")
  .text(function(d) {return d.id})
  .attr("fill", "white");


simulation
  .nodes(graph.nodes)
  .on("tick", ticked); // 노드를 클릭하고 있을 때의 속성

simulation.force("link")
	.links(graph.links);

function ticked() {
	//x1,y1부터 x2,y2까지 연결
  link
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

	//노드의 중심(위치) 설정
  node
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });

	//텍스트의 중심(위치) 설정
  text
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; });

}


//drag 시 드래그된 노드의 데이터가 전달된다
//fx,fy에 포인터 위치를 전달하면 강제로 노드의 위치가 변경된다
//drag가 시작될때 alphaTarget을 0보다 크게 설정하면 alpha가 alphaMin보다 작아질 수 없어서 계속 운동한다.
function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart(); // 운동이 정지하지 않음
  d.fx = d.x; //d.fx 값을 d.x 값으로 초기 세팅
  d.fy = d.y; //d.fy 값을 d.y 값으로 초기 세팅
}

function dragged(d) {
  d.fx = d3.event.x; // 마우스 포인터 위치로 fx를 이동
  d.fy = d3.event.y; // 마우스 포인터 위치로 fy를 이동
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0); //드래그 끝나면 target을 다시 0으로 설정
  d.fx = null; // fx를 없앰
  d.fy = null; // fy를 없앰
}
