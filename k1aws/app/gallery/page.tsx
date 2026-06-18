"use client";

export default function Gallery() {

    return (
        <div>
            <span>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "4rem" }} className="breadcrumbs text-sm">
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>Documents</a></li>
                        <li>Add Document</li>
                    </ul>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: "2rem", marginTop: "-6rem" }}>

                    <div className="card w-96 bg-base-100 shadow-sm">
                        <div className="card-body">
                            <span className="badge badge-xs badge-warning">Most Popular</span>
                            <div className="flex justify-between">
                                <h2 className="text-3xl font-bold">GEL-X</h2>
                                <span className="text-xl">$40</span>
                            </div>
                            <ul className="mt-6 flex flex-col gap-2 text-xs">
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>GEL-X</span>
                                </li>

                            </ul>
                            <div className="mt-6">
                                <button className="btn btn-primary btn-block">Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <div className="card w-96 bg-base-100 shadow-sm">
                        <div className="card-body">
                            {/* <span className="badge badge-xs badge-warning">Most Popular</span> */}
                            <div className="flex justify-between">
                                <h2 className="text-3xl font-bold">Natural Builder Gel Overlay </h2>
                                <span className="text-xl">$40</span>
                            </div>
                            <ul className="mt-6 flex flex-col gap-2 text-xs">
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>High-resolution image generation</span>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Customizable style templates</span>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>Batch processing capabilities</span>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span>AI-driven image enhancements</span>
                                </li>

                                {/* <li className="opacity-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    <span className="line-through">Real-time collaboration tools</span>
                                </li> */}
                            </ul>
                            <div className="mt-6">
                                <button className="btn btn-primary btn-block">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fab fab-flower">
                    {/* a focusable div with tabIndex is necessary to work on all browsers. role="button" is necessary for accessibility */}
                    <div tabIndex={0} role="button" className="btn btn-lg btn-circle btn-success">F</div>

                    {/* Main Action button replaces the original button when FAB is open */}
                    <button className="fab-main-action btn btn-circle btn-lg">M</button>

                    {/* buttons that show up when FAB is open */}
                    <button className="btn btn-lg btn-circle">A</button>
                    <button className="btn btn-lg btn-circle">B</button>
                    <button className="btn btn-lg btn-circle">C</button>
                    <button className="btn btn-lg btn-circle">D</button>
                </div>
            </span>

        </div>
    )
}