import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoriesState, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";

const H1 = styled.h1`
    margin: 15px;
    
`;

const H2 = styled.h2`
    margin: 7px;
    color: red;
    
`;
interface ICategoryForm {
    category: string;
}

function ToDoList() {
    const toDos = useRecoilValue(toDoState);
    const list = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const [categories, setCategories] = useRecoilState(categoriesState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };

    const {register, handleSubmit, formState:{errors}, setError, setValue} = useForm<ICategoryForm>();
    
    const onValid = (data: ICategoryForm) => {
        if(categories.includes(data.category))
            return setError("category", {message: "Input new category"}, {shouldFocus: true});
        
        setCategories((current: ICategoryForm[]) => {
            return [...current, data.category];
        })
        setValue("category", "");
    }

    return <div>
        <H1>To Dos</H1>
        <form onSubmit={handleSubmit(onValid)}>
            <input {...register("category", {required: "Input new category"})} placeholder="Input category"></input>
            <button>Add</button>
        </form>
        <H2>{errors?.category?.message}</H2>
        <hr />
        <form>
            <select value={category} onInput={onInput}>
                {categories.map((cate: string) => {
                    return <option key={cate} value={cate}>{cate}</option>
                })}
            </select>
        </form>
        <CreateToDo />
        <hr />
        <H1>{category}</H1>
        <ul>
            {list?.map((list) => (
                    <ToDo key={list.id} {...list}/>
            ))}
        </ul>
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