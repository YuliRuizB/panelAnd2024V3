import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../app/environments/enviroment.prod';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { globalImputs } from './shared/directives/global-imputs';
import { LoginComponent } from './authentication/login/login.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BajaUsuarioComponent } from './shared/templates/baja-usuario/baja-usuario.component';
import { ExternalPrivacyComponent } from './shared/templates/privacy/external/external-privacy.component';
import { PageNotFoundComponent } from './shared/templates/page-not-found/page-not-found.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline , LockOutline } from '@ant-design/icons-angular/icons';
import { preRegisterComponent } from './authentication/preRegister/preRegister.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { FooterComponent } from './shared/templates/footer/footer.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { PleaseVerifyEmailComponent } from './authentication/please-verify-email/please-verify-email.component';
import { HeaderComponent } from './shared/templates/header/header.component';
import { SearchComponent } from './shared/templates/search/search.component';
import { QuickViewComponent } from './shared/templates/quick-view/quick-view.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { SideNavComponent } from './shared/templates/side-nav/side-nav.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './accounts/list/list.component';
import { SharedVendorVehiclesComponent } from './shared/components/vendor/vehicles/vehicles.component';
import { SharedVehicleAssignmentsComponent } from './shared/components/vendor/vehicle-assignments/vehicle-assignments.component';
import { SharedVendorUsersListComponent } from './shared/components/vendor/system/users/users.component';
import { SharedVendorSettingsComponent } from './shared/components/vendor/settings/settings.component';
import { MessageCenterComponent } from './shared/components/vendor/messageCenter/messageCenter.component';
import { SharedVendorDriversComponent } from './shared/components/vendor/drivers/drivers.component';
import { SharedVendorAssignmentsComponent } from './shared/components/vendor/assignments/assignments.component';
import { SharedUsersListComponent } from './shared/components/users/list/list.component';
import { EditComponent } from './accounts/edit/edit.component';
import { SharedUsersCredentialsQRCodesComponent } from './shared/components/users/credentials/qrcodes/qrcodes.component';
import { TreeComponent } from './shared/components/users/charts/tree/tree.component';
import { SharedUsersUsageHistoryComponent } from './shared/components/users/boardingPass/usage-history/usage-history.component';
import { SharedUsersQRCodesComponent } from './shared/components/users/boardingPass/qrcodes/qrcodes.component';
import { SharedSystemUsersListComponent } from './shared/components/system/users/users.component';
import { SharedStopPointsNewComponent } from './shared/components/stop-points/new/new.component';
import { SharedStopPointsListComponent } from './shared/components/stop-points/list/list.component';
import { SharedStopPointsEditComponent } from './shared/components/stop-points/edit/edit.component';
import { SharedRouteProgramsComponent } from './shared/components/routes/programs/programs.component';
import { SharedRoutesListComponent } from './shared/components/routes/list/list.component';
import { SharedCustomerVendorAssignmentsComponent } from './shared/components/routes/assignments/assignments.component';
import { PromotionsComponent } from './shared/components/promotions/promotions/promotions.component';
import { SharedProductsListComponent } from './shared/components/products/list/list.component';
import { SharedAccountPaymentMethodsComponent } from './shared/components/accounts/payment-methods/payment-methods.component';
import { SharedAccountEditComponent } from './shared/components/accounts/edit/edit.component';
import { DashboardComponent } from './accounts/dashboard/dashboard.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { DefaultDashboardComponent } from './dashboard/default/default-dashboard.component';
import { QualityDashboardComponent } from './dashboard/quality/quality-dashboard.component';
import { ReportsDashboardComponent } from './dashboard/reports/reports-dashboard.component';
import { WithBreadcrumbDashboardComponent } from './dashboard/with-breadcrumb/with-breadcrumb-dashboard.component';
import { RoutesComponents } from './customers/routes/routes.component';
import { PaymentsComponents } from './customers/payments/payments.component';
import { ListComponents } from './customers/list/list.component';
import { DashboardComponents } from './customers/dashboard/dashboard.component';
import { GlobalUsersListComponent } from './global/users/list/list.component';
import { RolComponent } from './global/roles/roles-dashboard.component';
import { MyProfileComponent } from './global/my-profile/my-profile-dashboard.component';
import { OrganigramaComponent } from './admin/organigrama/organigrama.component';
import { EvidenceComponent } from './admin/evidence/evidence.component';
import { AudioPlayerComponent } from './admin/evidence/audio-player/audio-player.component';
import { AdminPaymentsComponent } from './admin/payments/payments.component';
import { LogisticsMainComponent } from './logistics/main/main.component';
import { VendorUsersListComponent } from './vendor/users/list/list.component';
import { RoutesComponentVendor } from './vendor/routes/routes.component';
import { AssignmentComponent } from './vendor/assignment/assignment.component';
import { EditComponentVendor } from './vendor/edit/edit.component';
import  { VehicleEditComponent  } from  './vendor/fleet/edit/edit.component';
import  { FleetComponent } from  './vendor/fleet/fleet.component';
import  { ListComponentVendor } from  './vendor/list/list.component';
import  {  LogisticsComponent } from  './vendor/logistics/logistics.component';
import  { ProgramComponent } from './vendor/program/program.component';
import  { RoutesNewComponents} from './vendor/routes/new/new.component';
import { ThemeConstantService } from './shared/services/theme-constant.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { CommonModule } from '@angular/common';
import {DatePipe} from '@angular/common';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { RouteEditComponent } from './customers/routes/edit/edit.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import {GoogleMap, GoogleMapsModule} from '@angular/google-maps';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};

