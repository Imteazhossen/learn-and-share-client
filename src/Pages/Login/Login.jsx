import React, { Component } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import sideImage from '../../assets/sideImage.png';

const MotionDiv = motion.div;
const MotionImg = motion.img;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    // Handle authentication logic here
    console.log('Login submitted:', { email, password });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="min-h-4/5 w-full flex flex-col lg:flex-row bg-[#F7F8FA] text-gray-900">
        {/* Left Panel: Campus Illustration */}
        <MotionDiv
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full lg:w-1/2 bg-[#070913] flex items-center justify-center overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-screen"
        >
          <MotionImg
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            src={sideImage}
            alt="Students on campus"
            className="w-full h-full object-cover object-center"
          />
        </MotionDiv>

        {/* Right Panel: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="w-full max-w-md space-y-6"
          >
            {/* Brand Wordmark & Heading */}
            <div className="text-center space-y-2">
              <Link to="/" className="inline-block">
                <MotionDiv
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-[#0055FF] select-none"
                >
                  LEARN<span className="font-serif italic font-bold mx-0.5">&amp;</span>SHARE
                </MotionDiv>
              </Link>

              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 pt-1">
                Welcome Back
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                Log in securely with your student email
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={this.handleSubmit} className="space-y-4">
              {/* E-mail */}
              <div className="form-control w-full">
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
                  placeholder="Enter your e-mail"
                  required
                  className="input input-bordered w-full bg-white text-gray-900 placeholder:text-gray-400 border-gray-200 focus:border-[#0055FF] focus:outline-none h-11 text-sm rounded-lg"
                />
              </div>

              {/* Password */}
              <div className="form-control w-full">
                <label htmlFor="password" className="label py-1">
                  <span className="label-text text-xs sm:text-sm font-medium text-gray-700">
                    Password
                  </span>
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  placeholder="Enter your password"
                  required
                  className="input input-bordered w-full bg-white text-gray-900 placeholder:text-gray-400 border-gray-200 focus:border-[#0055FF] focus:outline-none h-11 text-sm rounded-lg"
                />
              </div>

              {/* Register Prompt (replaces Forgot Password & Remember Me) */}
              <div className="flex justify-end pt-0.5">
                <Link
                  to="/register"
                  className="text-xs text-[#0055FF] hover:underline font-medium transition-colors"
                >
                  Don&apos;t have an account? Register!
                </Link>
              </div>

              {/* Submit Button */}
              <MotionDiv
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="pt-1"
              >
                <button
                  type="submit"
                  className="btn w-full rounded-lg bg-[#0055FF] hover:bg-[#0044CC] text-white border-none h-11 min-h-0 text-sm font-medium shadow-sm transition-colors"
                >
                  Login
                </button>
              </MotionDiv>
            </form>
          </MotionDiv>
        </div>
      </div>
    );
  }
}

export default Login;