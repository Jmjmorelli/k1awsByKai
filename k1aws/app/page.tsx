import Image from "next/image";
import TopMenuBar from "./components/TopMenuBar";
import SideMenu from "./components/SideMenu";

import leftNail from "../public/leftNails.png";
import rightNail from "../public/rightNails.png";

export default function Home() {
  return (
    <div style={{}}>

      <TopMenuBar />
      <header>
        <SideMenu />
      </header>
      <div className="kailenColors">
        K1aws By Kai
      </div>
      <div>

      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: "8rem", fontSize: "25px", textAlign: "center" }}>
        <div className="subKailenColors" style={{ fontWeight: "bold", height: "15rem", alignSelf: "flex-start", marginLeft: "10vh" }}>Me</div>
        <div className="subKailenColors" style={{ fontWeight: "bold", height: "15rem", alignSelf: "flex-end", marginRight: "10vh" }}>Policies</div>
        <div className="subKailenColors" style={{ fontWeight: "bold", height: "15rem", alignSelf: "flex-start", marginLeft: "10vh" }}>Pricing</div>
      </div>

      <div style={{ marginTop: "50rem" }}>testing</div>
    </div>
  );
}
