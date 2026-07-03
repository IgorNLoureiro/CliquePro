"use client";
import { Hero } from "./hero";
import { PhotoUpload } from "./ImageUploader";

export function HomeContent() {
    return (
        <>
            
        

        <main className="container mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-200px)]">
                <div className="flex justify-center">
                    <Hero />
                </div>
                <div className="flex justify-center">
                    <PhotoUpload />
                </div>
            </div>
        </main>
        </>
    )
}