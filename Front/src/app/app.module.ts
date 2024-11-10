import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppComponenttComponent } from './components/app-componentt/app-componentt.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllTripsComponent } from './components/all-trips/all-trips.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
// import { Stepsitem } from 'primeng/Steps/';
import { MessageService } from 'primeng/api';
import { TicketService } from './serv/ticketservice.service';
import { ToastModule } from 'primeng/toast';
import { PersonalComponent } from './components/personal/personal.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmationdemoComponent } from './components/confirmationdemo/confirmationdemo.component';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { PaymentdemoComponent } from './components/paymentdemo/paymentdemo.component';
import { PersonaldemoComponent } from './components/personaldemo/personaldemo.component';
import { SeatdemoComponent } from './components/seatdemo/seatdemo.component';
import { DropdownModule } from 'primeng/dropdown';
//////////
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
// import { BadgeModule } from 'primeng/badge';
// import { BreadcrumbModule } from 'primeng/breadcrumb';
// import { CalendarModule } from 'primeng/calendar';
// import { CarouselModule } from 'primeng/carousel';
// import { CascadeSelectModule } from 'primeng/cascadeselect';
// import { ChartModule } from 'primeng/chart';
// import { ChipModule } from 'primeng/chip';
// import { ChipsModule } from 'primeng/chips';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { ConfirmPopupModule } from 'primeng/confirmpopup';
// import { ColorPickerModule } from 'primeng/colorpicker';
// import { ContextMenuModule } from 'primeng/contextmenu';
// import { DataViewModule } from 'primeng/dataview';
// import { VirtualScrollerModule } from 'primeng/virtualscroller';
// import { DialogModule } from 'primeng/dialog';
// import { DividerModule } from 'primeng/divider';
// import { DockModule } from 'primeng/dock';
// import { DragDropModule } from 'primeng/dragdrop';
// import { DynamicDialogModule } from 'primeng/dynamicdialog';
// import { EditorModule } from 'primeng/editor';
// import { FieldsetModule } from 'primeng/fieldset';
// import { FileUploadModule } from 'primeng/fileupload';
// import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
// import { InputTextareaModule } from 'primeng/inputtextarea';
// import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
// import { InputGroupModule } from 'primeng/inputgroup'
// import { ImageModule } from 'primeng/image';
// import { KnobModule } from 'primeng/knob';
// import { ListboxModule } from 'primeng/listbox';
// import { MegaMenuModule } from 'primeng/megamenu';
// import { MenuModule } from 'primeng/menu';
// import { MenubarModule } from 'primeng/menubar';
// import { MessageModule } from 'primeng/message';
// import { MessagesModule } from 'primeng/messages';
// import { MultiSelectModule } from 'primeng/multiselect';
// import { OrderListModule } from 'primeng/orderlist';
// import { OrganizationChartModule } from 'primeng/organizationchart';
// import { OverlayPanelModule } from 'primeng/overlaypanel';
// import { PaginatorModule } from 'primeng/paginator';
// import { PanelModule } from 'primeng/panel';
// import { PanelMenuModule } from 'primeng/panelmenu';
// import { PasswordModule } from 'primeng/password';
// import { PickListModule } from 'primeng/picklist';
// import { ProgressBarModule } from 'primeng/progressbar';
// import { RadioButtonModule } from 'primeng/radiobutton';
// import { RatingModule } from 'primeng/rating';
// import { ScrollerModule } from 'primeng/scroller';
// import { ScrollPanelModule } from 'primeng/scrollpanel';
// import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
// import { SidebarModule } from 'primeng/sidebar';
// import { SkeletonModule } from 'primeng/skeleton';
// import { SlideMenuModule } from 'primeng/slidemenu';
// import { SliderModule } from 'primeng/slider';
// import { SpeedDialModule } from 'primeng/speeddial';
// import { SpinnerModule } from 'primeng/spinner';
// import { SplitterModule } from 'primeng/splitter';
// import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
// import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
// import { TerminalModule } from 'primeng/terminal';
// import { TieredMenuModule } from 'primeng/tieredmenu';
// import { TimelineModule } from 'primeng/timeline';
// import { ToggleButtonModule } from 'primeng/togglebutton';
// import { ToolbarModule } from 'primeng/toolbar';
// import { TooltipModule } from 'primeng/tooltip';
// import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
// import { TreeModule } from 'primeng/tree';
// import { TreeSelectModule } from 'primeng/treeselect';
// import { TreeTableModule } from 'primeng/treetable';
import { AnimateModule } from 'primeng/animate';
import { BlockUIModule } from 'primeng/blockui';
// import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StyleClassModule } from 'primeng/styleclass';
import { StickyHeaderComponent } from './components/sticky-header/sticky-header.component';
// import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { TicketsComponent } from './components/tickets/tickets.component';
import { AreaPersonalComponent } from './components/area-personal/area-personal.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    NavBarComponent,
    AppComponenttComponent,
    AllTripsComponent,
    PersonalComponent,
    ConfirmationdemoComponent,
    PaymentdemoComponent,
    PersonaldemoComponent,
    SeatdemoComponent,
    StickyHeaderComponent,
    TicketsComponent,
    AreaPersonalComponent,
    SignInComponent,
    
  ],
  imports: [
    ButtonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StepsModule,
    ToastModule,
    AutoCompleteModule,
    CardModule,
    InputSwitchModule,
    CheckboxModule,
    DropdownModule ,
    AnimateModule,
    StyleClassModule,
    AvatarGroupModule,
    AvatarModule,
    AccordionModule,
    InputTextModule,
    InputNumberModule,
    InplaceModule,
    SplitButtonModule,
    BlockUIModule,
    SelectButtonModule,
    CarouselModule,
    TagModule
    ,TableModule
    ],
  providers: [MessageService,
    TicketService,
    DatePipe
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
