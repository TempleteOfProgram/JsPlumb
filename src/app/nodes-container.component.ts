import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy, ViewContainerRef, ViewChild } from "@angular/core";
import { NodeService } from "./shared/node.service";



@Component({
  selector: "nodes-container",
  templateUrl: "./nodes-container.component.html",
  styleUrls: ["./nodes-container.component.css"],

})
export class NodesContainerComponent implements OnInit {

  @Input() nodes = [];
  @Input() connections = [];
  @ViewChild("nodes", { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;


  constructor(private nodeService: NodeService) {}
  // tslint:disable-next-line: typedef
  ngOnInit() {  // dynamic load

        this.nodeService.setRootViewContainerRef(this.viewContainerRef);

        this.nodes.forEach(node => {
          this.nodeService.createNode(node);
        });

        setTimeout(() => {
          this.connections.forEach(connection => {
            this.nodeService.addConnection(connection);
          });
        });
  }


  // tslint:disable-next-line: typedef
  addNode() {
    // tslint:disable-next-line: typedef
    const node = { id: "Step id_"  + [Math.random().toString(16).slice(2, 8)], top: 1, left: 2 };
    this.nodeService.createNode(node);
  }


  // tslint:disable-next-line: typedef
  saveNodeJson() {
    // tslint:disable-next-line: typedef
    const container = this.viewContainerRef.element.nativeElement.parentNode;
    // tslint:disable-next-line: typedef
    const nodes = Array.from(container.querySelectorAll(".node")).map((node: HTMLDivElement) => {

      return {
        id: node.id,
        top: node.offsetTop,
        left: node.offsetLeft,
      };
    });

    // tslint:disable-next-line: typedef
    const connections = (this.nodeService.jsPlumbInstance.getAllConnections() as any[])
                        .map((conn) => ({ uuids: conn.getUuids() }));

    // tslint:disable-next-line: typedef
    const json = JSON.stringify({ nodes, connections });

    console.log(json);
  }
}