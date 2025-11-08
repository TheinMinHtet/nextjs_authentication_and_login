"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const router = useRouter();

  const pswreg = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  // Real-time validation
  const validateField = (fieldName, value) => {
    let message = "";

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          message = "Name is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          message = "Name can only contain letters and spaces";
        }
        break;

      case "email":
        if (!value.trim()) {
          message = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = "Please enter a valid email address";
        }
        break;

      case "password":
        if (!value) {
          message = "Password is required";
        } else if (value.length < 6 || value.length > 20 || !pswreg.test(value)) {
          message =
            "Password must be 6-20 characters and include at least one uppercase letter, one number, and one special character";
        }
        break;

      case "confirmPassword":
        if (!value) {
          message = "Confirm password is required";
        } else if (value !== password) {
          message = "Passwords do not match";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: message }));
  };

  // Validate all fields before submit
  const validateForm = () => {
    validateField("name", name);
    validateField("email", email);
    validateField("password", password);
    validateField("confirmPassword", confirmPassword);

    return (
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword &&
      name &&
      email &&
      password &&
      confirmPassword
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrors((prev) => ({
        ...prev,
        general: "Please fix the highlighted errors",
      }));
      return;
    }

    try {
      // Check if user already exists
      const responseUserExist = await fetch("/api/userExists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!responseUserExist.ok) throw new Error("Failed to check user existence");

      const { user } = await responseUserExist.json();
      if (user) {
        setErrors((prev) => ({
          ...prev,
          general: "User with this email already exists",
        }));
        return;
      }

      // Register new user
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        e.target.reset();
        router.push("/verify-waiting");
      } else {
        setErrors((prev) => ({
          ...prev,
          general: "Registration failed. Please try again.",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error.message || "An unexpected error occurred",
      }));
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="w-100 p-6 border border-black-400 rounded-lg shadow-xl border-t-3">
        <h2 className="text-xl font-bold mb-4 text-center">Sign up</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Name */}
          <input
            onChange={(e) => {
              setName(e.target.value);
              validateField("name", e.target.value);
            }}
            type="text"
            placeholder="Full Name"
            className="border rounded p-2"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}

          {/* Email */}
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
            type="email"
            placeholder="Email"
            className="border rounded p-2"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

          {/* Password */}
          <div className="relative">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                validateField("password", e.target.value);
              }}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border rounded p-2 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-sm text-gray-600 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}

          {/* Confirm Password */}
          <div className="relative">
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateField("confirmPassword", e.target.value);
              }}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="border rounded p-2 w-full"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-sm text-gray-600 cursor-pointer"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">{errors.confirmPassword}</p>
          )}

          <button className="bg-black border rounded-lg text-white font-bold cursor-pointer px-6 py-2">
            Sign up
          </button>

          <span className="text-center">or</span>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="bg-black border rounded-lg text-white font-bold cursor-pointer px-6 py-2"
          >
            Sign up with Google
          </button>

          {errors.general && (
            <div className="text-white text-sm bg-red-600 rounded-lg w-fit px-2 py-1">
              {errors.general}
            </div>
          )}

          <div className="text-sm text-right">
            Already have an account?
            <Link href={"/"}>
              <span className="underline underline-offset-3"> Log In </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
