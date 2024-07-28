type Props = { children: React.ReactNode };

function Layout({ children }: Props) {
  return <div className="p-4 max-w-xl mx-auto h-full">{children}</div>;
}

export default Layout;
