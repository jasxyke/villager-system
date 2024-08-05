import { useEffect, useState } from "react";
import "./Sidebar.css"
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const sideBarMenuList = [
        {
            title: "Home",
            path: "/home",
            icon: "/sidebar-icon/Home_white.svg",
            iconActive: "/sidebar-icon/Home.svg",
            isActive: true,
        },
        {
            title: "Booking",
            path: "/booking",
            icon: "/sidebar-icon/Calendar.svg",
            iconActive: "/sidebar-icon/Calendar_green.svg",
            isActive: true,
        },
        {
            title: "Bills",
            path: "/bills",
            icon: "/sidebar-icon/Book.svg",
            iconActive: "/sidebar-icon/Book_green.svg",
            isActive: false,
        },
        {
            title: "Files",
            path: "/files",
            icon: "/sidebar-icon/File.svg",
            iconActive: "/sidebar-icon/File.svg",
            isActive: false,
        },
        {
            title: "Users",
            path: "/users",
            icon: "/sidebar-icon/Users.svg",
            iconActive: "/sidebar-icon/Book_green.svg",
            isActive: false,
        },
        {
            title: "Announcements",
            path: "/announcements",
            icon: "/sidebar-icon/chat_bubble.svg",
            iconActive: "/sidebar-icon/chat_bubble.svg",
            isActive: false,
        },
        {
            title: "Logout",
            path: "/login",
            icon: "/sidebar-icon/Log out.svg",
            iconActive: "/sidebar-icon/Log out.svg",
            isActive: false,
        }
    ]

    const navigate = useNavigate();
    const location = useLocation()

    const [sideBarMenu, setSideBarMenu] = useState(sideBarMenuList)

    useEffect(() => {
        const newside = sideBarMenu.map((c) => {
            return {
                ...c,
                isActive: c.path === location.pathname
            }
        })
        setSideBarMenu(newside)
    }, [location])

    return (
        <aside className="sidebar">
            <div className="menu">
                <ul>
                    {
                        sideBarMenu.map((res, i) => (
                            <li key={i} class={res.isActive ? "active" : ""} onClick={() => navigate(res.path)}>
                                <img src={res.isActive ? res.iconActive : res.icon} alt={res.title} className="menuIconClass" />
                                <span>{res.title}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </aside>
    )
}
export default Sidebar;