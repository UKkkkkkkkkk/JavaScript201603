//->myBind:����������Function��ԭ�ͣ�ʹ�ÿ�������˼�룬��չһ��������ʵ������bind�����ļ��ݴ����ﵽ��ǰԤ�ȴ�����THISָ������⣻
Function.prototype.myBind = function myBind(context) {
    var _this = this;
    var outerArg = [].slice.call(arguments, 1);
    //if ("bind" in Function.prototype) {
    //    return this.bind.apply(this, outerArg.unshift(context));
    //}
    return function () {
        var innerArg = [].slice.call(arguments, 0);
        _this.apply(context, outerArg.concat(innerArg));
    }
};

function bind(curEle, type, fn) {
    if ("addEventListener" in document) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    //->����Ԥ������ʵ�൱�ڸ��仯��ױ,Ϊ�˺�����Բ��ҵ�,������Ҫ��֮ǰ����Ƭ����
    var tempFn = fn.myBind(curEle);
    tempFn.photo = fn;

    //->����һ����ʱ������,����������ǻ�ױ��Ľ��
    !curEle["myBind" + type] ? curEle["myBind" + type] = [] : null;
    curEle["myBind" + type].push(tempFn);
    curEle.attachEvent("on" + type, tempFn);
}

function unbind(curEle, type, fn) {
    if ("removeEventListener" in document) {
        curEle.removeEventListener(type, fn, false);
        return;
    }
    var ary = curEle["myBind" + type];
    if (ary) {
        for (var i = 0, len = ary.length; i < len; i++) {
            var curFn = ary[i];
            if (curFn.photo === fn) {
                curEle.detachEvent("on" + type, curFn);
                ary.splice(i, 1);
                return;
            }
        }
    }
}