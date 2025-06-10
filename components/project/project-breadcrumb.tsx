import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbProps {
  title: string;
  slug: string;
  id: number;
}

export function ProjectBreadcrumb({ title, slug, id }: BreadcrumbProps) {
  return (
    <Breadcrumb className="max-w-3xl p-6 mx-auto text-[#64748b] ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/project">Projetos</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-[#64748b]" />

        <BreadcrumbItem>
          <BreadcrumbLink href={`/project/${slug}-${id}`}>
            {title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
