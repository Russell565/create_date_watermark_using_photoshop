var inputFolder = Folder.selectDialog("请选择需要添加日期水印图片所在文件夹：");
var outFolder = Folder.selectDialog("选择图片保存输出的文件夹：");
var newX = 10;
var newY = 500; 
var newWidth = 600;
var newHeight = 450;
var word_x = 220;
var word_y = 250;
    
//判断文件夹是否存在
if (inputFolder != null && inputFolder != null) {
    //获得文件夹下的所有图片
    var fileList = inputFolder.getFiles();
    //遍历图片
    for (var i = 0; i < fileList.length; i++){
        //判断图片是否正常文件，并且处于非隐藏状态
        if (fileList[i] instanceof File && fileList[i].hidden == false) {       
            //打开遍历到的图片
            var docRef = open(fileList[i]);

            // 打开.psd文件
            var psdFile = new File("/path/to/your/psd/file.psd");
            var psdLayer = open(psdFile);
            // 复制.psd图层到当前文档
            psdLayer.selection.selectAll();
            psdLayer.selection.copy();
            var activeDoc = app.activeDocument;
            activeDoc.paste();
            // 关闭.psd文件
            psdLayer.close(SaveOptions.DONOTSAVECHANGES);
            // 获取新添加的图层的引用
            var newLayer = activeDoc.artLayers[activeDoc.artLayers.length-1];
    
            // 移动图层到指定位置
            newLayer.translate(newX, newY);
            // 调整图层大小
            newLayer.resize(newWidth, newHeight);

            //设置另存路径文件名，重命名为:new_原文件名
            var fileout = new File(outFolder+'/new_'+ basename(fileList[i]))
            // 旋转照片
            if(docRef.width > docRef.height){
                docRef.rotateCanvas(90);
            }
            // 添加水印
            addDateTimeWatermark(docRef);
            //另存照片
            saveDocAsCopy(docRef);
        }
    }
    alert("添加日期水印，已处理完成！")
}

function saveDocAsCopy(docRef) {
    //定义一个变量[asCopy]，用来指定图片以副本的方式保存
    var asCopy = true;

    //定义一个变量[extensionType]，用来指定图片名称的后缀为小写的.jpg
    var extensionType = Extension.LOWERCASE;

    //定义一个变量[options]，用来指定图片保存的格式为JPG。PNG为PNGSaveOptions
    var jpegSaveOptions = JPEGSaveOptions;
    jpegSaveOptions.embedColorProfile = true;  
    jpegSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;  
    jpegSaveOptions.matte = MatteType.NONE;  
    jpegSaveOptions.quality = 10;

    docRef.saveAs(fileout, jpegSaveOptions, asCopy, extensionType);
    
    //操作完成后，直接关闭文档
    docRef.close(SaveOptions.DONOTSAVECHANGES);
}

function addDateTimeWatermark(docRef) {
    var photoTime = 0;
    //日期数据从文件名读取
    if (photoTime == 0){
        photoTime = basename(fileList[i])
        photoTime = photoTime.toString().slice(0, -4)
        // 将破折号替换为冒号
        photoTime = photoTime.replace(/-/g, ":");
    }
    //新建图层
    var layerRef = docRef.artLayers.add();
    //设置为文字图层
    layerRef.kind = LayerKind.TEXT;
    //设置图层文字
    layerRef.textItem.contents = photoTime;
    //根据图片宽度比例，设置文字大小
    layerRef.textItem.size = docRef.width/25/(docRef.resolution/72); //默认分辨率72，根据分辨率修改pt
    layerRef.textItem.font = "LetsgoDigital-Regular"; //设置字体

    //定义颜色
    var color = new RGBColor();
    //设置red属性
    color.red = 235;
    //设置green属性
    color.green = 175;
    //设置blue属性
    color.blue = 12;
    //定义水印文字的颜色
    var sc = new SolidColor();
    //设置[sc]对象的[rgb]属性的值为变量[color]
    sc.rgb = color;
    //将文本图层的字体颜色设置为变量[sc]
    layerRef.textItem.color = sc;
    //设置文本图层透明度
    layerRef.fillOpacity = 90;
    //将文本图层向下移动。调节日期水印左右和上下位置
    //layerRef.translate(docRef.width/1.65, docRef.height/1.15);
    layerRef.translate(word_x, word_y);
    //合并文本图层至背景图层
    layerRef.merge();
}

function getCreateDateFromXmp(doc) {
    var ns = "http://ns.adobe.com/xap/1.0/";
    ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
    xmpMeta = new XMPMeta(doc.xmpMetadata.rawData);
    var theValue = xmpMeta.getProperty(ns, "CreateDate");
    return theValue;
}

//获取文件名
function basename(str) {
    str = str.toString();
    var idx = str.toString().lastIndexOf('/')
    idx = idx > -1 ? idx : str.lastIndexOf('\\')
    if (idx < 0) {
        return str
    }
    return str.substring(idx + 1);
}
