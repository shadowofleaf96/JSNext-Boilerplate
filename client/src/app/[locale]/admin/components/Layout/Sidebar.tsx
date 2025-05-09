'use client';
import React from 'react';
import { FaHome, FaUser } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
}

export default function Sidebar({
  isOpen,
  toggleSidebar,
  isMobile,
}: SidebarProps) {
  const { t } = useTranslation();
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter(Boolean);
  const currentLocale = pathSegments[0] || 'en';

  const sideElements = [
    {
      key: 'dashboard',
      name: t('navbar.dashboard'),
      href: `/${currentLocale}/admin/dashboard`,
      current: pathname === `/${currentLocale}/admin/dashboard`,
      icon: <FaHome className="text-xl md:text-2xl" />,
    },
    {
      key: 'users',
      name: t('navbar.users'),
      href: `/${currentLocale}/admin/users`,
      current: pathname === `/${currentLocale}/admin/users`,
      icon: <FaUser className="text-xl md:text-2xl" />,
    },
  ];

  return (
    <>
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 w-56 fixed md:relative h-screen bg-white border-r border-gray-300 z-50 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="relative p-2 flex items-center justify-center">
          <Link
            href={`/${currentLocale}`}
            prefetch={true}
            className="flex justify-center"
          >
            <Image
              width={0}
              height={0}
              placeholder="blur"
              blurDataURL="data:image/png;base64,..."
              sizes="(max-width: 768px) 100vw, 50vw"
              className="max-h-16 w-auto object-contain"
              src="/images/jsnxt-logo-black.webp"
              alt={t('navbar.alt.logo')}
            />
          </Link>
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="absolute right-2 md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              aria-label={t('navbar.buttons.close')}
            >
              <IoClose className="text-xl" />
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {sideElements.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                prefetch={false}
                onClick={() => isMobile && toggleSidebar()}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                  item.current
                    ? 'bg-blue-50 text-black'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span
                  className={`${item.current ? 'text-black' : 'text-gray-500'}`}
                >
                  {item.icon}
                </span>
                <span className="ml-3 text-sm font-medium rtl:mr-3">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
