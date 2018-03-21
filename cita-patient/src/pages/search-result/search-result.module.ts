import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchResultPage } from './search-result';
import { Ionic2RatingModule } from 'ionic2-rating';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SearchResultPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchResultPage),
    Ionic2RatingModule,
    TranslateModule.forChild()
  ],
})
export class SearchResultPageModule {}
