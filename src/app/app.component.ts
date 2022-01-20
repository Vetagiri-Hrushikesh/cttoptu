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
              this.varTag = {
                addr: vars[i].children[j].getAttribute("addr") ? vars[i].children[j].getAttribute("addr") : '',
                name: vars[i].children[j].getAttribute("name") ? vars[i].children[j].getAttribute("name") : '',
                type: vars[i].children[j].getAttribute("type") ? vars[i].children[j].getAttribute("type") : '',
                value: null
              }
              this.list.push(this.varTag);
            } else if ((vars[i].children[j].nodeName) == "bitfield") {
              this.varTag = {
                addr: vars[i].children[j].getAttribute("addr") ? vars[i].children[j].getAttribute("addr") : '',
              }
              for (var k = 0; k < vars[i].children[j].children.length; k++) {
                var bitChild = vars[i].children[j].children[k].getAttribute("number")
                var bittag = new Map()
                if (bitChild != null) {
                  this.varTag[bitChild] = vars[i].children[j].children[k].attributes;
                }
              }
              this.list.push(this.varTag)
            }
          }
        }
        console.log(this.list)
        
      });
    });
  }

  constructor() {
    // this.loadxml();
    this.load();
  }


}
