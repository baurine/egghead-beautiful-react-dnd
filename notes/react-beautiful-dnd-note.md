# React Beautiful Dnd Note

- [Beautiful and Accessible Drag and Drop with react-beautiful-dnd](https://egghead.io/courses/beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd)

Demo:

![](../art/react-dnd.gif)

一开始以为这个视频教程是讲解如何使用原生的 HTML5 Drag and Drop API 来实现这个示例的，仔细一看才发现其实只是展示 [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) 这个库的功能，虽然有点失望，但了解到了这个库确实很强大和优雅。对于拖拽排序这个功能需求，这个库是一个很好的选择。这个库也只是为拖拽排序而设计，如果需要其它类型的拖拽，那就要考虑 [react-dnd](https://github.com/react-dnd/react-dnd) 库了。

react-beautiful-dnd 的主要用法：

1. DragDropContext: 用来处理 onDragStart / onDragUpdate / onDragEnd 回调，只有 onDragEnd 是必须的，一般在 onDragEnd 中将拖拽的结果反应到 state 中
1. Draggable: 定义可拖拽的 component
1. Droppable: 定义可放置的 component

主要就这三个概念，用法也不复杂。

拖拽方向要么是水平的，要是么垂直的，只能有一个方向，在 Droppable 的 direction 属性中定义。

拖拽源和目标的 droppable type 必须相同。如果 type 不同，就没法拖拽到对方。

另外，从这个视频教程中还学习到了:

- styled-components 这种 CSS in JS 的用法，用起来不错，可以在后面的项目中尝试
- @atlaskit/css-reset
- Draggable/Droppable 采用了一种 React 模式，即 children 是函数，而不是 component，好处是节省一层 div?

        <Draggable
          draggableId={this.props.task.id}
          isDragDisabled={isDragDisabled}
          index={this.props.index}>
          {
            (provided, snapshot) =>
            <Container
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              innerRef={provided.innerRef}
              isDragging={snapshot.isDragging}
              isDragDisabled={isDragDisabled}>
              {this.props.task.content}
            </Container>
          }
        </Draggable>

### Update

起初我以为这个库是用 HTML5 Drag and Drop API 实现的，后来仔细一想，用 Drag and Drop 的例子，拖拽时都会有半透明的镜像，但这个例子拖拽时并不是半透明，而是完全不透明，通过浏览器的 inspect 发现，在拖拽时，原始对象的 position 变成了 fixed，原来这个库跟 Drag and Drop API 没有半毛钱关系，它是通过监听 mousedown, mousemove, mouseup 来模拟实现的，通过调查发现，GitLab 的看板也是通过这种方式实现 (推测 GitHub 的看板实现技术也不会差太远)。

看了源码，还有一点不太明白的地方就是两个元素之间的碰撞检测逻辑，待进一步深入研究。

初步想了想，可以有的办法，在 onmousemove 事件回调中，遍历每一个其它 elements，检测它的四个角之一有没有在拖拽元素的范围内，或是拖拽元素的四个角有没有在当前 element 的范围之中。

// TODO: 碰撞检测的实现
