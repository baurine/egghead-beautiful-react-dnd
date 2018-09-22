import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import initialData from './initial-data';
import Column from './Column';

const Container = styled.div`
  display: flex;
`;

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

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    const startTaskIds = Array.from(start.taskIds)
    let finishTaskIds
    if (start === finish) {
      finishTaskIds = startTaskIds
    } else {
      finishTaskIds = Array.from(finish.taskIds)
    }

    startTaskIds.splice(source.index, 1)
    finishTaskIds.splice(destination.index, 0, draggableId)

    const newStartColumn = {
      ...start,
      taskIds: startTaskIds
    }
    let newFinishColumn
    if (start === finish) {
      newFinishColumn = newStartColumn
    } else {
      newFinishColumn = {
        ...finish,
        taskIds: finishTaskIds
      }
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn
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
        <Container>
          {
            this.state.columnOrder.map(columnId => {
              const column = this.state.columns[columnId]
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

              return <Column key={column.id}
                        column={column}
                        tasks={tasks}/>
            })
          }
        </Container>
      </DragDropContext>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
