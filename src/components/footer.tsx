import { Github, Linkedin, Globe } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary mt-8 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              Datos proporcionados por{" "}
              <a
                href="https://openweathermap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
              >
                OpenWeather
              </a>
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm font-semibold mb-2">
              Creado por Eduardo Serrano
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/EdsenxX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/edsen/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link
                href="https://edsen.dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Portafolio"
              >
                <Globe className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
