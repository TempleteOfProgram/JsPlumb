// import { NodeComponent } from "./node.component";
import { NodeService } from "./shared/node.service";
import { Component, OnInit, Input, ViewContainerRef, ViewChild } from "@angular/core";



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
  ngOnInit() {  // dynamic load

        this.nodeService.setRootViewContainerRef(this.viewContainerRef);

        // this.nodes.forEach(node => {
        //   this.nodeService.createNode(node);
        // });

        // setTimeout(() => {
        //   this.connections.forEach(connection => {
        //     this.nodeService.addConnection(connection);
        //   });
        // });
  }




  createNode() {
    var temp = String.fromCharCode(Math.floor(Math.random()*100));
    var node = { id: temp};
    this.nodeService.createNode(node);
  }
  saveNodeJson() {
    const container = this.viewContainerRef.element.nativeElement.parentNode;
    const nodes = Array.from(container.querySelectorAll(".node")).map((node: any) => {
      return {
        id: node.id,
        top: node.offsetTop,
        left: node.offsetLeft,
      };
    });
    const connections = (this.nodeService.jsPlumbInstance.getAllConnections() as any[])
                        .map((conn) => ({ uuids: conn.getUuids() }));
    const json = JSON.stringify({ nodes, connections });
    console.log(json);
  }
}