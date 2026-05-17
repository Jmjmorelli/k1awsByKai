import Image from "next/image";
import TopMenuBar from "./components/TopMenuBar";
import SideMenu from "./components/SideMenu";

import leftNail from "../public/leftNails.png";
import rightNail from "../public/rightNails.png";
import kai from "../public/output-onlinepngtools.png";
import { relative } from "path";

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
        <div className="description" style={{ color: "#f9d9e0" }}>
          GEL X | HARD GEL | GEL POLISH | SOFT GEL
        </div>
        <div style={{ justifyContent: "center", display: "flex", color: "#f9d9e0", gap: "5rem", paddingTop: "1.5rem" }}>
          <div style={{ position: "relative", width: "100vw", marginTop: "-150px" }}>
            <Image style={{}} src={kai} width={250} loading="eager"
              height={100} alt="Face" />
          </div>
        </div>
        <div>
          <div className="description" style={{ width: "30vw" }}>
            Quick Description here, of how I will make your nails look super super pretty!
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", color: "#f9d9e0", fontSize: "30px" }}>
          Policies
        </div>

        {/* <div className="description" style={{alignSelf: "flex-end"}}>
wewe
    </div> */}
      </div>
      {/* <div style={{ display: "flex", flexDirection: "column", marginTop: "8rem", fontSize: "25px", textAlign: "center", height: "auto" }}>
        <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{ fontWeight: "bold", height: "14rem", alignSelf: "flex-start", marginLeft: "10vh", color: "#f9d9e0" }}>Me</div>
        <div className="description" style={{ height: "14rem", alignSelf: "flex-end", marginLeft: "10vh", color: "#f9d9e0" }}>Kailen Simpson</div>
        </div>
        <div style={{ fontWeight: "bold", height: "14rem", alignSelf: "flex-end", marginRight: "10vh", color: "#a5476f" }}>Policies</div>
        <div className="subKailenColors" style={{ fontWeight: "bold", height: "14rem", alignSelf: "flex-start", marginLeft: "10vh" }}>Pricing</div>
      </div> */}

      <div style={{ display: "flex", flexDirection: "column", marginTop: "1rem", fontSize: "25px", textAlign: "center", marginBottom: "5rem" }}>

        {/* <div>
          <div className="button-23">book</div>
        </div> */}
      </div>
      {/* <div style={{ marginTop: "10rem", background: "linear-gradient(to top, #830e50, #a3496f, #c27992, #dea8b7, #f9d9e0)", height: "5rem"}}>some footer!</div> */}
    </div>
  );
}
