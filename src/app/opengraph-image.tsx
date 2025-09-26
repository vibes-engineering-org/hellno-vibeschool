import { ImageResponse } from "next/og";
import {
  PROJECT_TITLE,
  PROJECT_DESCRIPTION,
  PROJECT_AVATAR_URL,
} from "~/lib/constants";

export const alt = PROJECT_TITLE;
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#1a1a1a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background gradient with education-inspired colors */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            opacity: 0.9,
          }}
        />

        {/* Subtle pattern overlay for depth */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.4) 0%, transparent 50%)",
          }}
        />

        {/* Main content container - centered in safe zone */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "60px",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Education icon with glow effect */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "48px",
              position: "relative",
            }}
          >
            {/* Glow effect */}
            <div
              style={{
                position: "absolute",
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            {/* Education icon container */}
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: "6px solid rgba(255, 255, 255, 0.95)",
                backgroundColor: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              {/* Graduation cap icon */}
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="#667eea"/>
              </svg>
            </div>
          </div>

          {/* Project title with high contrast */}
          <h1
            style={{
              fontSize: PROJECT_TITLE.length > 25 ? "65px" : "72px",
              fontWeight: "900",
              color: "#ffffff",
              textAlign: "center",
              marginBottom: "40px",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              textShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
              maxWidth: "1100px",
              fontFamily: "system-ui, -apple-system, sans-serif",
              whiteSpace: PROJECT_TITLE.length > 40 ? "normal" : "nowrap",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            {PROJECT_TITLE}
          </h1>

          {/* Project description */}
          <p
            style={{
              fontSize: "36px",
              fontWeight: "600",
              color: "rgba(255, 255, 255, 0.95)",
              textAlign: "center",
              marginBottom: "56px",
              lineHeight: 1.3,
              textShadow: "0 3px 12px rgba(0, 0, 0, 0.4)",
              maxWidth: "800px",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {PROJECT_DESCRIPTION}
          </p>

          {/* Education branding element */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "20px 40px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "100px",
              border: "3px solid rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Book/Learning icon */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.09 3.09C14.3 4.3 15.96 5 17.78 5H20C20.55 5 21 5.45 21 6V18C21 18.55 20.55 19 20 19H17.78C15.96 19 14.3 18.3 13.09 17.09L12 16L10.91 17.09C9.7 18.3 8.04 19 6.22 19H4C3.45 19 3 18.55 3 18V6C3 5.45 3.45 5 4 5H6.22C8.04 5 9.7 4.3 10.91 3.09L12 2ZM12 4.5L11.5 5C10.64 5.86 9.45 6.37 8.22 6.43V16.57C9.45 16.63 10.64 17.14 11.5 18L12 18.5L12.5 18C13.36 17.14 14.55 16.63 15.78 16.57V6.43C14.55 6.37 13.36 5.86 12.5 5L12 4.5Z" fill="white"/>
            </svg>
            <span
              style={{
                fontSize: "26px",
                fontWeight: "700",
                color: "#ffffff",
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              Blockchain Education
            </span>
          </div>
        </div>

        {/* Bottom gradient fade for depth */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "200px",
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 100%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
