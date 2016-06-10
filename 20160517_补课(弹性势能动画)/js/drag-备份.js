~function () {
    var oMark = document.getElementById("mark"), markW = oMark.offsetWidth, markH = oMark.offsetHeight;
    var winW = document.documentElement.clientWidth || document.body.clientWidth, winH = document.documentElement.clientHeight || document.body.clientHeight;

    function down(e) {
        this["strX"] = e.clientX;
        this["strY"] = e.clientY;
        this["strL"] = this.offsetLeft;//->ͨ��JS����ģ�����Ի�ȡ��Ԫ�ص���ʽֵ����һ������(����С�����Լ�������������)
        this["strT"] = this.offsetTop;
        if (this.setCapture) {
            this.setCapture();
            on(this, "mousemove", move);
            on(this, "mouseup", up);
        }else{
            this["MOVE"] = move.myBind(this);
            this["UP"] = up.myBind(this);
            on(document, "mousemove", this["MOVE"]);
            on(document, "mouseup", this["UP"]);
        }

        //->����ק��ʼ���������������еĶ���
        window.clearInterval(this.flyTimer);
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
    }

    on(oMark, "mousedown", down);


    //->ˮƽ
    function fly() {
        var _this = this, speedFly = _this["speedFly"];
        _this.flyTimer = window.setInterval(function () {
            //->�������˶�������,���ǻ���Ҫ�Ѷ���ʱ�������:��Ϊ����ÿһ�ζ�����offsetLeft��������,����֪��,����������޷���ȡС��ֵ��,����С��0.5��С���Լ�������,�����Ļ�������ǵ��ٶ�С��0.5,������һ�μ�������ٶ�ֵ,��һ���ڻ�ȡ��ǰλ�û��ǰ���һ�μӵ��Ǹ��ٶȸ�ʡ�Ե���
            if (Math.abs(speedFly) < 0.5) {
                window.clearInterval(_this.flyTimer);
                return;
            }

            //->Ϊ���ö���ֹͣ����,���ǻ���Ҫÿһ�θ��ٶȽ���˥��
            speedFly *= 0.98;

            //->ÿһ�ζ��ڵ�ǰ��λ�û����ϼ����ٶȼ���,������Ҫ�������ߵı߽��ж�,����߽�󷴵�
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


    /*--ʵ���������˶�:ˮƽ+��ֱ--*/
    //[ˮƽ]
    //->�ٶ�:����ק�ľ�����û�й�ϵ��,�Ϳ�ʼ����ק�ٶ�Ҳû�й�ϵ,ֻ������������ɿ�����һ˲�����ǵ���ק�ٶ��и�ϵ
    //->�����������һ���Լ�����С����Ӧʱ��,����:�����ƶ�һ�����ͻᴥ��һ��mousemove,���������ֻ�й�����С��Ӧʱ��Ż��֪����һ�ε��ƶ�
    //->�������һ�μ����ɿ����Ǹ��ٶ�===������������һ����С��Ӧʱ�����˶��ľ���
}();