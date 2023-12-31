import { useState } from "react";
import { useForm } from "react-hook-form";

interface IFormData{
    toDo: string,
    email: string,
    name: string,
    number: string,
    number2: string,
    extraError?: string
}

function ToDoList_1() {
    const {register, watch, handleSubmit, formState:{errors}, setError}= useForm<IFormData>({
        defaultValues: {
            email: "@naver.com"
        }
    });
    const onValid = (data: IFormData) => {
        if(data.number !== data.number2){
            return setError("number2", {message: "number are not the same" }, {shouldFocus: true});

        }
        //etError("extraError", {message:"Server offline."});
    };

    console.log(errors);
    
    return <div>
        <form style={{width: "400px", display: "flex", flexDirection:"column", alignItems:"center"}} onSubmit={handleSubmit(onValid)}>
            <input {...register("toDo", {required: "Input Todo"})} placeholder="Write a to do"/>
            <span>{errors?.toDo?.message}</span>
            <input {...register("email", {required: "Input right email", pattern: {
                value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
                message: "Input right email"}})} placeholder="input email"/>
            <span>{errors?.email?.message}</span>
            <input {...register("name", {required: "Input your name", validate: (value) => value.includes("nico") ? "not allowed" : true, minLength: {value: 5, message:"Name must be longer than 5"}})} placeholder="input name"/>
            <span>{errors?.name?.message}</span>
            <input {...register("number", {required: "Input number", minLength: 7})} placeholder="input number"/>
            <span>{errors?.number?.message}</span>
            <input {...register("number2", {required: "Input number2", minLength: 7})} placeholder="input number2"/>
            <span>{errors?.number2?.message}</span>
            <span>{errors?.extraError?.message}</span>

            <button>ADD</button>
        </form>
    </div>;
}
// function ToDoList() {
//     const [toDo, setToDo] = useState("");
//     const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//         const {
//             currentTarget: {value}
//         } = event;
//         setToDo(value);
//         };
//     const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         console.log(toDo);
//     };

//     return <div>
//         <form onSubmit={onSubmit}>
//             <input onChange={onChange} value={toDo} placeholder="Write to do" />
//             <button>Add</button>
//         </form>
//     </div>;
// }

export default ToDoList_1;