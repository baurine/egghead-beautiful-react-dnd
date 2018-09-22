import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';

import initialData from './initial-data';
import Column from './Column';

class App extends React.Component {
  state = initialData

  onDragStart = result => {
    // document.body.style.color = 'orange'
    // document.body.style.transition = 'background-color 0.2s ease'
  }

  onDragUpdate = result => {
    // const { destination } = result;
    // const opacity = destination
    //   ? destination.index / Object.keys(this.state.tasks).length
    //   : 0;
    // document.body.style.backgroundColor = `rgba( 153, 141, 217, ${opacity})`;
  }

  onDragEnd = result => {
    // console.log(result)
    // document.body.style.color = 'inherit'
    // document.body.style.backgroundColor = 'inherit'

    const { draggableId, source, destination } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) return

    const column = this.state.columns[source.droppableId]
    const newTaskIds = Array.from(column.taskIds)
    newTaskIds.splice(source.index, 1)
    newTaskIds.splice(destination.index, 0, draggableId)
    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      }
    }
    this.setState(newState)
  }

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}>
        {
          this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId]
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

            return <Column key={column.id}
                      column={column}
                      tasks={tasks}/>
          })
        }
      </DragDropContext>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
