import { Component, OnInit } from '@angular/core';
import {NewsApiService, Article } from '../news-api.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Article[];
  
  constructor(private newsApiService: NewsApiService) { 
    this.newsApiService.pagesOutput.subscribe((articles) => {
      this.articles = articles;
    });

    this.newsApiService.getPage(1);    
  }

  ngOnInit(): void {
  }

}
