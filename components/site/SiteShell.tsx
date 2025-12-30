"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { navItems } from "./nav";

interface SiteShellProps {
  children: React.ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bottomBannerVisible, setBottomBannerVisible] = useState(true);
  const [exitPopupVisible, setExitPopupVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const exitPopupShownRef = useRef(false);
  const mobilePopupTriggeredRef = useRef(false);
  const scrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const exitIntentHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);
  const scrollHandlerRef = useRef<(() => void) | null>(null);

  // Exit Intent 및 스크롤 이벤트 핸들러
  useEffect(() => {
    // PC Exit Intent Popup
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY < 10 &&
        !exitPopupShownRef.current &&
        window.innerWidth > 768
      ) {
        setExitPopupVisible(true);
        exitPopupShownRef.current = true;
      }
    };

    // Mobile Smart Popup
    const handleScroll = () => {
      if (window.innerWidth <= 768 && !mobilePopupTriggeredRef.current) {
        if (scrollTimerRef.current) {
          clearTimeout(scrollTimerRef.current);
        }
        scrollTimerRef.current = setTimeout(() => {
          if (!mobilePopupTriggeredRef.current) {
            setExitPopupVisible(true);
            mobilePopupTriggeredRef.current = true;
          }
        }, 1600);
      }
      setScrollY(window.scrollY);
    };

    exitIntentHandlerRef.current = handleMouseLeave;
    scrollHandlerRef.current = handleScroll;

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (exitIntentHandlerRef.current) {
        document.removeEventListener("mouseleave", exitIntentHandlerRef.current);
      }
      if (scrollHandlerRef.current) {
        window.removeEventListener("scroll", scrollHandlerRef.current);
      }
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 focus-ring">
              <span className="text-xl font-bold text-gray-900">
                {SITE.logoText}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" role="navigation">
              {navItems.slice(0, 6).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm text-gray-700 hover:text-wedding-pink focus-ring rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                href={SITE.ctaSecondary.href}
                className="px-4 py-2 text-sm text-gray-700 hover:text-wedding-pink focus-ring rounded-md transition-colors"
              >
                {SITE.ctaSecondary.label}
              </Link>
              <Link
                href={SITE.ctaPrimary.href}
                className="px-4 py-2 text-sm font-medium text-white bg-wedding-pink hover:bg-pink-300 focus-ring rounded-md transition-colors"
              >
                {SITE.ctaPrimary.label}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 text-gray-700 focus-ring rounded-md"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">메뉴 열기</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav
              id="mobile-menu"
              className="lg:hidden py-4 border-t border-gray-200"
              role="navigation"
            >
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-50 focus-ring rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 space-y-2">
                  <Link
                    href={SITE.ctaSecondary.href}
                    className="block px-3 py-2 text-base text-gray-700 hover:bg-gray-50 focus-ring rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {SITE.ctaSecondary.label}
                  </Link>
                  <Link
                    href={SITE.ctaPrimary.href}
                    className="block px-3 py-2 text-base font-medium text-white bg-wedding-pink hover:bg-pink-300 focus-ring rounded-md transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {SITE.ctaPrimary.label}
                  </Link>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">
                {SITE.name}
              </h3>
              <p className="text-sm text-gray-600">
                {SITE.editorial.credentials}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-900">정보</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-wedding-pink focus-ring">
                    소개
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-wedding-pink focus-ring">
                    문의
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-900">약관</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-wedding-pink focus-ring">
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-wedding-pink focus-ring">
                    개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="text-gray-600 hover:text-wedding-pink focus-ring">
                    면책사항
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-900">연락처</h4>
              <p className="text-sm text-gray-600">
                {SITE.contact.email}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {SITE.contact.responseNote}
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* 고정 CTA 배너 (모바일: 상단 / PC: 하단) */}
      {bottomBannerVisible && (
        <div className="wf-cta-banner" id="bottomBanner">
          <div className="wf-cta-inner">
            <span className="wf-cta-text">
              가장 가까운 웨딩박람회 초대권 무료 신청 🎁
            </span>
            <a href="https://ad.cpaad.co.kr/wedunited01drc/jade888" className="wf-cta-btn">
              지금 신청하기
            </a>
            <button
              onClick={() => setBottomBannerVisible(false)}
              className="wf-cta-close"
              aria-label="닫기"
              style={{
                flexShrink: 0,
                background: "none",
                border: "none",
                fontSize: "20px",
                color: "#999",
                cursor: "pointer",
                padding: "0 8px",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Floating CTA Button for PC + Mobile */}
      <div
        className="floating-cta"
        onClick={() => {
          window.location.href = "https://ad.cpaad.co.kr/wedunited01drc/jade888";
        }}
      >
        🎁 무료 초대권 신청하기
      </div>

      {/* Exit Intent Popup for PC + Mobile */}
      {exitPopupVisible && (
        <div
          className="exit-popup-overlay"
          id="exitPopup"
          onClick={(e) => {
            if (e.currentTarget.id === "exitPopup") {
              setExitPopupVisible(false);
            }
          }}
        >
          <div className="exit-popup-box">
            <div className="exit-popup-title">🎁 무료 초대권 놓치지 마세요!</div>
            <div className="exit-popup-text">
              예비부부님, 나가기 전에 <b>웨딩박람회 무료 초대권</b>을 받아보세요.<br />
              혜택은 선착순으로 제공됩니다.
            </div>
            <div
              className="exit-popup-btn"
              onClick={() => {
                window.location.href = "https://ad.cpaad.co.kr/wedunited01drc/jade888";
              }}
            >
              무료 초대권 받기
            </div>
            <div
              className="exit-popup-close"
              onClick={() => setExitPopupVisible(false)}
            >
              닫기
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .wf-cta-banner {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          background: #ffffff;
          border-top: 1px solid #eee;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.08);
          z-index: 9999;
          font-family: inherit;
        }

        .wf-cta-banner .wf-cta-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .wf-cta-banner .wf-cta-text {
          font-size: 16px;
          font-weight: 600;
          color: #222;
          letter-spacing: -0.02em;
        }

        .wf-cta-banner .wf-cta-btn {
          flex-shrink: 0;
          padding: 10px 20px;
          border-radius: 999px;
          background: #ff4e6a;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 10px rgba(255, 78, 106, 0.4);
          transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
          white-space: nowrap;
        }

        .wf-cta-banner .wf-cta-btn:hover {
          background: #ff3655;
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(255, 78, 106, 0.5);
        }

        @media (max-width: 768px) {
          .wf-cta-banner {
            top: 0;
            bottom: auto;
            border-top: none;
            border-bottom: 1px solid #eee;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          }

          .wf-cta-banner .wf-cta-inner {
            flex-direction: column;
            align-items: flex-start;
            padding: 10px 14px;
          }

          .wf-cta-banner .wf-cta-text {
            font-size: 14px;
          }

          .wf-cta-banner .wf-cta-btn {
            width: 100%;
            text-align: center;
            margin-top: 4px;
          }
        }

        .floating-cta {
          position: fixed;
          right: 20px;
          bottom: 120px;
          z-index: 9999;
          background: #FF6F61;
          color: #ffffff;
          padding: 14px 26px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
          cursor: pointer;
          transition: all 0.25s ease;
          animation: pulseCTA 1.8s infinite ease-in-out;
        }

        @media (hover:hover) {
          .floating-cta:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 32px rgba(0,0,0,0.25);
          }
        }

        @media (max-width: 768px) {
          .floating-cta {
            bottom: 20px;
            right: 16px;
            padding: 12px 20px;
            font-size: 14px;
            border-radius: 40px;
          }
        }

        @keyframes pulseCTA {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        .exit-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
        }

        .exit-popup-box {
          background: #fff7f8;
          border-radius: 16px;
          padding: 32px 28px;
          max-width: 420px;
          width: 90%;
          text-align: center;
          box-shadow: 0 12px 32px rgba(0,0,0,0.25);
          animation: fadeIn 0.35s ease;
          font-family: 'Pretendard', sans-serif;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .exit-popup-title {
          font-size: 22px;
          font-weight: 700;
          color: #ff6f61;
          margin-bottom: 14px;
        }

        .exit-popup-text {
          font-size: 16px;
          color: #333;
          line-height: 1.6;
          margin-bottom: 22px;
        }

        .exit-popup-btn {
          background: #ff6f61;
          color: #fff;
          display: inline-block;
          padding: 14px 22px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(255,111,97,0.4);
          transition: all 0.25s ease;
        }

        .exit-popup-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(255,111,97,0.45);
        }

        .exit-popup-close {
          margin-top: 16px;
          font-size: 14px;
          color: #777;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