const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => {
  const i = antDesignIcons[key];
  return i;
});

@NgModule({
  declarations: [
    RouteEditComponent,
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,   
    BajaUsuarioComponent,
    ExternalPrivacyComponent,
    preRegisterComponent,
    CommonLayoutComponent,
    FooterComponent,
    ForgotPasswordComponent,    
    SignupComponent,
    VerifyEmailComponent,
    PleaseVerifyEmailComponent,
    SearchComponent,
    QuickViewComponent,
    SideNavComponent,
    HeaderComponent, 
    FullLayoutComponent,
    ListComponent,
    EditComponent,
    DashboardComponent,
    SharedVendorVehiclesComponent,
    SharedVehicleAssignmentsComponent,
    SharedVendorUsersListComponent,
    SharedVendorSettingsComponent,
    MessageCenterComponent ,
    SharedVendorDriversComponent ,
    SharedVendorAssignmentsComponent,
    SharedUsersListComponent,
    SharedUsersCredentialsQRCodesComponent,
    TreeComponent ,
    SharedUsersUsageHistoryComponent ,
    SharedUsersQRCodesComponent,
    SharedSystemUsersListComponent,
    SharedStopPointsNewComponent,
    SharedStopPointsListComponent,
    SharedStopPointsEditComponent ,
    SharedRouteProgramsComponent,
    SharedRoutesListComponent ,
    SharedCustomerVendorAssignmentsComponent,
    PromotionsComponent, 
    SharedProductsListComponent,
    SharedAccountPaymentMethodsComponent,
    SharedAccountEditComponent,
    DefaultDashboardComponent ,
    QualityDashboardComponent ,
    ReportsDashboardComponent,
    WithBreadcrumbDashboardComponent,
    RoutesComponents,
    PaymentsComponents,
    ListComponents,
    DashboardComponents,
    GlobalUsersListComponent,
    RolComponent,
    MyProfileComponent,
    AdminPaymentsComponent,
    OrganigramaComponent,
    EvidenceComponent,
    AudioPlayerComponent ,
    LogisticsMainComponent ,
    VendorUsersListComponent, 
    RoutesComponentVendor,
    AssignmentComponent,
    EditComponentVendor,
    VehicleEditComponent,
    FleetComponent,
    ListComponentVendor,
    LogisticsComponent, 
    ProgramComponent,
    RoutesNewComponents,    

  ],
  imports: [
    GoogleMap,
    GoogleMapsModule,
    NzStatisticModule,
    CommonModule,
    BrowserModule,
    AgGridModule,
    globalImputs,
    HttpClientModule, 
    BrowserAnimationsModule,
    NzIconModule.forRoot([UserOutline, LockOutline]),    
    AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFirestoreModule,
    NzBreadCrumbModule,
    NzResultModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzNotificationModule,
    NgxCsvParserModule,
    FormsModule,
    NzDrawerModule,
    NzCalendarModule,
    NzTransferModule,
    NzListModule, 
    NzQRCodeModule,
    NzInputModule,
    NzDatePickerModule,
    NzRadioModule,
    NzCheckboxModule,
    NzTableModule,
    NzPaginationModule,
    NzMessageModule,
    NzAvatarModule,
    NzEmptyModule,
    NzDividerModule,
    NzStepsModule,
    NzBadgeModule,
    NzSpinModule,
    NzGridModule,
    NzSwitchModule,
    NzUploadModule,
    NzDescriptionsModule,
    NzTreeModule,
    NzCollapseModule,
    NzLayoutModule,
    NzDropDownModule,
    NzMenuModule,
    NzBackTopModule, 
    NzToolTipModule,
    NzButtonModule,
    NzCardModule,
    NzPageHeaderModule,
    NzTagModule,
    NzTimelineModule,
    NzSelectModule,   
    NzSkeletonModule,
    NzTabsModule,
    NzInputNumberModule,
    NzProgressModule,
    NzTimePickerModule
  ],
  providers: [
    provideClientHydration(),
    ThemeConstantService,
    provideNzI18n(en_US),
    DatePipe,
    {
      provide: NZ_ICONS,
      useValue: icons
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }