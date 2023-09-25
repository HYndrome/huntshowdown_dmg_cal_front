import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    box1Color: string;
    box2Color: string;
    textColor: string;
    textStrongColor: string;
    selectableColor: string;
    select1Color: string;
    select1StrongColor: string;
    select2Color: string;
    select2StrongColor: string;
  }
}
