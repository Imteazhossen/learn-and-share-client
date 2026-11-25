// src/layouts/DashboardLayout.jsx
// =====================================================================
//  LEARN&SHARE (SkillSwap) — DASHBOARD LAYOUT
// =====================================================================
//  What this file does (in simple words):
//    1. Draws the BLUE-AND-WHITE dashboard frame (sidebar + top bar).
//    2. Shows different sidebar links for a "user" and an "admin".
//       (There is NO moderator any more.)
//    3. Puts the page you open (Overview, My Skills, Wallet ...)
//       in the middle using <Outlet />.
//
//  Safety rules used everywhere in this file:
//    - Optional chaining  (?.)  -> if something is missing, we get
//      "undefined" instead of a crash.
//    - Nullish fallback   (??)  -> if something is missing, use a
//      safe default value.
//    - Conditional rendering    -> we only draw a piece of UI when
//      we really have the data for it.
//
//  OOP / SOLID notes (kept friendly):
//    - Single Responsibility: every small component below does ONE job
//      (logo, one sidebar link, avatar, header, the layout itself).
//    - Open/Closed: to add a new page link, you only ADD one line to
//      USER_LINKS or ADMIN_LINKS. You never touch the layout code.
//    - Abstraction / Encapsulation: link data lives in plain objects,
//      the drawing logic lives in <SidebarLink />.
//    - Polymorphism: <SidebarLink /> draws ANY link object the same way,
//      no matter if it belongs to a user or an admin.
// =====================================================================

import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';

// Icons (all come from react-icons/fa, so no extra package is needed)
import {
    FaHome,
    FaBars,
    FaChartPie,
    FaRegLightbulb,
    FaSearch,
    FaRegCalendarAlt,
    FaRegClock,
    FaWallet,
    FaRegStar,
    FaCog,
    FaRegBell,
    FaUsers,
    FaCoins,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
} from 'react-icons/fa';

// Your existing hook that tells us who is logged in (role = "user" | "admin")
import useUserRole from '../Hooks/useUserRole';

// ---------------------------------------------------------------------
// 1) SETTINGS — change names / paths here, nowhere else
// ---------------------------------------------------------------------
const APP_NAME = 'LEARN&SHARE';      // brand text shown in the sidebar
const DRAWER_ID = 'dashboard-drawer'; // id of the hidden checkbox DaisyUI uses
const NOTIFICATIONS_PATH = '/dashboard/notifications'; // bell icon goes here

// Links for a normal STUDENT (role === 'user').
// To add a page later: just add one more object to this list.
const USER_LINKS = [
    { to: '/dashboard/userOverview', label: 'Overview', icon: FaChartPie },
    { to: '/dashboard/mySkills', label: 'My Skills', icon: FaRegLightbulb },
    { to: '/exploreSkills', label: 'Explore', icon: FaSearch },
    { to: '/dashboard/mySessions', label: 'Sessions', icon: FaRegCalendarAlt },
    { to: '/dashboard/myAvailability', label: 'Availability', icon: FaRegClock },
    { to: '/dashboard/wallet', label: 'Wallet', icon: FaWallet },
    { to: '/dashboard/myReviews', label: 'Reviews', icon: FaRegStar },
    { to: '/dashboard/myProfile', label: 'Account Settings', icon: FaCog },
];

// Links for the ADMIN (role === 'admin').
const ADMIN_LINKS = [
    { to: '/dashboard/adminOverview', label: 'Overview', icon: FaChartPie },
    { to: '/dashboard/manageUsers', label: 'Manage Users', icon: FaUsers },
    { to: '/dashboard/creditRequests', label: 'Credit Requests', icon: FaCoins },
    { to: '/dashboard/manageSessions', label: 'Manage Sessions', icon: FaRegCalendarAlt },
    { to: '/dashboard/myProfile', label: 'Account Settings', icon: FaCog },
];

// A "menu book": give it a role, get back that role's links.
// If the role is unknown (or still loading) we simply get nothing.
const LINKS_BY_ROLE = {
    user: USER_LINKS,
    admin: ADMIN_LINKS,
};

// ---------------------------------------------------------------------
// 2) SMALL HELPER FUNCTIONS (plain JavaScript, no React inside)
// ---------------------------------------------------------------------

// Finds the page title for the top bar by matching the current URL
// with the links above. Falls back to "Dashboard" if nothing matches.
const getPageTitle = (pathname, links) => {
    const match = (links ?? []).find((link) => link?.to === pathname);
    return match?.label ?? 'Dashboard';
};

