// src/components/Loading.jsx
// =====================================================================
//  LEARN&SHARE — LOADING COMPONENT
// =====================================================================
//  What you will see on screen:
//    Two circles (one deep blue, one light blue) orbit each other and
//    swap places again and again. That is the idea of the whole app:
//    two students SWAPPING skills.
//    Under them: the brand name, a loading message, and a soft shimmer bar.
//
//  How to use it (3 examples):
//
//    1) Full page (e.g. while the app starts):
//         <Loading fullScreen message="Getting things ready..." />
//
//    2) Inside a dashboard page (e.g. TanStack Query is fetching):
//         if (isLoading) return <Loading message="Loading your sessions..." />;
//
//    3) Small version inside a card or section:
//         <Loading size="sm" message="" />
//
//  Props (all optional, so <Loading /> alone always works):
//    - message    : text under the animation   (default: "Loading...")
//    - fullScreen : cover the whole screen?    (default: false)
//    - size       : "sm" | "md" | "lg"         (default: "md")
//
//  Why there is NO extra package here:
//    The animation uses plain CSS keyframes, so it can never break your
//    build because of a missing library. It also stops moving for people
//    who turned on "reduce motion" in their device settings.
// =====================================================================

import React from 'react';

// ---------------------------------------------------------------------
// 1) SETTINGS — the three sizes (in pixels) the spinner can have
// ---------------------------------------------------------------------
const SIZES = {
    sm: 40,
    md: 64,
    lg: 88,
};

// Project theme colours (the same blues used in the dashboard)
const COLORS = {
    primary: '#2563eb',   // blue-600  -> main brand blue
    secondary: '#60a5fa', // blue-400  -> lighter partner circle
    track: '#dbeafe',     // blue-100  -> faint ring behind the circles
};

// ---------------------------------------------------------------------
// 2) THE ANIMATION (CSS keyframes written once, as plain text)
// ---------------------------------------------------------------------
const LOADING_CSS = `
  /* The orbit: the whole spinner turns one full circle.
     "ease-in-out" on each half makes the circles glide, pause a tiny bit,
     then swap, instead of spinning like a boring wheel. */
  @keyframes ls-orbit {
    0%   { transform: rotate(0deg);   }
    50%  { transform: rotate(180deg); }
    100% { transform: rotate(360deg); }
  }

  /* The circles gently breathe (grow and shrink) while they orbit.
     Circle B breathes the opposite way, so they look like they are
     passing each other. */
  @keyframes ls-breathe-a {
    0%, 100% { transform: scale(1);    }
    50%      { transform: scale(0.72); }
  }
  @keyframes ls-breathe-b {
    0%, 100% { transform: scale(0.72); }
    50%      { transform: scale(1);    }
  }

  /* The soft shimmer that slides across the thin bar. */
  @keyframes ls-shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(250%);  }
  }

  /* The loading text fades in and out slowly. */
  @keyframes ls-fade {
    0%, 100% { opacity: 0.55; }
    50%      { opacity: 1;    }
  }

  .ls-orbit      { animation: ls-orbit 1.8s ease-in-out infinite; }
  .ls-dot-a      { animation: ls-breathe-a 1.8s ease-in-out infinite; }
  .ls-dot-b      { animation: ls-breathe-b 1.8s ease-in-out infinite; }
  .ls-shimmer    { animation: ls-shimmer 1.6s ease-in-out infinite; }
  .ls-text       { animation: ls-fade 2.2s ease-in-out infinite; }

  /* Respect people who asked their device for less motion. */
  @media (prefers-reduced-motion: reduce) {
    .ls-orbit, .ls-dot-a, .ls-dot-b, .ls-shimmer, .ls-text {
      animation: none;
    }
  }
`;

// ---------------------------------------------------------------------
// 3) SMALL COMPONENT: the two orbiting circles (one job: draw them)
// ---------------------------------------------------------------------
function OrbitSpinner({ size }) {
    // Each circle is 45% as wide as the whole spinner.
    const dot = Math.round(size * 0.45);

    return (
        <div
            className="relative"
            style={{ width: size, height: size }}
            aria-hidden="true" // screen readers read the text instead
        >
            {/* Faint ring so the orbit path is visible */}
            <div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: COLORS.track }}
            />

            {/* This layer turns round and round */}
            <div className="ls-orbit absolute inset-0">
                {/* Circle A — sits at the TOP of the ring */}
                <span
                    className="ls-dot-a absolute left-1/2 top-0 rounded-full shadow-md"
                    style={{
                        width: dot,
                        height: dot,
                        marginLeft: -dot / 2,
                        marginTop: -dot / 2,
                        backgroundColor: COLORS.primary,
                    }}
                />
                {/* Circle B — sits at the BOTTOM of the ring (opposite side) */}
                <span
                    className="ls-dot-b absolute bottom-0 left-1/2 rounded-full shadow-md"
                    style={{
                        width: dot,
                        height: dot,
                        marginLeft: -dot / 2,
                        marginBottom: -dot / 2,
                        backgroundColor: COLORS.secondary,
                    }}
                />
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------
// 4) MAIN COMPONENT
// ---------------------------------------------------------------------
export default function Loading({ message = 'Loading...', fullScreen = false, size = 'md' }) {
    // Pick the pixel size. If someone passes a wrong size, use "md".
    const pixelSize = SIZES?.[size] ?? SIZES.md;

    // Only the small size hides the brand name, to keep it tidy in cards.
    const showBrand = size !== 'sm';

    // Full screen = sits on top of everything. Otherwise = fills its parent.
    const wrapperClasses = fullScreen
        ? 'fixed inset-0 z-50 bg-[#f6f7f9]'
        : 'min-h-[50vh] w-full';

    return (
        <div
            className={`${wrapperClasses} flex flex-col items-center justify-center gap-5 px-4`}
            role="status"
            aria-live="polite"
        >
            {/* Put our CSS on the page (safe to render many times) */}
            <style>{LOADING_CSS}</style>

            {/* The two orbiting circles */}
            <OrbitSpinner size={pixelSize} />

            {/* Brand name — only for md and lg */}
            {showBrand && (
                <span className="text-sm font-black tracking-tight text-blue-600">LEARN&amp;SHARE</span>
            )}

            {/* Message + shimmer bar — drawn only when a message exists */}
            {message ? (
                <div className="flex flex-col items-center gap-3">
                    <p className="ls-text text-sm font-medium text-gray-500">{message}</p>

                    {/* Thin bar with a light stripe sliding across it */}
                    <div className="relative h-1 w-32 overflow-hidden rounded-full bg-blue-100">
                        <span
                            className="ls-shimmer absolute inset-y-0 left-0 w-1/3 rounded-full"
                            style={{ backgroundColor: COLORS.primary }}
                        />
                    </div>
                </div>
            ) : (
                // No visible text, but screen readers still hear "Loading"
                <span className="sr-only">Loading</span>
            )}
        </div>
    );
}