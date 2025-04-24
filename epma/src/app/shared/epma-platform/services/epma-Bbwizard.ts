import { Component, OnInit } from '@angular/core';
import { EventArgs, Key, KeyEventArgs, MouseButtonEventArgs } from '../controls/Control';
import { FrameworkElement } from '../controls/FrameworkElement';

@Component({
  selector: 'app-Bbwizard',
  template: ''
})
// export class BBWizard extends UserControl {
export class BBWizard implements OnInit {
    KeyDown: Function;  

  constructor() {
    this.InitializeAccessKey();
            this.BBWizard_Loaded(null, null);
            
   }

  ngOnInit(): void {
  }
        BBWizard_KeyDown(sender: Object, e: KeyEventArgs): void {
            
        }
        public OnHelp(sender: Object, HelpCode?: string): void {
            
        }
        
        BBWizard_Loaded(sender: Object, e: EventArgs): void {
            }
        
        private InitializeAccessKey(): void {
             }
        
        private GetParent(child: FrameworkElement, targetType: any): FrameworkElement {
            var parent: any = child.Parent;
                        
            return null;
        }
        RootVisual_MouseRightButtonDown(sender: Object, e: MouseButtonEventArgs): void {
            e.Handled = true;
        }
        
        Esc_KeyDown(sender: Object, e: KeyEventArgs): void {
            if (e.Key == Key.Escape) {
                  }
        }
        
}