var _steps = [];
var _tableWidth = 15;
var _player = 'b';
var _last = [];

_init();

//初始化棋盘
function _init() {
	var _html = "";
	for(var i =0; i<_tableWidth; i++) {
		for(var j =0; j<_tableWidth; j++) {
			_html += "<i data-value='0"+(j+1)+"0"+(i+1)+"' onClick='tick(this,"+(j+1)+","+(i+1)+");'></i>";
			if (j == _tableWidth-1) {
				_html += "<br />";
			}
		}
	}

	$('.chess').html(_html);
}

function tick(obj,x,y) {
	$(obj).addClass(_player);

  //记录下棋信息
	_steps[_cover(x)+_cover(y)] = _player;
  //下棋顺序
	_last.push(_cover(x)+_cover(y));

	if (check(x, y)) {
		alert('win');
	}

	_player = _player == 'r' ? 'b' : 'r';;
}

function check(x, y) {
	var count;
  //当前下棋坐标
	var curStep = _steps[_cover(x)+_cover(y)];

	//横向
  count = 0;
  //判断x轴起点, 小于6取1
	var _x = (x - 5 > 0) ? (x-5) : 1; 

	for(var i=0; i<10; i++) {
		if (curStep == _steps[_cover(_x+i)+_cover(y)]) {
			count += 1;
		} else {
			count = 0;
		}
		if (count == 5) {
			return true;
		}
	}

	//纵向
	count = 0;
  //同上
	var _y = (y - 5 > 0) ? (y-5) : 1; 

	for(var i=0; i<10; i++) {
		if (curStep == _steps[_cover(x)+_cover(_y+i)]) {
			count += 1;
		} else {
			count = 0;
		}

		if (count == 5) {
			return true;
		}
	}

	// '\'向
	count = 0;
  //不考虑超出棋盘范围
  //且_cover传入负数返回也是'0-x'形式键值
	_x = x - 5;
  _y = y - 5;

  for (var i=0; i<10; i++) {
		if (curStep == _steps[this._cover(_x)+this._cover(_y)])
			count++;
		else
			count = 0;
		_y++;
		_x++;

		if (count == 5){
			return true;
		}
	}

  // '/'向
  count = 0;

  _x = x + 5;
  _y = y - 5;

  for (var i=0; i< 10; i++) {
  	if (curStep == _steps[this._cover(_x)+this._cover(_y)])
  		count++;
  	else
  		count = 0;
  	_y++;
  	_x--;

  	if (count == 5){
  		return true;
  	}
  }
}

//悔棋
function _undo() {
	_player = _player == 'b' ? 'r' : 'b';
	_last_key = _last.pop();
	_steps[_last_key] = 'undefined';
	$('i[data-value="'+_last_key+'"]').removeClass(_player);
}

function _cover(num) {
	return '0'+num+'';
}
