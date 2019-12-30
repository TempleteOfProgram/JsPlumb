import { NodesContainerComponent } from "./nodes-container.component";
import { Component, Input, AfterViewInit } from "@angular/core";


export class Node {
  id: string;
}

@Component({
  selector: "node",
  template: `
  <div class="node" id="{{node.id}}"> State: {{node.id}}
      <input
          [(ngModel)]="node.id"
          style="input[type=text] {
                  width: 50%;
                  padding: 12px 20px;
                  margin: 8px 0;
                  box-sizing: border-box;
                }" />
  </div>`,
  styles: [`.node {position: absolute;width: 150px;height: 50px;
  padding: 4px;box-shadow: 0 10px 40px 0 #B0C1D9;text-align: center;}`]
})


export class NodeComponent implements AfterViewInit {
  constructor(private nodeCom : NodesContainerComponent) { }

  @Input() node: Node;
  @Input() jsPlumbInstance;

  // tslint:disable-next-line: typedef
  ngAfterViewInit() {
    // tslint:disable-next-line: typedef
    const exampleDropOptions = {
      tolerance: "touch",
      hoverClass: "dropHover",
      activeClass: "dragActive"
    };

    // tslint:disable-next-line: typedef
    let Endpoint_From = {
      endpoint: ["Dot", { radius: 7 }],
      paintStyle: { fill: "#99cb3a" },
      isSource: true,
      scope: "jsPlumb_DefaultScope",
      connectorStyle: { stroke: "#99cb3a", strokeWidth: 3 },
      connector: ["Bezier", { curviness: 63 }],
      maxConnections: 30,
      isTarget: false,
      connectorOverlays: [["Arrow", { location: 1 }]],
      dropOptions: exampleDropOptions
    };

    // tslint:disable-next-line: typedef
    let Endpoint_TO = {
      endpoint: ["Dot", { radius: 4 }],
      paintStyle: { fill: "#ffcb3a" },
      isSource: false,
      scope: "jsPlumb_DefaultScope",
      maxConnections: 1,
      isTarget: true,
      dropOptions: exampleDropOptions
    };


    const { id } = this.node;
    this.jsPlumbInstance.addEndpoint(id, { anchor: "Bottom", uuid: id + "_bottom" }, Endpoint_From);
    this.jsPlumbInstance.addEndpoint(id, { anchor: "Top", uuid: id + "_top" }, Endpoint_TO);
    this.jsPlumbInstance.draggable(id);
  }

  // onKey(event) {
  //   console.log(event);
  //   this.nodeCom.serverName = event.target.value;
  //   const inputValue = event.target.value;
  // }

}
