import { Component, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'dash-data-table',
  styleUrl: 'dash-data-table.css',
  shadow: true,
})
export class DashTable {
  //#region Own properties
  //#endregion

  //#region @Element
  //#endregion

  //#region @State

  @State() headers: string[] = [];

  @State() data: Array<Array<string | number | boolean>> = [];

  //#endregion

  //#region @Prop

  /**
   * JSON data for table
   */
  @Prop({ reflect: true }) json: Record<string, string | number | boolean>[];
  @Watch('json')
  jsonChanged() {
    this.processJson();
  }

  /**
   * Whether to display the table with alternating row colors
   * @default false
   */
  @Prop({ reflect: true }) striped: boolean;

  //#endregion

  //#region @Event
  //#endregion

  //#region Component lifecycle

  componentWillLoad() {
    this.processJson();
  }

  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method
  //#endregion

  //#region Local methods

  processJson() {
    const json = this.json ?? [];

    // find out how many columns there are
    const headers = Array.from(
      json.reduce((headers, row) => {
        Object.keys(row).forEach(key => {
          headers.add(key);
        });
        return headers;
      }, new Set<string>()),
    );

    // create table data
    const data = json.map(row => headers.map(header => row[header]));

    this.headers = headers;
    this.data = data;
  }

  //#endregion

  render() {
    return (
      <div class='data-table'>
        <table>
          <thead>
            <tr>
              {this.headers.map(header => (
                <th>{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {this.data.map(row => (
              <tr>
                {row.map(cell => (
                  <td>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
