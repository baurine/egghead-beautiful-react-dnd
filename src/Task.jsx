import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => 
    props.isDragDisabled ? 'lightgrey' :
    props.isDragging ? 'lightgreen' : 'white'};
  display: flex;
`;

export default class Task extends React.Component {
  render() {
    const isDragDisabled = this.props.task.id === 'task-1'
    return (
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
    )
  }
}
