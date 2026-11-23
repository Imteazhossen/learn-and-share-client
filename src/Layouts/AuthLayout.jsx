// import Lottie from 'lottie-react';
// import React from 'react';
// import { Outlet } from 'react-router';
// import loginAnimation from '../../src/assets/lotties/Registration.json';

// export default function AuthLayout() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 font-sans relative overflow-hidden">
      
//       {/* Ambient Background Glow */}
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full"></div>
//       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full"></div>

//       <div className="flex flex-col md:flex-row bg-[#0d0d0d] border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full z-10">
        
//         {/* Animation Panel */}
//         <div className="hidden md:flex md:w-1/2 bg-[#111111] items-center justify-center p-12 relative overflow-hidden border-r border-neutral-800">
//           {/* Subtle grid pattern for a technical look */}
//           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
//                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }}>
//           </div>
          
//           <div className="relative z-10 w-full max-w-sm opacity-90 transition-transform duration-700 hover:scale-105">
//             <Lottie 
//               animationData={loginAnimation} 
//               loop={true} 
//               className="w-full h-full drop-shadow-[0_0_30px_rgba(220,38,38,0.2)]"
//             />
//           </div>
//         </div>

//         {/* Form Panel */}
//         <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-[#0d0d0d]">
//           <div className="w-full max-w-md mx-auto">
//             {/* The Outlet renders your Login/Register forms which are already styled dark */}
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }