import { NodeService } from "./shared/node.service";
import { NodesContainerComponent } from "./nodes-container.component";
import { Component, Input, AfterViewInit, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";
import { debounceTime } from "rxjs/operators";

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

      <input style="font-size:0.7em; padding:.5em;" type="text" [formControl]="nodeId"/>
  </div>`,
  styles: [`.node {
                margin-top:20px;
                border:1px solid #000;
                position: absolute;
                width: 150px;
                height: 100px;
                padding: 4px;
                text-align: center;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                }`]
})


export class NodeComponent implements OnInit, AfterViewInit {
  private subscriptions: Subscription = new Subscription;
  constructor(private nodeCom : NodesContainerComponent, private nodeService: NodeService) { }
  

  @Input() node: Node;
  nodeId = new FormControl('');
  @Input() jsPlumbInstance;

  ngOnInit(): void {
    this.setFromControlValue();
    const _nodeId = this.nodeId.valueChanges.pipe(debounceTime(500)).subscribe(value => this.updateNodeId(value));              
    this.subscriptions.add(_nodeId);
  }

  setFromControlValue(){
    if(this.node.id.length > 4){
      this.nodeId.setValue(this.node.id);
    }
  }

  updateNodeId(id){
    this.node.id = id;
  }
  ngAfterViewInit() {
    const exampleDropOptions = {
      tolerance: "touch",
      hoverClass: "dropHover",
      activeClass: "dragActive"
    };


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

  removeNode(node:Node) {
    this.nodeService.removeNode(node);
  }
  // onKey(event) {
  //   console.log(event);
  //   this.nodeCom.serverName = event.target.value;
  //   const inputValue = event.target.value;
  // }

}
