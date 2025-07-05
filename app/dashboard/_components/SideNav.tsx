import { FileClock, Home } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

export default function SideNav() {
  const MenuList = [
    {
      Name: 'Home',
      icon: Home,
      path: '/dashboard',
    },
    {
      Name: 'History',
      icon: FileClock,
      path: '/dashboard/History',
    },
  ]

  return (
    <div className="h-screen p-5 shadow-sm border">
      <div className="flex justify-center">
        <img src="SA.svg" alt="logo" width={150} height={100} />
      </div>

      <div className="mt-10 space-y-2">
        {MenuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <div
              className="flex gap-4 items-center mb-2 p-3
              hover:bg-purple-100 hover:text-purple-800 transition
              rounded-lg cursor-pointer"
            >
              <menu.icon className="w-5 h-5" />
              <h2 className="text-base font-medium">{menu.Name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
