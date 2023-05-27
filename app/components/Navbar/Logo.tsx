'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <div className="md:flex items-center cursor-pointer hidden" onClick={() => router.push('/')}>
            <Image src="/images/logo.png" width={50} height={50} alt="logo"/>
            <div className="font-bold text-2xl">ResiSeeker</div>
        </div>
    );
};

export default Logo;
