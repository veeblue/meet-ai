interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className="h-screen flex items-center justify-center bg-radial from-sidebar-accent to-sidebar">
            {children}
        </div>
    );
};

export default Layout;