var graph = {
  "nodes": [
    {"id": "셜록", "group": 1},
    {"id": "존왓슨", "group": 2},
	  {"id": "마이크스탬포드", "group": 2},
    {"id": "메리", "group": 2},
    {"id": "사라소이어", "group": 2},
    {"id": "제임스숄처소령", "group": 2},
    {"id": "조나단스몰", "group": 2},
    {"id": "딤목경감", "group": 3},
    {"id": "레스트레이드경감", "group": 3},
    {"id": "제임스모리어티", "group": 4},
    {"id": "세바스찬윌키스", "group": 5},
    {"id": "아만다", "group": 5},
  	{"id": "마이크로프트", "group": 6},
    {"id": "홈즈부부", "group": 6},
    {"id": "안시아", "group": 6},
    {"id": "제닌", "group": 7}

  ],
  "links": [
    {"source": "셜록", "target": "존왓슨", "value": 1},
    {"source": "존왓슨", "target": "메리", "value": 2},
    {"source": "존왓슨", "target": "사라소이어", "value": 2},
    {"source": "존왓슨", "target": "제임스숄처소령", "value": 2},
	  {"source": "제임스숄처소령", "target": "조나단스몰", "value": 2},
    {"source": "존왓슨", "target": "마이크스탬포드", "value": 2},
    {"source": "마이크스탬포드", "target": "셜록", "value": 2},
  	{"source": "셜록", "target": "제임스모리어티", "value": 3},
  	{"source": "셜록", "target": "세바스찬윌키스", "value": 4},
  	{"source": "세바스찬윌키스", "target": "아만다", "value": 4},
  	{"source": "셜록", "target": "제닌", "value": 5},
  	{"source": "셜록", "target": "안시아", "value": 6},
  	{"source": "셜록", "target": "마이크로프트", "value": 6},
  	{"source": "안시아", "target": "마이크로프트", "value": 6},
  	{"source": "마이크로프트", "target": "홈즈부부", "value": 7},
  	{"source": "셜록", "target": "레스트레이드경감", "value": 8},
  	{"source": "레스트레이드경감", "target": "딤목경감", "value": 8},
  ]
}
