import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHttpService } from 'src/helpers/api.service';
import { NewProject, Project } from '../models/project';
import { Task } from '../models/task';
import { SpinnerComponent } from '../shared/spinner/spinner.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Array<Project> = [];
  newProject: NewProject = {name: ''};
  message: string = '';
  type: string = '';
  show: boolean = false;


  constructor(private api: ApiHttpService, private route: Router, private spinnerService: SpinnerComponent) { }

  ngOnInit(): void {
    this.retrieveProjects();
  }

  checkTaskForm(model: Task) {
    if (!model.description) {
      this.showMessage('Descrição da tarefa não informada', 'error');
      return;
    }
    return true;
  }

  checkProjectForm(model: NewProject) {
    if (!model.name) {
      this.showMessage('Titulo do projeto não informado', 'error');
      return;
    }
    return true;
  }


  retrieveProjects() {
    this.spinnerService.show();
    this.api.get('project').subscribe({
      next: this.retrievedProjects.bind(this),
      error: this.invalidCall.bind(this)
    })
  }

  fitTextInContent(text: string, MAX_LETTERS: number) {
      return `${text.slice(0, MAX_LETTERS)}...`;
  }

  retrievedProjects(projects: any) {
    const TASK_MAX_LETTERS = 18;
    const PROJECT_MAX_LETTERS = 12;

    projects.forEach((project: Project)  => {
      project.label = project.name;
      if (project.name.length > PROJECT_MAX_LETTERS)
        project.label = this.fitTextInContent(project.name, PROJECT_MAX_LETTERS);

      project.newTask = {description: ''};

      project.tasks = project.tasks?.map((task) => {
        task.label = task.description;

        if (task.description.length > TASK_MAX_LETTERS)
          task.label = this.fitTextInContent(task.description, TASK_MAX_LETTERS);

          return task;
      })
      project.finishedTasks = project.tasks?.filter((task: Task) => task.finished);
      project.tasks = project.tasks?.filter((task: Task) => !task.finished);
    });
    this.projects = projects;
    this.spinnerService.hide();
  }

  deleteProject(project: Project) {
    this.spinnerService.show();
    this.api.delete('project/' + project._id).subscribe({
      next: this.itemUpdated.bind(this),
      error: this.invalidCall.bind(this)
    })
  }  

  saveProject(project: Project) {
    this.spinnerService.show();
    this.api.put('project/' + project._id, {name: project.newName}).subscribe({
      next: this.itemUpdated.bind(this),
      error: this.invalidCall.bind(this)
    })
  }

  delete(task: Task) {
    if (task.finished)
      return;
    this.spinnerService.show();
    this.api.delete('tasks/' + task._id).subscribe({
      next: this.itemUpdated.bind(this),
      error: this.invalidCall.bind(this)
    })
  }  

  saveTask(task: Task) {
    this.spinnerService.show();
    this.api.put('tasks/' + task._id, {description: task.newDescription}).subscribe({
      next: this.itemUpdated.bind(this),
      error: this.invalidCall.bind(this)
    })
  }

  checkTask(task: Task) {
    task.finished = !task.finished;
    this.spinnerService.show();
    this.api.put('tasks/' + task._id, {finished: task.finished}).subscribe({
      next: this.itemUpdated.bind(this),
      error: this.invalidCall.bind(this)
    })
  }

  toggleEditProject(project: Project) {
    project.edit = !project.edit;
    project.newName = project.name;
  }

  toggleEditTask(task: Task) {
    if (task.finished)
      return;
    task.edit = !task.edit;
    task.newDescription = task.description;
  }

  addTask(project: Project, $event: any) {
    $event.stopPropagation();

    const newTask = project.newTask;
    if (!newTask)
      return;

    const valid = this.checkTaskForm(newTask);

    if (!valid)
      return;
    newTask.id_project = project._id;
    project.newTask = {description: ''}

    this.spinnerService.show();
    this.api.post('tasks', newTask).subscribe({
      next: this.itemUpdated.bind(this),
      error: this.invalidCall.bind(this)
    })
  }

  addProject(newProject: NewProject) {
    const valid = this.checkProjectForm(newProject);

    if (!valid)
      return;

    this.spinnerService.show();
    this.api.post('project', {name: newProject.name}).subscribe({
      next: this.itemUpdated.bind(this),
      error: this.invalidCall.bind(this)
    })
  }

  itemUpdated() {
    console.log('Ação realizada com sucesso');
    this.spinnerService.hide();
    this.retrieveProjects();
  }

  invalidCall(error: string) {
    this.showMessage(error, 'error')
    this.spinnerService.hide();
    console.log(error);
  }

  showMessage(message: string, type: string) {
    this.message = message;
    this.type = type;
    this.show = true;
  }
}
