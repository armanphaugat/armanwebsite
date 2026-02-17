import React from "react";
import { projects } from "../../src/constraint";

const Work = () => {
  return (
    <section id="work" className="py-24 px-4 relative min-h-screen flex items-center justify-center font-mono">
      <div className="container mx-auto max-w-6xl w-full">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Projects
          </h2>
          <div className="w-20 h-1 bg-transparent mx-auto mt-4"></div>
          <div className="w-20 h-1 bg-transparent mx-auto mt-4"></div>
          <div className="w-20 h-1 bg-transparent mx-auto mt-4"></div>
          <div className="w-20 h-1 bg-transparent mx-auto mt-4"></div>
          <div className="w-20 h-1 bg-transparent mx-auto mt-4"></div>
          <div className="w-20 h-1 bg-transparent mx-auto mt-4"></div>
          <div className="w-20 h-1 bg-transparent mx-auto mt-4"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
            >
              {/* Image */}
              <div className="h-48 bg-gray-800 flex items-center justify-center p-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-medium bg-purple-900/30 text-purple-400 rounded-full border border-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-3 py-1 text-xs font-medium bg-gray-800 text-gray-400 rounded-full">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-gray-800">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm font-medium"
                    >
                      Code
                    </a>
                  )}
                  {project.webapp && (
                    <a
                      href={project.webapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      Live
                    </a>
                    
                  )}
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;