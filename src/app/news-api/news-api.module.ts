import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { TrimOutletNamePipe } from './trim-outlet-name.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ArticleListComponent, TrimOutletNamePipe],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    ArticleListComponent
  ]
})
export class NewsApiModule { }
