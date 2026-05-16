"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { text } from "stream/consumers";
export default function SideMenu() {
    const [open, setOpen] = useState(false);

    return (
        <div>

            <div
                style={{ position: "absolute", right: 0, paddingRight: "1.5rem", color: "red" }}>
                <div className="hamburgers">
                    <label className="hamburger">
                        <input onClick={() => setOpen(prev => !prev)} type="checkbox" />
                        <span style={open ? { backgroundColor: "black" } : { background: "linear-gradient(to bottom, #830e50, #f9d9e0)", backgroundAttachment: "fixed" }} className="bar"></span>
                        <span style={open ? { backgroundColor: "black" } : { background: "linear-gradient(to bottom, #830e50, #f9d9e0)", backgroundAttachment: "fixed" }} className="bar"></span>
                        <span style={open ? { backgroundColor: "black" } : { background: "linear-gradient(to bottom, #830e50, #f9d9e0)", backgroundAttachment: "fixed" }} className="bar"></span>
                    </label>
                </div>
            </div>
     
            <div className={`menu ${open ? "active" : ""}`}>
                <a style={{ fontWeight: "bold" }} href="#">Home</a>
                <a style={{ fontWeight: "bold" }} href="#">Bookings</a>
                <a style={{ fontWeight: "bold" }} href="#">Gallery</a>
                <a style={{ fontWeight: "bold" }} href="#">Contact</a>
                <a style={{ fontWeight: "bold" }} href="#">Dashboard</a>

                <div className="kailenColorsReverse">K1aws By Kai</div>
                
            </div>



        </div>



    );
}