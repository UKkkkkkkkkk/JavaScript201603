//->bind:ʵ��DOM2�¼���,�������е������
function bind(curEle, type, fn) {
    //->��׼�����
    if ("addEventListener" in document) {
        curEle.addEventListener(type, fn, false);
        return;
    }
    //->IE6~8
    curEle.attachEvent("on" + type, fn);
}

//->unbind:ʵ��DOM2�¼��Ƴ���,�������е������
function unbind(curEle, type, fn) {
    //->��׼�����
    if ("removeEventListener" in document) {
        curEle.removeEventListener(type, fn, false);
        return;
    }
    //->IE6~8
    curEle.detachEvent("on" + type, fn);
}