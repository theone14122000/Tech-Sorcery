import { ExternalLink } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { PortfolioPlaceholder } from "@/components/sections/PortfolioPlaceholder";
import { projects, type Project } from "@/data/projects";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="hairline glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7">
      <div className="flex items-center justify-between gap-3 font-mono text-[0.68rem] tracking-[0.16em] text-mist-4 uppercase">
        <span>{project.client}</span>
        <span>{project.year}</span>
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-mist">{project.title}</h3>
      <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-mist-3">{project.summary}</p>

      {project.metrics && (
        <dl className="mt-5 grid grid-cols-3 gap-3 border-y border-line py-4">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="font-mono text-[0.6rem] tracking-[0.14em] text-mist-4 uppercase">
                {metric.label}
              </dt>
              <dd className="mt-1 text-lg font-semibold text-cyan">{metric.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-line-2 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.64rem] text-mist-3"
          >
            {tag}
          </li>
        ))}
      </ul>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm text-mist-3 transition-colors hover:text-cyan"
        >
          View project
          <ExternalLink className="size-4" aria-hidden />
        </a>
      )}
    </article>
  );
}

export function Portfolio() {
  const hasProjects = projects.length > 0;

  return (
    <section id="work" className="relative py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeader
          index="07"
          eyebrow="// work"
          title={
            <>
              Case studies in <span className="text-gradient-accent">progress.</span>
            </>
          }
          lead={
            hasProjects
              ? "A selection of production builds — stack, scope and outcomes."
              : "Selected work is being written up. The structure below is ready for it."
          }
        />

        <Reveal delay={0.06} className="mt-12">
          {hasProjects ? (
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {projects.map((project) => (
                <StaggerItem key={project.id}>
                  <ProjectCard project={project} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <PortfolioPlaceholder />
          )}
        </Reveal>
      </Container>
    </section>
  );
}
