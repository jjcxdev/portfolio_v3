interface ResumeEducationProps {
  school: string;
  program: string;
  location: string;
  dates: string;
}

export default function ResumeEducation(props: ResumeEducationProps) {
  return (
    <div className="font-share-tech-mono flex flex-col pt-4 text-sm leading-5">
      <div className="flex justify-between">
        <h1 className="font-bold">{props.school}</h1>
        <h4 className="font-bold">{props.dates}</h4>
      </div>
      <h2 className="">{props.program}</h2>
      <h3 className="">{props.location}</h3>
    </div>
  );
}
