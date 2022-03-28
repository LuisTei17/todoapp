import { Task } from "./task";
export class Project {
    _id: string = "";
    name: string = "";
    edit: boolean = false;
    tasks: Array<Task> = [];
    newTask: Task = {
        description: "",
    };
    finishedTasks: Array<Task> = []
}

export class NewProject {
    name: string = "";
}