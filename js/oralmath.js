const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const boardWidth = canvas.width;
const boardHeight = canvas.height;

//////////////////////
//程序入口
////////////////////
function Start(){

}

function WriteTextsH(arr1, x, y, hei, scale) {
    let tbWid = 0;
    let x2 = x;
    for (let i = 0; i < arr1.length; ++i) {
        x2 = x2 + tbWid;
        WriteText(arr1[i], x2, y, hei, scale);
        //计算宽度
        tbWid = arr1[i].length * hei * 0.8;
    }
}

//绘制题目
function WriteText(str1, x, y, hei, scale) {
    scale = scale || 60;
    let fontHei = hei * scale + "px";
    ctx.font = "normal " + fontHei + " Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText(str1, x * scale, y * scale);
}

function CreateA4(category){
    ctx.clearRect(0,0,boardWidth,boardHeight);
    //1.title
    WriteText("口  算", 9.0, 1.5, 1.0);
    //2.sub-title
    WriteTextsH(["班级________", "姓名________", "用时________", "得分________"], 2.5, 3.0, 0.5);
    //3.subjects
    if(category == 1){
        //100以内
        for (let i = 0; i < 25; i++) {
            WriteTextsH([Formula(0,0,10,100), Formula(0,0,10,100), Formula(0,0,10,100), Formula(0,0,10,100)], 1.5, 4.5 + i * 0.95, 0.5);
        }
    }else if(category == 2){
        //一(100内两位数)
        for (let i = 0; i < 25; i++) {
            WriteTextsH([Formula(10,10,100,100), Formula(10,10,100,100), Formula(10,10,100,100), Formula(10,10,100,100)], 1.5, 4.5 + i * 0.95, 0.5);
        }
    }
    
    DownLoad();
}
//公式生成器
function Formula(hardMin,hardMin2,hardMax,hardMax2,modeMin,modeMax) {
    let str1 = "";
    modeMin = modeMin || 1;
    modeMax = modeMax || 2;

    //做法 + - x /
    quest_mode1 = RandomInt(modeMin, modeMax);
    if (quest_mode1 == 1) {
        str1 = FormulaAdd(hardMin,hardMin2,hardMax,hardMax2);
    } else if (quest_mode1 == 2) {
        str1 = FormulaMinus(hardMin,hardMin2,hardMax,hardMax2);
    }
 
    //空格补齐
    str1 = MergeBlank(str1);
    return str1;
}

//加法
function FormulaAdd(hardMin,hardMin2,hardMax, hardMax2) {
    hardMin = hardMin || 0;
    hardMin2 = hardMin2 || 0;
    hardMax = hardMax || 100;
    hardMax2 = hardMax2 || hardMax;
    arg1 = RandomInt(hardMin, hardMax);
    arg2 = RandomInt(hardMin2, hardMax2);

    return arg1 + "  +  " + arg2 + " ="
}

//减法
function FormulaMinus(hardMin,hardMin2,hardMax, hardMax2) {
    hardMin = hardMin || 0;
    hardMin2 = hardMin2 || 0;
    hardMax = hardMax || 100;
    hardMax2 = hardMax2 || hardMax;
    arg1 = RandomInt(hardMin, hardMax);
    arg2 = RandomInt(hardMin2, hardMax2);

    if (arg2 > arg1) {
        [arg1, arg2] = [arg2, arg1];
    }

    return arg1 + "  -  " + arg2 + " ="
}

//把输入和空白的进行组合
function MergeBlank(inputStr, strLen) {
    strLen = strLen || inputStr.length;
    if (strLen < 11) {
        strLen = 11;
    }
    let str2 = "";
    for (let i = 0, len = strLen; i < len; i++) {
        if (i < inputStr.length) {
            str2 = str2 + inputStr.charAt(i);
        } else {
            str2 = str2 + " ";
        }
    }

    return str2;
}

//生成随机值
function RandomInt(min, max) {
    var span = max - min + 1;
    var result = Math.floor(Math.random() * span + min);
    return result;
}

//下载
function DownLoad() {
    //确定图片的类型  获取到的图片格式 data:image/Png;base64,......
    let type = 'jpeg';
    let imgdata = canvas.toDataURL(type, 1.0);
    //将mime-type改为image/octet-stream,强制让浏览器下载
    let fixtype = function (type) {
        type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
        let r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    };
    imgdata = imgdata.replace(fixtype(type), 'image/octet-stream');
    //将图片保存到本地
    let savaFile = function (data, filename) {
        let save_link = document.createElement('a');
        save_link.href = data;
        save_link.download = filename;
        let event = new MouseEvent('click');
        save_link.dispatchEvent(event);
    };

    let filename = '' + new Date().format('yyyy-MM-dd_hhmmss') + '.' + type;
    //用当前秒解决重名问题
    savaFile(imgdata, filename);
}

Date.prototype.format = function (format) {
    let o = {
        "y": "" + this.getFullYear(),
        "M": "" + (this.getMonth() + 1),  //month
        "d": "" + this.getDate(),         //day
        "h": "" + this.getHours(),        //hour
        "m": "" + this.getMinutes(),      //minute
        "s": "" + this.getSeconds(),      //second
        "S": "" + this.getMilliseconds(), //millisecond
    }
    return Object.keys(o).reduce((pre, k) => (new RegExp("(" + k + "+)").test(pre)) ? (pre.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : o[k].padStart(2, "0"))) : pre, format);
}
