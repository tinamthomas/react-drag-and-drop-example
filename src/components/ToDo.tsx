import * as React from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import {ReactNode} from "react";
import * as _ from 'lodash';

export interface ITodo {
    task: string;
    id: string;
}

interface IItemBaseProps {
    todo: ITodo;
    addAbove: (incomingItemId: string) => {};
}

interface IItemProps extends IItemBaseProps{
    // Injected by React DnD:
    isDragging: boolean
    connectDragSource: (component: any) => ReactNode;
    connectDropTarget: (component: any) => ReactNode;
    isOver: boolean;
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

function drop(connect: any, monitor: any) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

const beginDrag = {
    beginDrag(props: IItemBaseProps) {
        return {
            todo: props.todo
        };
    }
};

const endDrag = {
    drop(props: IItemBaseProps, monitor: any, component: any) {
        const sourceItem = monitor.getItem().todo;
        props.addAbove(sourceItem);
    }
};

const type='todo';

class ToDo extends React.Component<IItemProps, IItemState> {
    constructor(props: IItemProps) {
        super(props);
        this.state = {done: false};
    }
    render() {
        const { todo, isDragging, connectDragSource, connectDropTarget } = this.props;

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
        return connectDragSource(connectDropTarget(<div style={todoStyle}>
            {todo.task}
            </div>));
    }
}

export default
    _.flow([DragSource(type, beginDrag, collect), DropTarget(type, endDrag, drop)])(ToDo);
