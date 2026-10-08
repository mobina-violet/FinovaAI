"use client";

export default function DashboardVisual() {
  return (
    <div
      id="dashboard"
      className="dashboard-visual fade-up visual-enter"
      aria-label="نمایش نمونه داشبورد مالی هوشمند"
    >
      <div className="dashboard-stage">
        <div className="laptop">
          <div className="screen">
            {/* Browser bar */}
            <div className="screen-bar">
              <div className="screen-dots" dir="ltr">
                <span className="screen-dot" />
                <span className="screen-dot" />
                <span className="screen-dot active" />
              </div>

              <span className="dashboard-title">
                نمای کلی کسب‌وکار
              </span>

              <span className="live-dot">●</span>
            </div>

            <div className="dashboard-content">
              {/* KPI Cards */}
              <div className="dashboard-kpis">
                <article className="kpi-card">
                  <span className="kpi-label">فروش این ماه</span>
                  <strong className="kpi-value">۲۴۸٫۶ م</strong>
                </article>

                <article className="kpi-card">
                  <span className="kpi-label">هزینه‌ها</span>
                  <strong className="kpi-value">۸۶٫۲ م</strong>
                </article>

                <article className="kpi-card">
                  <span className="kpi-label">سود خالص</span>
                  <strong className="kpi-value profit">
                    ۱۱۲٫۴ م
                  </strong>
                </article>

                <article className="kpi-card gold-card">
                  <span className="kpi-label">حاشیه سود</span>
                  <strong className="kpi-value gold">
                    ۴۵٫۲٪
                  </strong>
                </article>
              </div>

              {/* Lower Section */}
              <div className="dashboard-lower">

                {/* Chart */}
                <section className="chart-card">
                  <div className="chart-heading">
                    <span>روند فروش</span>
                    <span className="chart-change">۱۸٪+ رشد</span>
                  </div>

                  <svg
                    className="chart-svg"
                    viewBox="0 0 250 130"
                    role="img"
                    aria-label="نمودار نمونه روند فروش"
                  >
                    <defs>
                      <linearGradient
                        id="areaGradient"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#41e59d"
                        />
                        <stop
                          offset="100%"
                          stopColor="#41e59d"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    <line
                      className="chart-grid-line"
                      x1="8"
                      y1="28"
                      x2="242"
                      y2="28"
                    />

                    <line
                      className="chart-grid-line"
                      x1="8"
                      y1="64"
                      x2="242"
                      y2="64"
                    />

                    <line
                      className="chart-grid-line"
                      x1="8"
                      y1="100"
                      x2="242"
                      y2="100"
                    />

                    <path
                      className="chart-area"
                      d="M10,102 C28,90 37,93 52,81 S78,90 95,67 S119,80 136,60 S165,69 181,42 S211,52 227,29 L227,112 L10,112 Z"
                    />

                    <path
                      className="chart-line"
                      d="M10,102 C28,90 37,93 52,81 S78,90 95,67 S119,80 136,60 S165,69 181,42 S211,52 227,29"
                    />

                    <circle
                      className="chart-point-pulse"
                      cx="227"
                      cy="29"
                      r="10"
                    />

                    <circle
                      className="chart-point"
                      cx="227"
                      cy="29"
                      r="5"
                    />
                  </svg>

                  <div className="chart-labels">
                    <span>ارد</span>
                    <span>خرد</span>
                    <span>فروردین</span>
                    <span>اردیبهشت</span>
                    <span>خرداد</span>
                  </div>
                </section>

                {/* AI Insight */}
                <aside className="insight-card">
                  <div className="assistant-head">
                    <span className="assistant-avatar">
                      ✦
                    </span>

                    <span>
                      دستیار هوش مصنوعی
                    </span>
                  </div>

                  <p className="ai-message">
                    سود این ماه ۱۸٪ افزایش داشته.
                  </p>

                  <p className="ai-message second">
                    بیشترین هزینه مربوط به تبلیغات است.
                  </p>

                  <p className="ai-message third">
                    پیشنهاد: بودجه کانال‌های پربازده را افزایش دهید.
                  </p>
                </aside>
              </div>

              {/* Bottom status */}
              <div className="sample-strip">
                <div className="sample-status">
                  <span className="status-light" />
                  <span>داده‌های نمونه</span>
                </div>

                <span>
                  به‌روزرسانی: امروز
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating card */}
        <div className="floating-signal">
          <span className="floating-icon">
            ↗
          </span>

          <div>
            <span className="floating-label">
              رشد سود خالص
            </span>

            <strong className="floating-value">
              +۱۸٪
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}