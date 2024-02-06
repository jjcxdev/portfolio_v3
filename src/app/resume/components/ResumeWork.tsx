interface ResumeWorkProps {
  employer: string;
  jobTitle: string;
  location: string;
  summary: string;
  dates: string;
}

export default function ResumeWork(props: ResumeWorkProps) {
  return (
    <div className="font-share-tech-mono flex flex-col pt-4 text-sm leading-5">
      <div className="flex justify-between">
        <h1 className="font-bold">{props.employer}</h1>
        <h4 className="font-bold">{props.dates}</h4>
      </div>
      <h2 className="font-bold">{props.jobTitle}</h2>
      <h3 className="pb-2 font-bold">{props.location}</h3>
      <p>{props.summary}</p>
    </div>
  );
}
