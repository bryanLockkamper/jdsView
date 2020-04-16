import { InputColorPipe } from './pipes/input-color.pipe';
import { NbDialogModule, NbCardModule } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [InputColorPipe],
    imports: [
      CommonModule,
      NbCardModule,
      NbDialogModule.forChild(),
    ],
    exports: [
      InputColorPipe
    ]
  })
  export class SharedModule { }