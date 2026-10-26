import { NgModule } from "@angular/core";
import { PanelMenuModule } from "primeng/panelmenu";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { TableModule } from "primeng/table";
import { TieredMenuModule } from "primeng/tieredmenu";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { SidebarModule } from "primeng/sidebar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import { ProgressBarModule } from "primeng/progressbar";
import { CheckboxModule } from "primeng/checkbox";
import { InputNumberModule } from "primeng/inputnumber";
import { MenubarModule } from "primeng/menubar";
import { AvatarModule } from "primeng/avatar";
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { InputTextModule } from "primeng/inputtext";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { InputSwitchModule } from "primeng/inputswitch";
import { FileUploadModule } from "primeng/fileupload";
import { RadioButtonModule } from "primeng/radiobutton";
import { CardModule } from "primeng/card";
import { ListboxModule } from "primeng/listbox";
import { ImageModule } from "primeng/image";
import { BadgeModule } from "primeng/badge";
import { SliderModule } from "primeng/slider";
import { ColorPickerModule } from "primeng/colorpicker";
import { AvatarGroupModule } from "primeng/avatargroup";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TagModule } from "primeng/tag";
import {SelectButtonModule} from 'primeng/selectbutton';
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
    PanelMenuModule,
    ToastModule,
    TableModule,
    ProgressBarModule,
    TieredMenuModule,
    CalendarModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    MultiSelectModule,
    SidebarModule,
    CheckboxModule,
    InputNumberModule,
    AvatarModule,
    MenubarModule,
    MenuModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    CascadeSelectModule,
    InputSwitchModule,
    FileUploadModule,
    RadioButtonModule,
    CardModule,
    ListboxModule,
    ImageModule,
    BadgeModule,
    SliderModule,
    ColorPickerModule,
    AvatarGroupModule,
    AutoCompleteModule,
    ProgressSpinnerModule,
    TagModule,
    SelectButtonModule,
    AccordionModule
  ],
  providers: [MessageService]
})
export class PrimengModule {}
