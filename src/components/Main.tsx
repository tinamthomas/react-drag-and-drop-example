import * as React from 'react'
import {ITodo, default as ToDo} from "./ToDo";

interface IMainProps {
}
;

interface IMainState {
    todos: ITodo[];
}
;

export default class Main extends React.Component<IMainProps, IMainState> {
    constructor(props: IMainProps) {
        super(props);
        this.state = {
            todos: [
                {task: 'Wash car'},
                {task: 'Buy Groceries'},
                {task: 'Laundry'},
                {task: 'Dance recital'},
            ]
        };
    }

    render() {
        return <div style={{width: '250px', marginLeft: '500px', marginTop: '51px'}}>
            {this.state.todos
                .map((todo, index) =>
                    <ToDo
                        key={index}
                        todo={{task: todo.task}}
                    />)
            }
        </div>
    }
}