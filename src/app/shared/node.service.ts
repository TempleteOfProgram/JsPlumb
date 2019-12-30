import { jsPlumb } from "jsplumb";
import { NodeComponent, Node } from "../node.component";
import {ComponentFactoryResolver,Injectable} from "@angular/core";


@Injectable()
export class NodeService {

  private rootViewContainer: any;
  jsPlumbInstance = jsPlumb.getInstance();

  constructor(private factoryResolver: ComponentFactoryResolver) { }
        // tslint:disable-next-line: typedef
        public setRootViewContainerRef(viewContainerRef) {
          this.rootViewContainer = viewContainerRef;
        }
        // tslint:disable-next-line: typedef
        public createNode(node: Node) {
          // tslint:disable-next-line: typedef
          const factory = this.factoryResolver.resolveComponentFactory(NodeComponent);
          // tslint:disable-next-line: typedef
          const component = factory.create(this.rootViewContainer.parentInjector);
          (<any>component.instance).node = node;
          (<any>component.instance).jsPlumbInstance = this.jsPlumbInstance;
          this.rootViewContainer.insert(component.hostView);
          console.log("in NodeService.." , component.instance );
        }

        // tslint:disable-next-line: typedef
        addConnection(connection) {
          this.jsPlumbInstance.connect({ uuids: connection.uuids });
        }

        // tslint:disable-next-line: typedef
        public clear() {
          this.rootViewContainer.clear();
        }
}

