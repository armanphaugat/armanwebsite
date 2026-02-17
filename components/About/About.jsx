import React from "react";
import { ReactTyped } from "react-typed";

function About(){
    return(
        <section id="about" className="min-h-screen relative py-4 font-sans flex items-center justify-center">
            <div className="text-center px-4 max-w-4xl">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-2 leading-tight font-mono">
                    Hi! I am 
                </h1>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-2 leading-tight font-mono">
                    Arman Phaugat
                </h2>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-[#8245ec] leading-tight">
                    <span className="text-white font-mono">I am a </span>
                    <span className="font-mono font-extrabold">
                    <ReactTyped
                        strings={[
                            "Full Stack Developer",
                            "Competitive Programmer",
                            "System Design Learner",
                            "Discord Bot Developer",
                            "Game Developer",
                            "C++ | Python | JavaScript Developer",
                            "Tech Innovator and Problem Solver",
                            "Aspiring Software Engineer"
                        ]}
                        typeSpeed={100}
                        backSpeed={50}
                        loop
                    />
                    </span>
                </h3>
                <div className="mt-8 space-y-4 text-gray-300 text-base sm:text-lg">
                    <p className="font-semibold leading-relaxed font-mono">
                        I'm a developer who loves turning complex ideas into simple, functional, and beautiful digital experiences. I specialize in full-stack development using React, Node.js, and SQLite, with a strong foundation in C++ and Data Structures. From building interactive web apps to Discord bots and game simulations, I focus on writing clean, efficient, and scalable code. I'm always exploring new technologies and challenges to improve my skills and deliver impactful digital solutions.
                    </p>
                    <a
                        href="/ARMANRESUME.pdf"
                        download
                        className="inline-block font-mono text-white py-3 px-8 rounded-2xl mt-50 text-lg font-bold transition-all duration-300 transform hover:scale-105"
                        style={{
                            background: 'linear-gradient(90deg, #8245ec, #a855f7)',
                            boxShadow: '0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 40px #8245ec',
                            marginTop:'3rem'
                        }}
                    >
                        DOWNLOAD CV
                    </a>
                </div>
            </div>
        </section>
    )
}
export default About;