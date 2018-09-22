import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';

import initialData from './initial-data';
import Column from './Column';

class App extends React.Component {
  state = initialData

  onDragStart = result => {
  }

  onDragUpdate = result => {
  }

  onDragEnd = result => {
    // TODO: reorder tasks
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
