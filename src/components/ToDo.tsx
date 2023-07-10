import {IToDo} from "../atoms";

function ToDo({text, id, category}: IToDo) {
    return (
        <li>
            <span>{text}</span>
            <button>To Do</button>
            <button>Doing</button>
            <button>Done</button>
        </li>
    );
}

export default ToDo;