import Image from "next/image";
import TopMenuBar from "./components/TopMenuBar";
import SideMenu from "./components/SideMenu";

import leftNail from "../public/leftNails.png";
import rightNail from "../public/rightNails.png";
import kai from "../public/Untitled design (3)-modified.png";
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
        <div style={{ justifyContent: "center", display: "flex", color: "#f9d9e0", gap: "5rem", paddingTop: "2rem" }}>
          <div style={{ position: "relative", marginTop: "-50px" }}>
            <Image style={{}} src={kai} width={150} loading="eager"
              height={100} alt="Face" />
          </div>

          <div className="description" style={{ width: "40vw", marginLeft: "-30px", background: "transparent", color: "linear-gradient(to bottom, #830e50, #f9d9e0)" }}>
            Quick Description here, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </div>
        </div>
        <div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", color: "#f9d9e0", fontSize: "30px", marginTop: "2rem", fontWeight: "bold" }}>
          Policies
        </div>
        <div style={{display: "flex", justifyContent: "center", gap: "1rem", padding: "1rem"}}>
          <div style={{width: "33%", textAlign: "center", border: "1px solid black", height: "10rem", fontWeight: "bold"}}>
            Payment
            <p className="description">deposits and tings</p>
          </div>
          <div style={{width: "33%", textAlign: "center", border: "1px solid black", height: "10rem", fontWeight: "bold"}}>
            Card1
          </div>
          <div style={{width: "33%", textAlign: "center", border: "1px solid black", height: "10rem", fontWeight: "bold"}}>
            Card1
          </div>
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

        {/* <div style={{marginTop: "100rem"}}>
          <div className="button-23">book</div>
        </div> */}
      </div>
      {/* <div style={{ marginTop: "10rem", background: "linear-gradient(to top, #830e50, #a3496f, #c27992, #dea8b7, #f9d9e0)", height: "5rem"}}>some footer!</div> */}
    </div>
  );
}
