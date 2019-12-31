import { NodeService } from "./shared/node.service";
import { NodesContainerComponent } from "./nodes-container.component";
import { Component, Input, AfterViewInit } from "@angular/core";


// tslint:disable-next-line: interface-name
export interface Node {
  id: any;
}

@Component({
  selector: "node",
  template: `
  <div class="node" id="{{node.id}}">
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="removeNode(node)"> <span aria-hidden="true">×</span>
      </button>

      <br>Status Name:

      <input
          style=" width: 60%;
                  height: 20%;"
                  [(ngModel)]="node.id"
      />
  </div>`,
  styles: [`.node {
                margin-top:20px;
                border:1px solid #000;
                position: absolute;
                width: 150px;
                height: 100px;
                padding: 4px;
                text-align: center;
                border-radius: 50%;
                }`]
})


export class NodeComponent implements AfterViewInit {
  constructor(private nodeCom : NodesContainerComponent, private nodeService: NodeService) { }

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
      connector: ["Bezier", { curviness: 1 }],
      maxConnections: 10,
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
      maxConnections: 10,
      isTarget: true,
      dropOptions: exampleDropOptions
    };


    const { id } = this.node;
    this.jsPlumbInstance.addEndpoint(id, { anchor: "Bottom", uuid: id + "_bottom" }, Endpoint_From);
    this.jsPlumbInstance.addEndpoint(id, { anchor: "Top", uuid: id + "_top" }, Endpoint_TO);
    this.jsPlumbInstance.draggable(id);
  }
  // tslint:disable-next-line: typedef
  removeNode(node:Node) {
    this.nodeService.removeNode(node);
  }
  // onKey(event) {
  //   console.log(event);
  //   this.nodeCom.serverName = event.target.value;
  //   const inputValue = event.target.value;
  // }

}
