interface ResumeWorkProps {
  employer: string;
  jobTitle: string;
  location: string;
  description: string;
  dates: string;
  client: string;
  bullets: string[];
}

export default function ResumeWork(props: ResumeWorkProps) {
  return (
    <>
      <h1>{props.employer}</h1>
      <h2>{props.jobTitle}</h2>
      <h3>{props.location}</h3>
      <h4>{props.dates}</h4>
      <p>{props.client}</p>
      <p>{props.description}</p>
      {props.bullets.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </>
  );
}
