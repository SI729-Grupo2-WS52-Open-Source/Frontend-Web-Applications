import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AdminAuthComponent } from "./components/admin-auth/admin-auth.component";
import { AdminHomeComponent } from "./components/admin-home/admin-home.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin-auth', component: AdminAuthComponent },
  { path: 'admin-home', component: AdminHomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
