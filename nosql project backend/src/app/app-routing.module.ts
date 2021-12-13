import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import {ProfileComponent} from './components/profile/profile.component'
import {LoginComponent} from './components/login/login.component'
import {RegisterComponent} from './components/register/register.component'
import { PublicationsComponent } from './components/publications/publications.component'
import { SurveyComponent } from './components/survey/survey.component'
import { SuggestionComponent } from './components/suggestion/suggestion.component'
import { EssaiComponent } from './components/essai/essai.component'
import { AuthGuard } from './components/login/auth.guard'


const appRoutes: Routes =[
  { path:'', component: HomeComponent },
  { path:'home', component: HomeComponent },
  { path:'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'publications', component: PublicationsComponent, canActivate: [AuthGuard] },
  { path:'survey', component: SurveyComponent, canActivate: [AuthGuard] },
  { path:'suggestion', component: SuggestionComponent, canActivate: [AuthGuard] },
  { path:'essai' , component: EssaiComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
