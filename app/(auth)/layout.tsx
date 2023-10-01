interface AuthLayout {
  children?: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayout) {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  );
}