// On phones the sidebar is a drawer. After tapping a link we close it
// by un-checking DaisyUI's hidden checkbox.
const closeMobileDrawer = () => {
    const checkbox = document.getElementById(DRAWER_ID);
    if (checkbox) checkbox.checked = false;
};

// ---------------------------------------------------------------------
// 3) SMALL COMPONENTS — each one has exactly ONE job
// ---------------------------------------------------------------------

// ---- Logo + collapse button at the top of the sidebar ----
function SidebarBrand({ collapsed, onToggle }) {
    return (
        <div className="px-4 pt-5 pb-3">
            <div className="flex items-center justify-between gap-2">
                {/* Full logo when open, short "L&S" when the sidebar is collapsed */}
                <span className="text-xl font-black leading-none tracking-tight text-blue-600">
                    <span className={collapsed ? 'lg:hidden' : ''}>{APP_NAME}</span>
                    {collapsed && <span className="hidden lg:inline">L&amp;S</span>}
                </span>

                {/* Collapse / expand button (desktop only) */}
                <button
                    type="button"
                    onClick={onToggle}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    className="hidden h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition hover:bg-gray-50 lg:flex"
                >
                    {collapsed ? <FaAngleDoubleRight size={12} /> : <FaAngleDoubleLeft size={12} />}
                </button>
            </div>

            {/* Small "Dashboard" caption — hidden while collapsed */}
            <p className={`mt-5 text-xs font-medium text-gray-500 ${collapsed ? 'lg:hidden' : ''}`}>
                Dashboard
            </p>
        </div>
    );
}

// ---- ONE sidebar link. Used for every role (polymorphism) ----
function SidebarLink({ link, collapsed }) {
    // If a link object is broken or empty, draw nothing instead of crashing.
    if (!link?.to) return null;

    const Icon = link?.icon; // the icon component (may be missing)

    return (
        <li>
            <NavLink
                to={link.to}
                end
                title={collapsed ? link?.label : undefined} // tooltip when only icons show
                onClick={closeMobileDrawer}
                className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors
                     ${collapsed ? 'lg:justify-center' : ''}
                     ${isActive
                        ? 'bg-blue-50 font-semibold text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                }
            >
                {/* Draw the icon only if we have one */}
                {Icon && <Icon size={16} className="shrink-0" />}
                <span className={collapsed ? 'lg:hidden' : ''}>{link?.label}</span>
            </NavLink>
        </li>
    );
}

// ---- Grey pulsing bars shown while we wait to learn the user's role ----
function SidebarSkeleton() {
    return (
        <ul className="space-y-2 px-3" aria-busy="true">
            {[1, 2, 3, 4, 5].map((n) => (
                <li key={n} className="h-9 animate-pulse rounded-lg bg-gray-100" />
            ))}
        </ul>
    );
}

// ---- Round profile picture. Falls back to the first letter of the name ----
function Avatar({ name, photo }) {
    // If the picture URL fails to load, we remember that and show the letter.
    const [imageFailed, setImageFailed] = useState(false);
    const firstLetter = name?.trim()?.charAt(0)?.toUpperCase() || 'S';

    // Conditional rendering: picture only when we have a URL and it loaded fine
    if (photo && !imageFailed) {
        return (
            <img
                src={photo}
                alt={name ?? 'Profile'}
                onError={() => setImageFailed(true)}
                className="h-10 w-10 rounded-full object-cover"
            />
        );
    }

    return (
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            {firstLetter}
        </span>
    );
}

// ---- The top bar: page title, welcome text, role badge, bell, avatar ----
function TopBar({ title, displayName, photo, role, roleLoading, notificationCount }) {
    return (
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-3 md:px-8">
            {/* Menu button — only visible on phones/tablets */}
            <label
                htmlFor={DRAWER_ID}
                aria-label="Open sidebar"
                className="btn btn-ghost btn-sm px-2 lg:hidden"
            >
                <FaBars size={18} />
            </label>

            {/* Title + welcome message */}
            <div className="min-w-0 flex-1">
                <h1 className="truncate text-lg font-bold leading-tight text-gray-900">{title}</h1>
                <p className="truncate text-xs text-gray-500">Welcome back, {displayName}</p>
            </div>

            {/* Role badge — only after we know the role */}
            {!roleLoading && role && (
                <span className="badge badge-outline hidden border-blue-200 font-semibold capitalize text-blue-600 sm:inline-flex">
                    {role}
                </span>
            )}

            {/* Notification bell with a small red number when there are new ones */}
            <NavLink
                to={NOTIFICATIONS_PATH}
                aria-label="Notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-50"
            >
                <FaRegBell size={16} />
                {notificationCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                )}
            </NavLink>

            <Avatar name={displayName} photo={photo} />
        </header>
    );
}

