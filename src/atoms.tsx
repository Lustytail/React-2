import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";


export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE"
}
export interface IToDo{
    text: string;
    id: number;
    category: string;
}

let defaultCategory = ["TO_DO", "DOING", "DONE"];

const { persistAtom } = recoilPersist();

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
    effects_UNSTABLE: [persistAtom]
});

export const categoryState = atom({
    key: "category",
    default: defaultCategory[0]
});

export const categoriesState = atom({
    key: "categories",
    default: defaultCategory,
    effects_UNSTABLE: [persistAtom]
});

export const toDoSelector = selector ({
    key: "ToDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);

        return  toDos.filter(toDo => toDo.category === category);
    }
})