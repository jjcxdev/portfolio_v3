interface ResumeProjectProps {
  client: string;
  description: string;
  bullets: string[];
}

export default function ResumeProject(props: ResumeProjectProps) {
  return (
    <div className="font-share-tech-mono flex flex-col pt-2 text-sm">
      <div className="flex pb-1">
        <p className="font-semibold">{props.client}:</p>
        <p className="pl-1">{props.description}</p>
      </div>
      {props.bullets.map((line, index) => (
        <p className="pl-6 text-sm" key={index}>
          • {line}
        </p>
      ))}
    </div>
  );
}
