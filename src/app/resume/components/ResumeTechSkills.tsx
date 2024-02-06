interface ResumeTechSkillsProps {
  category: string;
  skill: string;
}

export default function ResumeTechSkills(props: ResumeTechSkillsProps) {
  return (
    <div className="font-share-tech-mono flex flex-col text-sm">
      <div className="flex">
        <p className="font-semibold">{props.category}:</p>
        <p className="pl-1">{props.skill}</p>
      </div>
    </div>
  );
}
