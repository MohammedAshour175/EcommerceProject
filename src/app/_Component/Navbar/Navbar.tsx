"use client"

import { useContext } from "react"
import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from 'next/image';
import { signOut, useSession } from "next-auth/react";
import { CountContext } from "image/CountProvider";


export function Navbar() {
    const { data, status } = useSession()
    const contextCount = useContext(CountContext)

    const MenuItems: { path: string, content: string, protected: boolean }[] = [
        { path: '/products', content: "Products", protected: false },
        { path: '/category', content: "Category", protected: false },
        { path: '/brands', content: "Brands", protected: false },
        { path: '/cart', content: "Cart", protected: true },
        { path: '/wishlist', content: "Wishlist", protected: true },
        { path: '/allorders', content: "Orders", protected: true },
    ]
    const MenuAuthItems: { path: string, content: string }[] = [
        { path: '/login', content: "Login" },
        { path: '/register', content: "Register" },




    ]
    function logout() {
        signOut({
            callbackUrl: '/login'
        })
    }
    return (
        <NavigationMenu className="max-w-full justify-between shadow-2xl p-4" viewport={false}>

            <NavigationMenuList>

                <NavigationMenuItem >
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href='/'>
                            <Image src={'/images/freshcart-logo.svg'} alt="FreshCartLogo " width={100} height={100} />
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>



                {
                    MenuItems.map((item) => {
                        return <NavigationMenuItem key={item.path}>
                            {item.protected && status == 'authenticated' && <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href={item.path}>{item.content}</Link>
                            </NavigationMenuLink>}
                            {!item.protected && <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href={item.path}>{item.content}</Link>
                            </NavigationMenuLink>}
                        </NavigationMenuItem>
                    })
                }

            </NavigationMenuList>
            <NavigationMenuList>
                {
                    status == 'authenticated' ? <>
                        <NavigationMenuItem >
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link href='/cart' className="bg-amber-400 relative"   ><i className="fa-solid fa-cart-shopping text-2xl text-main"></i>
                                    <span className="absolute -top-2 -right-0.5 bg-main text-white p-2 rounded-full w-5 h-5 flex justify-center items-center">{contextCount?.count}</span>

                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem >
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <span className="bg-gray-600 p-5" >
                                    Hello {data?.user.name}
                                </span>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem >
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <span onClick={logout} >
                                    <i className="fa-sharp fa-solid fa-right-from-bracket"></i>
                                </span>
                            </NavigationMenuLink>
                        </NavigationMenuItem></>

                        : <>{
                            MenuAuthItems.map((item) => {
                                return <NavigationMenuItem key={item.path}>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href={item.path}>{item.content}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            })
                        }</>}


            </NavigationMenuList>
        </NavigationMenu>
    )
}

