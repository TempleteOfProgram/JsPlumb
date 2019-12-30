import { NodeComponent } from "./node.component";
import { NodeService } from "./shared/node.service";
import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy, ViewContainerRef, ViewChild } from "@angular/core";



@Component({
  selector: "nodes-container",
  templateUrl: "./nodes-container.component.html",
  styleUrls: ["./nodes-container.component.css"],

})
export class NodesContainerComponent implements OnInit {

  @Input() nodes = [];
  @Input() connections = [];
  @ViewChild("nodes", { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
  serverName: any;


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
  createNode() {
    // get an input form user and set the name = input
    // tslint:disable-next-line: typedef
    var node = { id: "state : " + this.serverName };
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