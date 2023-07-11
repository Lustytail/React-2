import { useSetRecoilState } from "recoil";
import {Categories, IToDo, toDoState} from "../atoms";

function ToDo({text, id, category}: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (category: IToDo["category"]) => {
        setToDos( (oldToDos) => {
            const index = oldToDos.findIndex(toDo => toDo.id === id);
            const oldToDo = oldToDos[index];
            const newToDo = {text: oldToDo.text, id: oldToDo.id, category: category};

            return [...oldToDos.slice(0,index), newToDo, ...oldToDos.slice(index+1)];
        } )
    };
    const onDelete = () => {
        setToDos( (oldToDos) => {
            const index = oldToDos.findIndex(toDo => toDo.id === id);
            const delToDo = oldToDos[index];
            
            return [...oldToDos.slice(0, index),...oldToDos.slice(index+1)];
        })
    }
    return (
        <li>
            <span>{text}</span>
            {category !== Categories.TO_DO && <button onClick={()=> onClick(Categories.TO_DO)}>To Do</button>}
            {category !== Categories.DOING && <button onClick={()=> onClick(Categories.DOING)}>Doing</button>}
            {category !== Categories.DONE && <button onClick={()=> onClick(Categories.DONE)}>Done</button>}
            <button onClick={onDelete}>❌</button>
        </li>
    );
}


// function ToDo({text, id, category}: IToDo) {
//     const setToDos = useSetRecoilState(toDoState);
//     const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
//         const {
//             currentTarget: {name}
//         } = event;

//         setToDos((oldToDos) => {
//             const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
//             const oldToDo = oldToDos[targetIndex];
//             const newToDo = {text, id, category: name as any}

//             console.log(oldToDo, newToDo);
//             return [...oldToDos.slice(0,targetIndex), newToDo, ...oldToDos.slice(targetIndex+1)];
//         });
//     }
//     return (
//         <li>
//             <span>{text}</span>
//             {category !== "TO_DO" && <button name="TO_DO" onClick={onClick}>To Do</button>}
//             {category !== "DOING" && <button name="DOING" onClick={onClick}>Doing</button>}
//             {category !== "DONE" && <button name="DONE" onClick={onClick}>Done</button>}
//         </li>
//     );
// }

export default ToDo;