import * as React from 'react'

export interface ITodo {
    task: string;
}

interface IItemProps {
    todo: ITodo;
}

interface IItemState {
    done: boolean;
}


export default class ToDo extends React.Component<IItemProps, IItemState> {
    constructor(props: IItemProps) {
        super(props);
        this.state = {done: false};
    }
    render() {
        return  <div style={
            {width: '150px', margin: '5px', display: 'block', border: '1px solid black', borderRadius: '5px', padding: '5px', paddingLeft: '8px'}}>
            {this.props.todo.task}
            </div>
    }
}