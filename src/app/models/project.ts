import { Task } from "./task";
export class Project {
    _id: string = "";
    name: string = "";
    edit: boolean = false;
    tasks: Array<Task> = [];
    newName: string = "";
    newTask: Task = {
        description: "",
    };
    finishedTasks: Array<Task> = [];
    label: string = "";
}

export class NewProject {
    name: string = "";
}