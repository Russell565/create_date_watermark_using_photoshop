# 利用Photoshop脚本为照片批量添加拍摄日期水印

# 感谢

本脚本参考了：laozeng, https://github.com/laozeng1024



# 增加的功能

1. 如果照片为横幅，则顺时针旋转90°后，再增加水印；
2. 如果exif中没有拍摄时间，从xmp信息里取；
3. 增加 JPEG 保存时存储质量等设置（默认保存质量为10）；
4. 增加了水印字体设置，水印字体设置是字符串，是 postScript 名称，mac下，可以通过【字体册】应用查看；
5. 根据分辨率的不同（基准分辨率为72），计算水印pt大小；



# 使用方法

Photoshop - 文件 - 脚本 - 浏览 - （打开js文件）

# update by ChenZhijie
添加change_file_name.bat文件。
使用方法：
1. 在脚本目录下，打开CMD
2. 执行change_file_name.bat <flord_path> <"YYYY.MM.DD HH-MM">
   例如change_file_name.bat test "2023.10.19 11-12"
   ***请注意，test为需要改名的图片所在目录（请将图片单独存放在一个目录中）***
   ***请注意，时间必须要有双引号；且格式要如实例所示***
![image](https://github.com/Russell565/create_date_watermark_using_photoshop/assets/51833760/35605073-0a85-46a3-aff6-31d06f850052)
