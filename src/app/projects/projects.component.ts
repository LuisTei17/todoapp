import { Component, OnInit } from '@angular/core';
import { ApiHttpService } from 'src/helpers/api';
import { Project } from '../models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Array<Project> = []
  constructor(private api: ApiHttpService) { }

  ngOnInit(): void {
    this.retrieveProjects();
  }

  retrieveProjects() {
    this.api.get('project').subscribe({
      next: this.retrievedProjects.bind(this),
      error: this.invalidProjectCall.bind(this)
    })
  }

  retrievedProjects(data: any) {
    this.projects = data;
  }

  delete(id: string) {
    this.api.delete('project/' + id).subscribe({
      next: this.projectUpdated.bind(this),
      error: this.invalidProjectCall.bind(this)
    })
  }  

  saveProject(project: Project) {
    this.api.put('project/' + project._id, {name: project.name}).subscribe({
      next: this.projectUpdated.bind(this),
      error: this.invalidProjectCall.bind(this)
    })
  }

  cancelEdit() {
    this.projects.forEach(project => {
      project.edit = false;
    })
  }

  edit(id: string) {
    this.projects.forEach(project => {
      project.edit = false;
      if (project._id === id)
        project.edit = true;
    })
  }

  projectUpdated() {
    console.log('Ação realizada com sucesso');
    this.retrieveProjects();
  }

  invalidProjectCall(error: any) {
    console.log(error)
  }

}
