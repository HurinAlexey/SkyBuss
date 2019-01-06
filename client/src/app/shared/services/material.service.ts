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

}
