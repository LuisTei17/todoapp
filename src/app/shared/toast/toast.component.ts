import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({selector: 'app-toast', styleUrls: ['../../../styles.scss', './toast.component.scss'],  templateUrl: './toast.component.html'})
export class NgbdToastInline {
    @Input() text: string = '';
    @Input() type: string = '';
    @Input() show: boolean = false;
    @Output() onShowChange = new EventEmitter<boolean>();
}