import { Component, OnInit } from '@angular/core';
import { StringBuilder,ProfileFactoryType,ContextManager,Convert,AppActivity} from 'epma-platform/services';
import { Level, ProfileContext, OnProfileResult, IProfileProp,Byte, Decimal, decimal, Double, Float, Int64, long, Long, StringComparison,AppDialogEventargs, AppDialogResult, DelegateArgs, DialogComponentArgs, WindowButtonType, ObservableCollection } from 'epma-platform/models';
import { AppDialog, Colors, SolidColorBrush, Thickness } from 'epma-platform/controls';
import { HelperService} from 'epma-platform/soapclient';
import 'epma-platform/stringextension';
import DateTime from 'epma-platform/DateTime';
import TimeSpan from 'epma-platform/TimeSpan';
import { MessageEventArgs, MessageBoxResult, iMessageBox, MessageBoxButton, MessageBoxType, MessageBoxDelegate } from 'epma-platform/services';
import { ObjectHelper } from 'epma-platform/helper';
import { DrugItem } from './DrugItem';
import { ChartCell } from './ChartCell';
import { TimeSlot } from './TimeSlot';
  ﻿
    export class ChartRow {
        public Key: string;
        public ChartCells: ObservableCollection<ChartCell>;
        public DrugItem: DrugItem;
        private oRowBackground: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
        public get RowBackground(): SolidColorBrush {
            return this.oRowBackground;
        }
        public set RowBackground(value: SolidColorBrush) {
            this.oRowBackground = value;
        }
        public RowHeight: number;
        public TimeSlots: ObservableCollection<TimeSlot>;
        private _IsGroupItem: boolean = false;
        public get IsGroupItem(): boolean {
            return this._IsGroupItem;
        }
        public set IsGroupItem(value: boolean) {
            this._IsGroupItem = value;
        }
        private oOrderSetStart: boolean = false;
        public get OrderSetStart(): boolean {
            return this.oOrderSetStart;
        }
        public set OrderSetStart(value: boolean) {
            this.oOrderSetStart = value;
        }
        private oOrderSetEnd: boolean = false;
        public get OrderSetEnd(): boolean {
            return this.oOrderSetEnd;
        }
        public set OrderSetEnd(value: boolean) {
            this.oOrderSetEnd = value;
        }
        private oRowBorderColor: SolidColorBrush = new SolidColorBrush(Colors.Transparent);
        public get RowBorderColor(): SolidColorBrush {
            return this.oRowBorderColor;
        }
        public set RowBorderColor(value: SolidColorBrush) {
            this.oRowBorderColor = value;
        }
        private oRwBdrTckns: Thickness = new Thickness(0, 0, 0, 0);
        public get RowBorderThickness(): Thickness {
            return this.oRwBdrTckns;
        }
        public set RowBorderThickness(value: Thickness) {
            this.oRwBdrTckns = value;
        }
        private _RowIndex: number = 0;
        public get RowIndex(): number {
            return this._RowIndex;
        }
        public set RowIndex(value: number) {
            this._RowIndex = value;
        }
    }