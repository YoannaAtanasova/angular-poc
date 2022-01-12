import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor  } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    ButtonModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: 'Enter_the_Application_Id_here', // This is your client ID
        authority: "Enter_the_Cloud_Instance_Id_Here'/'Enter_the_Tenant_Info_Here", // This is your tenant ID
        redirectUri: 'Enter_the_Redirect_Uri_Here'// This is your redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      }
    }), 
    {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read'],
      },
    }, 
    {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        ['Enter_the_Graph_Endpoint_Here/v1.0/me', ['user.read']],
      ]),
    })
  ],
  providers: [MsalGuard],
  bootstrap: [AppComponent, MsalRedirectComponent ]
})
export class AppModule { }
