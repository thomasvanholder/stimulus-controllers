import { Controller } from "@hotwired/stimulus"
import {enter, leave} from 'el-transition';

export default class extends Controller {
  static targets = ["modal", "modalBackground", "modalBody"]
  static values = { open: Boolean }

  connect(){
    console.log("Modal Controller")
  }

  toggle(e){
    e.preventDefault();
    this.openValue = !this.openValue
  }

  openValueChanged() {
    this.openValue ? this._open() : this._close()
  }
  
  _open(){
    this.modalTarget.classList.remove("hidden")
    enter(this.modalBackgroundTarget)
    enter(this.modalBodyTarget)

  }
  
  _close(){
    this.modalTarget.classList.add("hidden")
    leave(this.modalBackgroundTarget)
    leave(this.modalBodyTarget)
    this._emptyInputs()
  }

  _emptyInputs(){
    const inputs = this.element.querySelectorAll("input[type=text], input[type=number], input[type=email]")
    inputs.forEach(input => {
      if (!input.disabled) {
        input.value = null
      }
    })
  }

  escapeKeyPressed(event) {
    if (event.keyCode == 27) {
      if (!this.modalTarget.classList.contains("hidden")) {
        this._close()
      }
    }
  }
}
