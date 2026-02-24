const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const boardWidth = canvas.width;
const boardHeight = canvas.height;

//////////////////////
//程序入口
////////////////////
function Start(){

}

//成行显示
function WriteTextsH(arr1, x, y, hei, scale) {
    let tbWid = 0;
    let x2 = x;
    for (let i = 0; i < arr1.length; ++i) {
        x2 = x2 + tbWid;
        if(arr1[i].includes("//")){
            DrawFraction(arr1[i], x2, y, hei, scale);
        }else{
            WriteText(arr1[i], x2, y, hei, scale);
        }
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

//绘制分数
function DrawFraction(str1, x, y, hei, scale){
    scale = scale || 60;
    let fontHei = hei * scale + "px";
    ctx.font = "normal " + fontHei + " Arial";
    ctx.fillStyle = "#000000";
    //变成三行 支持负数的正则（如 -5//8、3//-9.2）
    const regWithNegative = /(-?\d+(?:\.\d+)?)\s*\/\/\s*(-?\d+(?:\.\d+)?)/;
    const match1 = str1.match(regWithNegative);
    if (match1) {
        let idx = str1.indexOf(match1[0]);
        let strLen1 = Math.max(match1[1].length, match1[2].length);
        let prefix = str1.slice(0, idx);
        prefix = prefix.replace(/@/g, ' ');
        ctx.fillText(" ".repeat(idx+strLen1+3)+match1[1], x * scale, y * scale - hei * scale);
        ctx.fillText(prefix + "一".repeat(strLen1) + " = ", x * scale, y * scale);
        ctx.fillText(" ".repeat(idx+strLen1+3)+match1[2], x * scale, y * scale + hei * scale);
    }
    
}

const rowTotal = 25;
//计算的范围
var hardMin,hardMin2,hardMax,hardMax2;
//公式的类型
var formulaMode1,formulaMode2;
var grade = 1;
var m_bitNumber = 1;
var m_blankNumber = 11;
var m_columnNumber = 4;
//跳转
function GoToUrl(category){
    if(category == 1){
        location.href = "https://24point.triweb.cn/index.html";
    }else if(category == 2){
        location.href = "https://matha4v.triweb.cn/index.html";
    }else if(category == 3){
        location.href = "https://matchstick.triweb.cn/index.html";
    }
}

function CreateA4(category){
    var toastDlg = new Toast({
        text:"生成中"
    });
    toastDlg.Show();
    //ctx.clearRect(0,0,boardWidth,boardHeight);
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,boardWidth,boardHeight);
    formulaMode1 = 1;
    formulaMode2 = 2;
    //1.title
    WriteText("口  算", 9.0, 1.5, 1.0);
    //2.sub-title
    WriteTextsH(["班级________", "姓名________", "用时________", "得分________"], 2.5, 3.5, 0.5);
    m_blankNumber = 11;
    m_columnNumber = 4;
    m_bitNumber = 1;
    //3.subjects
    if(category == 1){
        //100以内
        [hardMin,hardMin2,hardMax,hardMax2] = [0,0,100,10];
        DrawFormula(Formula,rowTotal);
    }else if(category == 2){
        //一(100内两位数)
        [hardMin,hardMin2,hardMax,hardMax2] = [10,10,100,100];
        DrawFormula(Formula,rowTotal);
    }else if(category == 3){
        //一(100内进退位)
        [hardMin,hardMin2,hardMax,hardMax2] = [1,1,99,99];
        DrawFormula(Formula2,rowTotal);
    }else if(category == 4){
        //一(100内填空)
        [hardMin,hardMin2,hardMax,hardMax2] = [0,0,100,10];
        DrawFormula(Formula3,rowTotal);
    }else if(category == 5){
        grade = 2;
        //二年级(表内乘法)
        [hardMin,hardMin2,hardMax,hardMax2] = [1,1,9,9];
        formulaMode1 = formulaMode2 = 3;
        DrawFormula(Formula,rowTotal);
    }else if(category == 6){
        grade = 2;
        //二年级(100内加减乘)
        [hardMin,hardMin2,hardMax,hardMax2] = [1,1,100,100];
        formulaMode1 = 1;
        formulaMode2 = 3;
        DrawFormula(Formula,rowTotal);
    }else if(category == 9){
        grade = 2;
        //二年级(千内加减)
        [hardMin,hardMin2,hardMax,hardMax2] = [1,1,99,99];
        formulaMode1 = 1;
        formulaMode2 = 2;
        m_bitNumber = 100;
        m_columnNumber = 3;
        DrawFormula(Formula,rowTotal);
    }else if(category == 7){
        grade = 3;
        //三年级(两位乘整十)
        [hardMin,hardMin2,hardMax,hardMax2] = [10,1,100,9];
        formulaMode1 = 3;
        formulaMode2 = 3;
        DrawFormula(Formula3,rowTotal);
    }else if(category == 8){
        grade = 3;
        //三年级(两位乘一位)
        [hardMin,hardMin2,hardMax,hardMax2] = [10,1,100,9];
        formulaMode1 = 3;
        formulaMode2 = 3;
        DrawFormula(Formula,rowTotal);
    }else if(category == 10){
        grade = 3;
        //三年级(混合)
        [hardMin,hardMin2,hardMax,hardMax2] = [10,1,999,100];
        formulaMode1 = 1;
        formulaMode2 = 3;
        DrawFormula(Formula,rowTotal);
    }else if(category == 11){
        grade = 3;
        //三年级(一位除数)
        [hardMin,hardMin2,hardMax,hardMax2] = [100,2,999,10];
        formulaMode1 = 4;
        formulaMode2 = 4;
        DrawFormula(Formula,rowTotal);
    }else if(category == 12){
        grade = 5;
        //五年级(分数)
        [hardMin,hardMin2,hardMax,hardMax2] = [10,2,99,10];
        formulaMode1 = 4;
        formulaMode2 = 4;
        DrawFormula(FractionFormula,11, 5.0, 2.2);
    }
    
    //DownLoad();
    //二维码
    DrawImage('./qr.png',()=>{
        toastDlg.Close();
        ShowImageDlg();
    });
}

function DrawFormula(cb, num, startY,hei){
    startY = startY || 5.0;
    hei = hei || 0.95;
    let rowY = startY;
    let col  = m_columnNumber;
    if (typeof cb == "function") {
        for (let i = 0; i < num; i++) {
            rowY = startY + i * hei;
            if(col == 4){
                WriteTextsH([cb(i, col), cb(i, col), cb(i, col), cb(i, col)], 1.5, rowY, 0.5);
            }else if(col == 3){
                WriteTextsH([cb(i, col), cb(i, col), cb(i, col)], 1.5, rowY, 0.5);
            }
            
        }
    }
    return rowY;
}

//公式生成器
function Formula() {
    let str1 = "";
    //做法 + - x /
    quest_mode1 = RandomInt(formulaMode1, formulaMode2);
    if (quest_mode1 == 1) {
        str1 = FormulaAdd();
    } else if (quest_mode1 == 2) {
        str1 = FormulaMinus();
    } else if (quest_mode1 == 3) {
        if(grade <= 2){
            str1 = FormulaCross2();  //基本乘法表
        }else if(grade == 3){
            str1 = FormulaCross4();  //1位到2位的乘法
        }else{
            str1 = FormulaCross();
        }
    } else if (quest_mode1 == 4){
        str1 = FormulaDivid2();
    }
    //空格补齐
    str1 = MergeBlank(str1);
    return str1;
}

function Formula2() {
    let str1 = "";
    //做法 + - x /
    quest_mode1 = RandomInt(formulaMode1, formulaMode2);
    if (quest_mode1 == 1) {
        str1 = FormulaAdd2();
    } else if (quest_mode1 == 2) {
        str1 = FormulaMinus2();
    }
    //空格补齐
    str1 = MergeBlank(str1);
    return str1;
}

function Formula3() {
    let str1 = "";
    //做法 + - x /
    quest_mode1 = RandomInt(formulaMode1, formulaMode2);
    if (quest_mode1 == 1) {
        str1 = FormulaAdd3();
    } else if (quest_mode1 == 2) {
        str1 = FormulaMinus3();
    }else if (quest_mode1 == 3) {
        str1 = FormulaCross3();
    }
    //空格补齐
    str1 = MergeBlank(str1);
    return str1;
}


//加法
function FormulaAdd() {
    arg1 = RandomInt(hardMin, hardMax);
    arg2 = RandomInt(hardMin2, hardMax2);
    return arg1*m_bitNumber + "  +  " + arg2*m_bitNumber + " =";
}

//进位
function FormulaAdd2() {
    let str1 = "";
    for(let i=0;i<1000;i++){
        arg1 = RandomInt(hardMin, hardMax);
        arg2 = RandomInt(hardMin2, hardMax2);
        str1 = arg1 + "  +  " + arg2 + " =";
        //判断是否满足进位条件
        let t1 = arg1 % 10;
        let t2 = arg1 % 10;
        if((t1 + t2) >= 10){
            break;
        }
    }
    
    return str1;
}

//空格
function FormulaAdd3() {
    arg1 = RandomInt(hardMin, hardMax);
    arg2 = RandomInt(hardMin2, hardMax2);
    let md = RandomInt(0, 1);
    let res = arg1 + arg2;
    if(md == 0){
        return "(   )" + "+" + arg2 + "=" +res;
    }else{
        return arg1 + "+" + "(   )" + "="+res;
    }
}

//减法
function FormulaMinus() {
    arg1 = RandomInt(hardMin, hardMax)*m_bitNumber;
    arg2 = RandomInt(hardMin2, hardMax2)*m_bitNumber;
    if (arg2 > arg1) {
        [arg1, arg2] = [arg2, arg1];
    }
    return arg1 + "  -  " + arg2 + " ="
}

//退位
function FormulaMinus2() {
    let str1 = "";
    for(let i=0;i<1000;i++){
        arg1 = RandomInt(hardMin, hardMax);
        arg2 = RandomInt(hardMin2, hardMax2);
        if (arg2 > arg1) {
            [arg1, arg2] = [arg2, arg1];
        }
        str1 = arg1 + "  -  " + arg2 + " =";
        //判断是否满足进位条件
        let t1 = arg1 % 10;
        let t2 = arg1 % 10;
        if((t1 - t2) < 0){
            break;
        }
    }
    
    return str1;
}

//空格
function FormulaMinus3() {
    arg1 = RandomInt(hardMin, hardMax);
    arg2 = RandomInt(hardMin2, hardMax2);
    if (arg2 > arg1) {
        [arg1, arg2] = [arg2, arg1];
    }
    let md = RandomInt(0, 1);
    let res = arg1 - arg2;
    if(md == 0){
        return "(   )" + "-" + arg2 + "=" +res;
    }else{
        return arg1 + "-" + "(   )" + "="+res;
    }
}

//乘法
function FormulaCross() {
    arg1 = RandomInt(hardMin, hardMax);
    arg2 = RandomInt(hardMin2, hardMax2);
    return arg1 + "  X  " + arg2 + " =";
}

//基本乘法表
function FormulaCross2() {
    arg1 = RandomInt(1, 9);
    arg2 = RandomInt(1, 9);
    return arg1 + "  X  " + arg2 + " =";
}

//乘整十
function FormulaCross3() {
    arg1 = RandomInt(hardMin, hardMax);
    arg2 = RandomInt(hardMin2, hardMax2);
    arg2 = arg2 * 10;
    let md = RandomInt(0, 1);
    if(md == 0){
        return arg1 + "  X  " + arg2 + " =";
    }
    return arg2 + "  X  " + arg1 + " =";
}

//基本乘法表
function FormulaCross4() {
    arg1 = RandomInt(1, 99);
    arg2 = RandomInt(1, 99);
    return arg1 + "  X  " + arg2 + " =";
}

//除号
function FormulaDivid() {
    arg1 = RandomInt(hardMin, hardMax);
    arg2 = RandomInt(hardMin2, hardMax2);
    let res = arg1 * arg2;
    return res + "  ÷  " + arg2 + " =";
}

//除号 带余数
function FormulaDivid2(){
    arg1 = RandomInt(hardMin, hardMax);
    arg2 = RandomInt(hardMin2, hardMax2);
    return arg1 + "  ÷  " + arg2 + " =";
}

//分数
function FractionFormula(row, col){
    if(row >=0 && row < 4){
        return FormulaFractionAdd();
    }else if(row >= 4 && row < 7){
        return FormulaFractionMulti();
    }else{
        return FormulaFractionWith();
    }
}

function FormulaFractionAdd(){
    let arg1 = RandomInt(hardMin, hardMax);
    let arg3 = RandomInt(hardMin2, hardMax2);
    let arg2 = RandomInt(1, arg3);
    return arg1 + " + " + arg2 + "//" + arg3 + " =";
}

function FormulaFractionMulti(){
    let arg1 = RandomInt(hardMin, hardMax);
    let arg3 = RandomInt(hardMin2, hardMax2);
    let arg2 = RandomInt(1, arg3);
    return arg1 + " X " + arg2 + "//" + arg3 + " =";
}

function FormulaFractionWith(){
    let arg1 = RandomInt(hardMin, hardMax);
    let arg3 = RandomInt(hardMin2, hardMax2);
    let arg2 = RandomInt(1, arg3);
    return arg1 + "@" + arg2 + "//" + arg3 + " =";
}

//把输入和空白的进行组合
function MergeBlank(inputStr, strLen) {
    strLen = strLen || inputStr.length;
    if (strLen < m_blankNumber) {
        strLen = m_blankNumber;
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

//显示生成的题目图片，长按保存
function ShowImageDlg(){
    let strImg = "<img ";
    strImg += "src="+ canvas.toDataURL('png', 1.0);
    strImg += " style='width:350px;height:500px;'></img>";
    let dlg1 = new Dialog({
        title:"长按图片，保存下载",
        text:strImg
    });

    dlg1.Show();
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

//绘制图片
function DrawImage(img0,cb) {
    let imgObj = new Image();
    imgObj.src = img0;
    imgObj.onload = function () {
        ctx.drawImage(imgObj, 10, 10,150,150);
        if (typeof cb == "function") {
            cb();
        }
    }
}