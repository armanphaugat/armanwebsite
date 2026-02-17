import React from "react";
import { SkillsData } from "../../src/constraint";
import Tilt from 'react-parallax-tilt';

function Skills(){
    return(
        <section
            id="skills"
            className="min-h-screen py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col justify-center items-center font-mono"
            style={{
                background: 'linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%)',
            }}
        >
            {/* Section Title */}
            <div className="text-center mb-16 w-full">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                    <span className="text-[#8245ec]">Skills</span>
                </h2>
                <div className="flex justify-center mt-4">
                    <div className="w-20 h-1 bg-[#8245ec] rounded-full"></div>
                </div>
            </div>

            {/* Skills Grid - centered */}
            <div className="w-full max-w-6xl mx-auto px-4 font-mono mt-12">
                {SkillsData.map((category) => (
                    <div key={category.category} className="w-full">
                        {/* Skill Items Grid */}
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 md:gap-10 lg:gap-12">
                            {category.skills.map((skill) => (
                                <Tilt
                                    key={skill.name}
                                    tiltMaxAngleX={10}
                                    tiltMaxAngleY={10}
                                    perspective={1000}
                                    scale={1.05}
                                    transitionSpeed={300}
                                    gyroscope={true}
                                    className="w-full"
                                >
                                    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-5 hover:from-white/15 hover:to-white/10 hover:border-[#8245ec]/50 transition-all duration-300 group aspect-square shadow-lg hover:shadow-[#8245ec]/20">
                                        <div className="w-14 h-14 mb-3 flex items-center justify-center">
                                            <img
                                                src={skill.logo}
                                                alt={`${skill.name} logo`}
                                                className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <span className="text-sm text-white font-semibold text-center leading-tight">
                                            {skill.name}
                                        </span>
                                    </div>
                                </Tilt>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Skills;