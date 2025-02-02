import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";

const Book = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const navigate = useNavigate();
    const logoutUser = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // ✅ Send cookies
            });

            const data = await response.json();

            if (data.success) {
                alert("User logged out successfully");
                navigate("/login")
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    return (
        <div className="w-screen h-screen bg-slate-600">
            {isAuthenticated ? (
                <button
                    className="absolute top-3 right-4 bg-slate-900 text-white py-2 px-4 rounded-md outline border-white hover:text-slate-900 hover:bg-white hover:border-slate-950"
                    onClick={logoutUser}
                >
                    Log out
                </button>
            ) : (
                <button
                    className="absolute top-3 right-4 bg-slate-900 text-white py-2 px-4 rounded-md outline border-white hover:text-slate-900 hover:bg-white hover:border-slate-950"
                    onClick={() => navigate("/login")}
                >
                    Log in
                </button>
            )}
        </div>
    );
};

export default Book;
