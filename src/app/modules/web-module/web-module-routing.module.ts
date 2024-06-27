import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BetSummeryComponent } from './bet-summery/bet-summery.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      },
    ],
  },

  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },

  {
    path: 'bet-summery',
    component: BetSummeryComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebModuleRoutingModule { }
