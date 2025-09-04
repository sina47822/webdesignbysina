import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
        <ul>
            <li>
                <Link href={"/services/webbuilder"}>
                    طراحی سایت آنلاین
                </Link>
            </li>
            <li>
                <Link href={"/services/SEO"}>
                    سئو سایت
                </Link>
            </li>
            <li>
                <Link href={"/services/supports"}>
                    پشتیبانی وبسایت
                </Link>
            </li>
            <li>
                <Link href={"/services/feature-design"}>
                    طراحی المان جدید
                </Link>
            </li>
            <li>
                <Link href={"/services/aparat-dl"}>
                    طراحی المان جدید
                </Link>
            </li>
            <li>
                <Link href={"/services/ip-checker"}>
                    طراحی المان جدید
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default page