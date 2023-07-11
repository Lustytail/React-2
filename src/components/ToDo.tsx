import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {Categories, IToDo, categoriesState, toDoState} from "../atoms";
import { styled } from "styled-components";

const ToDoLi = styled.li`
    width: 400px;
    margin: 10px 20px;
    display: flex;
    align-items: center;
`;

const Span = styled.span`
    margin: 0 32px;
    font-size: 20px;
`;

const Button = styled.button`
    size: 10px;
    background-color: #a9a0e7;
    border-color: darkslateblue;
    border: groove;
    border-top: hidden;
    border-left: hidden;
    border-radius: 7px;
    margin: 0 1px;
    cursor: pointer;

`;
function ToDo({text, id, category}: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const categories = useRecoilValue(categoriesState);
    const onClick = (category: IToDo["category"]) => {
        setToDos( (oldToDos) => {
            const index = oldToDos.findIndex(toDo => toDo.id === id);
            const oldToDo = oldToDos[index];
            const newToDo = {text: oldToDo.text, id: oldToDo.id, category};

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
        <ToDoLi>
            <Span>{text}</Span>
            {categories.map((cate: string) => {
                return (
                    (cate !== category) && <Button key={cate} onClick={()=> onClick(cate)}>{cate}</Button>
                ); 
            })}
            <Button onClick={onDelete}>❌</Button>
        </ToDoLi>
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