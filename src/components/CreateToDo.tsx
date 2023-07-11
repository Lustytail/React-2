import {useForm} from "react-hook-form";
import {IToDo, categoryState, toDoState} from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface IForm{
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const handleValid = ({toDo}: IForm) => {
        setToDos(oldToDos => [{text: toDo, id:Date.now(), category:category as IToDo["category"]}, ...oldToDos]);
        setValue("toDo", "");
    };
    
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo", {required: "Input Todo"})} placeholder="Write a to do"/>
            <button>ADD</button>
        </form>
    );
}

export default CreateToDo;