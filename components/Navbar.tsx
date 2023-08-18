import React from 'react'
import ThemeButton from './ThemeButton'
import Link from 'next/link'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from './ui/navigation-menu'
export default function Navbar({ setTheme, theme }: {
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>,
    theme: 'light' | 'dark'
}) {

    return (
        <nav className='w-3/4 mx-auto'>

            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href='/' legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Home
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href='/projects' legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Projects
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem><NavigationMenuItem>
                        <Link href='/' legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Home
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <ThemeButton setTheme={setTheme} theme={theme} />
                    </NavigationMenuItem>
                </NavigationMenuList>

            </NavigationMenu>
        </nav>
    )
}
