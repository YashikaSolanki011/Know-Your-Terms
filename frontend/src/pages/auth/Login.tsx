import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider, 
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import google from "../../assets/google.svg";
import login_svg from "../../assets/login.svg";
import { toast } from "react-toastify";
import { getCurrentUserAsync, registerAsync } from "../../store/authSlice";
import { useAppDispatch } from "../../hooks/redux";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pendingGoogleCred, setPendingGoogleCred] = useState<any>(null);
  const dispatch = useAppDispatch();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      // If there is a pending Google credential, link it now
      if (pendingGoogleCred) {
        const { linkWithCredential } = await import("firebase/auth");
        try {
          await linkWithCredential(userCredential.user, pendingGoogleCred);
          toast.success("Google account linked!");
          setPendingGoogleCred(null);
        } catch (linkError: any) {
          toast.error("Failed to link Google account: " + linkError.message);
        }
      }
      // Save token to localStorage
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem("idToken", idToken);
      dispatch(getCurrentUserAsync());
      toast.success("Login successful!");
      setLoading(false);
      navigate("/dashboard");
    } catch (error: any) {
      setLoading(false);
      setErrors({ general: error.message });
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrors({});
    const provider = new GoogleAuthProvider();
    try {
      const credential = await signInWithPopup(auth, provider);

      if ((credential as any)._tokenResponse && (credential as any)._tokenResponse.idToken) {
        // Save ID token to localStorage (from _tokenResponse.idToken)
        const idToken = (credential as any)._tokenResponse.idToken;
        localStorage.setItem("idToken", idToken);

        // Register user in backend (Firestore) if not already present
        const user = credential.user;
        try {
          await dispatch(registerAsync({
            email: user.email || '',
            displayName: user.displayName || '',
            region: '',
            language: 'en',
          })).unwrap();
          setGoogleLoading(false);
          toast.success("User login successfully");
        } catch (regErr: any) {
          // If already exists, ignore; else show error
          if (regErr?.message && !regErr.message.includes('already exists')) {
            toast.error(regErr.message || 'Failed to login user.');
            // Optionally return here
          }
          setGoogleLoading(false);
        }
        dispatch(getCurrentUserAsync());
        setGoogleLoading(false);
        navigate("/dashboard");
      } else {
        toast.error("Google login failed. No user information available.");
      }
    } catch (error: any) {
      // Handle account-exists-with-different-credential for account linking
      if (error.code === "auth/account-exists-with-different-credential") {
        const pendingCred = GoogleAuthProvider.credentialFromError(error);
        setPendingGoogleCred(pendingCred);
        const email = error.customData?.email;
        if (email) {
          // Fetch sign-in methods for this email
          import("firebase/auth").then(async (firebaseAuth) => {
            const methods = await firebaseAuth.fetchSignInMethodsForEmail(auth, email);
            if (methods.includes("password")) {
              toast.info("This email is registered with email/password. Please login with your password to link your Google account.");
              setFormData((prev) => ({ ...prev, email }));
            } else {
              toast.error("Account exists with a different sign-in method. Please use your original method to login and link Google from your profile settings.");
            }
          });
        } else {
          toast.error("Account exists with a different credential. Please use your original sign-in method.");
        }
      } else {
        setErrors({ general: error.message });
        toast.error(error.message || "Google login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa]">
      <div className="flex w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden border border-[#e0e3ef] bg-white">
        
        {/* Left: Illustration/Brand */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#e5e7eb] p-10">
          <img
            src="/logo.png"
            alt="Know Your Terms"
            className="h-36 w-36 object-contain mb-6"
          />
          <h2 className="text-3xl font-bold text-black mb-2 text-center">
            Welcome Back!
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-xs">
            Login to your account and simplify your legal journey with
            AI-powered document analysis.
          </p>
          <img src={login_svg} alt="Legal Illustration" className="mt-8 w-40" />
        </div>

        {/* Right: Login Form */}
        <div className="w-full md:w-1/2 bg-[#f9fafb] p-8 md:p-6 flex flex-col justify-center border-l border-[#e0e3ef]">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-black mb-1">
              Welcome Back!
            </h2>
            <p className="text-gray-700 text-sm">
              Please login to your account
            </p>
          </div>

          {/* Login with google */}
          <div className="flex gap-4">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="flex-1 flex items-center text-lg font-medium justify-center gap-2 border border-gray-200 rounded-lg py-1.5 hover:bg-gray-50"
            >
              <img src={google} alt="Google" className="w-6 h-6" />
                {googleLoading ? (
                  <svg className="animate-spin ml-2 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Google"
                )}
            </button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="mx-2 text-gray-400 text-sm">Or Login with</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Email address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="Enter your email"
                required
              />
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                placeholder="Enter your password"
                required
              />
            </div>
            {errors.general && (
              <p className="text-sm text-orange-600">{errors.general}</p>
            )}
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center text-sm text-black">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#CDA047] focus:ring-[#CDA047] border-[#e6e1d5]"
                />
                <span className="ml-2">Remember me</span>
              </label>
              {/* <Link
                to="/forgot-password"
                className="text-sm font-semibold text-[#CDA047] hover:underline"
              >
                Forgot your password?
              </Link> */}
            </div>

            <Button type="submit" className="w-full bg-gradient-to-br from-[#e5e7eb] via-[#f3f4f6] to-[#f9fafb] text-[#1a237e] font-bold text-lg rounded-full shadow-lg transition border border-[#b1b4b6] hover:bg-[#e0e7ef]" size="lg" loading={loading}>
              Login
            </Button>
            <p className="text-center text-sm text-gray-700 mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-black hover:underline"
              >
                Create one
              </Link>
            </p>
          </form>

          <div className="text-left mt-4">
            <p className="text-sm text-gray-600">Test Account:</p>
            <p className="text-sm text-gray-800">Email: knowyourterms@gmail.com</p>
            <p className="text-sm text-gray-800">Password: knowyourterms</p>
          </div>
        </div>
      </div>
      {/* Test account credentials */}
      <div className="flex justify-left items-left mt-4">

      </div>
    </div>
  );
};

export default Login;
