export class Task {
    _id?: string = '';
    description: string = '';
    newDescription?: string = '';
    id_project?: string = '';
    edit?: boolean = false;
    finishDate?: Date = new Date();
    finished?: boolean = false;
    label?: string = '';
}