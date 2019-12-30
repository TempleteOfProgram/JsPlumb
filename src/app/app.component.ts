import { Component} from "@angular/core";


@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  nodes = [];
  connections = [];
      // tslint:disable-next-line: typedef
      fillFromJson() {
          // tslint:disable-next-line: max-line-length
          // tslint:disable-next-line: typedef
          const json = `{"nodes":[{"id":"Step_0 id: b46a17","top":177,"left":146},
                        {"id":"Step_1 id: efd2ce","top":302,"left":130},
                        {"id":"Step id_2eb091","top":41,"left":158}],
                        "connections":[{"uuids":["Step_0 id: b46a17_bottom",
                        "Step_1 id: efd2ce_top"]},{"uuids":["Step id_2eb091_bottom","Step_0 id: b46a17_top"]}]}`;
          // tslint:disable-next-line: typedef
          const data = JSON.parse(json);
          this.nodes = data.nodes;
          this.connections = data.connections;
      }

}

