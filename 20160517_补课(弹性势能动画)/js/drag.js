~function () {
    var oMark = document.getElementById("mark"), markW = oMark.offsetWidth, markH = oMark.offsetHeight;
    var winW = document.documentElement.clientWidth || document.body.clientWidth, winH = document.documentElement.clientHeight || document.body.clientHeight;

    function down(e) {
        this["strX"] = e.clientX;
        this["strY"] = e.clientY;
        this["strL"] = this.offsetLeft;
        this["strT"] = this.offsetTop;
        if (this.setCapture) {
            this.setCapture();
            on(this, "mousemove", move);
            on(this, "mouseup", up);
        } else {
            this["MOVE"] = move.myBind(this);
            this["UP"] = up.myBind(this);
            on(document, "mousemove", this["MOVE"]);
            on(document, "mouseup", this["UP"]);
        }

        //->����ק��ʼ���������������еĶ���
        window.clearInterval(this.flyTimer);
        window.clearInterval(this.dropTimer);
    }

    function move(e) {
        var curL = e.clientX - this["strX"] + parseFloat(this["strL"]);
        var curT = e.clientY - this["strY"] + parseFloat(this["strT"]);
        var minL = 0, minT = 0, maxL = winW - markW, maxT = winH - markH;
        curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
        curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
        this.style.left = curL + "px";
        this.style.top = curT + "px";

        //->����ˮƽ�����˶����ٶ�
        if (!this["prevFly"]) {
            this["prevFly"] = this.offsetLeft;
        } else {
            this["speedFly"] = this.offsetLeft - this["prevFly"];
            this["prevFly"] = this.offsetLeft;
        }
    }

    function up(e) {
        if (this.releaseCapture) {
            this.releaseCapture();
            off(this, "mousemove", move);
            off(this, "mouseup", up);
        } else {
            off(document, "mousemove", this["MOVE"]);
            off(document, "mouseup", this["UP"]);
        }

        //->ˮƽ������˶�
        fly.call(this);

        //->��ֱ������˶�
        drop.call(this);
    }

    on(oMark, "mousedown", down);

    //->ˮƽ
    function fly() {
        var _this = this, speedFly = _this["speedFly"];
        _this.flyTimer = window.setInterval(function () {
            if (Math.abs(speedFly) < 0.5) {
                window.clearInterval(_this.flyTimer);
                return;
            }
            speedFly *= 0.98;
            var curL = _this.offsetLeft + speedFly;
            if (curL >= (winW - markW)) {
                speedFly *= -1;
                _this.style.left = winW - markW + "px";
            } else if (curL <= 0) {
                speedFly *= -1;
                _this.style.left = "0px";
            } else {
                _this.style.left = curL + "px";
            }
        }, 10);
    }

    //->��ֱ
    function drop() {
        var _this = this, speedDrop = 9.8;
        _this["dropFlag"] = 0;
        _this.dropTimer = window.setInterval(function () {
            //->����ױ߶�������ԭ���Ļ�����+1,����һ��������ߵ������Ƕ��ع鵽��,���������ױ߲��ڵ���,���ֵ��һֱ���ۼ���ȥ
            if (_this["dropFlag"] > 1) {
                window.clearInterval(_this.dropTimer);
                return;
            }

            speedDrop *= 0.98;//->ÿһ�ζ����ٶ�˥��һ��
            speedDrop += 10;//->Ϊ����������ٶ��ڼӿ�

            var curT = _this.offsetTop + speedDrop;
            if (curT >= (winH - markH)) {
                speedDrop *= -1;
                _this.style.top = winH - markH + "px";
                _this["dropFlag"]++;
            } else {
                _this.style.top = curT + "px";
                _this["dropFlag"] = 0;
            }
        }, 10);
    }
}();