//seo/JsonLd (امروز): داده‌ی ساختاریافته برای گوگل.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // < رو escape می‌کنیم تا محتوا نتونه تگ script رو ببنده
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
