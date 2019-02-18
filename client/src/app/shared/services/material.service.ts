import {ElementRef} from '@angular/core';

declare var M;

export interface MaterialInstance {
  open?(num?: number): void,
  close?(num?: number): void,
  destroy?(): void
}

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }

  static updateTextInputs() {
    M.updateTextFields()
  }

  static tapTargetInitialize(ref: ElementRef, options?: object) {
    return M.TapTarget.init(ref.nativeElement, options)
  }

  static collapsibleInitialize(ref: ElementRef, options?: object) {
    return M.Collapsible.init(ref.nativeElement, options)
  }

  static tooltipInitialize(selector: string) {
    let elems = document.querySelectorAll(selector);
    M.Tooltip.init(elems)
  }

  static sidenavInitialize(ref: ElementRef, options?: object) {
    return M.Sidenav.init(ref.nativeElement, options)
  }

  static modalInitialize(ref: ElementRef, options?: object) {
    return M.Modal.init(ref.nativeElement, options)
  }

}
