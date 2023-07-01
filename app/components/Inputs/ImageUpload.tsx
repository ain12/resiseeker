'use client';

import { on } from 'events';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ( {
    onChange,
    value,
}) => {

    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (
        <CldUploadWidget onUpload={handleUpload} uploadPreset='f0jd818y' options={{
            maxFiles: 1,
        }}>
            {({open}) => {
                return (
                    <div onClick={() => open?.()} className="cursor-pointer hover:opacity-80 transiton 
                    border-dashed border-2 relative p-20 border-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-600">
                        <TbPhotoPlus size={50}/>
                        <div className="font-semibold text-lg">
                            Upload here
                        </div>
                        {value && (
                            <div className="absolute inset-0 h-full w-full">
                                <Image src={value} alt="upload" fill style={{ objectFit: 'cover'}} />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}

export default ImageUpload;