import { Component} from "@angular/core";


@Component({
  selector: "my-app",
  template: `
        <button   (click)="nodeContainer.createNode()">
          Add State
        </button>
        <nodes-container #nodeContainer [nodes]="nodes" [connections]="connections"></nodes-container>
      `
})
export class AppComponent {

  nodes = [];
  connections = [];
     
      fillFromJson() {
          const json = `{"nodes":[{"id":"Step_0 id: b46a17"},{"id":"Step_1 id: efd2ce"},{"id":"Step id_2eb091"}],
                        
                        "connections":[{"uuids":["Step_0 id: b46a17_bottom",
                                      "Step_1 id: efd2ce_top"]},{"uuids":["Step id_2eb091_bottom","Step_0 id: b46a17_top"]}]
                        }`;
          const data = JSON.parse(json);
          this.nodes = data.nodes;
          this.connections = data.connections;
      }

}

