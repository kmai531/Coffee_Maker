import Navbar from "@/components/MyNavbar1";
import React, { ReactNode } from "react";
type LayoutProps = {
    children: ReactNode;
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <div>{children}</div>;
};

export default Layout;
