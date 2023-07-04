import Image from 'next/image'
import React from 'react'
import fptLogo from 'public/FPT_logo_2010.svg.png'
import favicon from 'public/favicon.png'
import Head from 'next/head'

interface HeaderProps {
  loadFile: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Header = (props: HeaderProps) => {
  const siteTitle = 'FPT Test Visualize'
  return (
    <>
      <Head>
        <link rel="icon" href={favicon.src} />
        <meta name="description" content="Hệ thống hỗ trợ Service Desk" />
        <meta property="og:image" content={favicon.src} />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>{siteTitle}</title>
      </Head>
      <div className="p-2.5 bg-white sticky top-0 left-0 right-0 flex justify-between items-center border-b border-neutral-200">
        <div></div>
        <Image height={40} src={fptLogo} alt="FPT_company_logo"></Image>
        <div>
          <label
            className="flex gap-1 items-center ml-2 underline cursor-pointer text-blue-500 hover:text-blue-600 focus:text-blue-700"
            htmlFor="upload_file_header"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
              />
            </svg>
            Attach a file
          </label>
          <input
            type="file"
            name="upload_file_header"
            id="upload_file_header"
            className="hidden"
            accept=".json"
            onChange={(e) => props.loadFile(e)}
          />
        </div>
      </div>
    </>
  )
}

export default Header
