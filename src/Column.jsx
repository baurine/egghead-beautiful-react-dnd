import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList= styled.div`
  padding: 8px;
`;

export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          { provided =>
            <TaskList {...provided.droppableProps}
                      innerRef={provided.innerRef}>
              { this.props.tasks.map(task => <Task key={task.id} task={task}/>) }
              { provided.placeholder }
            </TaskList>
          }
        </Droppable>
      </Container>
    )
  }
}
