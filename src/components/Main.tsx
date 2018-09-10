import * as React from 'react'
import {ITodo, default as ToDo} from "./ToDo";
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import * as _ from 'lodash';

interface IMainProps {};

interface IMainState {
    todos: ITodo[];
};

class Main extends React.Component<IMainProps, IMainState> {
    constructor(props: IMainProps) {
        super(props);
        this.state = {
            todos: [
                {task: 'Wash car', id: '12'},
                {task: 'Buy Groceries', id: '13'},
                {task: 'Laundry', id: '14'},
                {task: 'Dance recital', id: '125'},
            ]
        };
        this.reorder = this.reorder.bind(this);
    }

    render() {
        return <div style={{width: '250px', marginLeft: '500px', marginTop: '51px'}}>
            {this.state.todos
                .map((todo, index) =>
                    <ToDo
                        key={index}
                        todo={todo}
                        addAbove={(incomingItemId: ITodo) => this.reorder(incomingItemId, todo.id)}
                    />)
            }
        </div>
    }

    reorder(incomingItem: ITodo, currentId: string) {
        const todos = _.filter(this.state.todos, (todo) => todo.id !== incomingItem.id);
        const currentIdIndex = _.findIndex(todos, (todo) => todo.id === currentId);

        const newItems = [
            ..._.slice(todos,0, currentIdIndex),
            incomingItem,
            ..._.slice(todos,currentIdIndex)
        ];
        this.setState({todos: newItems});
    }
}

export default DragDropContext(HTML5Backend)(Main);