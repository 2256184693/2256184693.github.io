
## Konva

### 概论

用于桌面和移动应用的HTML5 + 2d的canvas库

内置对HDPI设备的支持，并通过像素比率优化实现了清晰的文字和形状

高效实现动画、变换、节点嵌套、局部操作、滤镜、缓存、事件等功能.

面向对象开发

Konva最大的特点是图形可交互，Konva的所有的图形都可以监听事件，实现类似于原生DOM的交互方式。(事件驱动的结构，可以对canvas中元素订阅各种更改事件)。

支持Filters滤镜

支持选择器查找元素。

### 实现

```
             Stage
                |
         +------+------+
         |             |
       Layer         Layer
         |             |
   +-----+-----+     Shape
   |           |
 Group       Group
   |           |
   +       +---+---+
   |       |       |
Shape   Group    Shape
           |
           +
           |
         Shape

```

+ Virtual Nodes
+ Custom Shape = Shape Class + draw function
+ 事件监听

  > 是在层（Konva.Layer）的基础上实现的，每一个层有一个用于显示图形的前台渲染器和用于监听事件的后台渲染器，通过在后台渲染器中注册全局事件来判断当前触发事件的图形，并调用处理事件的回调。Konva很大程度上借鉴了浏览器的DOM，比如Konva通过定义舞台（Konva.Stage）来存储所有图形，类似于html标签，定义层来显示图形，类似于body标签。其中的节点嵌套、事件监听、节点查找等等也借鉴了DOM操作

### 结论

> 更适合类PS功能需求的项目。

1. 虽然对文本处理有了一定的优化，但总体还是具有较弱的文本渲染能力。

2. canvas不依赖dom，动画效果会有比较好的性能（拖拽动画），但终极方案是否要加入实时预览此类功能？

3. canvas中的元素事件其实都是由canvas元素分发出去的。

4. canvas中的元素都需要基于基准点的绝对定位坐标和绝对的长度来绘制图形，若要结合flex则还需要再做处理。

5. 排版逻辑 需要定制。算法调研 

