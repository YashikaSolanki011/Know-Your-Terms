import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { registerAsync } from '../../store/authSlice';
import { useAppDispatch } from '../../hooks/redux';
import { toast } from 'react-toastify';
import signup from "../../assets/signup.svg"

const Register: React.FC = () => {
 
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    language: '',
    region: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};


    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrors({});
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // Call backend API to create Firestore user profile via authService
      try {
        const result = await dispatch(registerAsync({
          email: formData.email,
          displayName: formData.name,
          region: formData.region,
          language: formData.language,
        })).unwrap();
        // console.log("Registration result:", result); // Debug log
        
        if (result.user) {
          toast.success("Account created successfully!");
          setLoading(false);
          navigate("/login");
        } else {
          toast.error("Failed to create account.");
        }
      } catch (apiError: any) {
        toast.error(apiError.message || "Failed to create account.");
        setLoading(false);
        return;
      }

    } catch (error: any) {
      let message = 'Registration failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email is already in use.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      }
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa]">
      <div className="flex w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden border border-[#e0e3ef] bg-white">
        {/* Left: Illustration/Brand */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#e5e7eb] p-10">
          <img src="/logo.png" alt="Know Your Terms Logo" className="h-36 w-36 object-contain mb-6" />
          <h2 className="text-3xl font-bold text-black mb-2 text-center">Create Your Account</h2>
          <p className="text-lg text-gray-700 text-center max-w-xs">
            Register to access AI-powered legal document analysis and more.
          </p>
          <img src={signup} alt="Legal Illustration" className="mt-8 w-40" />
        </div>
        {/* Right: Register Form */}
        <div className="w-full md:w-1/2 bg-[#f9fafb] p-8 md:p-6 flex flex-col justify-center border-l border-[#e0e3ef]">
          <div className="flex flex-col items-center mb-6">
            <img src="https://www.svgrepo.com/show/499964/law-legal-justice-10.svg" alt="Legal Platform Logo" className="h-14 w-14 object-contain md:hidden mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">Sign up Know your terms</h2>
            <p className="text-gray-700 text-sm">
              Please sign up for your account
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="bg-[#e8eaf6] border-l-4 border-[#1a237e] text-[#1a237e] px-4 py-3 rounded-lg text-sm shadow-sm mb-2">
                <div className="flex items-center">
                  <span className="mr-2">⚠️</span>
                  {errors.general}
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
                placeholder="Enter your full name"
                required
              />
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="your.email@gov.in"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-black mb-1">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="block w-full px-3 py-2.5 bg-white border border-[#e6e1d5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CDA047] focus:border-[#CDA047] text-sm transition-colors"
              >
                <option value="en">English</option>
                <option value="hi">Hindi (हिन्दी)</option>
                <option value="bn">Bengali (বাংলা)</option>
                <option value="te">Telugu (తెలుగు)</option>
                <option value="mr">Marathi (मराठी)</option>
                <option value="ta">Tamil (தமிழ்)</option>
                <option value="ur">Urdu (اردو)</option>
                <option value="gu">Gujarati (ગુજરાતી)</option>
                <option value="kn">Kannada (ಕನ್ನಡ)</option>
                <option value="ml">Malayalam (മലയാളം)</option>
                <option value="or">Odia (ଓଡ଼ିଆ)</option>
                <option value="pa">Punjabi (ਪੰਜਾਬੀ)</option>
                <option value="as">Assamese (অসমীয়া)</option>
                <option value="ma">Maithili (मैथिली)</option>
                <option value="sa">Sanskrit (संस्कृतम्)</option>
                <option value="sd">Sindhi (سنڌي)</option>
                <option value="ks">Kashmiri (کٲشُر)</option>
                <option value="ne">Nepali (नेपाली)</option>
                <option value="bho">Bhojpuri (भोजपुरी)</option>
                <option value="ta">Santali (ᱥᱟᱱᱛᱟᱲᱤ)</option>
                <option value="dog">Dogri (डोगरी)</option>
                <option value="mni">Manipuri (মৈতৈলোন্)</option>
                <option value="kok">Konkani (कोंकणी)</option>
                <option value="doi">Dogri (डोगरी)</option>
                <option value="brj">Braj (ब्रज भाषा)</option>
                <option value="raj">Rajasthani (राजस्थानी)</option>
                <option value="bh">Bihari (बिहारी)</option>
                <option value="ch">Chhattisgarhi (छत्तीसगढ़ी)</option>
                <option value="mag">Magahi (मगही)</option>
                <option value="awa">Awadhi (अवधी)</option>
                <option value="gom">Goan Konkani (कोंकणी)</option>
                <option value="lep">Lepcha (ᰛᰩᰵᰛᰧᰵ)</option>
                <option value="mtr">Mundari (ᱢᱩᱱᱫᱟᱨᱤ)</option>
                <option value="ho">Ho (ᱦᱚ)</option>
                <option value="sat">Santal (ᱥᱟᱱᱛᱟᱲᱤ)</option>
                <option value="khn">Khasi (Ka Khasi)</option>
                <option value="grt">Garo (A·chik)</option>
                <option value="lus">Mizo (Mizo tawng)</option>
                <option value="njz">Naga (Naga languages)</option>
                <option value="en-IN">Other (Other Indian Language)</option>
              </select>
              <p className="mt-1 text-xs text-black/70">
                Select your Language
              </p>
            </div>
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-black mb-1">
                  Region/State
                </label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2.5 bg-white border border-[#e6e1d5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CDA047] focus:border-[#CDA047] text-sm transition-colors"
                >
                  <option value="">Select Region</option>
                  <option value="andhra-pradesh">Andhra Pradesh</option>
                  <option value="arunachal-pradesh">Arunachal Pradesh</option>
                  <option value="assam">Assam</option>
                  <option value="bihar">Bihar</option>
                  <option value="chhattisgarh">Chhattisgarh</option>
                  <option value="goa">Goa</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="haryana">Haryana</option>
                  <option value="himachal-pradesh">Himachal Pradesh</option>
                  <option value="jharkhand">Jharkhand</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="kerala">Kerala</option>
                  <option value="madhya-pradesh">Madhya Pradesh</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="manipur">Manipur</option>
                  <option value="meghalaya">Meghalaya</option>
                  <option value="mizoram">Mizoram</option>
                  <option value="nagaland">Nagaland</option>
                  <option value="odisha">Odisha</option>
                  <option value="punjab">Punjab</option>
                  <option value="rajasthan">Rajasthan</option>
                  <option value="sikkim">Sikkim</option>
                  <option value="tamil-nadu">Tamil Nadu</option>
                  <option value="telangana">Telangana</option>
                  <option value="tripura">Tripura</option>
                  <option value="uttar-pradesh">Uttar Pradesh</option>
                  <option value="uttarakhand">Uttarakhand</option>
                  <option value="west-bengal">West Bengal</option>
                  <option value="delhi">Delhi</option>
                  <option value="chandigarh">Chandigarh</option>
                  <option value="puducherry">Puducherry</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                placeholder="Create a strong password"
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                placeholder="Confirm your password"
                required
              />
            </div>
            <Button
              type="submit"
              loading={loading}
              className="w-full bg-gradient-to-br from-[#e5e7eb] via-[#f3f4f6] to-[#f9fafb] text-[#1a237e] font-bold text-lg rounded-full shadow-lg transition border border-[#b1b4b6] hover:bg-[#e0e7ef]"
              size="lg"
            >
              Create Account
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-700">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-bold text-black hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
            {/* Government Disclaimer */}
            <div className="mt-6 pt-4 border-t border-[#e0e3ef]">
              <p className="text-xs text-gray-600 text-center">
                This is a secure government portal. By registering, you agree to comply with 
                data protection regulations and official usage policies.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
