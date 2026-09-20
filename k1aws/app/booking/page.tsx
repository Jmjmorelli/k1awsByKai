"use client";
import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

// Database Interfaces
interface Category {
    categoryID: number; // or id depending on your API
    categoryName: string;
}

interface Service {
    serviceID: number;
    categoryID: number;
    serviceName: string;
    servicePrice: string | number;
    serviceDuration: string;
    serviceDescription: string;
    isActive?: boolean;
}

const LENGTH_OPTIONS = ["Short", "Medium", "Long"];
const SHAPE_OPTIONS = ["Almond", "Stiletto", "Square"];

export default function Booking() {

    const [currentStep, setCurrentStep] = useState<number>(1);

    // for API
    const [categories, setCategories] = useState<Category[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Selections
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [nailLength, setNailLength] = useState<string>("");
    const [nailShape, setNailShape] = useState<string>("");
    const [value, setValue] = useState<Dayjs | null>(dayjs());

    // Fetch Categories and Services
    useEffect(() => {
        async function fetchData() {
            try {
                const [catRes, srvRes] = await Promise.all([
                    fetch("http://localhost:5283/api/admin/kai/categories"),
                    fetch("http://localhost:5283/api/admin/kai/services"),
                ]);

                const catData: Category[] = await catRes.json();
                const srvData: Service[] = await srvRes.json();

                setCategories(catData);
                // Filter out inactive services if applicable
                setServices(srvData.filter((s) => s.isActive ?? true));
            } catch (error) {
                console.error("Failed to fetch booking data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Jump directly to a step via Breadcrumbs
    const goToStep = (step: number) => {
        if (step < 2) setSelectedCategory(null);
        if (step < 3) setSelectedService(null);
        if (step < 4) setNailLength("");
        if (step < 5) setNailShape("");
        setCurrentStep(step);
    };

    if (loading) {
        return <div className="text-center mt-16 text-lg">Loading services...</div>;
    }

    return (
        <div>
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translate(-50%)",
                    marginTop: "4rem",
                }}
                className="breadcrumbs text-sm"
            >
                <ul>
                    {selectedCategory && (
                        <li>
                            <a onClick={() => goToStep(1)} className="cursor-pointer">
                                {selectedCategory.categoryName}
                            </a>
                        </li>
                    )}
                    {selectedService && (
                        <li>
                            <a onClick={() => goToStep(2)} className="cursor-pointer">
                                {selectedService.serviceName}
                            </a>
                        </li>
                    )}
                    {nailLength && (
                        <li>
                            <a onClick={() => goToStep(3)} className="cursor-pointer">
                                {nailLength}
                            </a>
                        </li>
                    )}
                    {nailShape && (
                        <li>
                            <a onClick={() => goToStep(4)} className="cursor-pointer">
                                {nailShape}
                            </a>
                        </li>
                    )}
                </ul>
            </div>

            <div className="pt-24">
                {/* STEP 1: Select Category */}
                {currentStep === 1 && (
                    <div className="cardGroupCss">
                        {categories.map((category) => {
                            // Calculate starting price based on available services in this category
                            const categoryServices = services.filter(
                                (s) => s.categoryID === category.categoryID
                            );
                            const minPrice =
                                categoryServices.length > 0
                                    ? Math.min(...categoryServices.map((s) => Number(s.servicePrice)))
                                    : 0;

                            return (
                                <div
                                    key={category.categoryID}
                                    className="card w-96 bg-base-100 shadow-sm cardCss"
                                >
                                    <div className="card-body">
                                        <div className="flex justify-between">
                                            <h2 className="text-3xl font-bold">{category.categoryName}</h2>
                                            {minPrice > 0 && <span className="text-xl">${minPrice}+</span>}
                                        </div>
                                        <div className="mt-6">
                                            <button
                                                onClick={() => {
                                                    setSelectedCategory(category);
                                                    setCurrentStep(2);
                                                }}
                                                className="button-23"
                                                style={{ width: "100%" }}
                                            >
                                                Select
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* STEP 2: Select Specific Service */}
                {currentStep === 2 && (
                    <div className="cardGroupCss">
                        {services
                            .filter((service) => service.categoryID === selectedCategory?.categoryID)
                            .map((service) => (
                                <div key={service.serviceID} className="card w-96 bg-base-100 shadow-sm cardCss">
                                    <div className="card-body">
                                        <div className="flex justify-between">
                                            <h2 className="text-3xl font-bold">{service.serviceName}</h2>
                                            <span className="text-xl">${service.servicePrice}</span>
                                        </div>
                                        <ul className="mt-6 flex flex-col gap-2 text-xs">
                                            <li>{service.serviceDescription}</li>
                                        </ul>
                                        <div className="mt-6">
                                            <button
                                                onClick={() => {
                                                    setSelectedService(service);
                                                    setCurrentStep(3);
                                                }}
                                                className="button-23"
                                                style={{ width: "100%" }}
                                            >
                                                Select
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                {/* STEP 3: Select Nail Length */}
                {currentStep === 3 && (
                    <div className="cardGroupCss">
                        <p className="w-full text-center text-lg font-semibold mb-4">
                            Please select a length
                        </p>
                        {LENGTH_OPTIONS.map((length) => (
                            <div key={length} className="card w-96 bg-base-100 shadow-sm cardCss">
                                <div className="card-body">
                                    <div className="flex justify-between">
                                        <h2 className="text-3xl font-bold">{length}</h2>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            onClick={() => {
                                                setNailLength(length);
                                                setCurrentStep(4);
                                            }}
                                            className="button-23"
                                            style={{ width: "100%" }}
                                        >
                                            Select
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* STEP 4: Select Nail Shape */}
                {currentStep === 4 && (
                    <div className="cardGroupCss">
                        <p className="w-full text-center text-lg font-semibold mb-4">
                            Please select a Shape
                        </p>
                        {SHAPE_OPTIONS.map((shape) => (
                            <div key={shape} className="card w-96 bg-base-100 shadow-sm cardCss">
                                <div className="card-body">
                                    <div className="flex justify-between">
                                        <h2 className="text-3xl font-bold">{shape}</h2>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            onClick={() => {
                                                setNailShape(shape);
                                                setCurrentStep(5);
                                            }}
                                            className="button-23"
                                            style={{ width: "100%" }}
                                        >
                                            Select
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* STEP 5: Date Calendar */}
                {currentStep === 5 && (
                    <div className="cardGroupCss">
                        <div className="card w-96 bg-base-100 shadow-sm cardCss">
                            <div className="card-body">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                        sx={{ bgcolor: "transparent" }}
                                        slotProps={{
                                            day: {
                                                sx: {
                                                    "&.Mui-selected": {
                                                        backgroundColor: "green",
                                                        color: "black",
                                                        "&:hover": { backgroundColor: "yellow" },
                                                    },
                                                    "&.MuiPickersDay-today": {
                                                        borderColor: "secondary.main",
                                                        color: "secondary.main",
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                                <ul className="mt-6 flex flex-col gap-2 text-xs">
                                    <li>
                                        <strong>Selected Date:</strong> {value?.toDate().toLocaleDateString()}
                                    </li>
                                    <li>
                                        <strong>Service:</strong> {selectedCategory?.categoryName} - {selectedService?.serviceName}
                                    </li>
                                    <li>
                                        <strong>Details:</strong> {nailLength} length, {nailShape} shape
                                    </li>
                                </ul>
                                <div className="mt-6">
                                    <button onClick={() => alert("Booking confirmed!")} className="button-23" style={{ width: "100%" }}>
                                        Proceed
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
