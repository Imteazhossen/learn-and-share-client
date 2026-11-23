import React, { Component } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import sideImage from '../../assets/sideImage.png';

const MotionDiv = motion.div;
const MotionImg = motion.img;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      agreedToPrivacy: false,
      errorMessage: '',
      successMessage: '',
    };
  }

  componentDidMount() {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
      errorMessage: '',
      successMessage: '',
    });
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, agreedToPrivacy } = this.state;
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail.endsWith('.edu')) {
      this.setState({
        errorMessage: 'Please use a valid student email ending with ".edu".',
        successMessage: '',
      });
      return;
    }

    if (!agreedToPrivacy) {
      this.setState({
        errorMessage: 'Please agree to the Privacy Policy before continuing.',
        successMessage: '',
      });
      return;
    }

    this.setState({
      errorMessage: '',
      successMessage: 'Student email verified! Proceeding with registration...',
    });

    // Handle registration logic here
    console.log('Register submitted:', { email: trimmedEmail, password });
  };

  render() {
    const {
      email,
      password,
      showPassword,
      agreedToPrivacy,
      errorMessage,
      successMessage,
    } = this.state;

    return (
      <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F7F8FA] text-gray-900 overflow-x-hidden">
        {/* Left Panel: Campus Illustration (slides from bottom-left) */}
        <MotionDiv
          initial={{ opacity: 0, y: 45, x: -25 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="w-full lg:w-1/2 bg-[#070913] flex items-center justify-center overflow-hidden min-h-[240px] sm:min-h-[300px] lg:min-h-screen"
        >
          <MotionImg
            initial={{ scale: 1.06, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            src={sideImage}
            alt="Students on campus"
            className="w-full h-full object-cover object-center"
          />
        </MotionDiv>

        {/* Right Panel: Registration Form (elements enter from bottom/sides) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-5 py-8 sm:px-10 lg:px-14">
          <div className="w-full max-w-md space-y-4">
            {/* Brand Wordmark & Heading (from bottom) */}
            <MotionDiv
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
              className="text-center space-y-1.5"
            >
              <Link to="/" className="inline-block">
                <MotionDiv
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-[#0055FF] select-none"
                >
                  LEARN<span className="font-serif italic font-bold mx-0.5">&amp;</span>SHARE
                </MotionDiv>
              </Link>

              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Create you account
              </h1>
              <p className="text-xs text-gray-500">
                We&apos;ll send a verification code to confirm it&apos;s you.
              </p>
            </MotionDiv>

            {/* Registration Form */}
            <form onSubmit={this.handleSubmit} className="space-y-3.5">
              {/* E-mail (slides from left) */}
              <MotionDiv
                initial={{ opacity: 0, x: -35, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.16 }}
                className="form-control w-full"
              >
                <label htmlFor="email" className="label py-1">
                  <span className="label-text text-xs sm:text-sm font-medium text-gray-700">
                    E-mail
                  </span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="Enter your e-mail (.edu)"
                  required
                  className="input input-bordered w-full bg-white text-gray-900 placeholder:text-gray-400 border-gray-200 focus:border-[#0055FF] focus:outline-none h-10 sm:h-11 text-sm rounded-lg"
                />
              </MotionDiv>

              {/* Password with Visibility Toggle (slides from right) */}
              <MotionDiv
                initial={{ opacity: 0, x: 35, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.24 }}
                className="form-control w-full"
              >
                <label htmlFor="password" className="label py-1">
                  <span className="label-text text-xs sm:text-sm font-medium text-gray-700">
                    Password
                  </span>
                </label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    placeholder="Enter your password"
                    required
                    className="input input-bordered w-full bg-white text-gray-900 placeholder:text-gray-400 border-gray-200 focus:border-[#0055FF] focus:outline-none h-10 sm:h-11 pr-10 text-sm rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={this.togglePasswordVisibility}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="btn btn-ghost btn-xs btn-circle absolute right-2.5 text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </MotionDiv>

              {/* Privacy Policy Checkbox (slides from bottom-left) */}
              <MotionDiv
                initial={{ opacity: 0, y: 25, x: -15 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.32 }}
                className="flex items-center gap-2.5 pt-0.5"
              >
                <input
                  id="agreedToPrivacy"
                  type="checkbox"
                  name="agreedToPrivacy"
                  checked={agreedToPrivacy}
                  onChange={this.handleChange}
                  className="checkbox checkbox-xs sm:checkbox-sm rounded border-gray-300 [--chkbg:#0055FF] [--chkfg:white]"
                />
                <label
                  htmlFor="agreedToPrivacy"
                  className="text-xs text-gray-500 select-none cursor-pointer"
                >
                  By creating an account, you agree to our{' '}
                  <Link
                    to="/privacy"
                    className="text-[#0055FF] underline hover:text-[#0044CC] font-medium"
                  >
                    Privacy Policy.
                  </Link>
                </label>
              </MotionDiv>

              {/* Validation / Status Feedback */}
              {errorMessage && (
                <div
                  role="alert"
                  className="alert alert-error py-2 px-3 text-xs rounded-lg bg-red-50 border border-red-200 text-red-600"
                >
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div
                  role="status"
                  className="alert py-2 px-3 text-xs rounded-lg bg-blue-50 border border-blue-200 text-[#0055FF]"
                >
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Next Button (slides from bottom) */}
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.38 }}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className="pt-1"
              >
                <button
                  type="submit"
                  className="btn w-full rounded-lg bg-[#0055FF] hover:bg-[#0044CC] text-white border-none h-10 sm:h-11 min-h-0 text-sm font-medium shadow-sm transition-colors"
                >
                  Next
                </button>
              </MotionDiv>

              {/* Login Link (slides from bottom-right) */}
              <MotionDiv
                initial={{ opacity: 0, y: 25, x: 15 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.44 }}
                className="text-center pt-1"
              >
                <p className="text-xs text-gray-500">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-[#0055FF] hover:underline font-medium"
                  >
                    Login
                  </Link>
                </p>
              </MotionDiv>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;