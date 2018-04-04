/***************************************************************

颜色HSLA表示法

HSLA(h, saturation, light, alpha)

* h: 颜色编号，从0到360
* saturation：饱和度，0~1
* light：亮度，0~1
* alpha: 透明度，从0~1，0为全透明

***************************************************************/

rectangle(100, 100, 100, 50, HSL(100, 1, 0.4));
rectangle(150, 130, 100, 50, HSLA(200, 1, 0.4, 0.6));
rectangle(200, 160, 100, 50, HSLA(300, 1, 0.4, 0.3));