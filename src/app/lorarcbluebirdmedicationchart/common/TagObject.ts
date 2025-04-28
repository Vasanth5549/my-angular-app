import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType } from 'epma-platform/models';
import { AppDialog, EventArgs } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { IChartSlot } from './IChartSlot';
import { ChartCell } from './ChartCell';
import { DrugItem } from './DrugItem';
import { ChartIcon } from './ChartIcon';
import { ChartColumn } from './ChartColumn';
  
    export class TagObject extends EventArgs /*implements INotifyPropertyChanged*/ {
        // public event PropertyChangedEventHandler PropertyChanged;
        // public NotifyPropertyChanged(info: String): void {
        //     if (PropertyChanged != null) {
        //         PropertyChanged(this, new PropertyChangedEventArgs(info));
        //     }
        // }
        private _oChartCell: ChartCell;
        private _oIChartSlot: IChartSlot;
        private _IsSelected: boolean = false;
        public oChartIcon: ChartIcon;
        public oDrugItem: DrugItem;
        public get oIChartSlot(): IChartSlot {
            return this._oIChartSlot;
        }
        public set oIChartSlot(value: IChartSlot) {
            this._oIChartSlot = value;
            //this.NotifyPropertyChanged("oIChartSlot");
        }
        public get oChartCell(): ChartCell {
            return this._oChartCell;
        }
        public set oChartCell(value: ChartCell) {
            this._oChartCell = value;
            //this.NotifyPropertyChanged("oChartCell");
        }
        public oChartColumn: ChartColumn;
        public get IsSelected(): boolean {
            return this._IsSelected;
        }
        public set IsSelected(value: boolean) {
            this._IsSelected = value;
        }
    }
