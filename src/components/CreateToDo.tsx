import {useForm} from "react-hook-form";
import {toDoState} from "../atoms";
import { useSetRecoilState } from "recoil";

interface IForm{
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const handleValid = ({toDo}: IForm) => {
        setToDos(oldToDos => [{text: toDo, id:Date.now(), category:"TO_DO"}, ...oldToDos]);
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