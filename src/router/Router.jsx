// src/Routes/router.jsx
// =====================================================================
//  LEARN&SHARE (SkillSwap) — ALL PAGE ROUTES
// =====================================================================
//  Think of this file as the MAP of the website:
//    "When the address bar says /dashboard/wallet, show the Wallet page."
//
//  The map has 2 big areas:
//    1) PUBLIC area    -> anyone can visit  (Home, Explore, Login ...)
//    2) DASHBOARD area -> only logged-in people (PrivateRoute)
//         - student pages  -> any logged-in user
//         - admin pages    -> wrapped in <AdminRoute> (admin only)
//
//  IMPORTANT: every "path" in the dashboard part matches a link in
//  DashboardLayout.jsx. If you rename one, rename the other too.
//  The import paths below are my best guess — change them to match
//  where YOUR files really live.
// =====================================================================

import { createBrowserRouter } from "react-router";

// ---------- Layouts & route guards ----------
import RootLayout from "../Layouts/RootLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "../Routes/PrivetRoute"; // keeps your original file name
import AdminRoute from "../Routes/AdminRoute";

// ---------- Public pages ----------
import Home from "../Pages/Home/Home";



import ExploreSkills from "../Pages/ExploreSkills/ExploreSkills";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../Pages/TermsAndConditions/TermsAndConditions";
import ContactUs from "../Pages/ContactUs/ContactUs";

// ---------- Dashboard: shared pages ----------
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import Forbidden from "../Pages/Forbidden/Forbidden";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import Notifications from "../Pages/Dashboard/Notifications/Notifications";

// ---------- Dashboard: student (user) pages ----------
import UserOverview from "../Pages/Dashboard/User/UserOverview";
import MySkills from "../Pages/Dashboard/User/MySkills";
import MySessions from "../Pages/Dashboard/User/MySessions";
import MyAvailability from "../Pages/Dashboard/User/MyAvailability";
import Wallet from "../Pages/Dashboard/User/Wallet";
import MyReviews from "../Pages/Dashboard/User/MyReviews";
import SessionRequest from "../Pages/Dashboard/User/SessionRequest";
import SessionDetails from "../Pages/Dashboard/User/SessionDetails";

// ---------- Dashboard: admin pages ----------
import AdminOverview from "../Pages/Dashboard/Admin/AdminOverview";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import CreditRequests from "../Pages/Dashboard/Admin/CreditRequests";
import ManageSessions from "../Pages/Dashboard/Admin/ManageSessions";

export const router = createBrowserRouter([
    // =================================================================
    //  1) PUBLIC AREA  (inside RootLayout = navbar + footer)
    // =================================================================
    {
        path: "/",
        Component: RootLayout,
        children: [
            { index: true, Component: Home },
            { path: "exploreSkills", Component: ExploreSkills },
            { path: "login", Component: Login },
            { path: "register", Component: Register },
            { path: "privacyPolicy", Component: PrivacyPolicy },
            { path: "termsAndConditions", Component: TermsAndConditions },
            { path: "contactUs", Component: ContactUs },
        ],
    },

    // =================================================================
    //  2) DASHBOARD AREA  (inside DashboardLayout = sidebar + top bar)
    //     PrivateRoute: not logged in -> sent to login
    // =================================================================
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            // /dashboard -> a small page that sends each role to its own overview
            { index: true, element: <DashboardHome /> },

            // Shown when someone opens a page they are not allowed to see
            { path: "forbidden", element: <Forbidden /> },

            // ---------- Shared by user AND admin ----------
            { path: "myProfile", element: <MyProfile /> },
            { path: "notifications", element: <Notifications /> },

            // ---------- STUDENT pages ----------
            { path: "userOverview", element: <UserOverview /> },
            { path: "mySkills", element: <MySkills /> },
            { path: "mySessions", element: <MySessions /> },
            { path: "myAvailability", element: <MyAvailability /> },
            { path: "wallet", element: <Wallet /> },
            { path: "myReviews", element: <MyReviews /> },
            // Ask a student for a session ("/dashboard/sessionRequest/<teacherId>")
            { path: "sessionRequest/:teacherId", element: <SessionRequest /> },
            // See one session's status, schedule and meeting info
            { path: "sessionDetails/:sessionId", element: <SessionDetails /> },

            // ---------- ADMIN pages (AdminRoute blocks everyone else) ----------
            {
                path: "adminOverview",
                element: (
                    <AdminRoute>
                        <AdminOverview />
                    </AdminRoute>
                ),
            },
            {
                path: "manageUsers",
                element: (
                    <AdminRoute>
                        <ManageUsers />
                    </AdminRoute>
                ),
            },
            {
                path: "creditRequests",
                element: (
                    <AdminRoute>
                        <CreditRequests />
                    </AdminRoute>
                ),
            },
            {
                path: "manageSessions",
                element: (
                    <AdminRoute>
                        <ManageSessions />
                    </AdminRoute>
                ),
            },
        ],
    },
]);