// ---------------------------------------------------------------------
// 4) THE MAIN LAYOUT — puts everything together
// ---------------------------------------------------------------------
export default function DashboardLayout() {
    // ----- Who is logged in? -----
    // "?? {}" means: if the hook returns nothing, use an empty object,
    // so the destructuring below can never crash.
    const roleInfo = useUserRole() ?? {};
    const role = roleInfo?.role;
    const roleLoading = roleInfo?.roleLoading ?? false;

    // Name / photo / unread count are OPTIONAL extras. If your hook gives
    // `user` or `dbUser` objects they are used, otherwise we show safe defaults.
    const displayName =
        roleInfo?.dbUser?.name ??
        roleInfo?.user?.displayName ??
        roleInfo?.user?.name ??
        'Student';
    const photo = roleInfo?.dbUser?.photoURL ?? roleInfo?.user?.photoURL ?? null;
    const notificationCount = Number(roleInfo?.notificationCount ?? 0) || 0;

    // ----- Which links should this person see? -----
    const links = LINKS_BY_ROLE?.[role] ?? [];

    // ----- Where are we right now? (for the page title) -----
    const location = useLocation();
    const pageTitle = getPageTitle(location?.pathname, links);

    // ----- Is the desktop sidebar collapsed to icons only? -----
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="drawer lg:drawer-open">
            {/* Hidden checkbox: DaisyUI uses it to open/close the mobile drawer */}
            <input id={DRAWER_ID} type="checkbox" className="drawer-toggle" />

            {/* ================= RIGHT SIDE: top bar + page ================= */}
            <div className="drawer-content flex min-h-screen flex-col bg-[#f6f7f9]">
                <TopBar
                    title={pageTitle}
                    displayName={displayName}
                    photo={photo}
                    role={role}
                    roleLoading={roleLoading}
                    notificationCount={notificationCount}
                />

                {/* The current dashboard page appears here */}
                <main className="flex-1 overflow-x-hidden p-4 md:p-8">
                    <Outlet />
                </main>
            </div>

            {/* ================= LEFT SIDE: sidebar ================= */}
            <div className="drawer-side z-30">
                {/* Dark overlay behind the drawer on phones (tap to close) */}
                <label htmlFor={DRAWER_ID} aria-label="Close sidebar" className="drawer-overlay" />

                <aside
                    className={`flex min-h-full w-64 flex-col border-r border-gray-100 bg-white transition-all duration-300
                                ${collapsed ? 'lg:w-20' : 'lg:w-64'}`}
                >
                    <SidebarBrand collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />

                    {/* Menu area */}
                    <nav className="flex-1 overflow-y-auto pb-4">
                        {/* 1) Still loading the role -> grey placeholder bars */}
                        {roleLoading && <SidebarSkeleton />}

                        {/* 2) Role known -> draw that role's links */}
                        {!roleLoading && links.length > 0 && (
                            <ul className="space-y-1 px-3">
                                {links.map((link) => (
                                    <SidebarLink key={link?.to} link={link} collapsed={collapsed} />
                                ))}
                            </ul>
                        )}

                        {/* 3) Loaded but no valid role -> friendly message, no crash */}
                        {!roleLoading && links.length === 0 && (
                            <p className={`px-6 text-xs text-gray-400 ${collapsed ? 'lg:hidden' : ''}`}>
                                No menu available for this account.
                            </p>
                        )}
                    </nav>

                    {/* Bottom: always-visible way back to the public site */}
                    <div className="border-t border-gray-100 px-3 py-3">
                        <NavLink
                            to="/"
                            onClick={closeMobileDrawer}
                            title={collapsed ? 'Back to Home' : undefined}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900
                                        ${collapsed ? 'lg:justify-center' : ''}`}
                        >
                            <FaHome size={16} className="shrink-0" />
                            <span className={collapsed ? 'lg:hidden' : ''}>Back to Home</span>
                        </NavLink>
                    </div>
                </aside>
            </div>
        </div>
    );
}