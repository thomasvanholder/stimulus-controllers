import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["panel", "tab"]
  static classes = ["active", "default"]

  connect(){
    console.log("Tab Controller")
  }

  change(event){
    event.preventDefault()

    const clickedTab = event.target
    const tabPosition = this.tabTargets.indexOf(clickedTab)

    this.setActiveTab(clickedTab)
    this.setDefaultTabs(this.tabTargets.filter(tab => tab !== clickedTab))

    const activePanel = this.panelTargets[tabPosition]
    this.setActivePanel(activePanel)
    this.setDefaultPanels(this.panelTargets.filter(panel => panel !== activePanel))
  }

  setActiveTab(tab){
    tab.classList.remove(...this.defaultClasses)
    tab.classList.add(...this.activeClasses)
  }

  setDefaultTabs(tabs){
    tabs.forEach(tab => {
      tab.classList.remove(...this.activeClasses)
      tab.classList.add(...this.defaultClasses)
    });
  }

  setActivePanel(panel){
    panel.classList.replace("hidden", "block")
  }

  setDefaultPanels(panels){
    panels.forEach(panel => {
      panel.classList.replace("block", "hidden")
    });
  }
}
