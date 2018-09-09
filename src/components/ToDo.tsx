import * as React from 'react'
import { DragSource } from 'react-dnd';
import {ReactNode} from "react";

export interface ITodo {
    task: string;
}

interface IItemProps {
    todo: ITodo;

    // Injected by React DnD:
    isDragging: boolean
    connectDragSource: (component: any) => ReactNode;
}

interface IItemState {
    done: boolean;
}

function collect(connect: any, monitor: any) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

const todoSource = {
    beginDrag(props: any) {
        return {
            todo: props.todo
        };
    }
};

const type='todo';

class ToDo extends React.Component<IItemProps, IItemState> {
    constructor(props: IItemProps) {
        super(props);
        this.state = {done: false};
    }
    render() {
        const { isDragging, connectDragSource } = this.props;

        let todoStyle = {
            width: '150px',
            margin: '5px',
            display: 'block',
            border: '1px solid black',
            borderRadius: '5px',
            padding: '5px',
            paddingLeft: '8px',
            opacity: isDragging ? 0.5 : 1
        };
        return connectDragSource(<div style={todoStyle}>
            {this.props.todo.task}
            </div>);
    }
}

export default DragSource(type, todoSource, collect)(ToDo);
