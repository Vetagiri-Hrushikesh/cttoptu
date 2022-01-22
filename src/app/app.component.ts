import { Component } from '@angular/core';
import * as converter from 'xml-js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cttoptu';
  list: any = [];
  varTag: any = {}
 
  load() {
    fetch('../assets/CTtoPTU.xml').then((response) => {
      response.text().then((xml) => {
        const parser = new DOMParser().parseFromString(xml, "text/xml");;
        var vars = parser.getElementsByTagName("message");
        for (var i = 0; i < vars.length; i++) {
          for (var j = 0; j < vars[i].children.length; j += 1) {
            if ((vars[i].children[j].nodeName) == "var") {
              this.varTag[String(vars[i].children[j].getAttribute("name"))] = null;
            }
            else if ((vars[i].children[j].nodeName) == "bitfield") {
              for (var k = 0; k < vars[i].children[j].children.length; k++) {
                this.varTag[String(vars[i].children[j].children[k].getAttribute("name"))] = null
              }
            }
          }
        }
        console.log(this.varTag)

      });
    });
  }

  constructor() {
    // this.loadxml();
    this.load();
  }


}
