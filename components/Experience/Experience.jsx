import React from "react";

function Experience() {
  const experience = {
    role: "Web Development Intern",
    company: "Indavis LifeScience",
    date: "May 2025 - July 2025",
    desc: "Worked on building responsive and interactive web applications. Implemented frontend features using React JS and Tailwind CSS, collaborated with the team to enhance user experience, and assisted in debugging and optimizing code.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React JS",
      "Tailwind CSS",
      "Figma"
    ]
  };

  return (
    <section
      id="experience"
      className="min-h-screen py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col justify-center items-center font-mono"
      style={{
        background: 'linear-gradient(38.73deg, rgba(204, 0, 187, 0.15) 0%, rgba(201, 32, 184, 0) 50%), linear-gradient(141.27deg, rgba(0, 70, 209, 0) 50%, rgba(0, 70, 209, 0.15) 100%)',
      }}
    >
      {/* Section Title */}
      <div className="text-center mb-16 w-full">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          My <span className="text-[#8245ec]">Experience</span>
        </h2>
        <div className="flex justify-center mt-4">
          <div className="w-20 h-1 bg-[#8245ec] rounded-full"></div>
        </div>
      </div>

      {/* Experience Content */}
      <div className="w-full max-w-5xl mx-auto">
        <div 
          className="rounded-3xl p-6 md:p-8 border-2 backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(20, 20, 40, 0.6)',
            borderColor: 'rgba(100, 100, 180, 0.4)'
          }}
        >
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              {experience.role}
            </h3>
            <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#8245ec] mb-3">
              {experience.company}
            </h4>
            <div className="flex items-center gap-2 text-gray-400 mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2}/>
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2}/>
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2}/>
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2}/>
              </svg>
              <span className="text-sm">{experience.date}</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            {experience.desc}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-[#8245ec]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <h5 className="text-base sm:text-lg font-semibold text-white">Skills & Technologies</h5>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {experience.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-md text-white text-xs sm:text-sm font-bold"
                style={{
                  backgroundColor: '#6b46c1'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            More experiences coming soon...
          </p>
        </div>
      </div>
    </section>
  );
}

export default Experience;