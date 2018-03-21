import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritePage } from './favorite';
import { Ionic2RatingModule } from 'ionic2-rating';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FavoritePage,
  ],
  imports: [
    IonicPageModule.forChild(FavoritePage),
    Ionic2RatingModule,
    TranslateModule.forChild()
  ],
})
export class FavoritePageModule {}
