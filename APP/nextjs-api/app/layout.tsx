export const metadata = {
  title: "AI Tutor Platform",
  description: "Your AI programming tutor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{ margin: 0, padding: 0, fontFamily: "system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
