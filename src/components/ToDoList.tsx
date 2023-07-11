import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
    const toDos = useRecoilValue(toDoState);
    const list = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };

    return <div>
        <h1>To Dos</h1>
        <hr />
        <form>
            <select value={category} onInput={onInput}>
                <option value={Categories.TO_DO}>To Do</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
            </select>
        </form>
        <CreateToDo />
        <hr />
        {list?.map((list) => (
                <ToDo key={list.id} {...list}/>
            ))}
        {/*<h1>To Do</h1>
        <ul>
            {toDo.map((toDo) => (
                <ToDo key={toDo.id} {...toDo}/>
            ))}
        </ul>
        <hr />
        <h1>Doing</h1>
        <ul>
            {doing.map((toDo) => (
                <ToDo key={toDo.id} {...toDo}/>
            ))}
        </ul>
        <hr />
        <h1>To Do</h1>
        <ul>
            {done.map((toDo) => (
                <ToDo key={toDo.id} {...toDo}/>
            ))}
            </ul>*/}
    </div>;
}

export default ToDoList;